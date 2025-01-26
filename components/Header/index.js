import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import ContactForm from "../ContactForm";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const { name, showBlog, showResume } = data;
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
    }, [mounted, theme]);

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
                                {data.darkMode && (
                                    <Button
                                        onClick={() =>
                                            setTheme(
                                                theme === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }
                                    >
                                        <img
                                            className="h-6"
                                            src={`/images/${
                                                theme === "dark"
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
                                                ? theme === "dark"
                                                    ? "menu-white.svg"
                                                    : "menu.svg"
                                                : theme === "light"
                                                ? "cancel.svg"
                                                : "cancel-white.svg"
                                        }`}
                                    ></img>
                                </Popover.Button>
                            </div>
                        </div>
                        <Popover.Panel
                            className={`absolute right-0 z-10 w-11/12 p-4 ${
                                theme === "dark" ? "bg-slate-800" : "bg-white"
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
                                                window.open(
                                                    "mailto:sloweycontact@gmail.com"
                                                )
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
                    theme === "light" ? "bg-white" : ""
                } dark:text-white top-0 z-10 tablet:flex`}
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
                        {mounted && theme && data.darkMode && (
                            <Button
                                onClick={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            >
                                <img
                                    className="h-6"
                                    src={`/images/${
                                        theme === "dark"
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

                        {mounted && theme && data.darkMode && (
                            <Button
                                onClick={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            >
                                <img
                                    className="h-6"
                                    src={`/images/${
                                        theme === "dark"
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
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ContactForm onClose={handleCloseForm} />
                </div>
            )}
        </>
    );
};

export default Header;
