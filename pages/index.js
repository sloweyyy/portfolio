import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import data from "../data/portfolio.json";

export default function Home() {
    const { theme } = useTheme();
    const workRef = useRef();
    const aboutRef = useRef();
    const textOne = useRef();
    const textTwo = useRef();
    const textThree = useRef();
    const textFour = useRef();
    const [konami, setKonami] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const konamiCode = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ];

        const handleKeyPress = (event) => {
            // Original keyboard shortcut
            if (
                (event.metaKey && event.key === "e") ||
                (event.ctrlKey && event.altKey && event.key === "e")
            ) {
                event.preventDefault();
                router.push("/edit");
            }

            setKonami((prev) => {
                const nextKonami = [...prev, event.key];
                if (nextKonami.length > konamiCode.length) {
                    return nextKonami.slice(1);
                }
                return nextKonami;
            });
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    useEffect(() => {
        const konamiCode = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ];

        if (
            konami.length === konamiCode.length &&
            konami.every((key, index) => key === konamiCode[index])
        ) {
            router.push("/edit");
        }
    }, [konami]);

    const handleWorkScroll = () => {
        window.scrollTo({
            top: workRef.current.offsetTop - 25,
            left: 0,
            behavior: "smooth",
        });
    };

    const handleAboutScroll = () => {
        window.scrollTo({
            top: aboutRef.current.offsetTop - 25,
            left: 0,
            behavior: "smooth",
        });
    };

    useIsomorphicLayoutEffect(() => {
        stagger(
            [
                textOne.current,
                textTwo.current,
                textThree.current,
                textFour.current,
            ],
            { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
            { y: 0, x: 0, transform: "scale(1)" }
        );
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === "dark" ? "dark" : "light"}
            />
            <div className={`relative ${data.showCursor && "cursor-none"}`}>
                {data.showCursor && <Cursor />}
                <Head>
                    <title>SloWey | Portfolio</title>
                    <meta
                        name="description"
                        content="SloWey's developer portfolio"
                        key="desc"
                    />
                    <meta property="og:title" content="SloWey Portfolio" />
                    <meta
                        property="og:description"
                        content="SloWey's developer portfolio"
                    />
                    <meta
                        property="og:image"
                        content="https://i.imgur.com/LJAuciv.png"
                    />
                </Head>

                <div className="gradient-circle"></div>
                <div className="gradient-circle-bottom"></div>

                <div className="container mx-auto mb-10">
                    <Header
                        handleWorkScroll={handleWorkScroll}
                        handleAboutScroll={handleAboutScroll}
                    />
                    <div className="laptop:mt-20 mt-10">
                        <div className="mt-5">
                            <h1
                                ref={textOne}
                                className="text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-4/5 mob:w-full laptop:w-4/5"
                            >
                                {data.headerTaglineOne}
                            </h1>
                            <h1
                                ref={textTwo}
                                className="text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5"
                            >
                                {data.headerTaglineTwo}
                            </h1>
                            <h1
                                ref={textThree}
                                className="text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5"
                            >
                                {data.headerTaglineThree}
                            </h1>
                            <h1
                                ref={textFour}
                                className="text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5"
                            >
                                {data.headerTaglineFour}
                            </h1>
                        </div>

                        <Socials className="mt-2 laptop:mt-5" />
                    </div>

                    <div
                        className="mt-10 laptop:mt-30 p-2 laptop:p-0"
                        ref={workRef}
                    >
                        <h1 className="text-2xl text-bold">Work.</h1>

                        <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-5">
                            {data.projects.map((project) => (
                                <WorkCard
                                    key={project.id}
                                    img={project.imageSrc}
                                    name={project.title}
                                    description={project.description}
                                    onClick={() => window.open(project.url)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
                        <div className="ml-2 laptop:ml-0">
                            <h1 className="text-2xl mb-2">Services.</h1>
                            <div className="mt-5 grid grid-cols-1 laptop:grid-cols-2 gap-6">
                                {data.services.map((service, index) => (
                                    <ServiceCard
                                        key={index}
                                        name={service.title}
                                        description={service.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* This button should not go into production */}
                    {showEdit && (
                        <div className="fixed bottom-5 right-5">
                            <Link href="/edit">
                                <Button type="primary">Edit Data</Button>
                            </Link>
                        </div>
                    )}
                    <div
                        className="mt-10 laptop:mt-40 p-2 laptop:p-0"
                        ref={aboutRef}
                    >
                        <div className="mx-2 laptop:mx-0 laptop:w-3/5">
                            <h1 className="text-2xl mb-2">About.</h1>
                            <p className="text-lg laptop:text-2xl font-light">
                                {data.aboutpara}
                            </p>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    );
}
