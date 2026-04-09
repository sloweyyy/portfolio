import React, { useState } from "react";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import { useTheme } from "next-themes";

import "react-datepicker/dist/react-datepicker.css";

const BlogEditor = ({ post, close, refresh }) => {
    const { theme } = useTheme();
    const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");

    const [date, setDate] = useState(post.date || new Date().toISOString());
    const [image, setImage] = useState(post.image || "");
    const [title, setTitle] = useState(post.title || "");
    const [tagline, setTagline] = useState(post.tagline || "");
    const [preview, setPreview] = useState(post.preview || "");
    const [content, setContent] = useState(post.content || "");

    const savePost = async () => {
        if (process.env.NODE_ENV === "development") {
            await fetch("/api/blog/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug: post.slug,
                    date,
                    image,
                    title,
                    tagline,
                    preview,
                    content,
                }),
            }).then((data) => {
                if (data.status === 200) {
                    close();
                    refresh();
                }
            });
        } else {
            alert("This thing only works in development mode.");
        }
    };

    const inputClass = "w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2";

    return (
        <div
            className={`fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center ${
                theme === "dark" ? "bg-black" : "bg-white"
            }`}
        >
            <div className="container my-20">
                <div className="mt-10">
                    <div className="z-10 sticky top-12">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl">{title || "Untitled"}</h1>
                            <div className="flex items-center">
                                <Button onClick={savePost} type="primary">
                                    Save
                                </Button>
                                <Button onClick={close}>Close</Button>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <Button
                                onClick={() => setCurrentTabs("BLOGDETAILS")}
                                type={currentTabs === "BLOGDETAILS" && "primary"}
                            >
                                Blog Details
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("CONTENT")}
                                type={currentTabs === "CONTENT" && "primary"}
                            >
                                Content
                            </Button>
                        </div>
                    </div>
                </div>

                {currentTabs === "BLOGDETAILS" && (
                    <div className="mt-10">
                        <div className="mt-5 flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Date</label>
                            <DatePicker
                                selected={new Date(date)}
                                className={inputClass}
                                onChange={(d) => setDate(d.toISOString())}
                            />
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Image URL</label>
                            <input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className={inputClass}
                                type="text"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={inputClass}
                                type="text"
                                placeholder="Enter title..."
                            />
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Tagline</label>
                            <input
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value)}
                                className={inputClass}
                                type="text"
                                placeholder="Enter tagline..."
                            />
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Preview (SEO)</label>
                            <textarea
                                value={preview}
                                onChange={(e) => setPreview(e.target.value)}
                                className={inputClass}
                                placeholder="Enter preview..."
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {currentTabs === "CONTENT" && (
                    <div className="mt-10">
                        <div className="flex flex-col items-center">
                            <label className="w-full text-sx opacity-50">Content (Markdown)</label>
                            <TextareaAutosize
                                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your blog post..."
                                minRows={10}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogEditor;
