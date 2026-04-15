const SessionExerciseService = require("../services/sessionExercise.service");

class SessionExerciseController {
  static async addExerciseToSession(req, res) {
    try {
      const sessionId = Number(req.params.sessionId);
      const exerciseId = Number(req.body?.exerciseId);
      const rank = req.body?.rank === undefined ? undefined : Number(req.body.rank);

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      if (rank !== undefined && (!Number.isInteger(rank) || rank <= 0)) {
        return res.status(400).json({ error: "Invalid rank" });
      }

      const created = await SessionExerciseService.addExerciseToSession({
        sessionId,
        exerciseId,
        rank,
      });

      return res.status(201).json(created);
    } catch (error) {
      if (error?.message === "Sport session not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Sport exercise not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Exercise already linked to session") {
        return res.status(409).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async removeExerciseFromSession(req, res) {
    try {
      const sessionId = Number(req.params.sessionId);
      const exerciseId = Number(req.params.exerciseId);

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      await SessionExerciseService.removeExerciseFromSession({ sessionId, exerciseId });
      return res.status(204).send();
    } catch (error) {
      if (error?.message === "Exercise link not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async updateExerciseRank(req, res) {
    try {
      const sessionId = Number(req.params.sessionId);
      const exerciseId = Number(req.params.exerciseId);
      const rank = Number(req.body?.rank);

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
        return res.status(400).json({ error: "Invalid exerciseId" });
      }

      if (!Number.isInteger(rank) || rank <= 0) {
        return res.status(400).json({ error: "Invalid rank" });
      }

      const updated = await SessionExerciseService.updateExerciseRank({
        sessionId,
        exerciseId,
        rank,
      });

      return res.status(200).json(updated);
    } catch (error) {
      if (error?.message === "Exercise link not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async getAvailableExercises(req, res) {
    try {
      const sessionId = Number(req.params.sessionId);

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      const items = await SessionExerciseService.getAvailableExercises(sessionId);
      return res.status(200).json(items);
    } catch (error) {
      if (error?.message === "Sport session not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SessionExerciseController;