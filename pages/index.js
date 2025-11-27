import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
import { Toaster } from "../components/Toaster";
import ProjectSection from "../components/ProjectSection";
import ShowcaseSection from "../components/ShowcaseSection";
import { motion } from "framer-motion";

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
        "SOFTWARE ENGINEER",
        "DEVOPS ENGINEER",
        "PRODUCT OWNER",
        "PROBLEM SOLVER",
        "TECH ENTHUSIAST",
        "INNOVATOR",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [roles.length]);

    useEffect(() => {
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
                    <meta name="description" content="SloWey's developer portfolio" key="desc" />
                    <meta property="og:title" content="SloWey Portfolio" />
                    <meta property="og:description" content="SloWey's developer portfolio" />
                    <meta property="og:image" content="https://i.imgur.com/LJAuciv.png" />
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
                            role="Java/.NET Expert" 
                            image="https://upanhnhanh.com/c87d21d8353d691d90bca572c5984e82"
                            rotation={-12}
                            position="top-[12%] right-[6%]"
                            color="orange"
                            delay={0.5}
                        />
                        <TeamMemberCard 
                            name="DevOps" 
                            role="CI/CD Wizard" 
                            image="https://upanhnhanh.com/c87d21d8353d691d90bca572c5984e82"
                            rotation={-8}
                            position="bottom-[18%] left-[4%]"
                            color="yellow"
                            delay={0.7}
                        />
                        <TeamMemberCard 
                            name="Cloud" 
                            role="AWS/Azure Pro" 
                            image="https://upanhnhanh.com/c87d21d8353d691d90bca572c5984e82"
                            rotation={14}
                            position="bottom-[8%] right-[10%]"
                            color="purple"
                            delay={0.9}
                        />
                        <TeamMemberCard 
                            name="Problem" 
                            role="Solver" 
                            image="https://upanhnhanh.com/c87d21d8353d691d90bca572c5984e82"
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
                                <div className="eye-container hidden tablet:flex">
                                    <Eye />
                                    <Eye />
                                </div>

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
                                <div className="relative group cursor-pointer" onClick={() => window.open("mailto:hello@slowey.com")}>
                                    <div className="absolute inset-0 bg-neo-black rounded-full translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                    <div className="relative bg-white px-10 py-4 rounded-full border-3 border-neo-black flex items-center gap-2 font-heading font-bold uppercase text-base tracking-wider">
                                        <span>GET IN TOUCH</span>
                                    </div>
                                </div>
                                <div className="relative group cursor-pointer" onClick={() => window.open("/resume")}>
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


                {/* ABOUT SECTION - Creative Layout */}
                <div className="bg-neo-black text-white py-20 laptop:py-32 relative overflow-hidden" ref={aboutRef}>
                    {/* Decorative elements for About section */}
                    <motion.div 
                        className="absolute top-[10%] right-[5%] hidden laptop:block"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="#FA9DCD">
                            <polygon points="50,5 61,35 95,35 67,55 78,85 50,65 22,85 33,55 5,35 39,35"/>
                        </svg>
                    </motion.div>

                    <motion.div 
                        className="absolute bottom-[15%] left-[8%] hidden laptop:block"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <svg width="35" height="35" viewBox="0 0 100 100" fill="#EBD22F">
                            <circle cx="50" cy="50" r="45" />
                        </svg>
                    </motion.div>

                    <motion.div 
                        className="absolute top-[50%] left-[3%] hidden laptop:block"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke="#1F8D42" strokeWidth="4">
                            <rect x="10" y="10" width="80" height="80" />
                        </svg>
                    </motion.div>

                    <motion.div 
                        className="absolute top-[20%] left-[12%] hidden laptop:block"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="#FF6B35">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                    </motion.div>

                    <motion.div 
                        className="absolute bottom-[25%] right-[10%] hidden laptop:block"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        <svg width="45" height="45" viewBox="0 0 100 100" fill="#4D17F5">
                            <path d="M10,50 L40,50 L40,30 L70,50 L40,70 L40,50 L10,50 Z"/>
                        </svg>
                    </motion.div>

                    <div className="max-w-[1440px] mx-auto px-4 laptop:px-14">
                        <div className="flex flex-col laptop:flex-row gap-12 laptop:gap-20 items-center">
                            {/* Left - Image/Visual */}
                            <motion.div 
                                className="w-full laptop:w-2/5"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative">
                                    <div className="bg-neo-pink rounded-2xl p-4 border-2 border-white/20 transform -rotate-3">
                                        <div className="bg-neo-deep-purple rounded-xl p-8 transform rotate-3">
                                            <div className="text-8xl laptop:text-9xl text-center">👨‍💻</div>
                                        </div>
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute -top-4 -right-4 bg-neo-yellow w-12 h-12 rounded-full border-2 border-white/20"></div>
                                    <div className="absolute -bottom-4 -left-4 bg-neo-green w-8 h-8 rounded-full border-2 border-white/20"></div>
                                    <motion.div 
                                        className="absolute -top-6 -left-6 bg-neo-pink w-10 h-10 rounded-full border-2 border-white/20"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    ></motion.div>
                                </div>
                            </motion.div>

                            {/* Right - Content */}
                            <motion.div 
                                className="w-full laptop:w-3/5"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h1 className="text-4xl laptop:text-6xl font-heading font-bold uppercase mb-6">
                                    About <span className="text-neo-pink">Me</span>
                                </h1>
                                <p className="text-xl laptop:text-2xl leading-relaxed text-white/80 mb-8">
                                    {data.aboutpara}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-neo-deep-purple px-4 py-2 rounded-full border border-white/20">
                                        <span className="font-heading uppercase text-sm">Full Stack</span>
                                    </div>
                                    <div className="bg-neo-pink px-4 py-2 rounded-full border border-white/20 text-neo-black">
                                        <span className="font-heading uppercase text-sm">Product Owner</span>
                                    </div>
                                    <div className="bg-neo-yellow px-4 py-2 rounded-full border border-white/20 text-neo-black">
                                        <span className="font-heading uppercase text-sm">Problem Solver</span>
                                    </div>
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
