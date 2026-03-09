const SportExerciseService = require("../services/sportExercise.service");

class SportExerciseController {

    static async create(req, res) {
        try {
            const sportExercise = await SportExerciseService.createSportExercise(req.body);
            res.status(201).json(sportExercise);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const sportExercises = await SportExerciseService.getSportExercises();
            res.json(sportExercises);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const sportExercise = await SportExerciseService.getSportExerciseById(req.params.id);
            res.json(sportExercise);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const sportExercise = await SportExerciseService.updateSportExercise(req.params.id, req.body);
            res.json(sportExercise);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const sportExercise = await SportExerciseService.deleteSportExercise(req.params.id);
            res.json(sportExercise);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SportExerciseController;
