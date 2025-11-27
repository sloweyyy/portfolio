import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { verifyToken } from "../utils/auth";
import { toast } from "sonner";
import { Toaster } from "../components/Toaster";

import yourData from "../data/portfolio.json";
import Cursor from "../components/Cursor";

const Edit = () => {
    const [data, setData] = useState(yourData);
    const [currentTabs, setCurrentTabs] = useState("HEADER");
    const { theme } = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("auth_token");

                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                try {
                    const user = verifyToken(token);
                    if (user && user.role === "admin") {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem("auth_token");
                        setIsAuthenticated(false);
                        console.log(
                            "Token verification failed or not an admin user"
                        );
                        toast.error(
                            "Your session has expired. Please login again."
                        );
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                    localStorage.removeItem("auth_token");
                    setIsAuthenticated(false);
                    toast.error("Authentication error. Please login again.");
                }

                setLoading(false);
            } catch (error) {
                console.error("Auth check error:", error);
                setIsAuthenticated(false);
                setLoading(false);
            }
        };

        checkAuth();
    }, [theme]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("auth_token", data.token);
                setIsAuthenticated(true);
                toast.success("Login successful");
            } else {
                toast.error(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    const saveData = async () => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            setIsAuthenticated(false);
            toast.error("Session expired. Please login again");
            return;
        }

        try {
            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Received non-JSON response from server");
            }

            const result = await res.json();

            if (res.status === 401) {
                setIsAuthenticated(false);
                localStorage.removeItem("auth_token");
                toast.error("Session expired. Please login again");
                return;
            }

            if (res.ok) {
                toast.success(result.message || "Changes saved successfully");
            } else {
                toast.error(result.message || "Failed to save changes");
            }
        } catch (error) {
            console.error("Save error:", error);
            if (error.message.includes("non-JSON")) {
                setIsAuthenticated(false);
                localStorage.removeItem("auth_token");
                toast.error("Authentication error. Please login again.");
            } else {
                toast.error("Error saving changes. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${
                    theme === "dark"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-900"
                }`}
            >
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <>
                <Toaster />
                <div
                    className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden`}
                >
                    {/* Background elements - more subtle */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Subtler gradient circles */}
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-gray-200/40 to-blue-100/30 dark:from-gray-800/40 dark:to-gray-700/30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-gray-100/30 to-gray-200/40 dark:from-gray-800/30 dark:to-gray-700/40 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

                        {/* Subtle grid overlay */}
                        <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-[0.015] dark:opacity-[0.03]"></div>
                    </div>

                    <div className="w-full max-w-md p-8 space-y-6 relative z-10">
                        <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                            {/* Subtle top border */}
                            <div className="h-1 w-full bg-gradient-to-r from-gray-300 via-blue-400 to-gray-300 dark:from-gray-700 dark:via-blue-600 dark:to-gray-700 bg-size-200 animate-shimmer"></div>

                            <div className="p-8">
                                <div className="flex flex-col items-center mb-8">
                                    <div className="w-16 h-16 mb-5 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
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
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        Admin Login
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                                        Enter your credentials to access the
                                        admin dashboard
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
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
                                                        username:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="Enter username"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
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
                                                type="password"
                                                value={loginData.password}
                                                onChange={(e) =>
                                                    setLoginData({
                                                        ...loginData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="Enter password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        Sign In
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Footer text */}
                        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Protected area. Only authorized personnel.
                        </p>
                    </div>

                    {/* CSS for grid pattern */}
                    <style jsx global>{`
                        .bg-grid-pattern {
                            background-image: linear-gradient(
                                    to right,
                                    ${theme === "dark"
                                            ? "rgba(255,255,255,0.05)"
                                            : "rgba(0,0,0,0.05)"}
                                        1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    to bottom,
                                    ${theme === "dark"
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
            </>
        );
    }

    // Project Handler
    const editProjects = (projectIndex, editProject) => {
        let copyProjects = data.projects;
        copyProjects[projectIndex] = { ...editProject };
        setData({ ...data, projects: copyProjects });
    };

    const addProject = () => {
        setData({
            ...data,
            projects: [
                ...data.projects,
                {
                    id: uuidv4(),
                    title: "New Project",
                    description: "Web Design & Development",
                    imageSrc:
                        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHxwYXN0ZWx8ZW58MHx8MHw%3D&auto=format&fit=crop&w=400&q=60",

                    url: "http://chetanverma.com/",
                },
            ],
        });
    };

    const deleteProject = (id) => {
        const copyProjects = data.projects;
        copyProjects = copyProjects.filter((project) => project.id !== id);
        setData({ ...data, projects: copyProjects });
    };

    // Services Handler
    const editServices = (serviceIndex, editService) => {
        let copyServices = data.services;
        copyServices[serviceIndex] = { ...editService };
        setData({ ...data, services: copyServices });
    };

    const addService = () => {
        setData({
            ...data,
            services: [
                ...data.services,
                {
                    id: uuidv4(),
                    title: "New Service",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                },
            ],
        });
    };

    const deleteService = (id) => {
        const copyServices = data.services;
        copyServices = copyServices.filter((service) => service.id !== id);
        setData({ ...data, services: copyServices });
    };

    // Socials Handler
    const editSocials = (socialIndex, editSocial) => {
        let copySocials = data.socials;
        copySocials[socialIndex] = { ...editSocial };
        setData({ ...data, socials: copySocials });
    };

    const addSocials = () => {
        setData({
            ...data,
            socials: [
                ...data.socials,
                {
                    id: uuidv4(),
                    title: "New Link",
                    link: "www.chetanverma.com",
                },
            ],
        });
    };

    const deleteSocials = (id) => {
        const copySocials = data.socials;
        copySocials = copySocials.filter((social) => social.id !== id);
        setData({ ...data, socials: copySocials });
    };

    // Resume
    const handleAddExperiences = () => {
        setData({
            ...data,
            resume: {
                ...data.resume,
                experiences: [
                    ...data.resume.experiences,
                    {
                        id: uuidv4(),
                        dates: "Enter Dates",
                        type: "Full Time",
                        position: "Frontend Engineer at X",
                        bullets: [
                            "Worked on the frontend of a React application",
                        ],
                    },
                ],
            },
        });
    };

    const handleEditExperiences = (index, editExperience) => {
        let copyExperiences = data.resume.experiences;
        copyExperiences[index] = { ...editExperience };
        setData({
            ...data,
            resume: { ...data.resume, experiences: copyExperiences },
        });
    };

    return (
        <>
            <Toaster />
            <div
                className={`container mx-auto ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog></Header>
                {data.showCursor && <Cursor />}
                <div className="mt-10">
                    <div
                        className={`${
                            theme === "dark" ? "bg-transparent" : "bg-white"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl">Dashboard</h1>
                            <div className="flex items-center">
                                <Button onClick={saveData} type="primary">
                                    Save
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Button
                                onClick={() => setCurrentTabs("HEADER")}
                                type={currentTabs === "HEADER" && "primary"}
                            >
                                Header
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("PROJECTS")}
                                type={currentTabs === "PROJECTS" && "primary"}
                            >
                                Projects
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("SERVICES")}
                                type={currentTabs === "SERVICES" && "primary"}
                            >
                                Services
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("ABOUT")}
                                type={currentTabs === "ABOUT" && "primary"}
                            >
                                About
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("SOCIAL")}
                                type={currentTabs === "SOCIAL" && "primary"}
                            >
                                Social
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("RESUME")}
                                type={currentTabs === "RESUME" && "primary"}
                            >
                                Resume
                            </Button>
                        </div>
                    </div>
                    {/* HEADER */}
                    {currentTabs === "HEADER" && (
                        <div className="mt-10">
                            <div className="flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Name
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-sx opacity-50">
                                    Header Tagline One
                                </label>
                                <input
                                    value={data.headerTaglineOne}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineOne: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Two
                                </label>
                                <input
                                    value={data.headerTaglineTwo}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineTwo: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>

                            {/* Alternate Taglines Two */}
                            <div className="mt-8 mb-4">
                                <div className="flex items-center">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Alternate Taglines Two
                                    </label>
                                    <div className="w-4/5 ml-10">
                                        <Button
                                            onClick={() => {
                                                const updated = [
                                                    ...(data.alternateTaglinesTwo ||
                                                        []),
                                                    "",
                                                ];
                                                setData({
                                                    ...data,
                                                    alternateTaglinesTwo:
                                                        updated,
                                                });
                                            }}
                                        >
                                            Add Alternate
                                        </Button>
                                    </div>
                                </div>

                                {(data.alternateTaglinesTwo || []).map(
                                    (tagline, index) => (
                                        <div
                                            key={index}
                                            className="mt-3 flex items-center"
                                        >
                                            <div className="w-1/5"></div>
                                            <div className="w-4/5 ml-10 flex items-center">
                                                <input
                                                    value={tagline}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...data.alternateTaglinesTwo,
                                                        ];
                                                        updated[index] =
                                                            e.target.value;
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesTwo:
                                                                updated,
                                                        });
                                                    }}
                                                    className="flex-grow p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                />
                                                <Button
                                                    classes="ml-2 bg-red-500 text-white hover:bg-red-600"
                                                    onClick={() => {
                                                        const updated = [
                                                            ...data.alternateTaglinesTwo,
                                                        ];
                                                        updated.splice(
                                                            index,
                                                            1
                                                        );
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesTwo:
                                                                updated,
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Three
                                </label>
                                <input
                                    value={data.headerTaglineThree}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineThree: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>

                            {/* Alternate Taglines Three */}
                            <div className="mt-8 mb-4">
                                <div className="flex items-center">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Alternate Taglines Three
                                    </label>
                                    <div className="w-4/5 ml-10">
                                        <Button
                                            onClick={() => {
                                                const updated = [
                                                    ...(data.alternateTaglinesThree ||
                                                        []),
                                                    "",
                                                ];
                                                setData({
                                                    ...data,
                                                    alternateTaglinesThree:
                                                        updated,
                                                });
                                            }}
                                        >
                                            Add Alternate
                                        </Button>
                                    </div>
                                </div>

                                {(data.alternateTaglinesThree || []).map(
                                    (tagline, index) => (
                                        <div
                                            key={index}
                                            className="mt-3 flex items-center"
                                        >
                                            <div className="w-1/5"></div>
                                            <div className="w-4/5 ml-10 flex items-center">
                                                <input
                                                    value={tagline}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...data.alternateTaglinesThree,
                                                        ];
                                                        updated[index] =
                                                            e.target.value;
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesThree:
                                                                updated,
                                                        });
                                                    }}
                                                    className="flex-grow p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                />
                                                <Button
                                                    classes="ml-2 bg-red-500 text-white hover:bg-red-600"
                                                    onClick={() => {
                                                        const updated = [
                                                            ...data.alternateTaglinesThree,
                                                        ];
                                                        updated.splice(
                                                            index,
                                                            1
                                                        );
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesThree:
                                                                updated,
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Four
                                </label>
                                <input
                                    value={data.headerTaglineFour}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineFour: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Blog
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({ ...data, showBlog: true })
                                        }
                                        type={data.showBlog && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showBlog: false,
                                            })
                                        }
                                        classes={
                                            !data.showBlog &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Dark Mode
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({ ...data, darkMode: true })
                                        }
                                        type={data.darkMode && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                darkMode: false,
                                            })
                                        }
                                        classes={
                                            !data.darkMode &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Show Resume
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showResume: true,
                                            })
                                        }
                                        type={data.showResume && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showResume: false,
                                            })
                                        }
                                        classes={
                                            !data.showResume &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Custom Cursor
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showCursor: true,
                                            })
                                        }
                                        type={data.showCursor && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showCursor: false,
                                            })
                                        }
                                        classes={
                                            !data.showCursor &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* PROJECTS */}
                    {currentTabs === "PROJECTS" && (
                        <>
                            <div className="mt-10">
                                {data.projects.map((project, index) => (
                                    <div className="mt-10" key={project.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {project.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteProject(project.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>

                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={project.title}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Description
                                            </label>
                                            <input
                                                value={project.description}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Image Source
                                            </label>
                                            <input
                                                value={project.imageSrc}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        imageSrc:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                url
                                            </label>
                                            <input
                                                value={project.url}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        url: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                ))}
                            </div>

                            <div className="my-10">
                                <Button onClick={addProject} type="primary">
                                    Add Project +
                                </Button>
                            </div>
                        </>
                    )}
                    {/* SERVICES */}
                    {currentTabs === "SERVICES" && (
                        <>
                            <div className="mt-10">
                                {data.services.map((service, index) => (
                                    <div key={service.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {service.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteService(service.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={service.title}
                                                onChange={(e) =>
                                                    editServices(index, {
                                                        ...service,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Description
                                            </label>
                                            <textarea
                                                value={service.description}
                                                onChange={(e) =>
                                                    editServices(index, {
                                                        ...service,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                            ></textarea>
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                ))}
                            </div>
                            <div className="my-10">
                                <Button onClick={addService} type="primary">
                                    Add Service +
                                </Button>
                            </div>
                        </>
                    )}
                    {currentTabs === "ABOUT" && (
                        <div className="mt-10">
                            <h1 className="text-2xl">About</h1>
                            <textarea
                                className="w-full h-96 mt-10 p-2 rounded-md shadow-md border"
                                value={data.aboutpara}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        aboutpara: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                    )}
                    {currentTabs === "SOCIAL" && (
                        <div className="mt-10">
                            {data.socials.map((social, index) => (
                                <>
                                    <div key={social.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {social.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteSocials(social.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={social.title}
                                                onChange={(e) =>
                                                    editSocials(index, {
                                                        ...social,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Link
                                            </label>
                                            <input
                                                value={social.link}
                                                onChange={(e) =>
                                                    editSocials(index, {
                                                        ...social,
                                                        link: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            />
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                </>
                            ))}
                            <div className="my-10">
                                <Button onClick={addSocials} type="primary">
                                    Add Social +
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentTabs === "RESUME" && (
                        <div className="mt-10">
                            <h1>Main</h1>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-sx opacity-50">
                                    Tagline
                                </label>
                                <input
                                    value={data.resume.tagline}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            resume: {
                                                ...data.resume,
                                                tagline: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="flex items-center mt-5">
                                <label className="w-1/5 text-lg opacity-50">
                                    Description
                                </label>
                                <textarea
                                    value={data.resume.description}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            resume: {
                                                ...data.resume,
                                                description: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                ></textarea>
                            </div>
                            <hr className="my-10"></hr>

                            <h1>Experiences</h1>
                            <div className="mt-10">
                                {data.resume.experiences.map(
                                    (experiences, index) => (
                                        <div
                                            className="mt-5"
                                            key={experiences.id}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-2xl">
                                                    {experiences.position}
                                                </h1>
                                                <Button
                                                    onClick={() =>
                                                        deleteProject(
                                                            experiences.id
                                                        )
                                                    }
                                                    type="primary"
                                                >
                                                    Delete
                                                </Button>
                                            </div>

                                            <div className="flex items-center mt-5">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Dates
                                                </label>
                                                <input
                                                    value={experiences.dates}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                dates: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Type
                                                </label>
                                                <input
                                                    value={experiences.type}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                type: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Position
                                                </label>
                                                <input
                                                    value={experiences.position}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                position:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="mt-2 flex">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Bullets
                                                </label>
                                                <div className="w-4/5 ml-10 flex flex-col">
                                                    <input
                                                        value={
                                                            experiences.bullets
                                                        }
                                                        onChange={(e) =>
                                                            handleEditExperiences(
                                                                index,
                                                                {
                                                                    ...experiences,
                                                                    bullets:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        }
                                                        placeholder="Bullet One, Bullet Two, Bullet Three"
                                                        className="p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="my-10">
                                <Button
                                    onClick={handleAddExperiences}
                                    type="primary"
                                >
                                    Add Experience +
                                </Button>
                            </div>
                            <hr className="my-10"></hr>
                            <div className="mt-10">
                                <h1>Education</h1>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Name
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityName
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Dates
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityDate
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityDate:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Detail
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityPara
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityPara:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                            </div>
                            <hr className="my-10"></hr>
                            <div className="mt-10">
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Languages
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.languages.map(
                                            (language, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={language}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    languages: [
                                                                        ...data.resume.languages.slice(
                                                                            0,
                                                                            index
                                                                        ),
                                                                        e.target
                                                                            .value,
                                                                        ...data.resume.languages.slice(
                                                                            index +
                                                                                1
                                                                        ),
                                                                    ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    languages:
                                                                        data.resume.languages.filter(
                                                                            (
                                                                                value,
                                                                                i
                                                                            ) =>
                                                                                index !==
                                                                                i
                                                                        ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            type="primary"
                                            classes="hover:scale-100"
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        languages: [
                                                            ...data.resume
                                                                .languages,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-10"></hr>
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Frameworks
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.frameworks.map(
                                            (framework, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={framework}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    frameworks:
                                                                        [
                                                                            ...data.resume.frameworks.slice(
                                                                                0,
                                                                                index
                                                                            ),
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            ...data.resume.frameworks.slice(
                                                                                index +
                                                                                    1
                                                                            ),
                                                                        ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    frameworks:
                                                                        data.resume.frameworks.filter(
                                                                            (
                                                                                value,
                                                                                i
                                                                            ) =>
                                                                                index !==
                                                                                i
                                                                        ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        frameworks: [
                                                            ...data.resume
                                                                .frameworks,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                            type="primary"
                                            classes="hover:scale-100"
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-10"></hr>
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Others
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.others.map(
                                            (other, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={other}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    others: [
                                                                        ...data.resume.others.slice(
                                                                            0,
                                                                            index
                                                                        ),
                                                                        e.target
                                                                            .value,
                                                                        ...data.resume.others.slice(
                                                                            index +
                                                                                1
                                                                        ),
                                                                    ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    others: data.resume.others.filter(
                                                                        (
                                                                            value,
                                                                            i
                                                                        ) =>
                                                                            index !==
                                                                            i
                                                                    ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        others: [
                                                            ...data.resume
                                                                .others,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                            type="primary"
                                            classes="hover:scale-100"
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Edit;
