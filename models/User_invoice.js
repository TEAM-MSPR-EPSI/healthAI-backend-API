const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User_invoice = sequelize.define('User_invoice', {
    invoice_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    invoice_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'subscription',
          key: 'subscription_id'
        }
    }
});

module.exports = User_invoice;