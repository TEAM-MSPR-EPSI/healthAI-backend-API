const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe.controller");

router.post("/", RecipeController.create);
router.get("/", RecipeController.getAll);
router.get("/:id", RecipeController.getById);
router.put("/:id", RecipeController.update);
router.delete("/:id", RecipeController.delete);

module.exports = router;
