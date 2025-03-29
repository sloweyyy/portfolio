const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getConfig = require("next/config").default;

const getJwtSecret = () => {
    const { serverRuntimeConfig } = getConfig() || {};
    const jwtSecret = serverRuntimeConfig?.JWT_SECRET || process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error(
            "JWT_SECRET is not defined in environment variables or server config"
        );
    }

    return jwtSecret;
};

export function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(user) {
    const jwtSecret = getJwtSecret();

    if (!jwtSecret) {
        throw new Error("Server configuration error: JWT_SECRET is missing");
    }

    return jwt.sign(
        {
            userId: user._id,
            username: user.username,
            role: user.role,
        },
        jwtSecret,
        { expiresIn: "24h" }
    );
}

export function verifyToken(token) {
    try {
        const jwtSecret = getJwtSecret();

        if (!jwtSecret) {
            console.error(
                "JWT_SECRET is not defined in environment variables or server config"
            );
            return null;
        }

        return jwt.verify(token, jwtSecret);
    } catch (error) {
        console.error("Token verification error:", error.message);
        return null;
    }
}
