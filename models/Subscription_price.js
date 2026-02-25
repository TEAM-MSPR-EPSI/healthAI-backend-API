const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription_prince = sequelize.define('Subscription_price', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'subscription',
          key: 'subscription_id'
        }
    },
    pricing_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'subscription_pricing',
          key: 'pricing_id'
        }
    }
});

module.exports = Subscription_prince;