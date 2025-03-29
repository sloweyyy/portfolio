import { connectToDatabase } from "../../utils/db";
import { verifyPassword, generateToken } from "../../utils/auth";
import checkRequiredEnvVars from "../../utils/checkEnv";

export default async function handler(req, res) {
    try {
        checkRequiredEnvVars();
    } catch (error) {
        console.error("Environment variable error:", error);
        return res.status(500).json({
            message: "Server configuration error",
            error: "env_vars_missing",
        });
    }

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
        "Access-Control-Allow-Origin",
        process.env.NODE_ENV === "production" ? "https://www.slowey.works" : "*"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }

        const { db } = await connectToDatabase();

        const user = await db.collection("users").findOne({ username });

        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        try {
            const token = generateToken(user);

            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (tokenError) {
            console.error("Token generation error:", tokenError);
            return res
                .status(500)
                .json({ message: "Error generating authentication token" });
        }
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({
            message: "Server error",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
}
