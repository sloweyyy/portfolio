import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/portfolio.json";

const ThemeToggleButton = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? theme || resolvedTheme : "light";
    const isDark = currentTheme === "dark";

    if (!mounted) return null;

    return (
        <motion.button
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-out ${
                currentTheme === "dark"
                    ? "hover:bg-slate-600 text-white"
                    : "hover:bg-slate-100"
            } hover:scale-105 active:scale-100 ${
                data.showCursor && "cursor-none"
            } aspect-square`}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative w-5 h-5 tablet:w-6 tablet:h-6">
                <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                        <motion.img
                            key="moon"
                            src="/images/moon.svg"
                            alt="Dark mode"
                            className="h-5 w-5 tablet:h-6 tablet:w-6 absolute"
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.175, 0.885, 0.32, 1.275],
                                opacity: { duration: 0.2 },
                            }}
                        />
                    ) : (
                        <motion.img
                            key="sun"
                            src="/images/sun.svg"
                            alt="Light mode"
                            className="h-5 w-5 tablet:h-6 tablet:w-6 absolute"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.175, 0.885, 0.32, 1.275], // Bounce effect
                                opacity: { duration: 0.2 },
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
};

export default ThemeToggleButton;
