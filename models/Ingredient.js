const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ingredient = sequelize.define("Ingredient", {
    ingredient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ingredient_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    ingredient_type: {
      type: DataTypes.ENUM('vegetable', 'fruit', 'meat', 'fish', 'dairy', 'grain', 'legume', 'other'),
      allowNull: false,
    },
        ingredient_energy_100g: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: true,
    },
    ingredient_protein_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_fiber_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_sugars_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_carbohydrate_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_salt_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_fats_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    ingredient_saturated_fats_100g: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
},
{
    tableName: "ingredient",
    timestamps: false,
});

module.exports = Ingredient;