const RecipeService = require("../services/recipe.service");

class RecipeController {

    static async create(req, res) {
        try {
            const recipe = await RecipeService.createRecipe(req.body);
            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const recipes = await RecipeService.getRecipes();
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const recipe = await RecipeService.getRecipeById(req.params.id);
            res.json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const recipe = await RecipeService.updateRecipe(req.params.id, req.body);
            res.json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const recipe = await RecipeService.deleteRecipe(req.params.id);
            res.json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RecipeController;
