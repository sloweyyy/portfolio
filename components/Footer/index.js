import React, { useState, useEffect } from "react";
import Socials from "../Socials";
import Button from "../Button";
import ContactForm from "../ContactForm";
import { useTheme } from "next-themes";

const Footer = ({}) => {
    const { theme, resolvedTheme } = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use current theme only after component has mounted to avoid hydration mismatch
    const currentTheme = mounted ? theme || resolvedTheme : "light";

    const handleScheduleCallClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
                <div>
                    <h1 className="text-2xl text-bold">Contact.</h1>
                    <div className="mt-10">
                        <div className="relative">
                            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
                                LET&apos;S WORK
                            </h1>
                            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold mb-6">
                                TOGETHER
                            </h1>

                            {/* Simple elegant button */}
                            <button
                                onClick={handleScheduleCallClick}
                                className={`mt-2 px-7 py-2.5 rounded-md font-medium text-sm transition-colors ${
                                    currentTheme === "dark"
                                        ? "bg-white text-black hover:bg-gray-100"
                                        : "bg-black text-white hover:bg-gray-800"
                                }`}
                            >
                                Schedule a call
                            </button>
                        </div>
                        <div className="mt-10">
                            <Socials />
                        </div>
                    </div>
                </div>
            </div>
            {showForm && mounted && <ContactForm onClose={handleCloseForm} />}
        </>
    );
};

export default Footer;
