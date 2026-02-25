const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session_exercise = sequelize.define('Exercise_session', {
    exercise_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'exercise',
          key: 'exercise_id'
        }
      },
      session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'session',
          key: 'session_id'
        }
      },
      exercise_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      }
}); 

module.exports = Session_exercise