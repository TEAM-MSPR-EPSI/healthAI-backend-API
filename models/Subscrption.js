const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription = sequelize.define('Subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subscription_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    subscription_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    subscription_auto_renewal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    subscription_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = Subscription;