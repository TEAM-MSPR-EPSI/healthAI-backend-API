const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company_subscription = sequelize.define('Company_subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'subscription',
          key: 'subscription_id'
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'company',
          key: 'company_id'
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

module.exports = Company_subscription;