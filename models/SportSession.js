const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportSession = sequelize.define("SportSession", {
    sport_session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sport_session_rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sport_session_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    tableName: "sport_session",
    timestamps: false,
});

module.exports = SportSession;