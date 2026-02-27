const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SportEquipment = sequelize.define("SportEquipment", {
    sport_equipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sport_equipment_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
},
{
    tableName: "sport_equipment",
    timestamps: false,
}); 

module.exports = SportEquipment;