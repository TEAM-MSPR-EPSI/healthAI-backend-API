const express = require("express");
const router = express.Router();
const SportExerciseController = require("../controllers/sportExercise.controller");

router.post("/", SportExerciseController.create);
router.get("/", SportExerciseController.getAll);
router.get("/:id", SportExerciseController.getById);
router.put("/:id", SportExerciseController.update);
router.delete("/:id", SportExerciseController.delete);

module.exports = router;
