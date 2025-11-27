import Head from "next/head";
import Router, { useRouter } from "next/router";
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
        <div className="flex flex-col min-h-screen bg-neo-bg">
            {data.showCursor && <Cursor />}
            <Head>
                <title>Blog</title>
            </Head>
            <div className="container mx-auto relative z-10 px-4">
                <Header isBlog={true} />
            </div>
            <main className="flex-grow pb-48 container mx-auto px-4 laptop:px-0 w-full">
                <div className="mt-16">
                    <h1
                        className="text-center font-heading font-bold uppercase text-neo-black mb-12 text-6xl tablet:text-8xl laptop:text-[8rem] tracking-tighter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        style={{ letterSpacing: "-0.06em" }}
                    >
                        Blog.
                    </h1>
                    <div className="grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12">
                        {posts && posts.map((post) => (
                            <div
                                className="cursor-pointer bg-white border-4 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col hover:scale-105 transition-transform duration-200"
                                key={post.slug}
                                onClick={() => Router.push(`/blog/${post.slug}`)}
                            >
                                <div className="overflow-hidden border-b-4 border-neo-black rounded-t-xl bg-white">
                                    <img
                                        className="w-full h-60 object-cover"
                                        src={post.image}
                                        alt={post.title}
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col font-body text-neo-black">
                                    <h2 className="text-3xl font-heading font-bold uppercase mb-2 text-neo-black">
                                        {post.title}
                                    </h2>
                                    <p className="text-base mb-4 flex-grow">
                                        {post.preview}
                                    </p>
                                    <span className="text-sm font-heading font-bold uppercase opacity-60 text-right block mt-auto">
                                        {ISOToDate(post.date)}
                                    </span>
                                    {process.env.NODE_ENV === "development" && mounted && (
                                        <div className="mt-4">
                                            <Button
                                                onClick={e => { e.stopPropagation(); deleteBlog(post.slug); }}
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {process.env.NODE_ENV === "development" && mounted && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <Button onClick={createBlog} type={"primary"}>
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
    const posts = getAllPosts([
        "slug",
        "title",
        "image",
        "preview",
        "author",
        "date",
    ]);
    return {
        props: {
            posts: [...posts],
        },
    };
}

export default Blog;
