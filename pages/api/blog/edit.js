import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
    const postsFolder = join(process.cwd(), `/_posts/`);

    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            message: "Blog editing API is disabled outside local development.",
        });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { slug, shared, en, vi } = req.body;
    const { date, image } = shared;

    // Save English version
    const enPath = join(postsFolder, "en", `${slug}.md`);
    fs.writeFileSync(
        enPath,
        matter.stringify(en.content, {
            date,
            title: en.title,
            tagline: en.tagline,
            preview: en.preview,
            image,
        }),
        "utf-8"
    );

    // Save Vietnamese version
    const viPath = join(postsFolder, "vi", `${slug}.md`);
    fs.writeFileSync(
        viPath,
        matter.stringify(vi.content, {
            date,
            title: vi.title,
            tagline: vi.tagline,
            preview: vi.preview,
            image,
        }),
        "utf-8"
    );

    return res.status(200).json({ status: "DONE" });
}
