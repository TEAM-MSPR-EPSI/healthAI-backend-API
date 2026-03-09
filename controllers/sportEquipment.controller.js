const SportEquipmentService = require("../services/sportEquipment.service");

class SportEquipmentController {

    static async create(req, res) {
        try {
            const sportEquipment = await SportEquipmentService.createSportEquipment(req.body);
            res.status(201).json(sportEquipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const sportEquipments = await SportEquipmentService.getSportEquipments();
            res.json(sportEquipments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const sportEquipment = await SportEquipmentService.getSportEquipmentById(req.params.id);
            res.json(sportEquipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const sportEquipment = await SportEquipmentService.updateSportEquipment(req.params.id, req.body);
            res.json(sportEquipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const sportEquipment = await SportEquipmentService.deleteSportEquipment(req.params.id);
            res.json(sportEquipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SportEquipmentController;
