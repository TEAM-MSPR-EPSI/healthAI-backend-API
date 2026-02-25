const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define('Exercise', {
    exercise_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    exercise_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    exercise_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isIn: [
            [
              'cardio',
              'strength training',
              'stretching',
              'yoga',
              'hiit',
              'pilates',
              'crossfit',
              'swimming'
            ]
          ]
        }

    },
    exercise_difficulty : {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['beginner', 'intermediate', 'advanced', 'expert']]
        }
    },
    exercise_duration_minutes: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 1
        }
    },
    exercise_calories_burned: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 1
        }
    },
    exercise_target_muscles: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    exercise_demo_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    exercise_instructions: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'equipment',
          key: 'equipment_id'
        }
    }
});

module.exports = Exercise;