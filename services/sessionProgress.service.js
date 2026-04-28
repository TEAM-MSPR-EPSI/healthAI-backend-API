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
                include: [
                    {
                        model: SportSession,
                        as: "sport_session"
                    },
                    {
                        model: User,
                        as: "user"
                    }
                ]
            });
            return sessionProgresses;
        } catch (error) {
            console.error("Error fetching session progresses:", error);
            throw error;
        }
    }

    static async getSessionProgressById(id) {
        try {
            const sessionProgress = await SessionProgress.findByPk(id, {
                include: [
                    {
                        model: SportSession,
                        as: "sport_session"
                    },
                    {
                        model: User,
                        as: "user"
                    }
                ]
            });
            return sessionProgress;
        } catch (error) {
            console.error("Error fetching session progress:", error);
            throw error;
        }
    }

    static async getSessionProgressesByUserId(userId) {
        try {
            const sessionProgresses = await SessionProgress.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: SportSession,
                        as: "sport_session"
                    },
                    {
                        model: User,
                        as: "user"
                    }
                ],
                order: [['session_progress_start', 'DESC']]
            });
            return sessionProgresses;
        } catch (error) {
            console.error("Error fetching session progresses:", error);
            throw error;
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
