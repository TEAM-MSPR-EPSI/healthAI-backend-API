const express = require('express');
const router = express.Router();
const multer = require('multer');
const ImportController = require('../controllers/import.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.originalname.toLowerCase().endsWith('.sql')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers .sql sont acceptés'));
    }
  }
});

/**
 * @swagger
 * /api/import/sql:
 *   post:
 *     summary: Importer des données SQL via le corps de la requête
 *     tags: [Import]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sql]
 *             properties:
 *               sql:
 *                 type: string
 *                 example: "INSERT INTO ingredients (ingredient_name) VALUES ('Pomme');"
 *     responses:
 *       200:
 *         description: Import réussi
 *       400:
 *         description: Erreur de validation ou d'exécution SQL
 */
router.post('/sql', ImportController.importFromBody);

/**
 * @swagger
 * /api/import/file:
 *   post:
 *     summary: Importer des données SQL via un fichier .sql
 *     tags: [Import]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Import réussi
 *       400:
 *         description: Fichier invalide ou erreur SQL
 */
router.post('/file', upload.single('file'), ImportController.importFromFile);

module.exports = router;
