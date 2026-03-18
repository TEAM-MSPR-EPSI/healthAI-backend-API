const User = require('./User');
const Company = require('./Company');
const Subscription = require('./Subscription');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const RecipeIngredient = require('./RecipeIngredient');
const SportProgram = require('./SportProgram');
const SportSession = require('./SportSession');
const SportExercise = require('./SportExercise');
const SportEquipment = require('./SportEquipment');
const UserHealthProfile = require('./UserHealthProfile');
const UserBiometric = require('./UserBiometric');
const SessionProgress = require('./SessionProgress');
const Consume = require('./Consume');
const ProgramSportSession = require('./ProgramSportSession');
const SportSessionExercise = require('./SportSessionExercise');
const SportExerciseEquipment = require('./SportExerciseEquipment');
const UserSubscription = require('./UserSubscription');
const SubscriptionAuthorization = require('./SubscriptionAuthorization');
const UserAllergy = require('./UserAllergy');
const Authorization = require('./Authorization');
const IngredientAllergy = require('./IngredientAllergy');

const models = {
  User,
  Company,
  Subscription,
  Recipe,
  Ingredient,
  RecipeIngredient,
  SportProgram,
  SportSession,
  SportExercise,
  SportEquipment,
  UserHealthProfile,
  UserBiometric,
  SessionProgress,
  Consume,
  ProgramSportSession,
  SportSessionExercise,
  SportExerciseEquipment,
  UserSubscription,
  SubscriptionAuthorization,
  UserAllergy,
  Authorization,
  IngredientAllergy,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
