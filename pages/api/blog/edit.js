import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
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
            const { slug, content, variables } = req.body;
            const postsfolder = join(process.cwd(), "_posts");
            const tmpPath = "/tmp";

            const blogContent = matter.stringify(content, {
                date: variables.date,
                title: variables.title,
                tagline: variables.tagline,
                preview: variables.preview,
                image: variables.image,
            });

            try {
                const tmpFilePath = join(tmpPath, `${slug}.md`);
                fs.writeFileSync(tmpFilePath, blogContent);

                if (process.env.GITHUB_TOKEN) {
                    const octokit = new Octokit({
                        auth: process.env.GITHUB_TOKEN,
                    });

                    const { data: currentFile } =
                        await octokit.repos.getContent({
                            owner: process.env.GITHUB_OWNER,
                            repo: process.env.GITHUB_REPO,
                            path: `_posts/${slug}.md`,
                            ref: "main",
                        });

                    await octokit.repos.createOrUpdateFileContents({
                        owner: process.env.GITHUB_OWNER,
                        repo: process.env.GITHUB_REPO,
                        path: `_posts/${slug}.md`,
                        message: `Update blog post: ${variables.title} [automated]`,
                        content: Buffer.from(blogContent).toString("base64"),
                        sha: currentFile.sha,
                        branch: "main",
                    });

                    return res.status(200).json({
                        message: "Updated successfully and committed to GitHub",
                    });
                }

                fs.writeFileSync(join(postsfolder, `${slug}.md`), blogContent);
                return res.status(200).json({
                    message: "Updated successfully",
                });
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
        console.error("Server error:", error);
        return res.status(500).json({
            message: `Server Error: ${error.message}`,
            type: "server_error",
        });
    }
}
