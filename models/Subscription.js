const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Subscription = sequelize.define("Subscription", {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    subscription_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },

    subscription_name: {
        type: DataTypes.ENUM("BASIC", "PREMIUM", "ENTERPRISE"), // adapte selon ton enum SQL
        allowNull: false,
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
    tableName: "subscription",
    timestamps: false,
});

Subscription.associate = (models) => {
    Subscription.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company",
    });
};

module.exports = Subscription;
