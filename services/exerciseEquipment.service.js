const { Op } = require("sequelize");

const SportExercise = require("../models/SportExercise");
const SportEquipment = require("../models/SportEquipment");
const SportExerciseEquipment = require("../models/SportExerciseEquipment");

class ExerciseEquipmentService {
  static async getExerciseEquipments(exerciseId) {
    try {
      const sportExercise = await SportExercise.findByPk(exerciseId);
      if (!sportExercise) {
        throw new Error("Sport exercise not found");
      }

      const exerciseEquipments = await SportExerciseEquipment.findAll({
        where: { sport_exercise_id: exerciseId },
        include: [{
          model: SportEquipment,
          as: "sportEquipment",
        }],
      });

      return exerciseEquipments;
    } catch (error) {
      console.error("Error fetching exercise equipments:", error);
      throw error;
    }
  }

  static async addEquipmentToExercise(exerciseId, equipmentId) {
    try {
      const sportExercise = await SportExercise.findByPk(exerciseId);
      if (!sportExercise) {
        throw new Error("Sport exercise not found");
      }

      const sportEquipment = await SportEquipment.findByPk(equipmentId);
      if (!sportEquipment) {
        throw new Error("Sport equipment not found");
      }

      const existing = await SportExerciseEquipment.findOne({
        where: {
          sport_exercise_id: exerciseId,
          sport_equipment_id: equipmentId,
        },
      });

      if (existing) {
        throw new Error("Equipment already linked to exercise");
      }

      return await SportExerciseEquipment.create({
        sport_exercise_id: exerciseId,
        sport_equipment_id: equipmentId,
      });
    } catch (error) {
      console.error("Error adding equipment to exercise:", error);
      throw error;
    }
  }

  static async removeEquipmentFromExercise(exerciseId, equipmentId) {
    try {
      const exerciseEquipment = await SportExerciseEquipment.findOne({
        where: {
          sport_exercise_id: exerciseId,
          sport_equipment_id: equipmentId,
        },
      });

      if (!exerciseEquipment) {
        throw new Error("Exercise equipment link not found");
      }

      await exerciseEquipment.destroy();
      return exerciseEquipment;
    } catch (error) {
      console.error("Error removing equipment from exercise:", error);
      throw error;
    }
  }

  static async getAvailableEquipment(exerciseId) {
    try {
      const sportExercise = await SportExercise.findByPk(exerciseId);
      if (!sportExercise) {
        throw new Error("Sport exercise not found");
      }

      const exerciseEquipments = await SportExerciseEquipment.findAll({
        where: { sport_exercise_id: exerciseId },
        attributes: ["sport_equipment_id"],
      });

      const usedEquipmentIds = exerciseEquipments
        .map((item) => item.sport_equipment_id)
        .filter((id) => id !== null && id !== undefined);

      const where = usedEquipmentIds.length
        ? { sport_equipment_id: { [Op.notIn]: usedEquipmentIds } }
        : undefined;

      return await SportEquipment.findAll({ where });
    } catch (error) {
      console.error("Error fetching available equipment:", error);
      throw error;
    }
  }
}

module.exports = ExerciseEquipmentService;