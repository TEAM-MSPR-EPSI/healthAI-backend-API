const express = require('express');
const router = express.Router();
const dbController = require('../controllers/db.controller');

router.get('/dbtest', dbController.dbTest);

module.exports = router;