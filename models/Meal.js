const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meal = sequelize.define('Meal', {
    meal_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    meal_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    meal_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    meal_preparation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
});

module.exports = Meal;