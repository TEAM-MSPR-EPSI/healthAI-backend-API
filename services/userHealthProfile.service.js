const UserHealthProfile = require("../models/UserHealthProfile");
const User = require("../models/User");

class UserHealthProfileService {
    static async createUserHealthProfile(data) {
        try {
            const userHealthProfile = await UserHealthProfile.create(data);
            return userHealthProfile;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating user health profile");
        }
    }

    static async getUserHealthProfiles() {
        try {
            const userHealthProfiles = await UserHealthProfile.findAll({
                include: [{
                    model: User,
                    as: "user"
                }]
            });
            return userHealthProfiles;
        } catch (error) {
            console.error("Error fetching user health profiles:", error);
            throw error;
        }
    }

    static async getUserHealthProfileById(id) {
        try {
            const userHealthProfile = await UserHealthProfile.findByPk(id, {
                include: [{
                    model: User,
                    as: "user"
                }]
            });
            return userHealthProfile;
        } catch (error) {
            console.error("Error fetching user health profile:", error);
            throw error;
        }
    }

    static async getUserHealthProfileByUserId(userId) {
        try {
            const userHealthProfile = await UserHealthProfile.findOne({
                where: { user_id: userId },
                include: [{
                    model: User,
                    as: "user"
                }]
            });
            return userHealthProfile;
        } catch (error) {
            console.error("Error fetching user health profile:", error);
            throw error;
        }
    }

    static async updateUserHealthProfile(id, data) {
        try {
            const userHealthProfile = await UserHealthProfile.findByPk(id);
            if (!userHealthProfile) {
                throw new Error("User health profile not found");
            }
            await userHealthProfile.update(data);
            return userHealthProfile;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating user health profile");
        }
    }

    static async deleteUserHealthProfile(id) {
        try {
            const userHealthProfile = await UserHealthProfile.findByPk(id);
            if (!userHealthProfile) {
                throw new Error("User health profile not found");
            }
            await userHealthProfile.destroy();
            return userHealthProfile;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting user health profile");
        }
    }
}

module.exports = UserHealthProfileService;
