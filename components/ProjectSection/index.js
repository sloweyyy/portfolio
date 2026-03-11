import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

const FALLBACK_IMAGE = "/images/demo.png";

const normalizeProjectUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
};

const ProjectSection = ({ projects = [] }) => {
    const initialProjectId = projects[0]?.id || null;
    const [activeProjectId, setActiveProjectId] = useState(initialProjectId);
    const [hoveredProjectId, setHoveredProjectId] = useState(initialProjectId);
    const containerRef = useRef(null);
    const activeProject =
        projects.find((project) => project.id === activeProjectId) ||
        projects[0] ||
        null;
    const effectiveHoveredProjectId =
        hoveredProjectId || activeProject?.id || null;
    const hoveredIndex = projects.findIndex(
        (project) => project.id === effectiveHoveredProjectId
    );
    const activeIndex = projects.findIndex((project) => project.id === activeProject?.id);

    const openProject = (url) => {
        const normalizedUrl = normalizeProjectUrl(url);
        if (!normalizedUrl || typeof window === "undefined") return;
        window.open(normalizedUrl, "_blank", "noopener,noreferrer");
    };

    const handleImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
    };

    const selectProject = (project) => {
        setActiveProjectId(project.id);
        setHoveredProjectId(project.id);
    };

    if (!projects.length) {
        return (
            <div className="relative py-24" style={{ backgroundColor: "#4D17F5" }}>
                <div className="max-w-[1440px] mx-auto px-4 laptop:px-14">
                    <h1 className="text-5xl laptop:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                        <span style={{ color: "#EBD22F" }}>DAMN!</span>{" "}
                        <span className="text-white italic">I DID THIS?</span>
                    </h1>
                    <p className="text-white/80 mt-8 text-xl">
                        No projects available yet. Add a project from the editor to populate this section.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen"
            style={{ backgroundColor: "#4D17F5" }}
        >
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
                    `,
                }}
            />

            <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 relative z-10 py-10 laptop:py-16">
                <div className="flex flex-col laptop:flex-row gap-10 laptop:gap-20">
                    <div className="w-full laptop:w-[45%] laptop:sticky laptop:top-12 laptop:max-h-[calc(100vh-5rem)] laptop:overflow-y-auto laptop:pr-3 flex flex-col gap-4">
                        <div className="mb-4 relative">
                            <motion.div
                                className="absolute -left-12 -top-8 hidden laptop:block"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="#EBD22F" style={{ transform: "rotate(-45deg)" }}>
                                    <path d="M12 2L2 22L12 18L22 22L12 2Z" stroke="black" strokeWidth="2" />
                                </svg>
                            </motion.div>

                            <h1 className="text-5xl laptop:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                                <span style={{ color: "#EBD22F" }}>DAMN!</span>{" "}
                                <span className="text-white italic">I DID THIS?</span>
                            </h1>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeProject && (
                                <motion.div
                                    key={activeProject.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="hidden laptop:flex flex-col relative pb-2"
                                >
                                    <div
                                        className="bg-white rounded-xl overflow-hidden relative z-10"
                                        style={{
                                            border: "3px solid black",
                                            boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                                        }}
                                    >
                                        <div className="h-8 border-b-2 border-black flex items-center px-3 gap-2 bg-[#FFD6E0]">
                                            <div className="w-3 h-3 rounded-full border border-black bg-[#FF5F57]"></div>
                                            <div className="w-3 h-3 rounded-full border border-black bg-[#FEBC2E]"></div>
                                            <div className="w-3 h-3 rounded-full border border-black bg-[#28C840]"></div>
                                        </div>

                                        <div className="relative aspect-[4/3] overflow-hidden p-2 bg-white">
                                            <div className="w-full h-full border-2 border-black rounded-lg overflow-hidden relative">
                                                <img
                                                    src={activeProject.imageSrc || FALLBACK_IMAGE}
                                                    alt={activeProject.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="relative mt-4 p-5 rounded-xl z-20 bg-white"
                                        style={{
                                            border: "3px solid black",
                                            boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
                                        }}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h3 className="text-2xl font-heading font-bold uppercase leading-tight text-black">
                                            {activeProject.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-black/80 leading-relaxed">
                                            {activeProject.description || "An amazing project built with passion and creativity."}
                                        </p>
                                        {(activeProject.period || activeProject.role) && (
                                            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
                                                {activeProject.period && (
                                                    <span className="px-2 py-1 rounded-full border border-black/20 bg-black/5">
                                                        {activeProject.period}
                                                    </span>
                                                )}
                                                {activeProject.role && (
                                                    <span className="px-2 py-1 rounded-full border border-black/20 bg-black/5">
                                                        {activeProject.role}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {Array.isArray(activeProject.highlights) && activeProject.highlights.length > 0 && (
                                            <ul className="mt-3 list-disc pl-5 text-xs text-black/80 space-y-1">
                                                {activeProject.highlights.slice(0, 1).map((highlight, index) => (
                                                    <li key={`${activeProject.id}-highlight-${index}`}>{highlight}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>

                                    <div className="mt-4">
                                        <Button
                                            onClick={() => openProject(activeProject.url)}
                                            classes="!bg-white !text-black !border-2 !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[2px] hover:!translate-y-[2px] hover:!shadow-none"
                                        >
                                            View Project
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full laptop:w-[55%] flex flex-col pt-10 laptop:pl-10">
                        {projects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className="group cursor-pointer relative"
                                style={{
                                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                                    padding: "4rem 0",
                                }}
                                onMouseEnter={() => selectProject(project)}
                                onMouseLeave={() =>
                                    setHoveredProjectId(
                                        activeIndex >= 0 ? activeProject?.id : null
                                    )
                                }
                                onFocus={() => selectProject(project)}
                                onClick={() => selectProject(project)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        openProject(project.url);
                                    }
                                }}
                            >
                                <div className="flex items-center justify-between gap-6 relative z-10">
                                    <div className="flex-1">
                                        <h2
                                            className="text-4xl laptop:text-6xl desktop:text-[5rem] font-heading font-bold uppercase leading-[0.9] transition-all duration-300"
                                            style={{
                                                color: hoveredIndex === index ? "#EBD22F" : "rgba(255,255,255,0.5)",
                                                transform: hoveredIndex === index ? "translateX(20px)" : "translateX(0)",
                                            }}
                                        >
                                            {project.title}
                                        </h2>
                                    </div>

                                    <button
                                        type="button"
                                        className="hidden laptop:flex w-16 h-16 items-center justify-center rounded-full border-2 transition-all duration-300 transform group-hover:rotate-45"
                                        style={{
                                            borderColor: hoveredIndex === index ? "#EBD22F" : "rgba(255,255,255,0.3)",
                                            backgroundColor: hoveredIndex === index ? "#EBD22F" : "transparent",
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openProject(project.url);
                                        }}
                                        aria-label={`Open ${project.title}`}
                                    >
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={hoveredIndex === index ? "black" : "white"}
                                            strokeWidth="2"
                                        >
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </button>
                                </div>

                                <div
                                    className="flex flex-wrap gap-3 mt-6 pl-1 transition-all duration-300"
                                    style={{
                                        opacity: hoveredIndex === index ? 1 : 0.5,
                                        transform: hoveredIndex === index ? "translateX(20px)" : "translateX(0)",
                                    }}
                                >
                                    {(project.tags || [project.category || "Development", "Design"]).slice(0, 4).map((tag, i) => (
                                        <span
                                            key={`${project.id}-tag-${i}`}
                                            className="text-xs font-bold uppercase px-4 py-1.5 rounded-full border border-white/30 text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {project.period && (
                                    <p className="text-white/70 text-sm mt-3 uppercase tracking-wide">{project.period}</p>
                                )}

                                <div className="mt-6 laptop:hidden rounded-xl overflow-hidden border border-white/20">
                                    <img
                                        src={project.imageSrc || FALLBACK_IMAGE}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                        onError={handleImageError}
                                    />
                                </div>

                                <div className="laptop:hidden mt-4">
                                    <Button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openProject(project.url);
                                        }}
                                        classes="!bg-white !text-black !border-2 !border-black"
                                    >
                                        View Project
                                    </Button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
