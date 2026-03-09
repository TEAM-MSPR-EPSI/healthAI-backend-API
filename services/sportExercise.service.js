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
                    include: [SportEquipment]
                }]
            });
            return sportExercises;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport exercises");
        }
    }

    static async getSportExerciseById(id) {
        try {
            const sportExercise = await SportExercise.findByPk(id, {
                include: [{
                    model: SportExerciseEquipment,
                    include: [SportEquipment]
                }]
            });
            return sportExercise;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport exercise");
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
