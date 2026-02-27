const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_username: {
    type: DataTypes.STRING(50),
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
  user_birth : {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  user_role: {
    type: DataTypes.ENUM('admin', 'user', 'company_admin'),
    allowNull: false,
    defaultValue: "user",
  },
  user_gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: false,
  },
  user_city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  user_country: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  user_phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  user_weight: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: false,
  },
  user_hashpwd: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_inscription: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  sport_program_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "sport_program",
        key: "sport_program_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "company",
        key: "company_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
},
{
  tableName: "user",
  timestamps: false,
});

User.associate = (models) => {
  User.belongsTo(models.SportProgram, {
    foreignKey: "sport_program_id",
    as: "sport_program",
  });

  User.belongsTo(models.Company, {
    foreignKey: "company_id",
    as: "company",
  });
};


module.exports = User;