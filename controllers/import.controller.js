const ImportService = require('../services/import.service');

class ImportController {
  static async importFromBody(req, res) {
    try {
      const { sql, skip_duplicates, force } = req.body;
      if (!sql || typeof sql !== 'string' || !sql.trim()) {
        return res.status(400).json({ error: 'Le champ "sql" est requis et doit être une chaîne de caractères non vide' });
      }
      const opts = {
        skipDuplicates: skip_duplicates !== false && skip_duplicates !== 'false',
        force: force === true || force === 'true'
      };
      console.log('[import/sql] options:', opts);
      const result = await ImportService.importSql(sql.trim(), opts);
      res.status(200).json({
        message: `Import réussi : ${result.totalStatements} instruction(s) exécutée(s), ${result.skipped} ignorée(s) (doublon)`,
        ...result
      });
    } catch (error) {
      console.error('[import/sql] error:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

  static async importFromFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier fourni. Utilisez le champ "file" en multipart/form-data' });
      }
      if (!req.file.originalname.toLowerCase().endsWith('.sql')) {
        return res.status(400).json({ error: 'Le fichier doit avoir l\'extension .sql' });
      }
      // Accept force from query param OR form-data field
      const forceRaw = req.query.force ?? req.body.force;
      const opts = {
        skipDuplicates: (req.query.skip_duplicates ?? req.body.skip_duplicates) !== 'false',
        force: forceRaw === true || forceRaw === 'true'
      };
      console.log('[import/file] options:', opts);
      const sql = req.file.buffer.toString('utf-8');
      const result = await ImportService.importSql(sql.trim(), opts);
      res.status(200).json({
        message: `Import réussi : ${result.totalStatements} instruction(s) exécutée(s), ${result.skipped} ignorée(s) (doublon)`,
        file: req.file.originalname,
        size: `${(req.file.size / 1024).toFixed(2)} KB`,
        ...result
      });
    } catch (error) {
      console.error('[import/file] error:', error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ImportController;
