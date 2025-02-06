import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        if (token !== process.env.JWT_SECRET) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (req.method === "POST") {
            const blogId = uuidv4();
            const postsfolder = join(process.cwd(), "_posts");
            const tmpPath = "/tmp";

            const data = matter.stringify("# New Blog", {
                date: new Date().toISOString(),
                title: "New Blog",
                tagline: "Amazing New Blog",
                preview:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                image: getRandomImage(),
            });

            try {
                const tmpFilePath = join(tmpPath, `${blogId}.md`);
                fs.writeFileSync(tmpFilePath, data);

                if (process.env.GITHUB_TOKEN) {
                    const octokit = new Octokit({
                        auth: process.env.GITHUB_TOKEN,
                    });

                    await octokit.repos.createOrUpdateFileContents({
                        owner: process.env.GITHUB_OWNER,
                        repo: process.env.GITHUB_REPO,
                        path: `_posts/${blogId}.md`,
                        message: "Create new blog post [automated]",
                        content: Buffer.from(data).toString("base64"),
                        branch: "main",
                    });

                    return res.status(200).json({
                        status: "CREATED",
                        message: "Blog created and committed to GitHub",
                    });
                }

                fs.writeFileSync(join(postsfolder, `${blogId}.md`), data);
                return res.status(200).json({
                    status: "CREATED",
                    message: "Blog created locally",
                });
            } catch (error) {
                console.error("Create blog error:", error);
                return res.status(500).json({
                    message: `Create Error: ${error.message}`,
                    type: "create_error",
                });
            }
        }

        if (req.method === "DELETE") {
            const slug = req.body.slug;
            const filepath = `_posts/${slug}.md`;

            try {
                if (process.env.GITHUB_TOKEN) {
                    const octokit = new Octokit({
                        auth: process.env.GITHUB_TOKEN,
                    });

                    const { data: file } = await octokit.repos.getContent({
                        owner: process.env.GITHUB_OWNER,
                        repo: process.env.GITHUB_REPO,
                        path: filepath,
                        ref: "main",
                    });

                    await octokit.repos.deleteFile({
                        owner: process.env.GITHUB_OWNER,
                        repo: process.env.GITHUB_REPO,
                        path: filepath,
                        message: "Delete blog post [automated]",
                        sha: file.sha,
                        branch: "main",
                    });
                }

                const deleteFile = join(process.cwd(), filepath);
                fs.unlinkSync(deleteFile);

                return res.status(200).json({
                    status: "DELETED",
                    message: "Blog deleted successfully",
                });
            } catch (error) {
                console.error("Delete blog error:", error);
                return res.status(500).json({
                    message: `Delete Error: ${error.message}`,
                    type: "delete_error",
                });
            }
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            message: `Server Error: ${error.message}`,
            type: "server_error",
        });
    }
}
