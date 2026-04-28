const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Recipe = sequelize.define("Recipe", {
    recipe_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    recipe_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    recipe_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    recipe_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    recipe_preparation : {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    recipe_type: {
        type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'pleasure', 'muscle_gain', 'weight_loss'),
        allowNull: true,
    },

},
{
    tableName: "recipe",
    timestamps: false,
});

Recipe.associate = (models) => {
    Recipe.hasMany(models.RecipeIngredient, {
        foreignKey: "recipe_id",
        as: "RecipeIngredients",
    });
};

module.exports = Recipe;