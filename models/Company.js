const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Company = sequelize.define("Company", {
  company_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  company_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  company_inscription: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
    tableName: "company",
    timestamps: false,
});

module.exports = Company;