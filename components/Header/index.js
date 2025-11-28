import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../Button";
import ContactForm from "../ContactForm";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

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
                                {data.name}.
                            </h1>
                            <div className="flex items-center">
                                <Popover.Button>
                                    <img
                                        className="h-5"
                                        src={`/images/${!open ? "menu.svg" : "cancel.svg"}`}
                                    ></img>
                                </Popover.Button>
                            </div>
                        </div>
                        <Popover.Panel
                            className="absolute right-0 z-10 w-11/12 p-4 bg-white border-2 border-neo-black shadow-neo rounded-none"
                        >
                            <div className="grid grid-cols-1 gap-2">
                                <Button onClick={() => router.pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")} classes="first:ml-1">
                                    Home
                                </Button>
                                {data.showBlog && (
                                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                                )}
                                {data.showResume && (
                                    <Button onClick={() => router.push("/resume")}>Resume</Button>
                                )}
                                <Button onClick={handleScheduleCallClick}>Contact</Button>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
            <div className="sticky-header mt-10 hidden flex-row items-center justify-between top-0 z-40 tablet:flex pb-2 bg-transparent">
                <h1
                    onClick={() => router.push("/")}
                    className="font-heading font-bold cursor-pointer mob:p-2 laptop:p-0 text-3xl text-neo-black"
                >
                    {data.name}.
                </h1>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => router.pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")} 
                        className="font-heading font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4"
                    >
                        Home
                    </button>
                    {data.showBlog && (
                        <button onClick={() => router.push("/blog")} className="font-heading font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4">Blog</button>
                    )}
                    {data.showResume && (
                        <button onClick={() => router.push("/resume")} className="font-heading font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4">Resume</button>
                    )}
                    <Button onClick={handleScheduleCallClick} type="primary" classes="!rounded-full !bg-neo-yellow !text-neo-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] !border-2 !border-neo-black hover:!translate-x-[2px] hover:!translate-y-[2px]">
                        Contact
                    </Button>
                </div>
            </div>
            {showForm && (
                <ContactForm onClose={handleCloseForm} />
            )}
        </>
    );
};

export default Header;
