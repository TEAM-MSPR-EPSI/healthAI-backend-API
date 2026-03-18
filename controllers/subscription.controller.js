const SubscriptionService = require("../services/subscription.service");

class SubscriptionController {
        static async create(req, res) {
        try {
            const sub = await SubscriptionService.createSubscription(req.body);
            res.status(201).json(sub);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating subscription" });
        }
    }

    static async getAll(req, res) {
        try {
            const subs = await SubscriptionService.getSubscriptions();
            res.status(200).json(subs);
        } catch (error) {

            console.error(error);
            res.status(500).json({ error: "controller - Error fetching subscriptions" });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const sub = await SubscriptionService.getSubscriptionById(id);

            if (!sub) {
                return res.status(404).json({ error: "Subscription not found" });
            }

            res.status(200).json(sub);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Controller - Error fetching subscription" });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await SubscriptionService.updateSubscription(id, req.body);

            res.status(200).json(updated);
        } catch (error) {
            console.error("Controller error updating subscription:", error);
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await SubscriptionService.deleteSubscription(id);

            res.status(200).json(deleted);
        } catch (error) {
            console.error("Controller error deleting subscription:", error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = SubscriptionController