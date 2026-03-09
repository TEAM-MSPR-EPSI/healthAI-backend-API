const SportSessionService = require("../services/sportSession.service");

class SportSessionController {

    static async create(req, res) {
        try {
            const sportSession = await SportSessionService.createSportSession(req.body);
            res.status(201).json(sportSession);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const sportSessions = await SportSessionService.getSportSessions();
            res.json(sportSessions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const sportSession = await SportSessionService.getSportSessionById(req.params.id);
            res.json(sportSession);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const sportSession = await SportSessionService.updateSportSession(req.params.id, req.body);
            res.json(sportSession);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const sportSession = await SportSessionService.deleteSportSession(req.params.id);
            res.json(sportSession);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SportSessionController;
