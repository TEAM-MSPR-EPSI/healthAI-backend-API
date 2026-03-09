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
                    include: [Ingredient]
                }]
            });
            return recipes;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching recipes");
        }
    }

    static async getRecipeById(id) {
        try {
            const recipe = await Recipe.findByPk(id, {
                include: [{
                    model: RecipeIngredient,
                    include: [Ingredient]
                }]
            });
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching recipe");
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
