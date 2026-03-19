const { Op } = require("sequelize");

const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const RecipeIngredient = require("../models/RecipeIngredient");

class RecipeIngredientService {
    static async getRecipeIngredients(recipeId) {
        try {
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                throw new Error("Recipe not found");
            }

            const recipeIngredients = await RecipeIngredient.findAll({
                where: { recipe_id: recipeId },
                include: [{
                    model: Ingredient,
                    as: "ingredient",
                }],
            });

            return recipeIngredients;
        } catch (error) {
            console.error("Error fetching recipe ingredients:", error);
            throw error;
        }
    }

    static async addIngredientToRecipe(recipeId, ingredientId, quantity) {
        try {
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                throw new Error("Recipe not found");
            }

            const ingredient = await Ingredient.findByPk(ingredientId);
            if (!ingredient) {
                throw new Error("Ingredient not found");
            }

            const existing = await RecipeIngredient.findOne({
                where: {
                    recipe_id: recipeId,
                    ingredient_id: ingredientId,
                },
            });

            if (existing) {
                throw new Error("Ingredient already linked to recipe");
            }

            const ingredientQuantity = quantity === undefined || quantity === null ? 0 : quantity;

            const recipeIngredient = await RecipeIngredient.create({
                recipe_id: recipeId,
                ingredient_id: ingredientId,
                ingredient_quantity: ingredientQuantity,
            });

            return recipeIngredient;
        } catch (error) {
            console.error("Error adding ingredient to recipe:", error);
            throw error;
        }
    }

    static async removeIngredientFromRecipe(recipeId, ingredientId) {
        try {
            const recipeIngredient = await RecipeIngredient.findOne({
                where: {
                    recipe_id: recipeId,
                    ingredient_id: ingredientId,
                },
            });

            if (!recipeIngredient) {
                throw new Error("RecipeIngredient not found");
            }

            await recipeIngredient.destroy();
            return recipeIngredient;
        } catch (error) {
            console.error("Error removing ingredient from recipe:", error);
            throw error;
        }
    }

    static async updateIngredientQuantity(recipeId, ingredientId, quantity) {
        try {
            const recipeIngredient = await RecipeIngredient.findOne({
                where: {
                    recipe_id: recipeId,
                    ingredient_id: ingredientId,
                },
            });

            if (!recipeIngredient) {
                throw new Error("RecipeIngredient not found");
            }

            await recipeIngredient.update({ ingredient_quantity: quantity });
            return recipeIngredient;
        } catch (error) {
            console.error("Error updating ingredient quantity:", error);
            throw error;
        }
    }

    static async getAvailableIngredients(recipeId) {
        try {
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                throw new Error("Recipe not found");
            }

            const recipeIngredients = await RecipeIngredient.findAll({
                where: { recipe_id: recipeId },
                attributes: ["ingredient_id"],
            });

            const usedIngredientIds = recipeIngredients
                .map((ri) => ri.ingredient_id)
                .filter((id) => id !== null && id !== undefined);

            const where = usedIngredientIds.length
                ? { ingredient_id: { [Op.notIn]: usedIngredientIds } }
                : undefined;

            const ingredients = await Ingredient.findAll({ where });
            return ingredients;
        } catch (error) {
            console.error("Error fetching available ingredients:", error);
            throw error;
        }
    }
}

module.exports = RecipeIngredientService;
