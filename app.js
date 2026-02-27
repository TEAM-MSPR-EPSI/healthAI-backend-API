const express = require('express');
const sequelize = require('./config/database');

const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const dbRoutes = require('./routes/db.route');
const subscriptionRoutes = require('./routes/subscription.route');

const app = express();
app.use(express.json());

app.use('/', dbRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/subscriptions', subscriptionRoutes);


sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error(err));
  
app.get('/', (req, res) => {
  res.send('API OK');
});

app.listen(5000, '0.0.0.0', () => {
  console.log('API backend running on port 5000');
});