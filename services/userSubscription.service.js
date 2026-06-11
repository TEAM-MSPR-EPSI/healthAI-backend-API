const UserSubscription = require("../models/UserSubscription");
const Subscription = require("../models/Subscription");
const User = require("../models/User");

class UserSubscriptionService {
    static async subscribe(data) {
        const { user_id, subscription_id, user_subscription_end } = data;

        const existing = await UserSubscription.findOne({
            where: { user_id, user_subscription_is_active: true },
        });
        if (existing) {
            throw new Error("User already has an active subscription");
        }

        return await UserSubscription.create({
            user_id,
            subscription_id,
            user_subscription_start: new Date(),
            user_subscription_end: user_subscription_end || null,
            user_subscription_is_active: true,
        });
    }

    static async getAll() {
        return await UserSubscription.findAll({
            include: [
                { model: User, as: "user", attributes: ["user_id", "user_name", "user_email"] },
                { model: Subscription, as: "subscription" },
            ],
        });
    }

    static async getById(id) {
        return await UserSubscription.findByPk(id, {
            include: [
                { model: User, as: "user", attributes: ["user_id", "user_name", "user_email"] },
                { model: Subscription, as: "subscription" },
            ],
        });
    }

    static async getByUserId(user_id) {
        return await UserSubscription.findAll({
            where: { user_id },
            include: [{ model: Subscription, as: "subscription" }],
        });
    }

    static async getActiveForUser(user_id) {
        return await UserSubscription.findOne({
            where: { user_id, user_subscription_is_active: true },
            include: [{ model: Subscription, as: "subscription" }],
        });
    }

    static async cancel(id) {
        const userSub = await UserSubscription.findByPk(id);
        if (!userSub) throw new Error("User subscription not found");

        await userSub.update({
            user_subscription_is_active: false,
            user_subscription_end: new Date(),
        });
        return userSub;
    }

    static async update(id, data) {
        const userSub = await UserSubscription.findByPk(id);
        if (!userSub) throw new Error("User subscription not found");

        await userSub.update(data);
        return userSub;
    }

    static async delete(id) {
        const userSub = await UserSubscription.findByPk(id);
        if (!userSub) throw new Error("User subscription not found");

        await userSub.destroy();
        return userSub;
    }
}

module.exports = UserSubscriptionService;
