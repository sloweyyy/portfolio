import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
import { Toaster } from "../components/Toaster";
import ProjectSection from "../components/ProjectSection";
import ShowcaseSection from "../components/ShowcaseSection";
import { motion } from "framer-motion";

import data from "../data/portfolio.json";

export default function Home() {
    const workRef = useRef();
    const aboutRef = useRef();
    const [konami, setKonami] = useState([]);
    const router = useRouter();

    const [currentTaglineTwo, setCurrentTaglineTwo] = useState(0);
    const [currentTaglineThree, setCurrentTaglineThree] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const taglineTwoOptions = [
        data.headerTaglineTwo,
        ...(data.alternateTaglinesTwo || []),
    ];

    const taglineThreeOptions = [
        data.headerTaglineThree,
        ...(data.alternateTaglinesThree || []),
    ];

    useEffect(() => {
        if (taglineTwoOptions.length <= 1) return;

        const taglineTwoInterval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTaglineTwo(
                    (prev) => (prev + 1) % taglineTwoOptions.length
                );
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(taglineTwoInterval);
    }, [taglineTwoOptions.length]);

    useEffect(() => {
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

                {/* HERO SECTION - BYOOOOOB STYLE */}
                <div className="bg-neo-bg min-h-screen flex flex-col relative border-b-2 border-neo-black overflow-hidden justify-center items-center">
                    <div className="container mx-auto relative z-10 px-4">
                        <Header
                            handleWorkScroll={handleWorkScroll}
                            handleAboutScroll={handleAboutScroll}
                        />
                        
                        <div className="mt-20 laptop:mt-10 relative flex flex-col items-center justify-center min-h-[70vh]">

                            {/* Sticker 1: Top Left - Yellow Card */}
                            <motion.div 
                                className="absolute top-20 left-0 laptop:left-20 z-20 hidden laptop:block"
                                initial={{ rotate: -10, scale: 0 }}
                                animate={{ rotate: -10, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <div className="bg-neo-yellow border-4 border-neo-black p-4 pb-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-6 w-56 hover:scale-105 transition-transform">
                                    <div className="bg-neo-black h-56 w-full overflow-hidden mb-4 rounded-lg border-2 border-neo-black relative">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover" alt="Sticker" />
                                        <div className="absolute bottom-0 left-0 w-full bg-neo-green text-neo-black text-center font-bold uppercase text-xs py-1 border-t-2 border-neo-black">
                                            SLOWEY
                                        </div>
                                    </div>
                                    <div className="text-center font-heading font-bold uppercase text-xl">CREATOR</div>
                                </div>
                            </motion.div>

                            {/* Sticker 2: Bottom Right - Purple Arch */}
                            <motion.div 
                                className="absolute bottom-20 right-0 laptop:right-40 z-20 hidden laptop:block"
                                initial={{ rotate: 10, scale: 0 }}
                                animate={{ rotate: 10, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <div className="bg-[#8A2BE2] border-4 border-neo-black p-2 pb-6 rounded-t-[10rem] rounded-b-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-6 w-48 hover:scale-105 transition-transform">
                                    <div className="bg-white h-48 w-full overflow-hidden mb-2 rounded-t-[9rem] rounded-b-lg border-2 border-neo-black">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" alt="Sticker" />
                                    </div>
                                    <div className="text-white text-center font-heading font-bold uppercase text-lg">DEVELOPER</div>
                                </div>
                            </motion.div>

                            {/* Sticker 3: Floating Shape - Orange Star */}
                            <motion.div
                                className="absolute top-10 right-20 z-10 hidden laptop:block text-[#ff5e00]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                                    <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35L50 0Z" stroke="black" strokeWidth="3" />
                                </svg>
                            </motion.div>

                            {/* Main Text */}
                            <div className="text-center relative z-10 max-w-6xl mx-auto mt-20">
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h1 className="text-6xl tablet:text-8xl laptop:text-[11rem] font-heading font-bold uppercase leading-[0.85] text-neo-black tracking-tighter mb-6">
                                        HELLO,
                                    </h1>
                                </motion.div>
                                
                                <div className="flex flex-col laptop:flex-row justify-center items-center gap-4 laptop:gap-8">
                                    <motion.h1 
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="text-6xl tablet:text-8xl laptop:text-[11rem] font-heading font-bold uppercase leading-[0.85] text-neo-black tracking-tighter"
                                    >
                                        I&apos;M
                                    </motion.h1>
                                    
                                    {/* Rotating Role Box */}
                                    <motion.div 
                                        className="relative h-24 tablet:h-32 laptop:h-48 min-w-[300px] laptop:min-w-[500px]"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                    >
                                        <div className="absolute inset-0 bg-neo-pink border-4 border-neo-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 flex items-center justify-center rounded-xl overflow-hidden">
                                            <div className="flex gap-4 items-center px-4">
                                                <div className="text-4xl laptop:text-7xl">👀</div>
                                                <span className="text-4xl tablet:text-6xl laptop:text-8xl font-heading font-bold uppercase text-neo-black tracking-tighter">
                                                    SLOWEY
                                                </span>
                                                <div className="text-4xl laptop:text-7xl">🚀</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="mt-6"
                                >
                                    <h1 className="text-6xl tablet:text-8xl laptop:text-[11rem] font-heading font-bold uppercase leading-[0.85] text-neo-black tracking-tighter">
                                        WITH <span className="text-neo-purple">SOLUTIONS</span>
                                    </h1>
                                </motion.div>
                            </div>

                            <motion.p 
                                className="mt-12 text-xl font-body text-neo-black/70 max-w-xl text-center mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Find the perfect technical partner for your business goals.
                            </motion.p>

                            <motion.div 
                                className="mt-12 flex justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6, type: "spring" }}
                            >
                                <div className="relative group cursor-pointer" onClick={() => window.open("mailto:hello@slowey.com")}>
                                    <div className="absolute inset-0 bg-neo-yellow rounded-full border-2 border-neo-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                    <div className="relative bg-white px-8 py-3 rounded-full border-2 border-neo-black flex items-center gap-2 font-heading font-bold uppercase text-sm tracking-wider">
                                        GET A QUOTE <span className="bg-neo-yellow px-1 text-[10px] border border-neo-black">IN 2 MINS</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* CONTENT SECTION - NEUTRAL */}
                <div className="bg-neo-bg">
                    <ProjectSection projects={data.projects} />

                    {/* SHOWCASE SECTION */}
                    <ShowcaseSection />

                    <div className="container mx-auto px-4 laptop:px-0">
                        {/* Removed old WorkCard grid */}

                        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
                            <div className="ml-2 laptop:ml-0">
                                <h1 className="text-4xl font-heading font-bold uppercase mb-10 text-neo-black">Services</h1>
                                <div className="mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-10">
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

                        <div
                            className="mt-20 laptop:mt-40 p-2 laptop:p-0 pb-80"
                            ref={aboutRef}
                        >
                            <div className="mx-2 laptop:mx-0 laptop:w-4/5">
                                <h1 className="text-4xl font-heading font-bold uppercase mb-10 text-neo-black">About</h1>
                                <p className="text-xl laptop:text-3xl font-body leading-relaxed text-neo-black">
                                    {data.aboutpara}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER SECTION - YELLOW */}
                <Footer />
            </div>
        </>
    );
}
