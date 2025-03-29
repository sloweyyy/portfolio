import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Button from "../Button";
import { toast } from "sonner";

const ContactForm = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formError, setFormError] = useState("");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        setVisible(true);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const currentTheme = mounted ? theme || resolvedTheme : "light";

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            handleClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            toast.success("Message sent successfully!");

            setTimeout(() => {
                handleClose();
            }, 500);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to send message. Please try again later.");
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                ref={formRef}
                className={`relative w-full max-w-md transform transition-all duration-300 ${
                    visible ? "scale-100" : "scale-95"
                }`}
            >
                {/* Form container */}
                <div
                    className={`relative rounded-lg overflow-hidden shadow-xl ${
                        currentTheme === "dark"
                            ? "bg-gray-900 text-white border border-gray-800"
                            : "bg-white text-black border border-gray-100"
                    }`}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Form content */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2">
                            Get In Touch
                        </h2>

                        <p
                            className={`mb-6 text-sm ${
                                currentTheme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }`}
                        >
                            Fill out the form and I'll get back to you as soon
                            as possible.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {formError && (
                                <p className="text-red-500 text-sm">
                                    {formError}
                                </p>
                            )}

                            <div>
                                <label
                                    htmlFor="name"
                                    className={`block text-sm font-medium mb-1 ${
                                        currentTheme === "dark"
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={`block w-full px-3 py-2 text-sm rounded-md focus:ring-1 focus:outline-none transition-colors ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                            : "bg-gray-50 text-black border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-medium mb-1 ${
                                        currentTheme === "dark"
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`block w-full px-3 py-2 text-sm rounded-md focus:ring-1 focus:outline-none transition-colors ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                            : "bg-gray-50 text-black border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                    placeholder="your.email@example.com"
                                />
                                {emailError && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className={`block text-sm font-medium mb-1 ${
                                        currentTheme === "dark"
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className={`block w-full px-3 py-2 text-sm rounded-md focus:ring-1 focus:outline-none transition-colors ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                            : "bg-gray-50 text-black border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                    placeholder="Your message here..."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 text-sm rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                        currentTheme === "dark"
                                            ? "bg-white text-black hover:bg-gray-100 focus:ring-gray-500"
                                            : "bg-black text-white hover:bg-gray-800 focus:ring-gray-500"
                                    }`}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
