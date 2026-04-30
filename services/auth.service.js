const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthService {
  static async register(data) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    
    if (!regex.test(data.password)) {
      throw new Error("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial.");
    } 
    const hashed = await bcrypt.hash(data.password, 10);
    return await User.create({
      ...data,
      user_hashpwd: hashed
    });
  }

  static async login({ email, password }) {
    const user = await User.findOne({ where: { user_email: email } });

    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.user_hashpwd);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.user_id, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}

module.exports = AuthService;