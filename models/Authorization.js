const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Authorization = sequelize.define("Authorization", {
    authorization_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    authorization_type: {
      type: DataTypes.ENUM('Freemium', 'Premium', 'Premium+'),
      allowNull: false,
      unique: true,
    },
},
{
    tableName: "authorization_",
    timestamps: false,
});

module.exports = Authorization;