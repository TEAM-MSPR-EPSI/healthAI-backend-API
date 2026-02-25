const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User_tracking = sequelize.define('User_tracking', {
    tracking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tracking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    tracking_weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0.01
        }
    },
    tracking_sleep_hours: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          min: 0,
          max: 24
        }
    },
    tracking_avg_heart_rate: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          min: 1
        }
    },
    tracking_steps_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
    },
});

module.exports = User_tracking;