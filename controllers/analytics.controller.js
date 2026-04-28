const { User, Consume, SessionProgress, UserBiometric, Ingredient, UserSubscription, Subscription } = require("../models");
const { Op } = require("sequelize");

class AnalyticsController {
  /**
   * GET /api/analytics/admin/nutrition/daily-calories
   * Retourne les calories consommées par jour sur les 7 derniers jours
   */
  static async getDailyCalories(req, res) {
    try {
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
      }

      const consumes = await Consume.findAll({
        where: {
          consume_date: { [Op.in]: last7Days }
        },
        include: [{
          model: Ingredient,
          attributes: ['ingredient_energy_100g']
        }]
      });

      const caloriesByDay = {};
      last7Days.forEach(day => { caloriesByDay[day] = 0; });

      consumes.forEach(consume => {
        const caloriesPer100g = consume.Ingredient?.ingredient_energy_100g || 0;
        const calories = (consume.ingredient_quantity / 100) * caloriesPer100g;
        caloriesByDay[consume.consume_date] = (caloriesByDay[consume.consume_date] || 0) + calories;
      });

      const labels = last7Days.map(date => {
        const d = new Date(date);
        const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
        return days[d.getDay()];
      });

      const data = last7Days.map(day => Math.round(caloriesByDay[day]));
      res.json({ labels, data, rawData: caloriesByDay });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/analytics/admin/fitness/weekly-sessions
   * Retourne les sessions cumulées par semaine sur les 4 dernières semaines
   */
  static async getWeeklySessions(req, res) {
    try {
      const today = new Date();
      const weeks = [];

      for (let i = 3; i >= 0; i--) {
        const weekEnd = new Date(today);
        weekEnd.setDate(weekEnd.getDate() - (weekEnd.getDay() || 7) + 6 - (i * 7));

        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekStart.getDate() - 6);

        weeks.push({
          start: weekStart.toISOString().split('T')[0],
          end: weekEnd.toISOString().split('T')[0],
          label: `Sem. ${4 - i}`
        });
      }

      let cumulativeCount = 0;
      const data = [];
      const labels = [];

      for (const week of weeks) {
        const sessionCount = await SessionProgress.count({
          where: {
            session_progress_end: { [Op.between]: [week.start, week.end] }
          }
        });
        cumulativeCount += sessionCount;
        data.push(cumulativeCount);
        labels.push(week.label);
      }

      res.json({ labels, data, weeksData: weeks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/analytics/admin/users/monthly-retention
   * Retourne le taux de rétention mensuel (utilisateurs actifs par mois)
   */
  static async getMonthlyRetention(req, res) {
    try {
      const months = [];
      const today = new Date();

      for (let i = 3; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth(), 1);
        date.setMonth(date.getMonth() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        months.push({ year, month });
      }

      const data = [];
      const labels = [];
      const totalUsers = await User.count();

      for (const { year, month } of months) {
        const monthIndex = parseInt(month, 10) - 1;
        const monthStart = new Date(year, monthIndex, 1).toISOString().split('T')[0];
        const monthEnd = new Date(year, monthIndex + 1, 0).toISOString().split('T')[0];

        const activeUsers = await Consume.findAll({
          attributes: [[Consume.sequelize.fn('DISTINCT', Consume.sequelize.col('user_id')), 'user_id']],
          where: {
            consume_date: { [Op.gte]: monthStart, [Op.lte]: monthEnd }
          },
          raw: true
        });

        const uniqueActiveCount = activeUsers?.length || 0;
        const retentionRate = totalUsers > 0 ? Math.round((uniqueActiveCount / totalUsers) * 100) : 0;

        data.push(retentionRate);
        const monthNames = ['Jan.', 'Fev.', 'Mar.', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        labels.push(monthNames[monthIndex]);
      }

      res.json({ labels, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/analytics/admin/users/weight-progression
   * Retourne la progression pondérale moyenne par semaine sur 4 semaines
   */
  static async getWeightProgression(req, res) {
    try {
      const today = new Date();
      const weeks = [];

      for (let i = 3; i >= 0; i--) {
        const weekEnd = new Date(today);
        weekEnd.setDate(weekEnd.getDate() - (weekEnd.getDay() || 7) + 6 - (i * 7));

        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekStart.getDate() - 6);

        weeks.push({
          start: weekStart.toISOString().split('T')[0],
          end: weekEnd.toISOString().split('T')[0],
          label: `Sem. ${4 - i}`
        });
      }

      const data = [];
      const labels = [];

      for (const week of weeks) {
        const biometrics = await UserBiometric.findAll({
          attributes: ['biometric_weight'],
          where: {
            biometric_date: { [Op.gte]: week.start, [Op.lte]: week.end },
            biometric_weight: { [Op.not]: null }
          }
        });

        let avgWeight = 0;
        if (biometrics.length > 0) {
          const sum = biometrics.reduce((acc, b) => acc + parseFloat(b.biometric_weight || 0), 0);
          avgWeight = Math.round((sum / biometrics.length) * 10) / 10;
        }

        data.push(avgWeight);
        labels.push(week.label);
      }

      res.json({ labels, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/analytics/admin/kpi/subscription-breakdown
   * Retourne la répartition réelle des abonnements actifs par type, en séparant Premium+
   */
  static async getSubscriptionBreakdown(req, res) {
    try {
      const activeSubscriptions = await UserSubscription.findAll({
        where: {
          user_subscription_is_active: true,
        },
        include: [{
          model: Subscription,
          as: 'subscription',
          attributes: ['subscription_name'],
        }],
        order: [['user_id', 'ASC'], ['user_subscription_start', 'DESC']],
      });

      const breakdown = {
        freemium: 0,
        premium: 0,
        premium_plus: 0,
        b2b: 0,
      };

      const seenUsers = new Set();

      activeSubscriptions.forEach((subscriptionLink) => {
        if (seenUsers.has(subscriptionLink.user_id)) {
          return;
        }

        seenUsers.add(subscriptionLink.user_id);

        const subscriptionName = subscriptionLink.subscription?.subscription_name || 'Freemium';
        if (subscriptionName === 'B2B') {
          breakdown.b2b += 1;
        } else if (subscriptionName === 'Premium+') {
          breakdown.premium_plus += 1;
        } else if (subscriptionName === 'Premium') {
          breakdown.premium += 1;
        } else {
          breakdown.freemium += 1;
        }
      });

      res.json({
        labels: ['Freemium', 'Premium', 'Premium+', 'B2B'],
        data: [breakdown.freemium, breakdown.premium, breakdown.premium_plus, breakdown.b2b],
        rawData: breakdown,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/analytics/admin/users/monthly-retention
   * Retourne une rétention mensuelle calculée à partir de la dernière activité disponible
   */
  static async getMonthlyRetention(req, res) {
    try {
      const [latestConsumeDate, latestProgressDate] = await Promise.all([
        Consume.max('consume_date'),
        SessionProgress.max('session_progress_start'),
      ]);

      const candidates = [latestConsumeDate, latestProgressDate]
        .filter(Boolean)
        .map((date) => new Date(`${String(date).slice(0, 10)}T00:00:00`));

      const anchorDate = candidates.length > 0
        ? new Date(Math.max(...candidates.map((date) => date.getTime())))
        : new Date();

      const monthNames = ['Jan.', 'Fev.', 'Mar.', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
      const months = [];

      for (let i = 4; i >= 0; i--) {
        const date = new Date(anchorDate.getFullYear(), anchorDate.getMonth() - i, 1);
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const monthStart = new Date(year, monthIndex, 1).toISOString().split('T')[0];
        const monthEnd = new Date(year, monthIndex + 1, 0).toISOString().split('T')[0];

        months.push({
          year,
          monthIndex,
          start: monthStart,
          end: monthEnd,
          label: monthNames[monthIndex],
        });
      }

      const activeUsersByMonth = [];

      for (const month of months) {
        const [consumes, sessionProgresses] = await Promise.all([
          Consume.findAll({
            attributes: ['user_id'],
            where: {
              consume_date: { [Op.between]: [month.start, month.end] },
            },
            raw: true,
          }),
          SessionProgress.findAll({
            attributes: ['user_id'],
            where: {
              session_progress_start: { [Op.between]: [month.start, month.end] },
            },
            raw: true,
          }),
        ]);

        const userIds = new Set();
        consumes.forEach((consume) => userIds.add(consume.user_id));
        sessionProgresses.forEach((progress) => userIds.add(progress.user_id));
        activeUsersByMonth.push(userIds);
      }

      const labels = months.slice(1).map((month) => month.label);
      const data = months.slice(1).map((month, index) => {
        const previousUsers = activeUsersByMonth[index];
        const currentUsers = activeUsersByMonth[index + 1];

        if (!previousUsers.size) {
          return 0;
        }

        let retained = 0;
        currentUsers.forEach((userId) => {
          if (previousUsers.has(userId)) {
            retained += 1;
          }
        });

        return Math.round((retained / previousUsers.size) * 100);
      });

      res.json({
        labels,
        data,
        rawData: months.map((month, index) => ({
          label: month.label,
          activeUsers: activeUsersByMonth[index].size,
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnalyticsController;
