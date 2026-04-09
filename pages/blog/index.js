import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate } from "../../utils";
import Footer from "../../components/Footer";
const Blog = ({ posts }) => {
    const showBlog = useRef(data.showBlog);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const createBlog = () => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }).then(() => router.reload(window.location.pathname));
        } else {
            alert("This thing only works in development mode.");
        }
    };

    const deleteBlog = (slug) => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/blog", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
            }).then(() => router.reload(window.location.pathname));
        } else {
            alert("This thing only works in development mode.");
        }
    };

    if (!showBlog.current) return null;

    return (
        <div className={`flex flex-col min-h-screen bg-neo-bg ${data.showCursor && "cursor-none"}`}>
            {data.showCursor && <Cursor />}
            <Head>
                <title>Blog</title>
            </Head>
            <div className="w-full max-w-[1440px] mx-auto px-4 laptop:px-14 relative z-10">
                <Header />
            </div>
            <main className="flex-grow pb-56 tablet:pb-48 container mx-auto px-4 laptop:px-0 w-full">
                <div className="mt-16">
                    <h1
                        className="text-center font-heading font-bold uppercase text-neo-black mb-12 text-6xl tablet:text-8xl laptop:text-[8rem] tracking-tighter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        style={{ letterSpacing: "-0.06em" }}
                    >
                        Blog.
                    </h1>
                    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 laptop:gap-10">
                        {posts &&
                            posts.map((post) => (
                                <article
                                    className="bg-white border-4 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col"
                                    key={post.slug}
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block h-full rounded-xl focus-visible:outline-none"
                                        aria-label={`Read post: ${post.title}`}
                                    >
                                        <div className="overflow-hidden border-b-4 border-neo-black rounded-t-xl bg-[#f4f4f2] p-4">
                                            <img
                                                className="w-full h-52 object-contain"
                                                src={post.image}
                                                alt={`${post.title} cover image`}
                                            />
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col font-body text-neo-black">
                                            <h2 className="text-3xl font-heading font-bold uppercase mb-2 text-neo-black leading-tight">
                                                {post.title}
                                            </h2>
                                            <p className="text-base mb-4 flex-grow text-black/85 leading-relaxed">
                                                {post.preview}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between gap-3">
                                                <span className="text-sm font-heading font-bold uppercase text-black/70">
                                                    {ISOToDate(post.date)}
                                                </span>
                                                <span className="text-sm font-heading font-bold uppercase underline decoration-2 underline-offset-4">
                                                    Read post
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    {process.env.NODE_ENV === "development" && mounted && (
                                        <div className="px-6 pb-6">
                                            <Button
                                                onClick={() => deleteBlog(post.slug)}
                                                type="primary"
                                                classes="w-full"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </article>
                            ))}
                    </div>
                </div>
                {process.env.NODE_ENV === "development" && mounted && (
                    <div className="fixed bottom-4 left-4 right-4 tablet:left-auto tablet:right-6 z-50">
                        <Button onClick={createBlog} type="primary" classes="w-full tablet:w-auto">
                            Add New Post +
                        </Button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    const { getAllPosts } = await import("../../utils/api");
    const fields = ["slug", "title", "image", "preview", "author", "date"];

    const posts = getAllPosts(fields, "en");

    return {
        props: {
            posts: [...posts],
        },
    };
}

export default Blog;
