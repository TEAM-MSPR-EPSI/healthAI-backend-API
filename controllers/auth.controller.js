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
            res.status(200).json({ token });
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