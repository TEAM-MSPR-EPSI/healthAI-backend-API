const SportProgram = require("../models/SportProgram");
const ProgramSportSession = require("../models/ProgramSportSession");
const SportSession = require("../models/SportSession");

class SportProgramService {
    static async createSportProgram(data) {
        try {
            const sportProgram = await SportProgram.create(data);
            return sportProgram;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating sport program");
        }
    }

    static async getSportPrograms() {
        try {
            const sportPrograms = await SportProgram.findAll({
                include: [{
                    model: ProgramSportSession,
                    as: "programSessions",
                    include: [{
                        model: SportSession,
                        as: "sport_session"
                    }]
                }]
            });
            return sportPrograms;
        } catch (error) {
            console.error("Error fetching sport programs:", error);
            throw error;
        }
    }

    static async getSportProgramById(id) {
        try {
            const sportProgram = await SportProgram.findByPk(id, {
                include: [{
                    model: ProgramSportSession,
                    as: "programSessions",
                    include: [{
                        model: SportSession,
                        as: "sport_session"
                    }]
                }]
            });
            return sportProgram;
        } catch (error) {
            console.error("Error fetching sport program:", error);
            throw error;
        }
    }

    static async updateSportProgram(id, data) {
        try {
            const sportProgram = await SportProgram.findByPk(id);
            if (!sportProgram) {
                throw new Error("Sport program not found");
            }
            await sportProgram.update(data);
            return sportProgram;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating sport program");
        }
    }

    static async deleteSportProgram(id) {
        try {
            const sportProgram = await SportProgram.findByPk(id);
            if (!sportProgram) {
                throw new Error("Sport program not found");
            }
            await sportProgram.destroy();
            return sportProgram;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting sport program");
        }
    }
}

module.exports = SportProgramService;
