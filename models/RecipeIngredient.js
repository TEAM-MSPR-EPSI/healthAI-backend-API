const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RecipeIngredient = sequelize.define("RecipeIngredient", {
    recipe_ingredient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "recipe",
        key: "recipe_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ingredient",
        key: "ingredient_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    ingredient_quantity: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: false,
    },
  },
  {
    tableName: "recipe_ingredient",
    timestamps: false,
  }
);

RecipeIngredient.associate = (models) => {
  RecipeIngredient.belongsTo(models.Recipe, {
    foreignKey: "recipe_id",
    as: "recipe",
  });

  RecipeIngredient.belongsTo(models.Ingredient, {
    foreignKey: "ingredient_id",
    as: "ingredient",
  });
};

module.exports = RecipeIngredient;