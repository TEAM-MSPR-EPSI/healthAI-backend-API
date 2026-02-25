const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('Food', {
    food_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    food_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    food_allergens: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    food_calories_per_100g: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_protein_per_100g: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_fiber_per_100g: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_sugar_per_100g: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_carbs_per_100g: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_salt_per_100g: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_fat_per_100g:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    food_saturated_fat_per_100g: { 
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
});