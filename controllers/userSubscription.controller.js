const UserSubscriptionService = require("../services/userSubscription.service");

class UserSubscriptionController {
    static async subscribe(req, res) {
        try {
            const userSub = await UserSubscriptionService.subscribe(req.body);
            res.status(201).json(userSub);
        } catch (error) {
            const status = error.message === "User already has an active subscription" ? 409 : 500;
            res.status(status).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const userSubs = await UserSubscriptionService.getAll();
            res.status(200).json(userSubs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const userSub = await UserSubscriptionService.getById(req.params.id);
            if (!userSub) return res.status(404).json({ error: "User subscription not found" });
            res.status(200).json(userSub);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const userSubs = await UserSubscriptionService.getByUserId(req.params.userId);
            res.status(200).json(userSubs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getActiveForCurrentUser(req, res) {
        try {
            const userSub = await UserSubscriptionService.getActiveForUser(req.user.id);
            if (!userSub) return res.status(404).json({ error: "No active subscription found" });
            res.status(200).json(userSub);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async cancel(req, res) {
        try {
            const userSub = await UserSubscriptionService.cancel(req.params.id);
            res.status(200).json(userSub);
        } catch (error) {
            const status = error.message === "User subscription not found" ? 404 : 500;
            res.status(status).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const userSub = await UserSubscriptionService.update(req.params.id, req.body);
            res.status(200).json(userSub);
        } catch (error) {
            const status = error.message === "User subscription not found" ? 404 : 500;
            res.status(status).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const userSub = await UserSubscriptionService.delete(req.params.id);
            res.status(200).json(userSub);
        } catch (error) {
            const status = error.message === "User subscription not found" ? 404 : 500;
            res.status(status).json({ error: error.message });
        }
    }
}

module.exports = UserSubscriptionController;
