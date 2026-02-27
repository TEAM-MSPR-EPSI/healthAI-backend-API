const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserBiometric = sequelize.define("UserBiometric", {
    biometric_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    biometric_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    biometric_sleep: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    biometric_steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    biometric_heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    biometric_weight: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_biometric",
    timestamps: false,
  }
);

UserBiometric.associate = (models) => {
  UserBiometric.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};


module.exports = UserBiometric;