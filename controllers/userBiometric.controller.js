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
