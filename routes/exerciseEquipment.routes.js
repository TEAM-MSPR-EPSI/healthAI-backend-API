const express = require("express");
const router = express.Router();
const ExerciseEquipmentController = require("../controllers/exerciseEquipment.controller");

router.get("/:exerciseId/equipment", ExerciseEquipmentController.getExerciseEquipments);
router.get("/:exerciseId/available-equipment", ExerciseEquipmentController.getAvailableEquipment);
router.post("/:exerciseId/equipment", ExerciseEquipmentController.addEquipment);
router.delete("/:exerciseId/equipment/:equipmentId", ExerciseEquipmentController.removeEquipment);

module.exports = router;