import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const ContactForm = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [portalElement, setPortalElement] = useState(null);
    const formRef = useRef(null);
    const modalRoot = useRef(null);

    // Clean immediate close without animations to avoid glitches
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleClickOutside = useCallback(
        (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                handleClose();
            }
        },
        [handleClose]
    );

    useEffect(() => {
        setMounted(true);

        // Use existing portal element or create a new one
        let el = document.getElementById("contact-form-portal");
        if (!el) {
            el = document.createElement("div");
            el.setAttribute("id", "contact-form-portal");
            document.body.appendChild(el);
        }

        modalRoot.current = el;
        setPortalElement(el);

        // Delay adding event listener to avoid initial render issues
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
            // Only remove if we created it and it still exists
            if (el && el.parentElement && el.childElementCount === 0) {
                el.parentElement.removeChild(el);
            }
        };
    }, [handleClickOutside]);

    const currentTheme = mounted ? theme || resolvedTheme : "light";

    // Event handlers with proper stopPropagation
    const handleNameChange = (e) => {
        e.stopPropagation();
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        e.stopPropagation();
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        e.stopPropagation();
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

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
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to send message. Please try again later.");
            setIsSubmitting(false);
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // Don't render anything until mounted and portal element is created
    if (!mounted || !portalElement) return null;

    const formContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                ref={formRef}
                className="relative w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Form container */}
                <div
                    className={`relative rounded-lg overflow-hidden shadow-xl ${
                        currentTheme === "dark"
                            ? "bg-gray-900 text-white border-0"
                            : "bg-white text-black border-0"
                    }`}
                >
                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
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
                            Fill out the form and I&apos;ll get back to you as
                            soon as possible.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                            onClick={(e) => e.stopPropagation()}
                        >
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
                                    onChange={handleNameChange}
                                    onClick={(e) => e.stopPropagation()}
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
                                    onChange={handleEmailChange}
                                    onClick={(e) => e.stopPropagation()}
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
                                    onChange={handleMessageChange}
                                    onClick={(e) => e.stopPropagation()}
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
                                    disabled={isSubmitting}
                                    className={`w-full py-2 px-4 text-sm rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                        currentTheme === "dark"
                                            ? `bg-white text-black hover:bg-gray-100 focus:ring-gray-500 ${
                                                  isSubmitting
                                                      ? "opacity-70 cursor-not-allowed"
                                                      : ""
                                              }`
                                            : `bg-black text-white hover:bg-gray-800 focus:ring-gray-500 ${
                                                  isSubmitting
                                                      ? "opacity-70 cursor-not-allowed"
                                                      : ""
                                              }`
                                    }`}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(formContent, portalElement);
};

export default ContactForm;
