const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubscriptionAuthorization = sequelize.define("SubscriptionAuthorization", {
    subscription_authorization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authorization_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
      tableName: "subscription_authorization",
      timestamps: false
    }
);

  SubscriptionAuthorization.associate = (models) => {
    SubscriptionAuthorization.belongsTo(models.Subscription, {
      foreignKey: "subscription_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    SubscriptionAuthorization.belongsTo(models.Authorization, {
      foreignKey: "authorization_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

module.exports = SubscriptionAuthorization;
