const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const AuthService = require('../services/auth.service');
const User = require('../models/User');

class AuthController {
    static async login (req, res) {
        const { email, password } = req.body;
        try {
            const user = AuthService.login({ email, password });
            const token = await user;
            res.cookie('auth_jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000 // 1 hour
            });
            res.status(200).json({ message : "Utilisateur identifié" });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    static async register (req, res) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
}; 


module.exports = AuthController;