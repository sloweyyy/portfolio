import fs from "fs";
import { join } from "path";
import { verifyToken } from "../../utils/auth";

export default async function handler(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = verifyToken(token);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const portfolioData = join(process.cwd(), "/data/portfolio.json");

        if (req.method === "POST") {
            fs.writeFileSync(portfolioData, JSON.stringify(req.body), "utf-8");
            res.status(200).json({ message: "Updated successfully" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
