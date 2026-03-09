const SessionProgress = require("../models/SessionProgress");
const SportSession = require("../models/SportSession");
const User = require("../models/User");

class SessionProgressService {
    static async createSessionProgress(data) {
        try {
            const sessionProgress = await SessionProgress.create(data);
            return sessionProgress;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating session progress");
        }
    }

    static async getSessionProgresses() {
        try {
            const sessionProgresses = await SessionProgress.findAll({
                include: [SportSession, User]
            });
            return sessionProgresses;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching session progresses");
        }
    }

    static async getSessionProgressById(id) {
        try {
            const sessionProgress = await SessionProgress.findByPk(id, {
                include: [SportSession, User]
            });
            return sessionProgress;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching session progress");
        }
    }

    static async getSessionProgressesByUserId(userId) {
        try {
            const sessionProgresses = await SessionProgress.findAll({
                where: { user_id: userId },
                include: [SportSession, User],
                order: [['session_progress_start', 'DESC']]
            });
            return sessionProgresses;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching session progresses");
        }
    }

    static async updateSessionProgress(id, data) {
        try {
            const sessionProgress = await SessionProgress.findByPk(id);
            if (!sessionProgress) {
                throw new Error("Session progress not found");
            }
            await sessionProgress.update(data);
            return sessionProgress;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating session progress");
        }
    }

    static async deleteSessionProgress(id) {
        try {
            const sessionProgress = await SessionProgress.findByPk(id);
            if (!sessionProgress) {
                throw new Error("Session progress not found");
            }
            await sessionProgress.destroy();
            return sessionProgress;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting session progress");
        }
    }
}

module.exports = SessionProgressService;
