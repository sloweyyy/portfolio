import { connectToDatabase } from "../../utils/db";
import { verifyToken } from "../../utils/auth";
import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    // Handle preflight
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Verify authorization
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);

        if (!decoded || decoded.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (req.method === "POST") {
            const portfolioPath = path.join(
                process.cwd(),
                "data/portfolio.json"
            );

            try {
                // Save locally
                fs.writeFileSync(
                    portfolioPath,
                    JSON.stringify(req.body, null, 2)
                );

                // Save to GitHub if configured
                if (process.env.GITHUB_TOKEN) {
                    const octokit = new Octokit({
                        auth: process.env.GITHUB_TOKEN,
                    });

                    const content = Buffer.from(
                        JSON.stringify(req.body, null, 2)
                    ).toString("base64");

                    try {
                        const { data: currentFile } =
                            await octokit.repos.getContent({
                                owner: process.env.GITHUB_OWNER,
                                repo: process.env.GITHUB_REPO,
                                path: "data/portfolio.json",
                            });

                        await octokit.repos.createOrUpdateFileContents({
                            owner: process.env.GITHUB_OWNER,
                            repo: process.env.GITHUB_REPO,
                            path: "data/portfolio.json",
                            message: "Update portfolio data [automated]",
                            content,
                            sha: currentFile.sha,
                            branch: "main",
                        });

                        return res.status(200).json({
                            message:
                                "Updated successfully and committed to GitHub",
                        });
                    } catch (error) {
                        console.error("GitHub update error:", error);
                        // Still return success if local save worked
                        return res.status(200).json({
                            message:
                                "Updated locally but failed to commit to GitHub",
                        });
                    }
                }

                return res
                    .status(200)
                    .json({ message: "Updated successfully" });
            } catch (error) {
                console.error("Save error:", error);
                return res
                    .status(500)
                    .json({ message: "Failed to save changes" });
            }
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
