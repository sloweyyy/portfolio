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
import { Toaster } from "../components/Toaster";
import { toast } from "sonner";

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

    // Alternating taglines state
    const [currentTaglineTwo, setCurrentTaglineTwo] = useState(0);
    const [currentTaglineThree, setCurrentTaglineThree] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Prepare the tagline options with fallbacks to the main taglines
    const taglineTwoOptions = [
        data.headerTaglineTwo,
        ...(data.alternateTaglinesTwo || []),
    ];

    const taglineThreeOptions = [
        data.headerTaglineThree,
        ...(data.alternateTaglinesThree || []),
    ];

    // Animation for cycling through taglines
    useEffect(() => {
        // Only run the animation if we have alternate taglines
        if (taglineTwoOptions.length <= 1) return;

        const taglineTwoInterval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTaglineTwo(
                    (prev) => (prev + 1) % taglineTwoOptions.length
                );
                setIsAnimating(false);
            }, 500); // Half a second for fade out
        }, 3000); // Change every 3 seconds

        return () => clearInterval(taglineTwoInterval);
    }, [taglineTwoOptions.length]);

    useEffect(() => {
        // Only run the animation if we have alternate taglines
        if (taglineThreeOptions.length <= 1) return;

        const taglineThreeInterval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTaglineThree(
                    (prev) => (prev + 1) % taglineThreeOptions.length
                );
                setIsAnimating(false);
            }, 500);
        }, 3000);

        // Start the third tagline cycle with a slight delay
        const initialDelay = setTimeout(() => {
            return () => clearInterval(taglineThreeInterval);
        }, 1500);

        return () => {
            clearInterval(taglineThreeInterval);
            clearTimeout(initialDelay);
        };
    }, [taglineThreeOptions.length]);

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
    }, [router]);

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
    }, [konami, router]);

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
            <Toaster />
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
                    <div className="laptop:mt-30 mt-20">
                        <div className="mt-10 tagline-container space-y-0">
                            <h1
                                ref={textOne}
                                className="tagline text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-4/5 mob:w-full laptop:w-4/5 mb-0 laptop:mb-1"
                            >
                                {data.headerTaglineOne}
                            </h1>
                            <h1
                                ref={textTwo}
                                className={`tagline text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5 mb-0 laptop:mb-1 ${
                                    isAnimating ? "fade-out" : "fade-in"
                                }`}
                            >
                                {taglineTwoOptions[currentTaglineTwo]}
                            </h1>
                            <h1
                                ref={textThree}
                                className={`tagline text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5 mb-0 laptop:mb-1 ${
                                    isAnimating ? "fade-out" : "fade-in"
                                }`}
                            >
                                {taglineThreeOptions[currentTaglineThree]}
                            </h1>
                            <h1
                                ref={textFour}
                                className="tagline text-3xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 w-full laptop:w-4/5"
                            >
                                {data.headerTaglineFour}
                            </h1>
                        </div>

                        <Socials className="mt-8 laptop:mt-12" />
                    </div>

                    <div
                        className="mt-20 laptop:mt-60 p-2 laptop:p-0"
                        ref={workRef}
                    >
                        <h1 className="text-2xl text-bold mb-4">Work.</h1>

                        <div className="mt-8 laptop:mt-14 grid grid-cols-1 tablet:grid-cols-2 gap-6">
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

                    <div className="mt-20 laptop:mt-60 p-2 laptop:p-0">
                        <div className="ml-2 laptop:ml-0">
                            <h1 className="text-2xl mb-4">Services.</h1>
                            <div className="mt-8 laptop:mt-14 grid grid-cols-1 laptop:grid-cols-2 gap-6">
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
                        className="mt-20 laptop:mt-60 p-2 laptop:p-0"
                        ref={aboutRef}
                    >
                        <div className="mx-2 laptop:mx-0 laptop:w-3/5">
                            <h1 className="text-2xl mb-4">About.</h1>
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
