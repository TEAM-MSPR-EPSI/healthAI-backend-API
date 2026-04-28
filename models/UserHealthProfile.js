const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserHealthProfile = sequelize.define("UserHealthProfile", {
    users_health_profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_health_profile_objective: {
      type: DataTypes.ENUM(
        "WEIGHT_LOSS",
        "MUSCLE_GAIN",
        "ENDURANCE",
        "FLEXIBILITY",
        "CARDIO"
      ), // adapte selon ton enum SQL exact
      allowNull: true,
    },

    user_health_profile_activity: {
      type: DataTypes.ENUM(
        "SEDENTARY",
        "LIGHT",
        "MODERATE",
        "ACTIVE",
        "VERY_ACTIVE"
      ), // adapte selon ton enum SQL exact
      allowNull: true,
    },

    user_health_profile_food_diet: {
      type: DataTypes.ENUM(
        "VEGAN",
        "VEGETARIAN",
        "LOW_CARB",
        "KETO",
        "BALANCED"
      ), // adapte selon ton enum SQL exact
      allowNull: true,
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
    tableName: "users_health_profile",
    timestamps: false,
  }
);

UserHealthProfile.associate = (models) => {
  UserHealthProfile.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = UserHealthProfile;