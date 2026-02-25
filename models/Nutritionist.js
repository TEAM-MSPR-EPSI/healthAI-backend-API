const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nutritionist = sequelize.define('Nutritionist', {
    nutritionist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nutritionist_lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nutritionist_firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nutritionist_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }

    },
    nutritionist_phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true

    },
    nutritionist_gender: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['Male', 'Female', 'Other']]
        }

    }
});

module.exports = Nutritionist;