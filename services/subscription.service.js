const Subscription = require("../models/Subscription");

class SubscriptionService {
    static async createSubscription(data){
        try{
            const sub = await Subscription.create(data);
            return sub;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating new subscription");
        }
    }
    static async getSubscriptions() {
        try {
            const subs = await Subscription.findAll();
            return subs;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching all subscriptions");
        }
    }

    static async getSubscriptionById(id) {
        try {
            const sub = await Subscription.findByPk(id);
            return sub;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching one Subscription");
        }
    }

    static async getSubscriptionWithCompanyId(id){
        try {
            const sub = await Subscription.findByPk(id, {
                include: [{ model: Company, as: "company" }],
            });
            return sub;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching subscription with company");
        }
    }

    static async getSubscriptionsWithCompany() {
        try {
            const subs = await Subscription.findAll({
                include: [{ model: Company, as: "company" }],
            });
            return subs;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching subscriptions with company");
        }
    }

    static async getSubscriptionsByCompany(company_id) {
        try {
            const subs = await Subscription.findAll({
                where: { company_id },
            });
            return subs;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching subscriptions by company");
        }
    }

    static async updateSubscription(id, data) {
        try {
            const sub = await Subscription.findByPk(id);
            if (!sub) {
                throw new Error("Subscription not found");
            }
            await sub.update(data);
            return sub;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating subscription");
        }
    }

    static async deleteSubscription(id) {
        try {
            const sub = await Subscription.findByPk(id);
            if (!sub) {
                throw new Error("Subscription not found");
            }
            await sub.destroy();
            return sub;
        } catch (error) {
            console.error("Error deleting subscription:", error);
            throw error;
        }
    }
}

module.exports = SubscriptionService;