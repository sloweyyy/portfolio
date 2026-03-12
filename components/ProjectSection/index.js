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
            <section className="relative py-24" style={{ backgroundColor: "#4D17F5" }}>
                <div className="max-w-[1440px] mx-auto px-4 laptop:px-14">
                    <h2 className="text-5xl laptop:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                        <span style={{ color: "#EBD22F" }}>DAMN!</span>{" "}
                        <span className="text-white italic">I DID THIS?</span>
                    </h2>
                    <p className="text-white/90 mt-8 text-xl">
                        No projects available yet. Add a project from the editor to populate this section.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            className="relative"
            style={{ backgroundColor: "#4D17F5" }}
            aria-labelledby="home-projects-title"
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
                        radial-gradient(circle at 50% 50%, rgba(77, 23, 245, 0) 0%, rgba(77, 23, 245, 0.45) 100%)
                    `,
                }}
            />

            <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 relative z-10 py-10 laptop:py-14">
                <div className="flex flex-col laptop:flex-row gap-8 laptop:gap-14">
                    <div className="w-full laptop:w-[43%] laptop:sticky laptop:top-8 laptop:self-start flex flex-col gap-4">
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

                            <h2 id="home-projects-title" className="text-5xl laptop:text-7xl font-heading font-bold uppercase leading-[0.9] tracking-tight">
                                <span style={{ color: "#EBD22F" }}>DAMN!</span>{" "}
                                <span className="text-white italic">I DID THIS?</span>
                            </h2>
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
                                        <p className="mt-3 text-sm text-black/85 leading-relaxed">
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
                                                {activeProject.highlights.slice(0, 2).map((highlight, index) => (
                                                    <li key={`${activeProject.id}-highlight-${index}`}>{highlight}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>

                                    <div className="mt-4">
                                        <a
                                            href={normalizeProjectUrl(activeProject.url) || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${activeProject.title}`}
                                        >
                                            <Button
                                                classes="!bg-white !text-black !border-2 !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[2px] hover:!translate-y-[2px] hover:!shadow-none"
                                            >
                                                View Project
                                            </Button>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full laptop:w-[57%] flex flex-col laptop:pl-8">
                        {projects.map((project, index) => {
                            const isHighlighted = hoveredIndex === index;
                            const projectHref = normalizeProjectUrl(project.url);

                            return (
                                <motion.article
                                    key={project.id}
                                    className="group relative"
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.25)",
                                        padding: "2.5rem 0",
                                    }}
                                    onMouseEnter={() => selectProject(project)}
                                    onMouseLeave={() => setHoveredProjectId(activeProject?.id || null)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    <div className="flex items-start justify-between gap-6 relative z-10">
                                        <button
                                            type="button"
                                            className="text-left flex-1"
                                            onFocus={() => selectProject(project)}
                                            onClick={() => selectProject(project)}
                                            aria-label={`Select ${project.title}`}
                                        >
                                            <h3
                                                className="text-3xl laptop:text-5xl desktop:text-[4.2rem] font-heading font-bold uppercase leading-[0.9] transition-all duration-300"
                                                style={{
                                                    color: isHighlighted ? "#EBD22F" : "rgba(255,255,255,0.92)",
                                                    transform: isHighlighted ? "translateX(12px)" : "translateX(0)",
                                                }}
                                            >
                                                {project.title}
                                            </h3>

                                            {(project.period || project.role) && (
                                                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/95">
                                                    {project.period && (
                                                        <span className="px-2 py-1 rounded-full border border-white/40">
                                                            {project.period}
                                                        </span>
                                                    )}
                                                    {project.role && (
                                                        <span className="px-2 py-1 rounded-full border border-white/40">
                                                            {project.role}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {project.description && (
                                                <p className="mt-3 text-sm laptop:text-base text-white/90 leading-relaxed max-w-3xl">
                                                    {project.description}
                                                </p>
                                            )}
                                        </button>

                                        <a
                                            href={projectHref || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hidden laptop:flex w-16 h-16 items-center justify-center rounded-full border-2 transition-all duration-300 transform group-hover:rotate-45"
                                            style={{
                                                borderColor: isHighlighted ? "#EBD22F" : "rgba(255,255,255,0.45)",
                                                backgroundColor: isHighlighted ? "#EBD22F" : "transparent",
                                            }}
                                            aria-label={`Open ${project.title}`}
                                            onClick={(event) => {
                                                if (!projectHref) event.preventDefault();
                                            }}
                                        >
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke={isHighlighted ? "black" : "white"}
                                                strokeWidth="2"
                                            >
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div
                                        className="flex flex-wrap gap-2.5 mt-5 pl-1"
                                        style={{
                                            transform: isHighlighted ? "translateX(12px)" : "translateX(0)",
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        {(project.tags || [project.category || "Development", "Design"]).slice(0, 4).map((tag, i) => (
                                            <span
                                                key={`${project.id}-tag-${i}`}
                                                className="text-xs font-bold uppercase px-3 py-1.5 rounded-full border border-white/45 text-white"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-6 laptop:hidden rounded-xl overflow-hidden border border-white/20">
                                        <img
                                            src={project.imageSrc || FALLBACK_IMAGE}
                                            alt={project.title}
                                            className="w-full h-52 object-cover"
                                            loading="lazy"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    <div className="laptop:hidden mt-4">
                                        <a
                                            href={projectHref || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${project.title}`}
                                            onClick={(event) => {
                                                if (!projectHref) event.preventDefault();
                                            }}
                                        >
                                            <Button classes="!bg-white !text-black !border-2 !border-black">
                                                View Project
                                            </Button>
                                        </a>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
