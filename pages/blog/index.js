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
const Blog = ({ posts }) => {
    const showBlog = useRef(data.showBlog);
    const text = useRef();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

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
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const createBlog = () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            alert("Please login to create blog posts");
            return;
        }

        fetch("/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    setIsAuthenticated(false);
                    localStorage.removeItem("auth_token");
                    alert("Session expired. Please login again");
                    return;
                }
                router.reload(window.location.pathname);
            })
            .catch((err) => {
                console.error("Create blog error:", err);
                alert("Failed to create blog post");
            });
    };

    const deleteBlog = (slug) => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            alert("Please login to delete blog posts");
            return;
        }

        fetch("/api/blog", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                slug,
            }),
        })
            .then((res) => {
                if (res.status === 401) {
                    setIsAuthenticated(false);
                    localStorage.removeItem("auth_token");
                    alert("Session expired. Please login again");
                    return;
                }
                router.reload(window.location.pathname);
            })
            .catch((err) => {
                console.error("Delete blog error:", err);
                alert("Failed to delete blog post");
            });
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
                    <div className="mt-10">
                        <h1
                            ref={text}
                            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
                        >
                            Blog.
                        </h1>
                        <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                            {posts &&
                                posts.map((post) => (
                                    <div
                                        className="cursor-pointer relative"
                                        key={post.slug}
                                        onClick={() =>
                                            Router.push(`/blog/${post.slug}`)
                                        }
                                    >
                                        <img
                                            className="w-full h-60 rounded-lg shadow-lg object-cover"
                                            src={post.image}
                                            alt={post.title}
                                        ></img>
                                        <h2 className="mt-5 text-4xl">
                                            {post.title}
                                        </h2>
                                        <p className="mt-2 opacity-50 text-lg">
                                            {post.preview}
                                        </p>
                                        <span className="text-sm mt-5 opacity-25">
                                            {ISOToDate(post.date)}
                                        </span>
                                        {process.env.NODE_ENV ===
                                            "development" &&
                                            mounted && (
                                                <div className="absolute top-0 right-0">
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
                                                </div>
                                            )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {isAuthenticated && (
                    <div className="fixed bottom-0 right-0 m-5">
                        <Button onClick={createBlog} type={"primary"}>
                            Create Blog
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
