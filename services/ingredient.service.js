const Ingredient = require("../models/Ingredient");
const IngredientAllergy = require("../models/IngredientAllergy");

class IngredientService {
    static async createIngredient(data) {
        try {
            const ingredient = await Ingredient.create(data);
            return ingredient;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating ingredient");
        }
    }

    static async getIngredients() {
        try {
            const ingredients = await Ingredient.findAll({
                include: [IngredientAllergy]
            });
            return ingredients;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching ingredients");
        }
    }

    static async getIngredientById(id) {
        try {
            const ingredient = await Ingredient.findByPk(id, {
                include: [IngredientAllergy]
            });
            return ingredient;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching ingredient");
        }
    }

    static async updateIngredient(id, data) {
        try {
            const ingredient = await Ingredient.findByPk(id);
            if (!ingredient) {
                throw new Error("Ingredient not found");
            }
            await ingredient.update(data);
            return ingredient;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating ingredient");
        }
    }

    static async deleteIngredient(id) {
        try {
            const ingredient = await Ingredient.findByPk(id);
            if (!ingredient) {
                throw new Error("Ingredient not found");
            }
            await ingredient.destroy();
            return ingredient;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting ingredient");
        }
    }
}

module.exports = IngredientService;
