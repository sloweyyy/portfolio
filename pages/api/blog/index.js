import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";

export default function handler(req, res) {
    const postsFolder = join(process.cwd(), `/_posts/`);
    const slug = uuidv4();

    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            message: "Blog editing API is disabled outside local development.",
        });
    }

    if (req.method === "POST") {
        const defaultEnData = matter.stringify("# New Blog", {
            date: new Date().toISOString(),
            title: "New Blog",
            tagline: "Amazing New Blog",
            preview:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: getRandomImage(),
        });

        const defaultViData = matter.stringify("# Blog Mới", {
            date: new Date().toISOString(),
            title: "Blog Mới",
            tagline: "Blog Mới Tuyệt Vời",
            preview:
                "Đây là bản xem trước của bài blog. Hãy chỉnh sửa nội dung này.",
            image: getRandomImage(),
        });

        // Create in both folders
        fs.writeFileSync(join(postsFolder, "en", `${slug}.md`), defaultEnData);
        fs.writeFileSync(join(postsFolder, "vi", `${slug}.md`), defaultViData);

        return res.status(200).json({ status: "CREATED" });
    }

    if (req.method === "DELETE") {
        // Delete from both folders
        const enFile = join(postsFolder, "en", `${req.body.slug}.md`);
        const viFile = join(postsFolder, "vi", `${req.body.slug}.md`);

        if (fs.existsSync(enFile)) fs.unlinkSync(enFile);
        if (fs.existsSync(viFile)) fs.unlinkSync(viFile);

        return res.status(200).json({ status: "DONE" });
    }

    return res.status(405).json({ message: "Method not allowed" });
}
