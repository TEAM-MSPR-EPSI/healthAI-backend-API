const assert = require('node:assert/strict');
const { afterEach, test } = require('node:test');

const {
  clearResolvedModule,
  loadFresh,
  mockResolvedModule,
} = require('../helpers/module-mocks');

const poolModulePath = require.resolve('../../config/pool');
const importServicePath = require.resolve('../../services/import.service');

let queries = [];

function createClient() {
  return {
    query: async (sql) => {
      queries.push(sql);

      if (sql === 'BEGIN' || sql === 'COMMIT' || sql === 'ROLLBACK') {
        return { command: sql, rowCount: null };
      }

      return { command: 'INSERT', rowCount: 1 };
    },
    release: () => {
      queries.push('RELEASE');
    },
  };
}

function loadImportServiceWithPool(pool) {
  mockResolvedModule(poolModulePath, pool);
  return loadFresh(importServicePath);
}

afterEach(() => {
  queries = [];
  clearResolvedModule(poolModulePath);
  clearResolvedModule(importServicePath);
});

test('parseStatements keeps dollar quoted blocks intact', () => {
  const ImportService = loadImportServiceWithPool({ connect: async () => createClient() });
  const statements = ImportService.parseStatements(`
    -- comment
    INSERT INTO users VALUES (1);
    DO $$
    BEGIN
      RAISE NOTICE 'hello;world';
    END $$;
  `);

  assert.deepEqual(statements, [
    'INSERT INTO users VALUES (1)',
    "DO $$\n    BEGIN\n      RAISE NOTICE 'hello;world';\n    END $$",
  ]);
});

test('validateStatements rejects destructive SQL', () => {
  const ImportService = loadImportServiceWithPool({ connect: async () => createClient() });

  assert.throws(() => {
    ImportService.validateStatements(['DROP TABLE users']);
  }, /refusée/);
});

test('importSql wraps inserts with conflict handling and commits the transaction', async () => {
  const client = createClient();
  const ImportService = loadImportServiceWithPool({ connect: async () => client });

  const result = await ImportService.importSql('INSERT INTO users VALUES (1);');

  assert.equal(result.totalStatements, 1);
  assert.equal(result.force, false);
  assert.equal(result.skipped, 0);
  assert.deepEqual(queries, [
    'BEGIN',
    'INSERT INTO users VALUES (1) ON CONFLICT DO NOTHING',
    'COMMIT',
    'RELEASE',
  ]);
});

test('importSql truncates tables when force mode is enabled', async () => {
  const client = createClient();
  const ImportService = loadImportServiceWithPool({ connect: async () => client });

  await ImportService.importSql('INSERT INTO users VALUES (1);', { force: true });

  assert.deepEqual(queries, [
    'BEGIN',
    'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE',
    'INSERT INTO users VALUES (1)',
    'COMMIT',
    'RELEASE',
  ]);
});