const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IngredientAllergy = sequelize.define("IngredientAllergy", {
    ingredient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "ingredient",
        key: "ingredient_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
allergy: {
      type: DataTypes.ENUM('gluten', 'crustaceans', 'eggs', 'fish', 'peanuts',
        'soybeans', 'milk', 'nuts', 'celery', 'mustard',
        'sesame', 'sulphites', 'lupin', 'molluscs'),
      primaryKey: true,
      allowNull: false,
    },
},
{
    tableName: "ingredient_allergy",
    timestamps: false,
});

module.exports = IngredientAllergy;