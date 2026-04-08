import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
import { Toaster } from "../components/Toaster";
import ProjectSection from "../components/ProjectSection";
import ShowcaseSection from "../components/ShowcaseSection";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import data from "../data/portfolio.json";

// Eye Component - follows cursor
const Eye = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setPosition({ x: Math.min(Math.max(x, 25), 75), y: Math.min(Math.max(y, 25), 75) });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="eye">
            <div className="shutter"></div>
            <div className="ball" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}>
                <div className="white-ball"></div>
            </div>
        </div>
    );
};

// Ticker Component
const Ticker = () => {
    const tickerItems = [
        "BUILD AMAZING PRODUCTS",
        "CRAFT BEAUTIFUL INTERFACES", 
        "DEVELOP SCALABLE SOLUTIONS",
        "CREATE IMPACTFUL EXPERIENCES",
        "DESIGN WITH PURPOSE",
        "CODE WITH PASSION",
    ];

    return (
        <div className="w-full bg-neo-deep-purple py-3 overflow-hidden">
            <div className="ticker-wrapper">
                <div className="ticker-content">
                    {[...tickerItems, ...tickerItems].map((item, index) => (
                        <div key={index} className="flex items-center flex-shrink-0">
                            <span className="text-neo-pink font-heading text-xl laptop:text-2xl font-semibold uppercase whitespace-nowrap px-4">
                                {item}
                            </span>
                            <svg className="w-5 h-5 text-neo-pink mx-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



// Team Member Card Component - Byooooob style with floating animation
const TeamMemberCard = ({ name, role, image, rotation, position, color = "yellow", delay = 0 }) => {
    const bgColors = {
        yellow: "bg-neo-yellow",
        orange: "bg-orange-500",
        purple: "bg-neo-deep-purple",
        green: "bg-neo-green",
        pink: "bg-neo-pink",
    };

    // Generate random floating animation values
    const floatX = Math.random() * 40 - 20; // -20 to 20
    const floatY = Math.random() * 30 - 15; // -15 to 15
    const floatRotate = Math.random() * 8 - 4; // -4 to 4
    const duration = 4 + Math.random() * 3; // 4-7 seconds

    return (
        <motion.div 
            className={`absolute ${position} z-20 hidden laptop:block cursor-grab active:cursor-grabbing`}
            initial={{ rotate: rotation, scale: 0, opacity: 0 }}
            animate={{ 
                rotate: rotation,
                scale: 1, 
                opacity: 1,
                x: [0, floatX, -floatX/2, floatX/3, 0],
                y: [0, floatY, -floatY/2, floatY/3, 0],
            }}
            transition={{ 
                delay: delay,
                scale: { type: "spring", stiffness: 100 },
                opacity: { duration: 0.5 },
                x: { duration: duration, repeat: Infinity, ease: "easeInOut" },
                y: { duration: duration + 1, repeat: Infinity, ease: "easeInOut" },
            }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.2}
            whileHover={{ 
                scale: 1.1, 
                rotate: 0,
                zIndex: 30,
                boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)"
            }}
            whileDrag={{ scale: 1.15, rotate: rotation + floatRotate }}
        >
            <div className={`${bgColors[color]} border-3 border-neo-black p-2 pb-3 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-32 laptop:w-40 transition-shadow`}>
                <div className="bg-white h-36 laptop:h-44 w-full overflow-hidden mb-2 rounded-lg border-2 border-neo-black relative">
                    <img src={image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt={name} />
                    <div className="absolute bottom-0 left-0 w-full bg-neo-black text-white text-center font-bold uppercase text-[10px] py-1 border-t-2 border-neo-black">
                        {role}
                    </div>
                </div>
                <div className="text-center font-heading font-bold uppercase text-sm text-neo-black">{name}</div>
            </div>
        </motion.div>
    );
};

// Decorative shapes - Enhanced with more elements
const DecorativeShapes = () => (
    <>
        {/* Green chevrons */}
        <motion.div 
            className="absolute left-[15%] bottom-[30%] hidden laptop:flex flex-col gap-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
        >
            <svg width="40" height="60" viewBox="0 0 40 60" fill="#1F8D42">
                <path d="M0 0L20 15L0 30V0Z"/>
                <path d="M0 30L20 45L0 60V30Z"/>
            </svg>
        </motion.div>
        
        {/* Orange star burst - top right */}
        <motion.div 
            className="absolute right-[20%] top-[12%] hidden laptop:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#FF6B35">
                <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"/>
            </svg>
        </motion.div>

        {/* Pink starburst - top left */}
        <motion.div 
            className="absolute left-[8%] top-[18%] hidden laptop:block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <svg width="50" height="50" viewBox="0 0 100 100" fill="#FA9DCD">
                <polygon points="50,10 55,40 85,45 60,60 65,90 50,75 35,90 40,60 15,45 45,40"/>
            </svg>
        </motion.div>

        {/* Orange globe */}
        <motion.div 
            className="absolute right-[30%] bottom-[22%] hidden laptop:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ delay: 1, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
        >
            <svg width="70" height="70" viewBox="0 0 60 60" stroke="#FF6B35" fill="none" strokeWidth="2">
                <circle cx="30" cy="30" r="28"/>
                <ellipse cx="30" cy="30" rx="12" ry="28"/>
                <line x1="2" y1="30" x2="58" y2="30"/>
                <path d="M6 18 Q30 22 54 18"/>
                <path d="M6 42 Q30 38 54 42"/>
            </svg>
        </motion.div>

        {/* Pink star - mid */}
        <motion.svg 
            className="absolute top-[20%] right-[40%] w-6 h-6 text-neo-pink hidden laptop:block"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.6, rotate: { repeat: Infinity, duration: 2 } }}
            viewBox="0 0 24 24" fill="currentColor"
        >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </motion.svg>

        {/* Purple flower burst - bottom right */}
        <motion.div
            className="absolute right-[12%] bottom-[35%] hidden laptop:block"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <svg width="55" height="55" viewBox="0 0 100 100" fill="#4D17F5">
                <circle cx="50" cy="50" r="15"/>
                <circle cx="50" cy="20" r="12"/>
                <circle cx="80" cy="50" r="12"/>
                <circle cx="50" cy="80" r="12"/>
                <circle cx="20" cy="50" r="12"/>
                <circle cx="70" cy="30" r="10"/>
                <circle cx="70" cy="70" r="10"/>
                <circle cx="30" cy="70" r="10"/>
                <circle cx="30" cy="30" r="10"/>
            </svg>
        </motion.div>

        {/* Yellow abstract blob - left side */}
        <motion.div
            className="absolute left-[5%] top-[45%] hidden laptop:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
        >
            <svg width="45" height="45" viewBox="0 0 100 100" fill="#EBD22F">
                <path d="M50,10 Q70,30 80,50 Q70,70 50,90 Q30,70 20,50 Q30,30 50,10 Z"/>
            </svg>
        </motion.div>

        {/* Green arrow - bottom left */}
        <motion.div
            className="absolute left-[12%] bottom-[15%] hidden laptop:block"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <svg width="50" height="50" viewBox="0 0 100 100" fill="#1F8D42">
                <path d="M10,50 L60,50 L60,30 L90,55 L60,80 L60,60 L10,60 Z"/>
            </svg>
        </motion.div>

        {/* Orange globe moved to not overlap content */}
        <motion.div
            className="absolute left-[15%] bottom-[30%] hidden laptop:block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
            <svg width="50" height="50" viewBox="0 0 100 100" fill="#FF6B35">
                <circle cx="50" cy="50" r="45"/>
                <ellipse cx="50" cy="50" rx="45" ry="25" fill="none" stroke="white" strokeWidth="2"/>
                <ellipse cx="50" cy="50" rx="25" ry="45" fill="none" stroke="white" strokeWidth="2"/>
                <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="2"/>
            </svg>
        </motion.div>

        {/* Orange dot pattern - top */}
        <motion.div
            className="absolute right-[35%] top-[25%] hidden laptop:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="#FF6B35">
                <circle cx="10" cy="10" r="3"/>
                <circle cx="20" cy="10" r="3"/>
                <circle cx="30" cy="10" r="3"/>
                <circle cx="10" cy="20" r="3"/>
                <circle cx="20" cy="20" r="5"/>
                <circle cx="30" cy="20" r="3"/>
                <circle cx="10" cy="30" r="3"/>
                <circle cx="20" cy="30" r="3"/>
                <circle cx="30" cy="30" r="3"/>
            </svg>
        </motion.div>

        {/* Pink zigzag - right */}
        <motion.div
            className="absolute right-[8%] top-[40%] hidden laptop:block"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <svg width="35" height="60" viewBox="0 0 35 60" stroke="#FA9DCD" fill="none" strokeWidth="4">
                <path d="M5,5 L30,20 L5,35 L30,50 L5,65"/>
            </svg>
        </motion.div>

        {/* Purple star - left bottom */}
        <motion.div
            className="absolute left-[25%] bottom-[12%] hidden laptop:block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
            <svg width="35" height="35" viewBox="0 0 100 100" fill="#4D17F5">
                <polygon points="50,5 61,35 95,35 67,55 78,85 50,65 22,85 33,55 5,35 39,35"/>
            </svg>
        </motion.div>
    </>
);

export default function Home() {
    const workRef = useRef();
    const aboutRef = useRef();
    const [konami, setKonami] = useState([]);
    const router = useRouter();

    const [currentRole, setCurrentRole] = useState(0);
    const roles = [
        "PRODUCT ENGINEER",
        "SOFTWARE ENGINEER",
        "DEVOPS ENGINEER",
        "PRODUCT MANAGER",
        "PRODUCT BUILDER",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [roles.length]);

    // Eye Parallax Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const springConfig = { damping: 25, stiffness: 150 };
    const eyeX = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30, 30]), springConfig);
    const eyeY = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-30, 30]), springConfig);

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            return;
        }

        const konamiCode = [
            "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
        ];

        const handleKeyPress = (event) => {
            if ((event.metaKey && event.key === "e") || (event.ctrlKey && event.altKey && event.key === "e")) {
                event.preventDefault();
                router.push("/edit");
            }
            setKonami((prev) => {
                const nextKonami = [...prev, event.key];
                if (nextKonami.length > konamiCode.length) return nextKonami.slice(1);
                return nextKonami;
            });
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [router]);

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            return;
        }

        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        if (konami.length === konamiCode.length && konami.every((key, index) => key === konamiCode[index])) {
            router.push("/edit");
        }
    }, [konami, router]);

    const handleWorkScroll = () => {
        window.scrollTo({ top: workRef.current.offsetTop - 25, left: 0, behavior: "smooth" });
    };

    const handleAboutScroll = () => {
        window.scrollTo({ top: aboutRef.current.offsetTop - 25, left: 0, behavior: "smooth" });
    };

    return (
        <>
            <Toaster />
            <div className={`relative ${data.showCursor && "cursor-none"}`}>
                {data.showCursor && <Cursor />}
                <Head>
                    <title>SloWey | Portfolio</title>
                    <meta name="title" content="SloWey | Portfolio" />
                    <meta name="description" content="Portfolio of Slowey - Full Stack Developer & Product Owner. Specializing in building scalable web applications and crafting intuitive user experiences" />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://slowey.dev/" />
                    <meta property="og:title" content="SloWey | Portfolio" />
                    <meta property="og:description" content="Portfolio of Slowey - Full Stack Developer & Product Owner. Specializing in building scalable web applications and crafting intuitive user experiences" />
                    <meta property="og:image" content="https://upanhnhanh.com/f017edfad4ed46e04742b8a416580e77" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://slowey.dev/" />
                    <meta property="twitter:title" content="SloWey | Portfolio" />
                    <meta property="twitter:description" content="Portfolio of Slowey - Full Stack Developer & Product Owner. Specializing in building scalable web applications and crafting intuitive user experiences" />
                    <meta property="twitter:image" content="https://upanhnhanh.com/f017edfad4ed46e04742b8a416580e77" />
                </Head>

                {/* HERO SECTION - BYOOOOOB STYLE */}
                <div className="bg-neo-bg h-screen flex flex-col relative overflow-hidden" style={{ 
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
                    {/* Nav */}
                    <div className="w-full max-w-[1440px] mx-auto px-4 laptop:px-14">
                        <Header handleWorkScroll={handleWorkScroll} handleAboutScroll={handleAboutScroll} />
                    </div>

                    {/* Hero Content */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-4 laptop:px-14 py-10 laptop:py-20 relative">
                        
                        {/* Decorative Elements */}
                        <DecorativeShapes />

                        {/* Team Member Stickers - Personal Branding */}
                        <TeamMemberCard
                            name="Backend"
                            role="Java / .NET"
                            image="https://upanhnhanh.com/c87d21d8353d691d90bca572c5984e82"
                            rotation={-12}
                            position="top-[12%] right-[6%]"
                            color="orange"
                            delay={0.5}
                        />
                        <TeamMemberCard
                            name="DevOps"
                            role="CI/CD"
                            image="https://img.upanhnhanh.com/5cf7f26ee76abd79b1229be0ba6aeeec"
                            rotation={-8}
                            position="bottom-[18%] left-[4%]"
                            color="yellow"
                            delay={0.7}
                        />
                        <TeamMemberCard
                            name="Cloud"
                            role="Enthusiast"
                            image="https://img.upanhnhanh.com/2bd0afcb9d01348d305513c934ff3104"
                            rotation={14}
                            position="bottom-[8%] right-[10%]"
                            color="purple"
                            delay={0.9}
                        />
                        <TeamMemberCard
                            name="Problem Solver"
                            role="Hackathon"
                            image="https://img.upanhnhanh.com/da69d6e693faf839f67b2e8d7ac73e8a"
                            rotation={-6}
                            position="top-[35%] left-[8%]"
                            color="green"
                            delay={1.1}
                        />

                        {/* Main Heading - Center-aligned with inline rotating text */}
                        <div className="text-center w-full max-w-6xl mx-auto">
                            {/* Line 1: HELLO I AM */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="overflow-hidden"
                            >
                                <h1 className="text-4xl tablet:text-6xl laptop:text-[7rem] desktop:text-[8rem] font-heading font-bold uppercase leading-[1.0] text-neo-black tracking-tight">
                                    Hello I am
                                </h1>
                            </motion.div>

                            {/* Line 2: SLOWEY [eyes] A */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex flex-wrap items-center justify-center gap-2 laptop:gap-4"
                            >
                                <h1 className="text-4xl tablet:text-6xl laptop:text-[7rem] desktop:text-[8rem] font-heading font-bold uppercase leading-[1.0] text-neo-black tracking-tight">
                                    Slowey
                                </h1>
                                
                                {/* Eye Container - Byooooob style */}
                                <motion.div 
                                    className="eye-container hidden tablet:flex"
                                    style={{ x: eyeX, y: eyeY, rotate: 15 }}
                                >
                                    <Eye />
                                    <Eye />
                                </motion.div>

                                <h1 className="text-4xl tablet:text-6xl laptop:text-[7rem] desktop:text-[8rem] font-heading font-bold uppercase leading-[1.0] text-neo-black tracking-tight">
                                    a
                                </h1>
                            </motion.div>

                            {/* Line 3: Single-line Rotating Gradient Text */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center justify-center h-[3rem] tablet:h-[5rem] laptop:h-[7rem] overflow-hidden"
                            >
                                <motion.div
                                    key={currentRole}
                                    initial={{ y: 80 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -80 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h1 className="text-4xl tablet:text-6xl laptop:text-[6rem] font-heading font-bold uppercase leading-[1.1] tracking-tight gradient-text whitespace-nowrap">
                                        {roles[currentRole]}
                                    </h1>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Hero Bottom Content */}
                        <motion.div 
                            className="mt-8 laptop:mt-12 flex flex-col items-center justify-center gap-6 w-full max-w-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-base laptop:text-[22px] laptop:leading-relaxed text-neo-black/70 text-center max-w-[650px]">
                                Crafting scalable, high-performance software from backend to DevOps.<br />
                                <span className="text-sm laptop:text-base font-medium">Java • .NET • Node.js • Python • CI/CD • Cloud-Native Engineering</span>
                            </p>

                            <div className="flex flex-col tablet:flex-row items-center justify-center gap-4">
                                <div className="relative group cursor-pointer" onClick={() => window.open("mailto:truonglevinhphuc2006@gmail.com")}>
                                    <div className="absolute inset-0 bg-neo-black rounded-full translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                    <div className="relative bg-white px-10 py-4 rounded-full border-3 border-neo-black flex items-center gap-2 font-heading font-bold uppercase text-base tracking-wider">
                                        <span>GET IN TOUCH</span>
                                    </div>
                                </div>
                                <div className="relative group cursor-pointer" onClick={() => router.push("/resume")}>
                                    <div className="absolute inset-0 bg-neo-black rounded-full translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                    <div className="relative bg-neo-yellow px-10 py-4 rounded-full border-3 border-neo-black flex items-center gap-2 font-heading font-bold uppercase text-base tracking-wider">
                                        <span>VIEW RESUME</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* TICKER */}
                <Ticker />

                {/* PROJECT SECTION */}
                <div ref={workRef}>
                    <ProjectSection projects={data.projects} />
                </div>

                {/* SHOWCASE SECTION */}
                <ShowcaseSection />


                {/* ABOUT SECTION - Bento Grid */}
                <div className="bg-neo-pink text-neo-black py-20 laptop:py-32 relative overflow-hidden" ref={aboutRef}>
                    <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 relative z-10">
                        {/* Section label */}
                        <motion.div
                            className="flex items-center gap-3 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-2 h-2 rounded-full bg-neo-pink animate-pulse" />
                            <span className="text-xs uppercase tracking-[0.3em] text-black/40 font-heading">About me</span>
                            <div className="flex-1 h-px bg-black/10" />
                        </motion.div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-4 laptop:gap-5">

                            {/* Card 1 — Avatar + Name (large, spans 5 cols) */}
                            <motion.div
                                className="laptop:col-span-5 laptop:row-span-2 group relative bg-white rounded-3xl border-2 border-neo-black p-8 laptop:p-10 overflow-hidden shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex-1 flex items-center justify-center py-6">
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.05, rotate: -2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="bg-neo-pink/20 rounded-2xl p-8 laptop:p-12 border-2 border-neo-black">
                                                <div className="text-7xl laptop:text-8xl text-center">👨‍💻</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="mt-auto">
                                        <h2 className="text-3xl laptop:text-4xl font-heading font-bold uppercase leading-tight">
                                            Truong Le<br/>
                                            <span className="text-neo-deep-purple">Vinh Phuc</span>
                                        </h2>
                                        <p className="text-black/40 text-sm mt-2 uppercase tracking-widest font-heading">Product Engineer</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2 — Bio (spans 7 cols) */}
                            <motion.div
                                className="laptop:col-span-7 relative bg-white rounded-3xl border-2 border-neo-black p-8 laptop:p-10 overflow-hidden group shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 bg-neo-green/10 rounded-full px-3 py-1 mb-6 border border-neo-green/30">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neo-green animate-pulse" />
                                        <span className="text-xs text-neo-green uppercase tracking-wider font-semibold">Open to opportunities</span>
                                    </div>
                                    <p className="text-lg laptop:text-xl leading-relaxed text-black/70">
                                        {data.aboutpara}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3 — Roles (spans 7 cols) */}
                            <motion.div
                                className="laptop:col-span-7 relative bg-white rounded-3xl border-2 border-neo-black p-8 shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-5 font-heading">What I do</p>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { label: "Product Management", color: "bg-neo-pink", text: "text-neo-black" },
                                        { label: "Software Engineer", color: "bg-neo-black", text: "text-white" },
                                        { label: "DevOps Enthusiast", color: "bg-neo-yellow", text: "text-neo-black" },
                                    ].map((role) => (
                                        <motion.div
                                            key={role.label}
                                            className={`${role.color} ${role.text} px-5 py-2.5 rounded-full border-2 border-neo-black cursor-default shadow-neo-sm`}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="font-heading uppercase text-sm tracking-wider">{role.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Card 4 — Stat: Years */}
                            <motion.div
                                className="laptop:col-span-4 group relative bg-white rounded-3xl border-2 border-neo-black p-6 laptop:p-8 overflow-hidden cursor-default shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="relative z-10">
                                    <motion.p
                                        className="text-4xl laptop:text-5xl font-heading font-bold"
                                        initial={{ scale: 0.5 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                                    >3+</motion.p>
                                    <p className="text-black/40 text-sm mt-2 uppercase tracking-wider font-heading">Years Building</p>
                                </div>
                            </motion.div>

                            {/* Card 5 — Stat: Projects */}
                            <motion.div
                                className="laptop:col-span-4 group relative bg-white rounded-3xl border-2 border-neo-black p-6 laptop:p-8 overflow-hidden cursor-default shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="relative z-10">
                                    <motion.p
                                        className="text-4xl laptop:text-5xl font-heading font-bold"
                                        initial={{ scale: 0.5 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                                    >10+</motion.p>
                                    <p className="text-black/40 text-sm mt-2 uppercase tracking-wider font-heading">Projects Shipped</p>
                                </div>
                            </motion.div>

                            {/* Card 6 — Stat: Location */}
                            <motion.div
                                className="laptop:col-span-4 group relative bg-white rounded-3xl border-2 border-neo-black p-6 laptop:p-8 overflow-hidden cursor-default shadow-neo-sm hover:shadow-neo transition-shadow duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="relative z-10">
                                    <motion.p
                                        className="text-4xl laptop:text-5xl font-heading font-bold"
                                        initial={{ scale: 0.5 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                                    >HCM</motion.p>
                                    <p className="text-black/40 text-sm mt-2 uppercase tracking-wider font-heading">Based in Vietnam</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <Footer />
            </div>
        </>
    );
}
