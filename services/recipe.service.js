const Recipe = require("../models/Recipe");
const RecipeIngredient = require("../models/RecipeIngredient");
const Ingredient = require("../models/Ingredient");

class RecipeService {
    static async createRecipe(data) {
        try {
            const recipe = await Recipe.create(data);
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating recipe");
        }
    }

    static async getRecipes() {
        try {
            const recipes = await Recipe.findAll({
                include: [{
                    model: RecipeIngredient,
                    as: "RecipeIngredients",
                    include: [{
                        model: Ingredient,
                        as: "ingredient"
                    }]
                }]
            });
            return recipes;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }

    static async getRecipeById(id) {
        try {
            const recipe = await Recipe.findByPk(id, {
                include: [{
                    model: RecipeIngredient,
                    as: "RecipeIngredients",
                    include: [{
                        model: Ingredient,
                        as: "ingredient"
                    }]
                }]
            });
            return recipe;
        } catch (error) {
            console.error("Error fetching recipe:", error);
            throw error;
        }
    }

    static async updateRecipe(id, data) {
        try {
            const recipe = await Recipe.findByPk(id);
            if (!recipe) {
                throw new Error("Recipe not found");
            }
            await recipe.update(data);
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating recipe");
        }
    }

    static async deleteRecipe(id) {
        try {
            const recipe = await Recipe.findByPk(id);
            if (!recipe) {
                throw new Error("Recipe not found");
            }
            await recipe.destroy();
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting recipe");
        }
    }
}

module.exports = RecipeService;
