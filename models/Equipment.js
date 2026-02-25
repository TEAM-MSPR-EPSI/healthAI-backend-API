const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipment = sequelize.define('Equipment', {
    Equipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Equipment_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
});

module.exports = Equipment;