const express = require("express");
const router = express.Router();
const AnalyticsController = require("../controllers/analytics.controller");

// Daily consumption analytics
router.get("/admin/nutrition/daily-calories", AnalyticsController.getDailyCalories);

// Fitness analytics
router.get("/admin/fitness/weekly-sessions", AnalyticsController.getWeeklySessions);

// User analytics
router.get("/admin/users/monthly-retention", AnalyticsController.getMonthlyRetention);
router.get("/admin/users/weight-progression", AnalyticsController.getWeightProgression);

// KPI analytics
router.get("/admin/kpi/subscription-breakdown", AnalyticsController.getSubscriptionBreakdown);

module.exports = router;
