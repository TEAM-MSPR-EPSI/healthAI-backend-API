const RecipeIngredientService = require("../services/recipeIngredient.service");

class RecipeIngredientController {
    static async getRecipeIngredients(req, res) {
        try {
            const { recipeId } = req.params;
            const recipeIngredients = await RecipeIngredientService.getRecipeIngredients(recipeId);
            return res.json(recipeIngredients);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async addIngredient(req, res) {
        try {
            const { recipeId } = req.params;
            const { ingredientId, quantity } = req.body;

            if (!ingredientId) {
                return res.status(400).json({ error: "ingredientId is required" });
            }

            const recipeIngredient = await RecipeIngredientService.addIngredientToRecipe(
                recipeId,
                ingredientId,
                quantity
            );

            return res.status(201).json(recipeIngredient);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async removeIngredient(req, res) {
        try {
            const { recipeId, ingredientId } = req.params;
            const deleted = await RecipeIngredientService.removeIngredientFromRecipe(recipeId, ingredientId);
            return res.json(deleted);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateIngredient(req, res) {
        try {
            const { recipeId, ingredientId } = req.params;
            const { quantity } = req.body;

            if (quantity === undefined || quantity === null) {
                return res.status(400).json({ error: "quantity is required" });
            }

            const updated = await RecipeIngredientService.updateIngredientQuantity(recipeId, ingredientId, quantity);
            return res.json(updated);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAvailableIngredients(req, res) {
        try {
            const { recipeId } = req.params;
            const ingredients = await RecipeIngredientService.getAvailableIngredients(recipeId);
            return res.json(ingredients);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RecipeIngredientController;
