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

        let el = document.getElementById("contact-form-portal");
        if (!el) {
            el = document.createElement("div");
            el.setAttribute("id", "contact-form-portal");
            document.body.appendChild(el);
        }

        modalRoot.current = el;
        setPortalElement(el);

        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
            if (el && el.parentElement && el.childElementCount === 0) {
                el.parentElement.removeChild(el);
            }
        };
    }, [handleClickOutside]);

    const currentTheme = mounted ? theme || resolvedTheme : "light";

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

    if (!mounted || !portalElement) return null;

    const formContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 cursor-none"
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
                    className={`relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                        currentTheme === "dark"
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                    }`}
                >
                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className={`absolute top-5 right-5 z-10 p-1 border-2 border-transparent hover:border-black transition-all ${
                             currentTheme === "dark" ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"
                        }`}
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Form content */}
                    <div className="p-8">
                        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">
                            Get In Touch
                        </h2>

                        <p
                            className={`mb-8 text-base font-medium ${
                                currentTheme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }`}
                        >
                            Fill out the form and I&apos;ll get back to you ASAP.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {formError && (
                                <div className="border-2 border-red-500 bg-red-100 text-red-600 p-2 font-bold text-sm">
                                    {formError}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="name"
                                    className={`block text-sm font-bold mb-2 uppercase tracking-wide ${
                                        currentTheme === "dark"
                                            ? "text-white"
                                            : "text-black"
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
                                    className={`block w-full px-4 py-3 text-base font-medium border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white placeholder-gray-500"
                                            : "bg-white text-black placeholder-gray-400"
                                    }`}
                                    placeholder="YOUR NAME"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-bold mb-2 uppercase tracking-wide ${
                                        currentTheme === "dark"
                                            ? "text-white"
                                            : "text-black"
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
                                    className={`block w-full px-4 py-3 text-base font-medium border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white placeholder-gray-500"
                                            : "bg-white text-black placeholder-gray-400"
                                    }`}
                                    placeholder="YOUR.EMAIL@EXAMPLE.COM"
                                />
                                {emailError && (
                                    <p className="text-red-500 text-xs mt-1 font-bold">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className={`block text-sm font-bold mb-2 uppercase tracking-wide ${
                                        currentTheme === "dark"
                                            ? "text-white"
                                            : "text-black"
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
                                    className={`block w-full px-4 py-3 text-base font-medium border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                        currentTheme === "dark"
                                            ? "bg-gray-800 text-white placeholder-gray-500"
                                            : "bg-white text-black placeholder-gray-400"
                                    }`}
                                    placeholder="YOUR MESSAGE HERE..."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-6 text-base font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
                                        currentTheme === "dark"
                                            ? `bg-neo-yellow text-black ${
                                                  isSubmitting
                                                      ? "opacity-70 cursor-not-allowed"
                                                      : ""
                                              }`
                                            : `bg-neo-yellow text-black ${
                                                  isSubmitting
                                                      ? "opacity-70 cursor-not-allowed"
                                                      : ""
                                              }`
                                    }`}
                                >
                                    {isSubmitting
                                        ? "SENDING..."
                                        : "SEND MESSAGE"}
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
