const express = require('express');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const models = require('./models/index');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const dbRoutes = require('./routes/db.route');
const subscriptionRoutes = require('./routes/subscription.route');
const recipeRoutes = require('./routes/recipe.routes');
const ingredientRoutes = require('./routes/ingredient.routes');
const sportProgramRoutes = require('./routes/sportProgram.routes');
const sportSessionRoutes = require('./routes/sportSession.routes');
const sportExerciseRoutes = require('./routes/sportExercise.routes');
const sportEquipmentRoutes = require('./routes/sportEquipment.routes');
const userHealthProfileRoutes = require('./routes/userHealthProfile.routes');
const userBiometricRoutes = require('./routes/userBiometric.routes');
const sessionProgressRoutes = require('./routes/sessionProgress.routes');
const consumeRoutes = require('./routes/consume.routes');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', dbRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/sport-programs', sportProgramRoutes);
app.use('/api/sport-sessions', sportSessionRoutes);
app.use('/api/sport-exercises', sportExerciseRoutes);
app.use('/api/sport-equipment', sportEquipmentRoutes);
app.use('/api/user-health-profiles', userHealthProfileRoutes);
app.use('/api/user-biometrics', userBiometricRoutes);
app.use('/api/session-progress', sessionProgressRoutes);
app.use('/api/consumes', consumeRoutes);

sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('API OK');
});

app.listen(5000, '0.0.0.0', () => {
  console.log('API backend running on port 5000');
});