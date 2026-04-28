const pool = require('../config/pool');

const BLOCKED_PATTERN = /^\s*(DROP|TRUNCATE|ALTER\s+TABLE|CREATE\s+(TABLE|DATABASE|SCHEMA|INDEX)|DELETE\s+FROM\s+\w+\s*;?\s*$)/i;
const ALLOWED_PATTERN = /^\s*(INSERT\s+INTO|UPDATE\s+\w|COPY\s+\w|DO\s*\$)/i;

class ImportService {
  // Splits SQL on semicolons while ignoring semicolons inside dollar-quoted blocks (e.g. DO $$ ... END $$)
  static parseStatements(sql) {
    const statements = [];
    let current = '';
    let i = 0;
    let inDollarQuote = false;
    let dollarTag = '';

    while (i < sql.length) {
      if (sql[i] === '$') {
        const tagEnd = sql.indexOf('$', i + 1);
        if (tagEnd !== -1) {
          const tag = sql.substring(i, tagEnd + 1);
          if (/^\$[A-Za-z0-9_]*\$$/.test(tag)) {
            if (!inDollarQuote) {
              inDollarQuote = true;
              dollarTag = tag;
              current += tag;
              i = tagEnd + 1;
              continue;
            } else if (tag === dollarTag) {
              inDollarQuote = false;
              dollarTag = '';
              current += tag;
              i = tagEnd + 1;
              continue;
            }
          }
        }
      }

      if (!inDollarQuote && sql[i] === '-' && sql[i + 1] === '-') {
        while (i < sql.length && sql[i] !== '\n') i++;
        continue;
      }

      if (!inDollarQuote && sql[i] === ';') {
        const stmt = current.trim();
        if (stmt.length > 0) statements.push(stmt);
        current = '';
        i++;
        continue;
      }

      current += sql[i];
      i++;
    }

    const remaining = current.trim();
    if (remaining.length > 0) statements.push(remaining);

    return statements.filter(s => s.length > 0 && !s.startsWith('/*'));
  }

  static validateStatements(statements) {
    const errors = [];
    statements.forEach((stmt, idx) => {
      if (BLOCKED_PATTERN.test(stmt)) {
        errors.push(`Instruction ${idx + 1} refusée (DROP/TRUNCATE/ALTER/CREATE/DELETE non autorisés)`);
      } else if (!ALLOWED_PATTERN.test(stmt)) {
        errors.push(`Instruction ${idx + 1} non reconnue — seuls INSERT, UPDATE, COPY et DO sont autorisés`);
      }
    });
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }

  static applyConflictStrategy(statements) {
    return statements.map(stmt => {
      if (/^\s*INSERT\s+INTO/i.test(stmt) && !/ON\s+CONFLICT/i.test(stmt)) {
        return stmt + ' ON CONFLICT DO NOTHING';
      }
      return stmt;
    });
  }

  static extractTableNames(statements) {
    const tables = new Set();
    for (const stmt of statements) {
      const match = stmt.match(/^\s*INSERT\s+INTO\s+"?([A-Za-z0-9_]+)"?/i);
      if (match) tables.add(match[1]);
    }
    return [...tables];
  }

  // Truncates all affected tables with CASCADE + resets their identity sequences
  static async truncateTables(tableNames, client) {
    if (tableNames.length === 0) return;
    const quoted = tableNames.map(t => `"${t}"`).join(', ');
    await client.query(`TRUNCATE TABLE ${quoted} RESTART IDENTITY CASCADE`);
  }

  static async executeStatements(statements, client) {
    const results = [];
    for (let i = 0; i < statements.length; i++) {
      const result = await client.query(statements[i]);
      results.push({
        index: i + 1,
        command: result.command,
        rowCount: result.rowCount,
        preview: statements[i].length > 80
          ? statements[i].substring(0, 80) + '...'
          : statements[i]
      });
    }
    return results;
  }

  static async importSql(sql, { skipDuplicates = true, force = false } = {}) {
    let statements = this.parseStatements(sql);
    if (statements.length === 0) {
      throw new Error('Aucune instruction SQL trouvée dans le contenu fourni');
    }
    this.validateStatements(statements);

    const tableNames = this.extractTableNames(statements);

    if (!force && skipDuplicates) {
      statements = this.applyConflictStrategy(statements);
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      if (force) {
        await this.truncateTables(tableNames, client);
      }

      const results = await this.executeStatements(statements, client);
      await client.query('COMMIT');

      const skipped = results.filter(r => r.rowCount === 0 && r.command === 'INSERT').length;
      return { totalStatements: statements.length, skipped, force, results };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = ImportService;
