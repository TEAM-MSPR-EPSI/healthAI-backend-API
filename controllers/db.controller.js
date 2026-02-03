const dbService = require('../services/db.service');

async function dbTest(req, res) {
  try {
    const time = await dbService.getCurrentTime();
    res.json({ time });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur base de données');
  }
}

module.exports = { dbTest };