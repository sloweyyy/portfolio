import React, { useRef, useState } from "react";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";

const BlogPost = ({ post }) => {
    const [showEditor, setShowEditor] = useState(false);
    const textOne = useRef();
    const textTwo = useRef();
    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
    }, []);

    return (
        <>
            <Head>
                <title>{"Blog - " + post.title}</title>
                <meta name="description" content={post.preview} />
            </Head>
            {data.showCursor && <Cursor />}

            <div
                className={`container mx-auto mt-16 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog={true} />
                <div className="mt-16 flex flex-col">
                    <div className="w-full overflow-hidden rounded-lg shadow-lg max-h-[500px] flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                        <img
                            className="w-full object-contain max-h-[500px]"
                            src={post.image}
                            alt={post.title}
                        />
                    </div>
                    <h1
                        ref={textOne}
                        className="mt-14 text-4xl mob:text-2xl laptop:text-6xl text-bold"
                    >
                        {post.title}
                    </h1>
                    <h2
                        ref={textTwo}
                        className="mt-6 text-xl max-w-4xl text-darkgray opacity-50"
                    >
                        {post.tagline}
                    </h2>
                </div>
                <div className="mt-12">
                    <ContentSection content={post.content}></ContentSection>
                </div>
                <Footer />
            </div>
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-6 right-6">
                    <Button
                        onClick={() => setShowEditor(true)}
                        type={"primary"}
                    >
                        Edit this blog
                    </Button>
                </div>
            )}

            {showEditor && (
                <BlogEditor
                    post={post}
                    close={() => setShowEditor(false)}
                    refresh={() => router.reload(window.location.pathname)}
                />
            )}
        </>
    );
};

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        "date",
        "slug",
        "preview",
        "title",
        "tagline",
        "preview",
        "image",
        "content",
    ]);

    return {
        props: {
            post: {
                ...post,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug"]);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
export default BlogPost;
