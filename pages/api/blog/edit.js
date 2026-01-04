import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
    const postsFolder = join(process.cwd(), `/_posts/`);
    
    if (process.env.NODE_ENV === "development") {
        if (req.method === "POST") {
            const { slug, shared, en, vi } = req.body;
            const { date, image } = shared;
            
            // Save English version
            const enPath = join(postsFolder, 'en', `${slug}.md`);
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
            const viPath = join(postsFolder, 'vi', `${slug}.md`);
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
            
            res.status(200).json({ status: "DONE" });
        } else {
            res.status(200).json({
                name: "This route works in development mode only",
            });
        }
    }
}

