const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Includes_meal = sequelize.define('Includes_meal', {
    program_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'program',
          key: 'program_id'
        }
    },
    meal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'meal',
          key: 'meal_id'
        }
    }
});

module.exports = Includes_meal;