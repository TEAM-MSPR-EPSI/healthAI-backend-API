const express = require("express");
const router = express.Router();
const IngredientController = require("../controllers/ingredient.controller");

router.post("/", IngredientController.create);
router.get("/", IngredientController.getAll);
router.get("/:id", IngredientController.getById);
router.put("/:id", IngredientController.update);
router.delete("/:id", IngredientController.delete);

module.exports = router;
