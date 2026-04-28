const UserAllergy = require("../models/UserAllergy");
const User = require("../models/User");

class UserAllergyService {
    static async getUserAllergies(userId) {
        try {
            const allergies = await UserAllergy.findAll({
                where: { user_id: userId },
                include: [{
                    model: User,
                    as: "user"
                }],
                raw: true,
                attributes: ['allergy']
            });
            return allergies.map(a => a.allergy);
        } catch (error) {
            console.error("Error fetching user allergies:", error);
            throw error;
        }
    }

    static async setUserAllergies(userId, allergies) {
        try {
            // Delete all existing allergies for this user
            await UserAllergy.destroy({
                where: { user_id: userId }
            });

            // Create new allergies
            if (allergies && allergies.length > 0) {
                const allergyData = allergies.map(allergy => ({
                    user_id: userId,
                    allergy: allergy
                }));
                await UserAllergy.bulkCreate(allergyData);
            }

            return { success: true };
        } catch (error) {
            console.error("Error setting user allergies:", error);
            throw error;
        }
    }

    static async addUserAllergy(userId, allergy) {
        try {
            const result = await UserAllergy.findOrCreate({
                where: { user_id: userId, allergy: allergy }
            });
            return result;
        } catch (error) {
            console.error("Error adding user allergy:", error);
            throw error;
        }
    }

    static async removeUserAllergy(userId, allergy) {
        try {
            await UserAllergy.destroy({
                where: { user_id: userId, allergy: allergy }
            });
            return { success: true };
        } catch (error) {
            console.error("Error removing user allergy:", error);
            throw error;
        }
    }
}

module.exports = UserAllergyService;
