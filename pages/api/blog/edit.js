import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
    const postsFolder = join(process.cwd(), `/_posts/en/`);

    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            message: "Blog editing API is disabled outside local development.",
        });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { slug, date, image, title, tagline, preview, content } = req.body;

    fs.writeFileSync(
        join(postsFolder, `${slug}.md`),
        matter.stringify(content, {
            date,
            title,
            tagline,
            preview,
            image,
        }),
        "utf-8"
    );

    return res.status(200).json({ status: "DONE" });
}
