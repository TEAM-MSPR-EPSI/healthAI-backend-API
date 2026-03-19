const ProgramSessionService = require("../services/programSession.service");

class ProgramSessionController {
  static async addSessionToProgram(req, res) {
    try {
      const programId = Number(req.params.programId);
      const sessionId = Number(req.body?.sessionId);
      const rank = req.body?.rank === undefined ? undefined : Number(req.body.rank);

      if (!Number.isInteger(programId) || programId <= 0) {
        return res.status(400).json({ error: "Invalid programId" });
      }

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      if (rank !== undefined && (!Number.isInteger(rank) || rank <= 0)) {
        return res.status(400).json({ error: "Invalid rank" });
      }

      const created = await ProgramSessionService.addSessionToProgram({
        programId,
        sessionId,
        rank,
      });

      return res.status(201).json(created);
    } catch (error) {
      if (error?.message === "Sport program not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Sport session not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Session already linked to program") {
        return res.status(409).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async removeSessionFromProgram(req, res) {
    try {
      const programId = Number(req.params.programId);
      const sessionId = Number(req.params.sessionId);

      if (!Number.isInteger(programId) || programId <= 0) {
        return res.status(400).json({ error: "Invalid programId" });
      }

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      await ProgramSessionService.removeSessionFromProgram({ programId, sessionId });
      return res.status(204).send();
    } catch (error) {
      if (error?.message === "Sport program not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Sport session not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Session link not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async updateSessionRank(req, res) {
    try {
      const programId = Number(req.params.programId);
      const sessionId = Number(req.params.sessionId);
      const rank = Number(req.body?.rank);

      if (!Number.isInteger(programId) || programId <= 0) {
        return res.status(400).json({ error: "Invalid programId" });
      }

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        return res.status(400).json({ error: "Invalid sessionId" });
      }

      if (!Number.isInteger(rank) || rank <= 0) {
        return res.status(400).json({ error: "Invalid rank" });
      }

      const updated = await ProgramSessionService.updateSessionRank({
        programId,
        sessionId,
        rank,
      });

      return res.status(200).json(updated);
    } catch (error) {
      if (error?.message === "Sport program not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Sport session not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error?.message === "Session link not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async getAvailableSessions(req, res) {
    try {
      const programId = Number(req.params.programId);

      if (!Number.isInteger(programId) || programId <= 0) {
        return res.status(400).json({ error: "Invalid programId" });
      }

      const sessions = await ProgramSessionService.getAvailableSessions({ programId });
      return res.status(200).json(sessions);
    } catch (error) {
      if (error?.message === "Sport program not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProgramSessionController;
