import { connectToDatabase } from "../../utils/db";
import { verifyToken } from "../../utils/auth";
import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
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
            // const portfolioPath = path.join(
            //     process.cwd(),
            //     "data/portfolio.json"
            // );
            const portfolioPath = path.join("/tmp", "portfolio.json");

            try {
                fs.writeFileSync(
                    portfolioPath,
                    JSON.stringify(req.body, null, 2)
                );

                if (process.env.GITHUB_TOKEN) {
                    const octokit = new Octokit({
                        auth: process.env.GITHUB_TOKEN,
                    });

                    try {
                        const content = Buffer.from(
                            JSON.stringify(req.body, null, 2)
                        ).toString("base64");

                        await octokit.rest.users.getAuthenticated();

                        const { data: currentFile } =
                            await octokit.repos.getContent({
                                owner: process.env.GITHUB_OWNER,
                                repo: process.env.GITHUB_REPO,
                                path: "data/portfolio.json",
                                ref: "main",
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
                        console.error("GitHub API error:", error);
                        return res.status(500).json({
                            message: `GitHub Error: ${error.message}`,
                            type: "github_error",
                        });
                    }
                }

                return res
                    .status(200)
                    .json({ message: "Updated successfully" });
            } catch (error) {
                console.error("Save error:", error);
                return res.status(500).json({
                    message: `Save Error: ${error.message}`,
                    type: "save_error",
                });
            }
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}
