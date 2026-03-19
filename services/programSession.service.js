const SportProgram = require("../models/SportProgram");
const SportSession = require("../models/SportSession");
const ProgramSportSession = require("../models/ProgramSportSession");
const { Op } = require("sequelize");

class ProgramSessionService {
  static async addSessionToProgram({ programId, sessionId, rank }) {
    try {
      const sportProgram = await SportProgram.findByPk(programId);
      if (!sportProgram) {
        throw new Error("Sport program not found");
      }

      const sportSession = await SportSession.findByPk(sessionId);
      if (!sportSession) {
        throw new Error("Sport session not found");
      }

      const existing = await ProgramSportSession.findOne({
        where: {
          sport_program_id: programId,
          sport_session_id: sessionId,
        },
      });

      if (existing) {
        throw new Error("Session already linked to program");
      }

      let finalRank = rank;
      if (finalRank === undefined) {
        const maxRank = await ProgramSportSession.max("program_sport_session_rank", {
          where: { sport_program_id: programId },
        });
        finalRank = (Number.isFinite(maxRank) ? maxRank : 0) + 1;
      }

      const created = await ProgramSportSession.create({
        sport_program_id: programId,
        sport_session_id: sessionId,
        program_sport_session_rank: finalRank,
      });

      return created;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async removeSessionFromProgram({ programId, sessionId }) {
    try {
      const sportProgram = await SportProgram.findByPk(programId);
      if (!sportProgram) {
        throw new Error("Sport program not found");
      }

      const sportSession = await SportSession.findByPk(sessionId);
      if (!sportSession) {
        throw new Error("Sport session not found");
      }

      const existing = await ProgramSportSession.findOne({
        where: {
          sport_program_id: programId,
          sport_session_id: sessionId,
        },
      });

      if (!existing) {
        throw new Error("Session link not found");
      }

      await existing.destroy();
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateSessionRank({ programId, sessionId, rank }) {
    try {
      const sportProgram = await SportProgram.findByPk(programId);
      if (!sportProgram) {
        throw new Error("Sport program not found");
      }

      const sportSession = await SportSession.findByPk(sessionId);
      if (!sportSession) {
        throw new Error("Sport session not found");
      }

      const existing = await ProgramSportSession.findOne({
        where: {
          sport_program_id: programId,
          sport_session_id: sessionId,
        },
      });

      if (!existing) {
        throw new Error("Session link not found");
      }

      existing.program_sport_session_rank = rank;
      await existing.save();

      return existing;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAvailableSessions({ programId }) {
    try {
      const sportProgram = await SportProgram.findByPk(programId);
      if (!sportProgram) {
        throw new Error("Sport program not found");
      }

      const programSessions = await ProgramSportSession.findAll({
        where: { sport_program_id: programId },
        attributes: ["sport_session_id"],
      });

      const usedSessionIds = programSessions
        .map((pss) => pss.sport_session_id)
        .filter((id) => Number.isInteger(id));

      const where =
        usedSessionIds.length > 0
          ? { sport_session_id: { [Op.notIn]: usedSessionIds } }
          : undefined;

      const sessions = await SportSession.findAll({ where });
      return sessions;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = ProgramSessionService;
