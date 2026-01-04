import React, { useState } from "react";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import { useTheme } from "next-themes";

import "react-datepicker/dist/react-datepicker.css";

const BlogEditor = ({ post, close, refresh }) => {
    const { theme } = useTheme();
    const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");
    const [currentLang, setCurrentLang] = useState("en");
    
    // Shared fields (same for both languages)
    const [sharedFields, setSharedFields] = useState({
        date: post.date || new Date().toISOString(),
        image: post.image || "",
    });
    
    // Language-specific content
    const [enContent, setEnContent] = useState({
        title: post.en?.title || post.title || "",
        tagline: post.en?.tagline || post.tagline || "",
        preview: post.en?.preview || post.preview || "",
        content: post.en?.content || post.content || "",
    });
    
    const [viContent, setViContent] = useState({
        title: post.vi?.title || post.title || "",
        tagline: post.vi?.tagline || post.tagline || "",
        preview: post.vi?.preview || post.preview || "",
        content: post.vi?.content || post.content || "",
    });

    const currentContent = currentLang === "en" ? enContent : viContent;
    const setCurrentContent = currentLang === "en" ? setEnContent : setViContent;

    const savePost = async () => {
        if (process.env.NODE_ENV === "development") {
            await fetch("/api/blog/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug: post.slug,
                    shared: sharedFields,
                    en: enContent,
                    vi: viContent,
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
                            <h1 className="text-4xl">{currentContent.title || "Untitled"}</h1>
                            <div className="flex items-center">
                                <Button onClick={savePost} type="primary">
                                    Save Both Languages
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
                        {/* Language Toggle */}
                        <div className="flex items-center mt-4 gap-2">
                            <span className="text-sm opacity-50 mr-2">Language:</span>
                            <button
                                onClick={() => setCurrentLang("en")}
                                className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${
                                    currentLang === "en" 
                                        ? "bg-blue-500 text-white border-blue-500" 
                                        : "bg-transparent border-gray-300 hover:border-blue-400"
                                }`}
                            >
                                🇺🇸 English
                            </button>
                            <button
                                onClick={() => setCurrentLang("vi")}
                                className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${
                                    currentLang === "vi" 
                                        ? "bg-green-500 text-white border-green-500" 
                                        : "bg-transparent border-gray-300 hover:border-green-400"
                                }`}
                            >
                                🇻🇳 Vietnamese
                            </button>
                        </div>
                    </div>
                </div>
                
                {currentTabs === "BLOGDETAILS" && (
                    <div className="mt-10">
                        {/* Shared Fields */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="font-bold text-lg mb-4 opacity-70">Shared Fields (Same for all languages)</h3>
                            <div className="mt-5 flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Date</label>
                                <DatePicker
                                    selected={new Date(sharedFields.date)}
                                    className={inputClass}
                                    onChange={(date) => {
                                        setSharedFields({
                                            ...sharedFields,
                                            date: date.toISOString(),
                                        });
                                    }}
                                />
                            </div>
                            <div className="mt-5 flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Image URL</label>
                                <input
                                    value={sharedFields.image}
                                    onChange={(e) =>
                                        setSharedFields({
                                            ...sharedFields,
                                            image: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>
                        
                        {/* Language-specific Fields */}
                        <div className={`p-4 rounded-lg border-2 ${currentLang === "en" ? "border-blue-200" : "border-green-200"}`}>
                            <h3 className="font-bold text-lg mb-4">
                                {currentLang === "en" ? "🇺🇸 English Content" : "🇻🇳 Vietnamese Content"}
                            </h3>
                            <div className="mt-5 flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Title</label>
                                <input
                                    value={currentContent.title}
                                    onChange={(e) =>
                                        setCurrentContent({
                                            ...currentContent,
                                            title: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    type="text"
                                    placeholder={currentLang === "en" ? "Enter English title..." : "Nhập tiêu đề tiếng Việt..."}
                                />
                            </div>
                            <div className="mt-5 flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Tagline</label>
                                <input
                                    value={currentContent.tagline}
                                    onChange={(e) =>
                                        setCurrentContent({
                                            ...currentContent,
                                            tagline: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    type="text"
                                    placeholder={currentLang === "en" ? "Enter English tagline..." : "Nhập mô tả ngắn tiếng Việt..."}
                                />
                            </div>
                            <div className="mt-5 flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Preview (SEO)</label>
                                <textarea
                                    value={currentContent.preview}
                                    onChange={(e) =>
                                        setCurrentContent({
                                            ...currentContent,
                                            preview: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    placeholder={currentLang === "en" ? "Enter English preview..." : "Nhập mô tả SEO tiếng Việt..."}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentTabs === "CONTENT" && (
                    <div className="mt-10">
                        <div className={`p-4 rounded-lg border-2 ${currentLang === "en" ? "border-blue-200" : "border-green-200"}`}>
                            <h3 className="font-bold text-lg mb-4">
                                {currentLang === "en" ? "🇺🇸 English Content (Markdown)" : "🇻🇳 Vietnamese Content (Markdown)"}
                            </h3>
                            <div className="flex flex-col items-center">
                                <label className="w-full text-sx opacity-50">Content</label>
                                <TextareaAutosize
                                    className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                                    value={currentContent.content}
                                    onChange={(e) =>
                                        setCurrentContent({
                                            ...currentContent,
                                            content: e.target.value,
                                        })
                                    }
                                    placeholder={currentLang === "en" ? "Write your blog post in English..." : "Viết bài blog bằng tiếng Việt..."}
                                    minRows={10}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogEditor;

