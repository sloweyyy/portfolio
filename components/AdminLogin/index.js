import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";

const AdminLogin = ({ onLogin }) => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await onLogin(loginData);
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const currentTheme = mounted ? theme || resolvedTheme : "light";
    const isDark = currentTheme === "dark";

    if (!mounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient circles */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-300/30 to-blue-300/30 dark:from-purple-800/20 dark:to-blue-800/20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-300/30 to-pink-300/30 dark:from-indigo-900/20 dark:to-pink-900/20 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

                {/* Animated floating elements */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${
                            i % 3 === 0
                                ? "bg-blue-500/10 dark:bg-blue-400/10"
                                : i % 3 === 1
                                ? "bg-purple-500/10 dark:bg-purple-400/10"
                                : "bg-indigo-500/10 dark:bg-indigo-400/10"
                        }`}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.4 + 0.2,
                        }}
                        animate={{
                            x: [
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth,
                            ],
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                            ],
                            rotate: [0, Math.random() * 360],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        style={{
                            width: `${Math.random() * 200 + 50}px`,
                            height: `${Math.random() * 200 + 50}px`,
                            opacity: Math.random() * 0.2 + 0.05,
                        }}
                    />
                ))}

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.02]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md p-8 mx-4 z-10"
            >
                {/* Login card */}
                <motion.div
                    className="relative bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20 dark:border-gray-800/50"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Shimmering gradient top border */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 bg-size-200 animate-shimmer"></div>

                    {/* Highlight accents */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>

                    {/* Header */}
                    <div className="p-8 pb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                className="w-20 h-20 mb-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 dark:shadow-indigo-800/20"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 25,
                                    delay: 0.5,
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </motion.div>
                            <motion.h1
                                className="text-3xl font-bold mb-1 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Admin Access
                            </motion.h1>
                            <motion.p
                                className="text-gray-500 dark:text-gray-400 text-center mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                Enter your credentials to access the admin
                                dashboard
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <div className="p-8 pt-0">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{
                                        opacity: 1,
                                        height: "auto",
                                        y: 0,
                                    }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                    className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-300 rounded-xl text-sm overflow-hidden backdrop-blur-sm"
                                >
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2 text-red-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {error}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                    Username
                                </label>
                                <motion.div
                                    className={`relative transition-all duration-300 ${
                                        focusedField === "username"
                                            ? "scale-[1.02] shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5 z-10"
                                            : "scale-100"
                                    }`}
                                >
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-colors duration-300 ${
                                                focusedField === "username"
                                                    ? "text-blue-500 dark:text-blue-400"
                                                    : "text-gray-400 dark:text-gray-500"
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={loginData.username}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                username: e.target.value,
                                            })
                                        }
                                        onFocus={() =>
                                            setFocusedField("username")
                                        }
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none transition-all duration-300 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white backdrop-blur-sm ${
                                            focusedField === "username"
                                                ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10"
                                                : "border-gray-200 dark:border-gray-700"
                                        }`}
                                        placeholder="Enter your username"
                                        required
                                    />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                    Password
                                </label>
                                <motion.div
                                    className={`relative transition-all duration-300 ${
                                        focusedField === "password"
                                            ? "scale-[1.02] shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5 z-10"
                                            : "scale-100"
                                    }`}
                                >
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-colors duration-300 ${
                                                focusedField === "password"
                                                    ? "text-blue-500 dark:text-blue-400"
                                                    : "text-gray-400 dark:text-gray-500"
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                password: e.target.value,
                                            })
                                        }
                                        onFocus={() =>
                                            setFocusedField("password")
                                        }
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none transition-all duration-300 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white backdrop-blur-sm ${
                                            focusedField === "password"
                                                ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10"
                                                : "border-gray-200 dark:border-gray-700"
                                        }`}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
                                        >
                                            {showPassword ? (
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="flex items-center justify-between mt-6"
                            >
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.1 }}
                                className="pt-2"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 px-4 flex items-center justify-center rounded-xl text-white font-medium transition-all duration-300 ${
                                        loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 dark:shadow-blue-800/30"
                                    }`}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    </div>

                    {/* Bottom wave pattern */}
                    <div className="h-12 w-full overflow-hidden relative">
                        <div className="absolute bottom-0 left-0 right-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                                className="w-full h-full"
                            >
                                <path
                                    fill={isDark ? "#111827" : "#f3f4f6"}
                                    fillOpacity="1"
                                    d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,213.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Footer text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                    Protected area. Only authorized personnel.
                </motion.p>
            </motion.div>

            {/* CSS for grid pattern */}
            <style jsx global>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(
                            to right,
                            ${isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.05)"}
                                1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            ${isDark
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.05)"}
                                1px,
                            transparent 1px
                        );
                }

                .bg-size-200 {
                    background-size: 200% 200%;
                }

                .animate-shimmer {
                    animation: shimmer 3s linear infinite;
                }

                @keyframes shimmer {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
