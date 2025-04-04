import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import ContactForm from "../ContactForm";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
    const router = useRouter();
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const { name, showBlog, showResume } = data;
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use currentTheme to avoid hydration mismatch
    const currentTheme = mounted ? theme || resolvedTheme : "light";

    const handleScheduleCallClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <Popover className="block tablet:hidden mt-5">
                {({ open }) => (
                    <>
                        <div className="flex items-center justify-between p-2 laptop:p-0">
                            <h1
                                onClick={() => router.push("/")}
                                className="font-medium p-2 laptop:p-0 link"
                            >
                                {name}.
                            </h1>

                            <div className="flex items-center">
                                {data.darkMode && mounted && (
                                    <Button
                                        onClick={() =>
                                            setTheme(
                                                currentTheme === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }
                                    >
                                        <img
                                            className="h-6"
                                            src={`/images/${
                                                currentTheme === "dark"
                                                    ? "moon.svg"
                                                    : "sun.svg"
                                            }`}
                                        ></img>
                                    </Button>
                                )}

                                <Popover.Button>
                                    <img
                                        className="h-5"
                                        src={`/images/${
                                            !open
                                                ? currentTheme === "dark"
                                                    ? "menu-white.svg"
                                                    : "menu.svg"
                                                : currentTheme === "light"
                                                ? "cancel.svg"
                                                : "cancel-white.svg"
                                        }`}
                                    ></img>
                                </Popover.Button>
                            </div>
                        </div>
                        <Popover.Panel
                            className={`absolute right-0 z-10 w-11/12 p-4 ${
                                currentTheme === "dark"
                                    ? "bg-slate-800"
                                    : "bg-white"
                            } shadow-md rounded-md`}
                        >
                            {!isBlog ? (
                                <div className="grid grid-cols-1">
                                    <Button onClick={handleWorkScroll}>
                                        Work
                                    </Button>
                                    <Button onClick={handleAboutScroll}>
                                        About
                                    </Button>
                                    {showBlog && (
                                        <Button
                                            onClick={() => router.push("/blog")}
                                        >
                                            Blog
                                        </Button>
                                    )}
                                    {showResume && (
                                        <Button
                                            onClick={() =>
                                                router.push("/resume")
                                            }
                                        >
                                            Resume
                                        </Button>
                                    )}

                                    <Button onClick={handleScheduleCallClick}>
                                        Contact
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1">
                                    <Button
                                        onClick={() => router.push("/")}
                                        classes="first:ml-1"
                                    >
                                        Home
                                    </Button>
                                    {showBlog && (
                                        <Button
                                            onClick={() => router.push("/blog")}
                                        >
                                            Blog
                                        </Button>
                                    )}
                                    {showResume && (
                                        <Button
                                            onClick={() =>
                                                router.push("/resume")
                                            }
                                            classes="first:ml-1"
                                        >
                                            Resume
                                        </Button>
                                    )}

                                    <Button onClick={handleScheduleCallClick}>
                                        Contact
                                    </Button>
                                </div>
                            )}
                        </Popover.Panel>
                    </>
                )}
            </Popover>
            <div
                className={`sticky-header mt-10 hidden flex-row items-center justify-between ${
                    currentTheme === "light" ? "bg-white" : ""
                } dark:text-white top-0 z-40 tablet:flex`}
            >
                <h1
                    onClick={() => router.push("/")}
                    className="font-medium cursor-pointer mob:p-2 laptop:p-0"
                >
                    {name}.
                </h1>
                {!isBlog ? (
                    <div className="flex">
                        <Button onClick={handleWorkScroll}>Work</Button>
                        <Button onClick={handleAboutScroll}>About</Button>
                        {showBlog && (
                            <Button onClick={() => router.push("/blog")}>
                                Blog
                            </Button>
                        )}
                        {showResume && (
                            <Button
                                onClick={() => router.push("/resume")}
                                classes="first:ml-1"
                            >
                                Resume
                            </Button>
                        )}

                        <Button onClick={handleScheduleCallClick}>
                            Contact
                        </Button>
                        {mounted && data.darkMode && (
                            <Button
                                onClick={() =>
                                    setTheme(
                                        currentTheme === "dark"
                                            ? "light"
                                            : "dark"
                                    )
                                }
                            >
                                <img
                                    className="h-6"
                                    src={`/images/${
                                        currentTheme === "dark"
                                            ? "moon.svg"
                                            : "sun.svg"
                                    }`}
                                ></img>
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="flex">
                        <Button onClick={() => router.push("/")}>Home</Button>
                        {showBlog && (
                            <Button onClick={() => router.push("/blog")}>
                                Blog
                            </Button>
                        )}
                        {showResume && (
                            <Button
                                onClick={() => router.push("/resume")}
                                classes="first:ml-1"
                            >
                                Resume
                            </Button>
                        )}

                        <Button onClick={handleScheduleCallClick}>
                            Contact
                        </Button>

                        {mounted && data.darkMode && (
                            <Button
                                onClick={() =>
                                    setTheme(
                                        currentTheme === "dark"
                                            ? "light"
                                            : "dark"
                                    )
                                }
                            >
                                <img
                                    className="h-6"
                                    src={`/images/${
                                        currentTheme === "dark"
                                            ? "moon.svg"
                                            : "sun.svg"
                                    }`}
                                ></img>
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <ContactForm onClose={handleCloseForm} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
