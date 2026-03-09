const SportProgramService = require("../services/sportProgram.service");

class SportProgramController {

    static async create(req, res) {
        try {
            const sportProgram = await SportProgramService.createSportProgram(req.body);
            res.status(201).json(sportProgram);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const sportPrograms = await SportProgramService.getSportPrograms();
            res.json(sportPrograms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const sportProgram = await SportProgramService.getSportProgramById(req.params.id);
            res.json(sportProgram);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const sportProgram = await SportProgramService.updateSportProgram(req.params.id, req.body);
            res.json(sportProgram);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const sportProgram = await SportProgramService.deleteSportProgram(req.params.id);
            res.json(sportProgram);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SportProgramController;
