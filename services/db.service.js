const pool = require('../config/pool');

async function getCurrentTime() {
  const result = await pool.query('SELECT NOW()');
  return result.rows[0].now;
}

module.exports = { getCurrentTime };
