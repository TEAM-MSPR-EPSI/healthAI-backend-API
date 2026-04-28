const express = require("express");
const router = express.Router();
const ProgramSessionController = require("../controllers/programSession.controller");

router.post("/:programId/sessions", ProgramSessionController.addSessionToProgram);
router.delete(
  "/:programId/sessions/:sessionId",
  ProgramSessionController.removeSessionFromProgram
);
router.put(
  "/:programId/sessions/:sessionId",
  ProgramSessionController.updateSessionRank
);
router.get(
  "/:programId/available-sessions",
  ProgramSessionController.getAvailableSessions
);

module.exports = router;
