import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import { motion } from "framer-motion";

const Blog = ({ posts }) => {
    const showBlog = useRef(data.showBlog);
    const text = useRef();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useIsomorphicLayoutEffect(() => {
        stagger(
            [text.current],
            { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
            { y: 0, x: 0, transform: "scale(1)" }
        );
        if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
        else router.push("/");
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    const createBlog = () => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                router.reload(window.location.pathname);
            });
        } else {
            alert("This thing only works in development mode.");
        }
    };

    const deleteBlog = (slug) => {
        if (process.env.NODE_ENV === "development") {
            fetch("/api/blog", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug,
                }),
            }).then(() => {
                router.reload(window.location.pathname);
            });
        } else {
            alert("This thing only works in development mode.");
        }
    };
    return (
        showBlog.current && (
            <>
                {data.showCursor && <Cursor />}
                <Head>
                    <title>Blog</title>
                </Head>
                <div
                    className={`container mx-auto mb-10 ${
                        data.showCursor && "cursor-none"
                    }`}
                >
                    <Header isBlog={true}></Header>
                    <div className="mt-16">
                        <h1
                            ref={text}
                            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
                        >
                            Blog.
                        </h1>
                        <div className="mt-16 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-12">
                            {posts &&
                                posts.map((post) => (
                                    <motion.div
                                        className="cursor-pointer relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden flex flex-col h-full"
                                        key={post.slug}
                                        onClick={() =>
                                            Router.push(`/blog/${post.slug}`)
                                        }
                                        whileHover={{
                                            y: -8,
                                            boxShadow:
                                                "0 20px 30px rgba(0,0,0,0.15)",
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            duration: 0.3,
                                        }}
                                        style={{
                                            boxShadow:
                                                "0 4px 15px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        <div className="overflow-hidden">
                                            <motion.img
                                                className="w-full h-60 object-cover"
                                                src={post.image}
                                                alt={post.title}
                                                whileHover={{
                                                    scale: 1.08,
                                                }}
                                                transition={{
                                                    type: "tween",
                                                    ease: "easeOut",
                                                    duration: 0.6,
                                                }}
                                            />
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <motion.h2
                                                className="text-2xl font-bold mb-3"
                                                whileHover={{ x: 3 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                }}
                                            >
                                                {post.title}
                                            </motion.h2>
                                            <p className="text-base opacity-70 mb-4 flex-grow">
                                                {post.preview}
                                            </p>
                                            <span className="text-sm opacity-50 mt-auto">
                                                {ISOToDate(post.date)}
                                            </span>
                                        </div>
                                        {process.env.NODE_ENV ===
                                            "development" &&
                                            mounted && (
                                                <motion.div
                                                    className="absolute top-3 right-3"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Button
                                                        onClick={(e) => {
                                                            deleteBlog(
                                                                post.slug
                                                            );
                                                            e.stopPropagation();
                                                        }}
                                                        type={"primary"}
                                                    >
                                                        Delete
                                                    </Button>
                                                </motion.div>
                                            )}
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
                {process.env.NODE_ENV === "development" && mounted && (
                    <div className="fixed bottom-6 right-6">
                        <Button onClick={createBlog} type={"primary"}>
                            Add New Post +{" "}
                        </Button>
                    </div>
                )}
            </>
        )
    );
};

export async function getStaticProps() {
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
