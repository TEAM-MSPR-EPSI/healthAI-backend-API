const Consume = require("../models/Consume");
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");

class ConsumeService {
    static async createConsume(data) {
        try {
            const consume = await Consume.create(data);
            return consume;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating consume");
        }
    }

    static async getConsumes() {
        try {
            const consumes = await Consume.findAll({
                include: [User, Ingredient]
            });
            return consumes;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching consumes");
        }
    }

    static async getConsumeById(id) {
        try {
            const consume = await Consume.findByPk(id, {
                include: [User, Ingredient]
            });
            return consume;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching consume");
        }
    }

    static async getConsumesByUserId(userId) {
        try {
            const consumes = await Consume.findAll({
                where: { user_id: userId },
                include: [User, Ingredient],
                order: [['consume_date', 'DESC']]
            });
            return consumes;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching consumes");
        }
    }

    static async updateConsume(id, data) {
        try {
            const consume = await Consume.findByPk(id);
            if (!consume) {
                throw new Error("Consume not found");
            }
            await consume.update(data);
            return consume;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating consume");
        }
    }

    static async deleteConsume(id) {
        try {
            const consume = await Consume.findByPk(id);
            if (!consume) {
                throw new Error("Consume not found");
            }
            await consume.destroy();
            return consume;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting consume");
        }
    }
}

module.exports = ConsumeService;
