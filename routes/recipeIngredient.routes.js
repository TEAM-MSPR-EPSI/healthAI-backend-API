const express = require("express");
const router = express.Router();
const RecipeIngredientController = require("../controllers/recipeIngredient.controller");

router.get("/:recipeId/ingredients", RecipeIngredientController.getRecipeIngredients);
router.post("/:recipeId/ingredients", RecipeIngredientController.addIngredient);
router.delete("/:recipeId/ingredients/:ingredientId", RecipeIngredientController.removeIngredient);
router.put("/:recipeId/ingredients/:ingredientId", RecipeIngredientController.updateIngredient);
router.get("/:recipeId/available-ingredients", RecipeIngredientController.getAvailableIngredients);

module.exports = router;
