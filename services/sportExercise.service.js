const SportExercise = require("../models/SportExercise");
const SportExerciseEquipment = require("../models/SportExerciseEquipment");
const SportEquipment = require("../models/SportEquipment");

class SportExerciseService {
    static async createSportExercise(data) {
        try {
            const sportExercise = await SportExercise.create(data);
            return sportExercise;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating sport exercise");
        }
    }

    static async getSportExercises() {
        try {
            const sportExercises = await SportExercise.findAll({
                include: [{
                    model: SportExerciseEquipment,
                    as: "exerciseEquipments",
                    include: [{
                        model: SportEquipment,
                        as: "sportEquipment"
                    }]
                }]
            });
            return sportExercises;
        } catch (error) {
            console.error("Error fetching sport exercises:", error);
            throw error;
        }
    }

    static async getSportExerciseById(id) {
        try {
            const sportExercise = await SportExercise.findByPk(id, {
                include: [{
                    model: SportExerciseEquipment,
                    as: "exerciseEquipments",
                    include: [{
                        model: SportEquipment,
                        as: "sportEquipment"
                    }]
                }]
            });
            return sportExercise;
        } catch (error) {
            console.error("Error fetching sport exercise:", error);
            throw error;
        }
    }

    static async updateSportExercise(id, data) {
        try {
            const sportExercise = await SportExercise.findByPk(id);
            if (!sportExercise) {
                throw new Error("Sport exercise not found");
            }
            await sportExercise.update(data);
            return sportExercise;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating sport exercise");
        }
    }

    static async deleteSportExercise(id) {
        try {
            const sportExercise = await SportExercise.findByPk(id);
            if (!sportExercise) {
                throw new Error("Sport exercise not found");
            }
            await sportExercise.destroy();
            return sportExercise;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting sport exercise");
        }
    }
}

module.exports = SportExerciseService;
