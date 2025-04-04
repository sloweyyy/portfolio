import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import data from "../data/portfolio.json";
import { motion, useInView } from "framer-motion";

const Resume = () => {
    const router = useRouter();
    const theme = useTheme();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
        if (!data.showResume) {
            router.push("/");
        }
    }, [router]);

    const handleViewPdf = () => {
        window.open(
            "https://drive.google.com/file/d/14VcPD_mXkNDaLmYK5KaqwgBboKu0CQcC/view?usp=sharing",
            "_blank"
        );
    };

    // Animation variants
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8 },
        },
    };

    // Scroll animation component that reveals content as it scrolls into view
    const ScrollReveal = ({
        children,
        threshold = 0.1,
        delay = 0,
        direction = null,
    }) => {
        const ref = React.useRef(null);
        const inView = useInView(ref, { once: true, amount: threshold });

        let initial = { opacity: 0 };
        if (direction === "up") initial = { ...initial, y: 30 };
        if (direction === "down") initial = { ...initial, y: -30 };
        if (direction === "left") initial = { ...initial, x: 30 };
        if (direction === "right") initial = { ...initial, x: -30 };

        return (
            <motion.div
                ref={ref}
                initial={initial}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.1, 0.25, 0.3, 1], // Custom ease curve for more natural motion
                }}
            >
                {children}
            </motion.div>
        );
    };

    return (
        <>
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-6 right-6">
                    <Button
                        onClick={() => router.push("/edit")}
                        type={"primary"}
                    >
                        Edit Resume
                    </Button>
                </div>
            )}
            {process.env.NODE_ENV === "production" && (
                <motion.div
                    className="fixed bottom-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <Button onClick={handleViewPdf} type={"primary"}>
                        View PDF
                    </Button>
                </motion.div>
            )}

            {data.showCursor && <Cursor />}
            <div
                className={`container mx-auto mb-10 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog />
                {mount && (
                    <motion.div
                        className="mt-16 w-full flex flex-col items-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                    >
                        <motion.div
                            className={`w-full ${
                                mount && theme.theme === "dark"
                                    ? "bg-slate-800"
                                    : "bg-gray-50"
                            } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
                        >
                            <ScrollReveal>
                                <h1 className="text-4xl font-bold">
                                    {data.name}
                                </h1>
                                <h2 className="text-xl mt-8">
                                    {data.resume.tagline}
                                </h2>
                                <h2 className="w-4/5 text-xl mt-8 opacity-50">
                                    {data.resume.description}
                                </h2>
                                <div className="mt-6">
                                    <Socials />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2} direction="up">
                                <div className="mt-12">
                                    <h1 className="text-2xl font-bold">
                                        Experience
                                    </h1>
                                    {data.resume.experiences.map(
                                        (
                                            {
                                                id,
                                                dates,
                                                type,
                                                position,
                                                bullets,
                                            },
                                            index
                                        ) => (
                                            <ScrollReveal
                                                key={id}
                                                delay={0.1 + index * 0.1}
                                                direction="up"
                                                threshold={0.2}
                                            >
                                                <ProjectResume
                                                    dates={dates}
                                                    type={type}
                                                    position={position}
                                                    bullets={bullets}
                                                />
                                            </ScrollReveal>
                                        )
                                    )}
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3} direction="up">
                                <div className="mt-12">
                                    <h1 className="text-2xl font-bold">
                                        Education
                                    </h1>
                                    <div className="mt-5">
                                        <h2 className="text-lg">
                                            {
                                                data.resume.education
                                                    .universityName
                                            }
                                        </h2>
                                        <h3 className="text-sm opacity-75 mt-2">
                                            {
                                                data.resume.education
                                                    .universityDate
                                            }
                                        </h3>
                                        <p className="text-sm mt-4 opacity-50">
                                            {
                                                data.resume.education
                                                    .universityPara
                                            }
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="mt-12">
                                <ScrollReveal delay={0.4} direction="up">
                                    <h1 className="text-2xl font-bold">
                                        Skills
                                    </h1>
                                </ScrollReveal>
                                <div className="flex mob:flex-col desktop:flex-row justify-between mt-6">
                                    {data.resume.languages && (
                                        <ScrollReveal
                                            delay={0.5}
                                            direction="left"
                                        >
                                            <div className="mt-4 mob:mt-5">
                                                <h2 className="text-lg font-semibold">
                                                    Languages
                                                </h2>
                                                <ul className="list-disc mt-4">
                                                    {data.resume.languages.map(
                                                        (language, index) => (
                                                            <li
                                                                key={index}
                                                                className="ml-5 py-2"
                                                            >
                                                                {language}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </ScrollReveal>
                                    )}

                                    {data.resume.frameworks && (
                                        <ScrollReveal
                                            delay={0.6}
                                            direction="up"
                                        >
                                            <div className="mt-4 mob:mt-8">
                                                <h2 className="text-lg font-semibold">
                                                    Frameworks
                                                </h2>
                                                <ul className="list-disc mt-4">
                                                    {data.resume.frameworks.map(
                                                        (framework, index) => (
                                                            <li
                                                                key={index}
                                                                className="ml-5 py-2"
                                                            >
                                                                {framework}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </ScrollReveal>
                                    )}

                                    {data.resume.others && (
                                        <ScrollReveal
                                            delay={0.7}
                                            direction="right"
                                        >
                                            <div className="mt-4 mob:mt-8">
                                                <h2 className="text-lg font-semibold">
                                                    Others
                                                </h2>
                                                <ul className="list-disc mt-4">
                                                    {data.resume.others.map(
                                                        (other, index) => (
                                                            <li
                                                                key={index}
                                                                className="ml-5 py-2"
                                                            >
                                                                {other}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </ScrollReveal>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Resume;
