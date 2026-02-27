const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserSubscription = sequelize.define("UserSubscription", {
    user_subscription_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user_",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "subscription",
        key: "subscription_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    user_subscription_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_subscription_end: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    user_subscription_is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "user_subscription",
    timestamps: false,
  }
);

UserSubscription.associate = (models) => {
  UserSubscription.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });

  UserSubscription.belongsTo(models.Subscription, {
    foreignKey: "subscription_id",
    as: "subscription",
  });
};

module.exports = UserSubscription;