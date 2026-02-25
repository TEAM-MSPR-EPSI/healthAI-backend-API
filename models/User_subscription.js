const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User_subscription = sequelize.define('User_subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'subscription',
          key: 'subscription_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'user_id'
        }
    },
    subscription_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    subscription_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isAfterStart(value) {
            if (value && this.subscription_start_date && value <= this.subscription_start_date) {
              throw new Error('subscription_end_date must be greater than subscription_start_date');
            }
          }
        }
    }
});

module.exports = User_subscription;