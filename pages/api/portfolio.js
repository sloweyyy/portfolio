import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            message: "Portfolio editing API is disabled outside local development.",
        });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const portfolioPath = path.join(process.cwd(), "data", "portfolio.json");
        fs.writeFileSync(portfolioPath, JSON.stringify(req.body, null, 2));

        return res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        console.error("Portfolio save error:", error);
        return res.status(500).json({
            message: "Failed to update portfolio data",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
}
