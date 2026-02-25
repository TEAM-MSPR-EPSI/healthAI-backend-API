const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
    session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    session_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Program',
          key: 'program_id',
        },
      },
});

module.exports = Session;