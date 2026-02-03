const express = require('express');
const app = express();

const dbRoutes = require('./routes/dbRoutes');

app.use('/', dbRoutes);

app.get('/', (req, res) => {
  res.send('API OK');
});

app.listen(5000, '0.0.0.0', () => {
  console.log('API backend running on port 5000');
});