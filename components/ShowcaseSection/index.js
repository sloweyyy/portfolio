import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ShowcaseSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef = useRef(null);
    const cardsRef = useRef(null);

    const items = [
        {
            id: 1,
            title: "First Prize at IT Hackathon 2025 – Solana Pragmatic",
            description: "Won First Prize at IT Hackathon 2025 (Solana Pragmatic) with \"Trustify\", a blockchain-powered online notarization platform leveraging Solana for NFT certificates.",
            image: "https://media.licdn.com/dms/image/v2/D562DAQHhJ7TDRSqUXw/profile-treasury-image-shrink_1280_1280/B56ZcKzyjQH4AQ-/0/1748233045622?e=1764842400&v=beta&t=kH1jTsm2iiFjpztMuBN8PF5VTFAnR8kYpj7DQjhXT5Q",
            theme: "purple",
            tag: "🏆 1st Place",
            date: "May 2025"
        },
        {
            id: 2,
            title: "Top 30 at Web3 HackFest 2025 - Web3 & AI Convergence",
            description: "Achieved Top 30 in the Web3 HackFest 2025 with \"Trustify\", a decentralized platform developed for secure and transparent online notarization leveraging blockchain technology and AI. Issued by VBI Academy · Jan 2025",
            image: "https://upanhnhanh.com/5086eb6e03158050f2a72e334cb81b48",
            theme: "orange",
            tag: "⭐ Top 30",
            date: "Jan 2025"
        },
        
        {
            id: 3,
            title: "Consolation Prize at SEAPP Contest 2024",
            description: "Awarded the Consolation Prize for the project \"Enigma - A Dropshipping Design and Sales Platform,\" recognized as one of the top innovations. The platform showcased advanced mobile development, seamless integration of AI-powered machine learning, and e-commerce solutions.",
            image: "https://media.licdn.com/dms/image/v2/D562DAQE0cPGok6n2cQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732039938428?e=1764928800&v=beta&t=F1hIog7IccegaeXQc0lQUG97-HaBOtDwpHvNJOzgwwQ",
            theme: "orange",
            tag: "🏅 Consolation",
            date: "Nov 2024"
        },
        {
            id: 4,
            title: "Third Place at GDSC Idea Contest 2023: THiNK",
            description: "Achieved Third Place in the GDSC IDEA CONTEST 2023 with FutureConnect, a platform designed to bridge the gap between students and businesses.",
            image: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/480800066_598985956304827_563808584926383999_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHeK6VWcsgK-4fgUcZk6ACKRsDWWZe9ox5GwNZZl72jHiFFiGLToGY9yE6l9JDqcexIRRYWhq8JH8vsQIIVNtuW&_nc_ohc=JNT8rBpHiKMQ7kNvwGBy4fa&_nc_oc=AdmOc4iUCmJl0MKw55jivO-gM8RFICJ1gO11vo7m4rm8TEaHEUEvZCTj-PG_Cj6ne98&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=1bGqKNtslWVMUrBR7RTe4A&oh=00_AfhGAXA51_tKkd_eQTXfQjmZ-Iyoi8GOPi8sIqTC3E1gVA&oe=692DDD48",
            theme: "blue",
            tag: "🥉 3rd Place",
            date: "Jun 2023"
        },
        
    ];

    const getThemeClasses = (theme) => {
        switch (theme) {
            case "orange": return { bg: "#f97316", border: "#ea580c" };
            case "blue": return { bg: "#2563eb", border: "#1d4ed8" };
            case "purple": return { bg: "#9333ea", border: "#7e22ce" };
            default: return { bg: "#000000", border: "#000000" };
        }
    };

    // Calculate horizontal scroll based on vertical scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform vertical scroll to horizontal translation
    // Start with first card visible (slightly padded from left)
    // End with last card and "More Coming Soon" visible
    // Reduced range to stop earlier so user doesn't scroll into empty space
    const x = useTransform(scrollYProgress, [0, 1], [100, -1500]);

    return (
        <div 
            ref={containerRef}
            className="relative bg-neo-bg"
            style={{ 
                // Increased height for smoother scrolling through all cards
                height: `${400}vh`
            }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
                {/* Retro Background Pattern */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)`
                    }}
                />

                {/* TOP SECTION - Title Header */}
                <div className="relative z-10 pt-6 laptop:pt-10 pb-4 laptop:pb-6">
                    <div className="max-w-[1440px] mx-auto px-4 laptop:px-14">
                        <div className="text-center">
                            {/* Decorative Element - Top Left */}
                            <motion.div 
                                className="absolute left-8 top-8 hidden laptop:block"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-12 h-12 bg-neo-yellow border-4 border-neo-black transform rotate-12 shadow-[4px_4px_0px_0px_#000]">
                                    <div className="w-full h-full flex items-center justify-center text-xl">
                                        🏆
                                    </div>
                                </div>
                            </motion.div>

                            <h1 className="text-4xl laptop:text-6xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                                <span className="text-[#f97316]">HALL</span>{" "}
                                <span className="text-neo-black italic">OF FAME</span>
                            </h1>
                            
                            <div className="mt-4 inline-block bg-neo-yellow border-4 border-neo-black px-5 py-2 transform -rotate-1 shadow-[4px_4px_0px_0px_#000]">
                                <span className="font-heading font-bold uppercase text-base">🎯 Achievements & Awards</span>
                            </div>

                            {/* Scroll Hint */}
                            <div className="hidden laptop:block mt-4">
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex flex-col items-center gap-1 text-neo-black font-heading font-bold uppercase text-xs"
                                >
                                    <span className="text-lg">↓</span>
                                    <span>Scroll to explore</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARDS SECTION - Horizontal Scrolling */}
                <div className="flex-1 relative z-10 flex items-center py-8 laptop:py-10">
                    <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 w-full h-full flex items-center">
                        {/* Desktop - Horizontal Scrolling Cards */}
                        <div className="hidden laptop:block w-full overflow-visible">
                            <motion.div 
                                ref={cardsRef}
                                style={{ x }}
                                className="flex gap-8 items-center py-12" // Added padding for badges
                            >
                                {items.map((item, index) => {
                                    const theme = getThemeClasses(item.theme);
                                    return (
                                        <motion.div
                                            key={item.id}
                                            className="group relative flex-shrink-0"
                                            style={{ 
                                                width: '650px',
                                                height: '500px' // Reverted to 600px
                                            }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {/* Award Badge - Moved outside and overlapping border */}
                                            <div className="absolute -top-6 -left-6 z-20">
                                                <div className="bg-neo-yellow text-neo-black font-bold uppercase px-6 py-3 border-4 border-neo-black transform -rotate-12 shadow-[4px_4px_0px_0px_#000] text-xl">
                                                    {item.tag}
                                                </div>
                                            </div>

                                            {/* Achievement Card */}
                                            <div 
                                                className="relative border-4 border-neo-black rounded-2xl overflow-visible transition-all duration-300 h-full flex flex-col bg-white"
                                                style={{
                                                    backgroundColor: theme.bg,
                                                    boxShadow: hoveredIndex === index 
                                                        ? `12px 12px 0px 0px ${theme.border}` 
                                                        : `8px 8px 0px 0px ${theme.border}`,
                                                    transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
                                                }}
                                            >
                                                {/* Image Section - Fixed height */}
                                                <div className="relative h-[320px] border-b-4 border-neo-black bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0 rounded-t-xl">
                                                    <img 
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-500"
                                                        style={{
                                                            transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                                                        }}
                                                    />

                                                    {/* Date Badge */}
                                                    <div className="absolute top-6 right-6 z-10">
                                                        <div className="bg-white text-neo-black font-bold uppercase px-4 py-2 border-4 border-neo-black shadow-[4px_4px_0px_0px_#000]">
                                                            {item.date}
                                                        </div>
                                                    </div>

                                                    {/* Retro Scanline Effect */}
                                                    <div 
                                                        className="absolute inset-0 pointer-events-none"
                                                        style={{
                                                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)`
                                                        }}
                                                    />
                                                </div>

                                                {/* Text Content - Flexible height */}
                                                <div className="p-6 bg-white flex-1 flex flex-col rounded-b-xl">
                                                    <h2 className="text-lg font-heading font-bold uppercase text-neo-black mb-2 leading-tight">
                                                        {item.title}
                                                    </h2>
                                                    <p className="text-gray-700 font-body text-xs leading-relaxed line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* End Marker */}
                                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '400px' }}>
                                    <div className="inline-block bg-neo-black text-neo-yellow px-8 py-6 border-4 border-neo-yellow transform rotate-3 shadow-[6px_6px_0px_0px_#f97316]">
                                        <span className="font-heading font-bold uppercase text-2xl">✨ More Coming Soon!</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Mobile Version - Stack vertically */}
                        <div className="laptop:hidden w-full flex flex-col gap-12">
                            {items.map((item, index) => {
                                const theme = getThemeClasses(item.theme);
                                return (
                                    <motion.div
                                        key={item.id}
                                        className="group relative"
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {/* Award Badge - Moved outside and overlapping border */}
                                        <div className="absolute -top-4 -left-2 z-20">
                                            <div className="bg-neo-yellow text-neo-black font-bold uppercase px-4 py-2 border-4 border-neo-black transform -rotate-12 shadow-[4px_4px_0px_0px_#000] text-lg">
                                                {item.tag}
                                            </div>
                                        </div>

                                        {/* Achievement Card */}
                                        <div 
                                            className="relative border-4 border-neo-black rounded-2xl overflow-visible bg-white"
                                            style={{
                                                backgroundColor: theme.bg,
                                                boxShadow: `8px 8px 0px 0px ${theme.border}`
                                            }}
                                        >
                                            {/* Image Section */}
                                            <div className="relative h-[300px] border-b-4 border-neo-black bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
                                                <img 
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Date Badge */}
                                                <div className="absolute top-6 right-6 z-10">
                                                    <div className="bg-white text-neo-black font-bold uppercase px-3 py-2 border-4 border-neo-black shadow-[4px_4px_0px_0px_#000] text-sm">
                                                        {item.date}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className="p-6 bg-white rounded-b-xl">
                                                <h2 className="text-xl font-heading font-bold uppercase text-neo-black mb-3 leading-tight">
                                                    {item.title}
                                                </h2>
                                                <p className="text-gray-700 font-body text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowcaseSection;
