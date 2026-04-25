import React, { useRef, useState } from "react";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import BlogBanner, { hasBlogBanner } from "../../components/BlogBanner";
import Head from "next/head";
import { useIsomorphicLayoutEffect, ISOToDate } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";

const RELATED_COLORS = [
    "var(--neo-purple)",
    "var(--neo-yellow)",
    "var(--neo-green)",
    "var(--neo-pink)",
    "var(--neo-red)",
];

const BlogPost = ({ post, relatedPosts, readingTime }) => {
    const [showEditor, setShowEditor] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const textOne = useRef();
    const textTwo = useRef();
    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
    }, []);

    return (
        <div className={`flex flex-col min-h-screen bg-neo-bg ${data.showCursor && "cursor-none"}`}>
            <Head>
                <title>{"Blog - " + post.title}</title>
                <meta name="description" content={post.preview} />
            </Head>
            {data.showCursor && <Cursor />}
            <div className="container mx-auto relative z-10 px-4">
                <Header />
            </div>
            <main className="flex-grow pt-10 pb-24 w-full container mx-auto px-4 laptop:px-0">
                <div className="flex flex-col">
                    {hasBlogBanner(post.slug) ? (
                        <div className="w-full overflow-hidden rounded-xl border-4 border-neo-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <BlogBanner slug={post.slug} />
                        </div>
                    ) : (
                        <div
                            className="w-full overflow-hidden rounded-t-xl border-4 border-neo-black bg-neo-black flex items-center justify-center"
                            style={{ height: "460px" }}
                        >
                            <img
                                className="max-w-full max-h-full w-auto h-auto block"
                                src={post.image}
                                alt={post.title}
                            />
                        </div>
                    )}
                    <h1
                        ref={textOne}
                        className="mt-14 text-4xl mob:text-2xl laptop:text-6xl text-bold text-neo-black font-heading font-extrabold"
                    >
                        {post.title}
                    </h1>
                    <div
                        className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-black/60"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        <span>By Truong Le Vinh Phuc</span>
                        <span aria-hidden="true">•</span>
                        <span>{ISOToDate(post.date)}</span>
                        <span aria-hidden="true">•</span>
                        <span>~ {readingTime} min read</span>
                    </div>
                    <h2
                        ref={textTwo}
                        className="mt-6 text-xl max-w-4xl text-neo-black opacity-70 font-body"
                    >
                        {post.tagline}
                    </h2>
                </div>
                <div className="mt-4 text-neo-black font-body">
                    <ContentSection content={post.content}></ContentSection>
                </div>

                <div className="mt-16 py-6 border-t-2 border-b-2 border-neo-black flex flex-wrap gap-4 items-center justify-between">
                    <div>
                        <p className="font-heading font-bold uppercase text-xs tracking-[0.2em] text-black/55 mb-1.5">
                            Thanks for reading
                        </p>
                        <p className="font-body font-semibold text-lg text-neo-black">
                            Got thoughts? I&rsquo;d love to hear them.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowContact(true)}
                        className="relative inline-block group"
                        aria-label="Open contact form"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-neo-black rounded-full translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"
                        />
                        <span className="relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-neo-yellow border-[3px] border-neo-black rounded-full font-heading font-bold uppercase text-sm tracking-[0.12em] text-neo-black">
                            Get in touch <span aria-hidden="true">→</span>
                        </span>
                    </button>
                </div>
            </main>

            {relatedPosts.length > 0 && (
                <section className="bg-white border-t-[3px] border-b-[3px] border-neo-black py-14">
                    <div className="container mx-auto px-4 laptop:px-0">
                        <h3 className="font-heading font-bold uppercase text-3xl tablet:text-4xl text-neo-black mb-8">
                            Keep reading <span aria-hidden="true">→</span>
                        </h3>
                        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
                            {relatedPosts.map((p, i) => (
                                <Link
                                    key={p.slug}
                                    href={`/blog/${p.slug}`}
                                    className="group block bg-white border-[3px] border-neo-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <div
                                        className="h-1.5 mb-3.5 border-2 border-neo-black"
                                        style={{ background: RELATED_COLORS[i % RELATED_COLORS.length] }}
                                    />
                                    <p className="font-heading font-bold uppercase text-[10px] tracking-[0.15em] text-black/55 mb-2">
                                        {ISOToDate(p.date)}
                                    </p>
                                    <h4 className="font-heading font-bold uppercase text-lg leading-tight text-neo-black mb-2.5">
                                        {p.title}
                                    </h4>
                                    <p className="text-sm text-black/70 leading-relaxed">
                                        {p.preview}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
            {showContact && <ContactForm onClose={() => setShowContact(false)} />}
        </div>
    );
};

function estimateReadingTime(markdown) {
    const text = String(markdown || "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
        .replace(/\[[^\]]*]\([^)]*\)/g, " ")
        .replace(/[#>*_\-]/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export async function getStaticProps({ params }) {
    const fields = [
        "date",
        "slug",
        "preview",
        "title",
        "tagline",
        "image",
        "content",
    ];

    const post = getPostBySlug(params.slug, fields, "en");
    const readingTime = estimateReadingTime(post.content);

    const allPosts = getAllPosts(
        ["slug", "title", "preview", "date"],
        "en"
    );
    const relatedPosts = allPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);

    return {
        props: {
            post: { ...post },
            relatedPosts,
            readingTime,
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug"], "en");
    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

export default BlogPost;
