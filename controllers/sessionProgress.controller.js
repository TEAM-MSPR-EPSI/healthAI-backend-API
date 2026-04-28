const SessionProgressService = require("../services/sessionProgress.service");

class SessionProgressController {

    static async create(req, res) {
        try {
            const sessionProgress = await SessionProgressService.createSessionProgress(req.body);
            res.status(201).json(sessionProgress);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const sessionProgresses = await SessionProgressService.getSessionProgresses();
            res.json(sessionProgresses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const sessionProgress = await SessionProgressService.getSessionProgressById(req.params.id);
            res.json(sessionProgress);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const sessionProgresses = await SessionProgressService.getSessionProgressesByUserId(req.params.userId);
            res.json(sessionProgresses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const sessionProgress = await SessionProgressService.updateSessionProgress(req.params.id, req.body);
            res.json(sessionProgress);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const sessionProgress = await SessionProgressService.deleteSessionProgress(req.params.id);
            res.json(sessionProgress);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SessionProgressController;
