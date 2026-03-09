const SportSession = require("../models/SportSession");
const SportSessionExercise = require("../models/SportSessionExercise");
const SportExercise = require("../models/SportExercise");

class SportSessionService {
    static async createSportSession(data) {
        try {
            const sportSession = await SportSession.create(data);
            return sportSession;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating sport session");
        }
    }

    static async getSportSessions() {
        try {
            const sportSessions = await SportSession.findAll({
                include: [{
                    model: SportSessionExercise,
                    include: [SportExercise]
                }]
            });
            return sportSessions;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport sessions");
        }
    }

    static async getSportSessionById(id) {
        try {
            const sportSession = await SportSession.findByPk(id, {
                include: [{
                    model: SportSessionExercise,
                    include: [SportExercise]
                }]
            });
            return sportSession;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching sport session");
        }
    }

    static async updateSportSession(id, data) {
        try {
            const sportSession = await SportSession.findByPk(id);
            if (!sportSession) {
                throw new Error("Sport session not found");
            }
            await sportSession.update(data);
            return sportSession;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating sport session");
        }
    }

    static async deleteSportSession(id) {
        try {
            const sportSession = await SportSession.findByPk(id);
            if (!sportSession) {
                throw new Error("Sport session not found");
            }
            await sportSession.destroy();
            return sportSession;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting sport session");
        }
    }
}

module.exports = SportSessionService;
