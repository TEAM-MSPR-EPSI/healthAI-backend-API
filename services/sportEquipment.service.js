const SportEquipment = require("../models/SportEquipment");

class SportEquipmentService {
    static async createSportEquipment(data) {
        try {
            const sportEquipment = await SportEquipment.create(data);
            return sportEquipment;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating sport equipment");
        }
    }

    static async getSportEquipments() {
        try {
            const sportEquipments = await SportEquipment.findAll();
            return sportEquipments;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport equipments");
        }
    }

    static async getSportEquipmentById(id) {
        try {
            const sportEquipment = await SportEquipment.findByPk(id);
            return sportEquipment;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport equipment");
        }
    }

    static async updateSportEquipment(id, data) {
        try {
            const sportEquipment = await SportEquipment.findByPk(id);
            if (!sportEquipment) {
                throw new Error("Sport equipment not found");
            }
            await sportEquipment.update(data);
            return sportEquipment;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating sport equipment");
        }
    }

    static async deleteSportEquipment(id) {
        try {
            const sportEquipment = await SportEquipment.findByPk(id);
            if (!sportEquipment) {
                throw new Error("Sport equipment not found");
            }
            await sportEquipment.destroy();
            return sportEquipment;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting sport equipment");
        }
    }
}

module.exports = SportEquipmentService;
