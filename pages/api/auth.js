import { connectToDatabase } from "../../utils/db";
import { verifyPassword, generateToken } from "../../utils/auth";

export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, password } = req.body;
        const { db } = await connectToDatabase();

        // Find user in database
        const user = await db.collection("users").findOne({ username });

        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ message: "Server error" });
    }
}
