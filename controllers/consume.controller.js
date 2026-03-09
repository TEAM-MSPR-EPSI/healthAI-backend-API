const ConsumeService = require("../services/consume.service");

class ConsumeController {

    static async create(req, res) {
        try {
            const consume = await ConsumeService.createConsume(req.body);
            res.status(201).json(consume);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const consumes = await ConsumeService.getConsumes();
            res.json(consumes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const consume = await ConsumeService.getConsumeById(req.params.id);
            res.json(consume);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const consumes = await ConsumeService.getConsumesByUserId(req.params.userId);
            res.json(consumes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const consume = await ConsumeService.updateConsume(req.params.id, req.body);
            res.json(consume);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const consume = await ConsumeService.deleteConsume(req.params.id);
            res.json(consume);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ConsumeController;
