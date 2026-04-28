const { Op } = require("sequelize");

const SportSession = require("../models/SportSession");
const SportExercise = require("../models/SportExercise");
const SportSessionExercise = require("../models/SportSessionExercise");

class SessionExerciseService {
  static async addExerciseToSession({ sessionId, exerciseId, rank }) {
    try {
      const sportSession = await SportSession.findByPk(sessionId);
      if (!sportSession) {
        throw new Error("Sport session not found");
      }

      const sportExercise = await SportExercise.findByPk(exerciseId);
      if (!sportExercise) {
        throw new Error("Sport exercise not found");
      }

      const existing = await SportSessionExercise.findOne({
        where: {
          sport_session_id: sessionId,
          sport_exercise_id: exerciseId,
        },
      });

      if (existing) {
        throw new Error("Exercise already linked to session");
      }

      let finalRank = rank;
      if (finalRank === undefined) {
        const maxRank = await SportSessionExercise.max("sport_session_exercise_rank", {
          where: { sport_session_id: sessionId },
        });
        finalRank = (Number.isFinite(maxRank) ? maxRank : 0) + 1;
      }

      return await SportSessionExercise.create({
        sport_session_id: sessionId,
        sport_exercise_id: exerciseId,
        sport_session_exercise_rank: finalRank,
      });
    } catch (error) {
      console.error("Error adding exercise to session:", error);
      throw error;
    }
  }

  static async removeExerciseFromSession({ sessionId, exerciseId }) {
    try {
      const link = await SportSessionExercise.findOne({
        where: {
          sport_session_id: sessionId,
          sport_exercise_id: exerciseId,
        },
      });

      if (!link) {
        throw new Error("Exercise link not found");
      }

      await link.destroy();
      return link;
    } catch (error) {
      console.error("Error removing exercise from session:", error);
      throw error;
    }
  }

  static async updateExerciseRank({ sessionId, exerciseId, rank }) {
    try {
      const link = await SportSessionExercise.findOne({
        where: {
          sport_session_id: sessionId,
          sport_exercise_id: exerciseId,
        },
      });

      if (!link) {
        throw new Error("Exercise link not found");
      }

      await link.update({ sport_session_exercise_rank: rank });
      return link;
    } catch (error) {
      console.error("Error updating exercise rank in session:", error);
      throw error;
    }
  }

  static async getAvailableExercises(sessionId) {
    try {
      const sportSession = await SportSession.findByPk(sessionId);
      if (!sportSession) {
        throw new Error("Sport session not found");
      }

      const sessionExercises = await SportSessionExercise.findAll({
        where: { sport_session_id: sessionId },
        attributes: ["sport_exercise_id"],
      });

      const usedExerciseIds = sessionExercises
        .map((link) => link.sport_exercise_id)
        .filter((id) => id !== null && id !== undefined);

      const where = usedExerciseIds.length
        ? { sport_exercise_id: { [Op.notIn]: usedExerciseIds } }
        : undefined;

      return await SportExercise.findAll({ where });
    } catch (error) {
      console.error("Error fetching available exercises:", error);
      throw error;
    }
  }
}

module.exports = SessionExerciseService;