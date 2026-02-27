const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Consume = sequelize.define("Consume", {
    consume_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredient_quantity: {
        type: DataTypes.DECIMAL(6, 1),
        allowNull: false
    },
    consume_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},
    {
      tableName: "consume",
      timestamps: false
    }
  );

  Consume.associate = (models) => {
    Consume.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    Consume.belongsTo(models.Ingredient, {
      foreignKey: "ingredient_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

module.exports = Consume;