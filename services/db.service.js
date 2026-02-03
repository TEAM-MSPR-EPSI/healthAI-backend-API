const pool = require('../pool');

async function getCurrentTime() {
  const result = await pool.query('SELECT NOW()');
  return result.rows[0].now;
}

module.exports = { getCurrentTime };
