const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportSession = sequelize.define("SportSession", {
    sport_session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sport_session_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
},
{
    tableName: "sport_session",
    timestamps: false,
});

module.exports = SportSession;