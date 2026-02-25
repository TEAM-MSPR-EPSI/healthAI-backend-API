const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follow_program = sequelize.define('Follow_program', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'user_id'
        }
    },
    program_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'program',
          key: 'program_id'
        }
    },
    program_enrollment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Follow_program;