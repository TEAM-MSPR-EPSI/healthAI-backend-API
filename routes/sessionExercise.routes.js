const express = require("express");
const router = express.Router();
const SessionExerciseController = require("../controllers/sessionExercise.controller");

router.post("/:sessionId/exercises", SessionExerciseController.addExerciseToSession);
router.delete("/:sessionId/exercises/:exerciseId", SessionExerciseController.removeExerciseFromSession);
router.put("/:sessionId/exercises/:exerciseId", SessionExerciseController.updateExerciseRank);
router.get("/:sessionId/available-exercises", SessionExerciseController.getAvailableExercises);

module.exports = router;