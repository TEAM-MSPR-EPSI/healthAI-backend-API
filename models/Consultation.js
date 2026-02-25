const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consultation = sequelize.define('Consultation', {
    consultation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    consultation_video_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    consultation_report: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    consultation_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
      },
    nutritionist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Nutritionist',
          key: 'nutritionist_id',
        },
      },
});

module.exports = Consultation;