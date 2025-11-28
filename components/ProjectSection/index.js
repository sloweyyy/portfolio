import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

const ProjectSection = ({ projects }) => {
    const [activeProject, setActiveProject] = useState(projects[0]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen"
            style={{ backgroundColor: '#4D17F5' }}
        >
            {/* Radial lines background - subtle */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 80px,
                            rgba(255,255,255,0.05) 80px,
                            rgba(255,255,255,0.05) 81px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 80px,
                            rgba(255,255,255,0.05) 80px,
                            rgba(255,255,255,0.05) 81px
                        ),
                        radial-gradient(circle at 50% 50%, rgba(77, 23, 245, 0) 0%, rgba(77, 23, 245, 0.5) 100%)
                    `
                }}
            />

            <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 relative z-10 py-10 laptop:py-16">
                <div className="flex flex-col laptop:flex-row gap-10 laptop:gap-20">
                    
                    {/* LEFT SECTION - Sticky with title + preview */}
                    <div 
                        className="w-full laptop:w-[45%] laptop:h-[calc(100vh-8rem)] laptop:sticky laptop:top-16 flex flex-col justify-between"
                    >
                        {/* Section Header */}
                        <div className="mb-4 relative">
                            {/* Decorative Arrow */}
                            <motion.div 
                                className="absolute -left-12 -top-8 hidden laptop:block"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="#EBD22F" style={{ transform: 'rotate(-45deg)' }}>
                                    <path d="M12 2L2 22L12 18L22 22L12 2Z" stroke="black" strokeWidth="2" />
                                </svg>
                            </motion.div>

                            <h1 className="text-5xl laptop:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                                <span style={{ color: '#EBD22F' }}>DAMN!</span>{" "}
                                <span className="text-white italic">I DID THIS?</span>
                            </h1>
                        </div>

                        {/* Preview Card - Desktop Only */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="hidden laptop:flex flex-col flex-grow relative"
                            >
                                {/* Retro Window Card */}
                                <div 
                                    className="bg-white rounded-xl overflow-hidden relative z-10"
                                    style={{ 
                                        border: '3px solid black',
                                        boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)'
                                    }}
                                >
                                    {/* Window Header */}
                                    <div className="h-8 border-b-2 border-black flex items-center px-3 gap-2 bg-[#FFD6E0]">
                                        <div className="w-3 h-3 rounded-full border border-black bg-[#FF5F57]"></div>
                                        <div className="w-3 h-3 rounded-full border border-black bg-[#FEBC2E]"></div>
                                        <div className="w-3 h-3 rounded-full border border-black bg-[#28C840]"></div>
                                    </div>
                                    
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden p-2 bg-white">
                                        <div className="w-full h-full border-2 border-black rounded-lg overflow-hidden relative">
                                            <img
                                                src={activeProject.imageSrc}
                                                alt={activeProject.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Yellow Quote Card - Overlapping */}
                                <motion.div 
                                    className="relative mt-6 -mr-8 w-4/5 ml-auto p-6 rounded-xl z-20"
                                    style={{ 
                                        backgroundColor: '#EBD22F',
                                        border: '3px solid black',
                                        boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)'
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="text-5xl font-heading font-bold text-white stroke-black mb-2" style={{ WebkitTextStroke: '1px black' }}>“</div>
                                    <p className="text-lg text-black font-medium leading-tight font-heading uppercase">
                                        {activeProject.description || "An amazing project built with passion and creativity."}
                                    </p>
                                </motion.div>

                                <div className="mt-2 pt-8">
                                    <Button onClick={() => window.open(activeProject.url, "_blank")} classes="!bg-white !text-black !border-2 !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[2px] hover:!translate-y-[2px] hover:!shadow-none">
                                        View Project
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SECTION - Scrollable List */}
                    <div className="w-full laptop:w-[55%] flex flex-col pt-10 laptop:pl-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="group cursor-pointer relative"
                                style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                                    padding: '4rem 0',
                                }}
                                onMouseEnter={() => {
                                    setActiveProject(project);
                                    setHoveredIndex(index);
                                }}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => window.open(project.url, "_blank")}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <div className="flex items-center justify-between gap-6 relative z-10">
                                    <div className="flex-1">
                                        <h2 
                                            className="text-4xl laptop:text-6xl desktop:text-[5rem] font-heading font-bold uppercase leading-[0.9] transition-all duration-300"
                                            style={{ 
                                                color: hoveredIndex === index ? '#EBD22F' : 'rgba(255,255,255,0.5)',
                                                transform: hoveredIndex === index ? 'translateX(20px)' : 'translateX(0)'
                                            }}
                                        >
                                            {project.title}
                                        </h2>
                                    </div>
                                    
                                    {/* Arrow Icon */}
                                    <div 
                                        className="hidden laptop:flex w-16 h-16 items-center justify-center rounded-full border-2 transition-all duration-300 transform group-hover:rotate-45"
                                        style={{ 
                                            borderColor: hoveredIndex === index ? '#EBD22F' : 'rgba(255,255,255,0.3)',
                                            backgroundColor: hoveredIndex === index ? '#EBD22F' : 'transparent'
                                        }}
                                    >
                                        <svg 
                                            width="32" 
                                            height="32" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke={hoveredIndex === index ? 'black' : 'white'} 
                                            strokeWidth="2"
                                        >
                                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Tags Row */}
                                <div className="flex gap-3 mt-6 pl-1 transition-all duration-300"
                                     style={{ 
                                         opacity: hoveredIndex === index ? 1 : 0.5,
                                         transform: hoveredIndex === index ? 'translateX(20px)' : 'translateX(0)'
                                     }}
                                >
                                    {(project.tags || [project.category || "Development", "Design"]).slice(0, 3).map((tag, i) => (
                                        <span 
                                            key={i} 
                                            className="text-xs font-bold uppercase px-4 py-1.5 rounded-full border border-white/30 text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Mobile Image */}
                                <div className="mt-6 laptop:hidden rounded-xl overflow-hidden border border-white/20">
                                    <img
                                        src={project.imageSrc}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
