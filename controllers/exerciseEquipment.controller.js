const ExerciseEquipmentService = require("../services/exerciseEquipment.service");

class ExerciseEquipmentController {
  static async getExerciseEquipments(req, res) {
    try {
      const exerciseId = Number(req.params.exerciseId);
      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      const items = await ExerciseEquipmentService.getExerciseEquipments(exerciseId);
      return res.json(items);
    } catch (error) {
      if (error?.message === "Sport exercise not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async addEquipment(req, res) {
    try {
      const exerciseId = Number(req.params.exerciseId);
      const equipmentId = Number(req.body?.equipmentId);

      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
        return res.status(400).json({ error: "Invalid equipmentId" });
      }

      const created = await ExerciseEquipmentService.addEquipmentToExercise(exerciseId, equipmentId);
      return res.status(201).json(created);
    } catch (error) {
      if (error?.message === "Sport exercise not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Sport equipment not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Equipment already linked to exercise") {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async removeEquipment(req, res) {
    try {
      const exerciseId = Number(req.params.exerciseId);
      const equipmentId = Number(req.params.equipmentId);

      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      if (!Number.isInteger(equipmentId) || equipmentId <= 0) {
        return res.status(400).json({ error: "Invalid equipmentId" });
      }

      await ExerciseEquipmentService.removeEquipmentFromExercise(exerciseId, equipmentId);
      return res.status(204).send();
    } catch (error) {
      if (error?.message === "Exercise equipment link not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAvailableEquipment(req, res) {
    try {
      const exerciseId = Number(req.params.exerciseId);
      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      const items = await ExerciseEquipmentService.getAvailableEquipment(exerciseId);
      return res.json(items);
    } catch (error) {
      if (error?.message === "Sport exercise not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ExerciseEquipmentController;