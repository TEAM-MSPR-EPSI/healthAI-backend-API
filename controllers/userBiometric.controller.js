const UserBiometricService = require("../services/userBiometric.service");

class UserBiometricController {

    static async create(req, res) {
        try {
            const userBiometric = await UserBiometricService.createUserBiometric(req.body);
            res.status(201).json(userBiometric);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const userBiometrics = await UserBiometricService.getUserBiometrics();
            res.json(userBiometrics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const userBiometric = await UserBiometricService.getUserBiometricById(req.params.id);
            res.json(userBiometric);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const userBiometrics = await UserBiometricService.getUserBiometricsByUserId(req.params.userId);
            res.json(userBiometrics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getSummaryForCurrentUser(req, res) {
        try {
            const userId = req.user?.id || req.user?.user_id || null;
            if (!userId) {
                return res.status(400).json({ error: 'User id not found in token' });
            }

            const userBiometrics = await UserBiometricService.getUserBiometricsByUserId(userId);

            // sort desc by date
            const sorted = (userBiometrics || []).sort((a, b) => new Date(b.biometric_date) - new Date(a.biometric_date));

            const latest = sorted[0] || null;

            const last7 = sorted.slice(0, 7).map((entry) => ({
                date: entry.biometric_date,
                sleep: entry.biometric_sleep,
                steps: entry.biometric_steps,
            })).reverse();

            // group by ISO week number and average weight per week (most recent 6 weeks)
            const weeks = {};
            const getWeek = (d) => {
                const date = new Date(d);
                const year = date.getFullYear();
                const onejan = new Date(year, 0, 1);
                const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
                return `${year}-W${week}`;
            };

            (sorted.slice(0, 42) || []).forEach((entry) => {
                const k = getWeek(entry.biometric_date);
                weeks[k] = weeks[k] || [];
                if (entry.biometric_weight != null) weeks[k].push(Number(entry.biometric_weight));
            });

            const last6Weeks = Object.keys(weeks).slice(0, 6).map((k) => {
                const arr = weeks[k];
                const avg = arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null;
                return { week: k, averageWeight: avg != null ? Math.round(avg * 10) / 10 : null };
            });

            res.json({ latest, last7Days: last7, last6Weeks });
        } catch (error) {
            console.error('Error in getSummaryForCurrentUser', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const userBiometric = await UserBiometricService.updateUserBiometric(req.params.id, req.body);
            res.json(userBiometric);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const userBiometric = await UserBiometricService.deleteUserBiometric(req.params.id);
            res.json(userBiometric);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserBiometricController;
