const IngredientService = require("../services/ingredient.service");

class IngredientController {

    static async create(req, res) {
        try {
            const ingredient = await IngredientService.createIngredient(req.body);
            res.status(201).json(ingredient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const ingredients = await IngredientService.getIngredients();
            res.json(ingredients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const ingredient = await IngredientService.getIngredientById(req.params.id);
            res.json(ingredient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const ingredient = await IngredientService.updateIngredient(req.params.id, req.body);
            res.json(ingredient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const ingredient = await IngredientService.deleteIngredient(req.params.id);
            res.json(ingredient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = IngredientController;
