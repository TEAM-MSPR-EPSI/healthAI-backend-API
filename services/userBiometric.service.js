const UserBiometric = require("../models/UserBiometric");
const User = require("../models/User");

class UserBiometricService {
    static async createUserBiometric(data) {
        try {
            const userBiometric = await UserBiometric.create(data);
            return userBiometric;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating user biometric");
        }
    }

    static async getUserBiometrics() {
        try {
            const userBiometrics = await UserBiometric.findAll({
                include: [User]
            });
            return userBiometrics;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching user biometrics");
        }
    }

    static async getUserBiometricById(id) {
        try {
            const userBiometric = await UserBiometric.findByPk(id, {
                include: [User]
            });
            return userBiometric;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching user biometric");
        }
    }

    static async getUserBiometricsByUserId(userId) {
        try {
            const userBiometrics = await UserBiometric.findAll({
                where: { user_id: userId },
                include: [User],
                order: [['biometric_date', 'DESC']]
            });
            return userBiometrics;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching user biometrics");
        }
    }

    static async updateUserBiometric(id, data) {
        try {
            const userBiometric = await UserBiometric.findByPk(id);
            if (!userBiometric) {
                throw new Error("User biometric not found");
            }
            await userBiometric.update(data);
            return userBiometric;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating user biometric");
        }
    }

    static async deleteUserBiometric(id) {
        try {
            const userBiometric = await UserBiometric.findByPk(id);
            if (!userBiometric) {
                throw new Error("User biometric not found");
            }
            await userBiometric.destroy();
            return userBiometric;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting user biometric");
        }
    }
}

module.exports = UserBiometricService;
