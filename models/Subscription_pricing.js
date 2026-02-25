const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscrption_pricing = sequelize.define('Subscription_pricing', {
    pricing_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pricing_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    pricing_amount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0
        }
    },
    pricing_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false

    },
    pricing_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isAfterStart(value){
                if (value && this.pricing_start_date && value <= this.pricing_start_date) {
                    throw new Error('pricing_end_date must be greater than pricing_start_date');
                }
            }
        }
    },
});

module.exports = Subscrption_pricing;