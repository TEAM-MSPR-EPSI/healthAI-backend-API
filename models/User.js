const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
  user_password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  user_lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  user_country: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  user_phone: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  user_height: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      min: 0.01,
    },
  },
  user_weight: {
    type: DataTypes.DECIMAL(5, 2),
    validate: {
      min: 0.01,
    },
  },
}, {
  tableName: "user",
  timestamps: false,
});

// Relation
User.belongsTo(Company, {
  foreignKey: "company_id",
});

Company.hasMany(User, {
  foreignKey: "company_id",
});

module.exports = User;