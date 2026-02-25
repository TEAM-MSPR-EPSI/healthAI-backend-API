const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Program = sequelize.define('Program', {
    program_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    program_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    program_goal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          isIn: [
            [
              'weight loss',
              'muscle gain',
              'toning',
              'endurance',
              'strength',
              'flexibility',
              'wellness',
              'rehabilitation'
            ]
          ]
        }
    },
    program_session_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
    },
    program_duration_days: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 1
        }
    },
    program_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
});

module.exports = Program;