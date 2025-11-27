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
        <div className="flex flex-col min-h-screen bg-neo-bg">
            <Head>
                <title>{"Blog - " + post.title}</title>
                <meta name="description" content={post.preview} />
            </Head>
            {data.showCursor && <Cursor />}
            <div className="container mx-auto relative z-10 px-4">
                <Header isBlog={true} />
            </div>
            <main className="flex-grow pt-10 pb-48 w-full container mx-auto px-4 laptop:px-0">
                <div className="flex flex-col">
                    <div className="w-full overflow-hidden max-h-[500px] rounded-t-xl border-4 border-neo-black bg-white flex items-center justify-center">
                        <img
                            className="w-full object-cover max-h-[500px]"
                            src={post.image}
                            alt={post.title}
                        />
                    </div>
                    <h1
                        ref={textOne}
                        className="mt-14 text-4xl mob:text-2xl laptop:text-6xl text-bold text-neo-black font-heading font-extrabold"
                    >
                        {post.title}
                    </h1>
                    <h2
                        ref={textTwo}
                        className="mt-6 text-xl max-w-4xl text-neo-black opacity-70 font-body"
                    >
                        {post.tagline}
                    </h2>
                </div>
                <div className="mt-12 text-neo-black font-body">
                    <ContentSection content={post.content}></ContentSection>
                </div>
            </main>
            <Footer />
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
        </div>
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
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}
export default BlogPost;
