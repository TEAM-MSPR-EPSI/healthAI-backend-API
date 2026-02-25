const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Composed_of = sequelize.define('Composed_of', {
meal_id: {
    type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'meal',
          key: 'meal_id'
        }
    },
    food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'food',
          key: 'food_id'
        }
    },
    quantity_grams: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01
        }
    }
});