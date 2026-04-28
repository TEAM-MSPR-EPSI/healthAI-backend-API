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
                include: [{
                    model: IngredientAllergy,
                    as: "allergies"
                }]
            });
            return ingredients;
        } catch (error) {
            console.error("Error fetching ingredients:", error);
            throw error;
        }
    }

    static async getIngredientById(id) {
        try {
            const ingredient = await Ingredient.findByPk(id, {
                include: [{
                    model: IngredientAllergy,
                    as: "allergies"
                }]
            });
            return ingredient;
        } catch (error) {
            console.error("Error fetching ingredient:", error);
            throw error;
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
