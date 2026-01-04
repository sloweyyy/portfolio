import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

// Get the posts directory for a specific language
const getPostsDir = (lang = 'en') => {
    const langDir = join(postsDirectory, lang);
    // Fallback to 'en' if language folder doesn't exist
    if (fs.existsSync(langDir)) {
        return langDir;
    }
    return join(postsDirectory, 'en');
};

export function getPostSlugs(lang = 'en') {
    const dir = getPostsDir(lang);
    return fs.readdirSync(dir);
}

export function getPostBySlug(slug, fields = [], lang = 'en') {
    const realSlug = slug.replace(/\.md$/, "");
    const dir = getPostsDir(lang);
    const fullPath = join(dir, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const items = {};

    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }

        if (typeof data[field] !== "undefined") {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllPosts(fields = [], lang = 'en') {
    const slugs = getPostSlugs(lang);
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields, lang))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

