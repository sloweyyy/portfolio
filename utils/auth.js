const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification error:", error);
        return null;
    }
}
