const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise_session = sequelize.define('User_session', {
    exercise_session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    exercise_session_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exercise_session_end: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isAfterStart(value) {
            if (value && this.exercise_session_start && value <= this.exercise_session_start) {
              throw new Error('exercise_session_end must be greater than exercise_session_start');
            }
          }
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
    },
    session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'session',
          key: 'session_id'
        }
    },
     exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'exercise',
          key: 'exercise_id'
        }
    }
});

module.exports = Exercise_session;