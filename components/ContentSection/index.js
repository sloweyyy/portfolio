import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const components = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
            <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    a({ href, children, ...props }) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    },
    img({ src, alt, ...props }) {
        return (
            <figure className="my-10 flex flex-col items-center">
                <a href={src} target="_blank" rel="noopener noreferrer">
                    <img
                        src={src}
                        alt={alt || ""}
                        className="max-w-2xl w-full rounded-xl border-4 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-zoom-in"
                        loading="lazy"
                        {...props}
                    />
                </a>
                {alt && (
                    <figcaption className="mt-3 text-sm font-body text-black/50 text-center">
                        {alt}
                    </figcaption>
                )}
            </figure>
        );
    },
};

const ContentSection = ({ content }) => {
    return (
        <ReactMarkdown components={components} className="markdown-class">
            {content}
        </ReactMarkdown>
    );
};

export default ContentSection;
