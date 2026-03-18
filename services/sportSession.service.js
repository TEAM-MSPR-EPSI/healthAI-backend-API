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
                    as: "sessionExercises",
                    include: [{
                        model: SportExercise,
                        as: "sportExercise"
                    }]
                }]
            });
            return sportSessions;
        } catch (error) {
            console.error("Error fetching sport sessions:", error);
            throw error;
        }
    }

    static async getSportSessionById(id) {
        try {
            const sportSession = await SportSession.findByPk(id, {
                include: [{
                    model: SportSessionExercise,
                    as: "sessionExercises",
                    include: [{
                        model: SportExercise,
                        as: "sportExercise"
                    }]
                }]
            });
            return sportSession;
        } catch (error) {
            console.error("Error fetching sport session:", error);
            throw error;
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
