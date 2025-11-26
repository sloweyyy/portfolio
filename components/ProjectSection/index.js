import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button";

const ProjectSection = ({ projects }) => {
    const [activeProject, setActiveProject] = useState(projects[0]);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Background color transition: Neutral -> White -> Neutral
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        ["var(--neo-bg)", "#ffffff", "#ffffff", "var(--neo-bg)"]
    );

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor }}
            className="py-20 min-h-screen transition-colors duration-500"
        >
            <div className="container mx-auto px-4 laptop:px-0">
                <motion.h1 
                    className="text-4xl laptop:text-6xl font-heading font-bold uppercase mb-20 text-neo-black"
                    style={{ color: "var(--neo-black)" }} 
                >
                    Selected Work
                </motion.h1>

                <div className="flex flex-col laptop:flex-row gap-10">
                    {/* Sticky Preview Section (Left) */}
                    <div className="hidden laptop:block w-1/2 sticky top-32 h-fit">
                        <div className="border-4 border-neo-black shadow-neo bg-white p-2">
                            <div className="relative h-[400px] overflow-hidden border-2 border-neo-black">
                                <img
                                    src={activeProject.imageSrc}
                                    alt={activeProject.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 p-4">
                                <h2 className="text-3xl font-heading font-bold uppercase text-neo-black">
                                    {activeProject.title}
                                </h2>
                                <p className="text-lg font-body mt-2 opacity-80">
                                    {activeProject.description}
                                </p>
                                <div className="mt-4">
                                    <Button onClick={() => window.open(activeProject.url)}>
                                        View Project
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable List Section (Right) */}
                    <div className="w-full laptop:w-1/2 flex flex-col gap-20 pb-40">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="group cursor-pointer"
                                onViewportEnter={() => setActiveProject(project)}
                                viewport={{ margin: "-50% 0px -50% 0px" }}
                            >
                                {/* Mobile Image (Visible only on mobile) */}
                                <div className="laptop:hidden mb-4 border-2 border-neo-black shadow-neo bg-white p-1">
                                    <img
                                        src={project.imageSrc}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                <div className="border-b-2 border-neo-black/20 pb-10 transition-all duration-300 group-hover:pl-4">
                                    <h2 className="text-4xl laptop:text-6xl font-heading font-bold uppercase text-neo-black group-hover:text-neo-purple transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-xl font-body text-neo-black/80 mt-4">
                                        {project.description}
                                    </p>
                                    <div className="mt-6 laptop:hidden">
                                        <Button onClick={() => window.open(project.url)}>
                                            View Project
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectSection;
