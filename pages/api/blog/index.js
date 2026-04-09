import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";

export default function handler(req, res) {
    const postsFolder = join(process.cwd(), `/_posts/en/`);
    const slug = uuidv4();

    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            message: "Blog editing API is disabled outside local development.",
        });
    }

    if (req.method === "POST") {
        const defaultData = matter.stringify("# New Blog", {
            date: new Date().toISOString(),
            title: "New Blog",
            tagline: "Amazing New Blog",
            preview:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: getRandomImage(),
        });

        fs.writeFileSync(join(postsFolder, `${slug}.md`), defaultData);

        return res.status(200).json({ status: "CREATED" });
    }

    if (req.method === "DELETE") {
        const file = join(postsFolder, `${req.body.slug}.md`);
        if (fs.existsSync(file)) fs.unlinkSync(file);

        return res.status(200).json({ status: "DONE" });
    }

    return res.status(405).json({ message: "Method not allowed" });
}
