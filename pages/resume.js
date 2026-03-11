import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const Resume = () => {
    const router = useRouter();
    const resume = data.resume || {};
    const experiences = resume.experiences || [];
    const fallbackSkillGroups = [
        {
            id: "languages",
            title: resume.languagesTitle || "Languages",
            description: "Programming languages and communication",
            items: resume.languages || [],
        },
        {
            id: "frameworks",
            title: resume.frameworksTitle || "Frameworks",
            description: "Frameworks and engineering platforms",
            items: resume.frameworks || [],
        },
        {
            id: "others",
            title: resume.othersTitle || "Others",
            description: "Cloud, tools, and delivery capabilities",
            items: resume.others || [],
        },
    ];
    const skillGroups =
        Array.isArray(resume.skillGroups) && resume.skillGroups.length > 0
            ? resume.skillGroups
            : fallbackSkillGroups;
    const filteredSkillGroups = skillGroups.filter(
        (group) => Array.isArray(group.items) && group.items.length > 0
    );
    const skillGradients = [
        "from-pink-100 to-rose-50",
        "from-blue-100 to-cyan-50",
        "from-yellow-100 to-amber-50",
        "from-green-100 to-emerald-50",
    ];

    useEffect(() => {
        if (!data.showResume) {
            router.push("/");
        }
    }, [router]);

    const handleViewPdf = () => {
        window.open(
            "/Truong-Le-Vinh-Phuc-Product-Manager.pdf",
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className={data.showCursor ? "cursor-none" : ""}>
            <Head>
                <title>Resume - SloWey</title>
            </Head>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                <Button onClick={handleViewPdf} type={"primary"}>
                    View PDF
                </Button>
                {process.env.NODE_ENV === "development" && (
                    <Button
                        onClick={() => router.push("/edit")}
                        classes="bg-white text-black border border-black hover:bg-gray-100"
                    >
                        Edit Resume
                    </Button>
                )}
            </div>

            {data.showCursor && <Cursor />}
            <div
                className={`w-full max-w-[1440px] mx-auto px-4 laptop:px-14 mb-10 pb-40 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header />
                <div className="mt-16 w-full flex flex-col items-center">
                    <div
                        className={`w-full bg-gray-50 max-w-5xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
                    >
                                <h1 className="text-4xl font-bold">
                                    {data.name}
                                </h1>
                                <h2 className="text-xl mt-8">
                                    {resume.tagline}
                                </h2>
                                <p className="w-full text-xl mt-8 opacity-75 leading-relaxed tracking-wide max-w-4xl font-body">
                                    {resume.description}
                                </p>
                                <div className="mt-6">
                                    <Socials />
                                </div>
                                <div className="mt-12">
                                    <h1 className="text-2xl font-bold">
                                        {resume.experienceTitle || "Experience"}
                                    </h1>
                                    {experiences.map(
                                        ({
                                            id,
                                            dates,
                                            type,
                                            position,
                                            bullets,
                                        }) => (
                                            <ProjectResume
                                                key={id}
                                                dates={dates}
                                                type={type}
                                                position={position}
                                                bullets={bullets}
                                            />
                                        )
                                    )}
                                </div>
                                <div className="mt-12">
                                    <h1 className="text-2xl font-bold">
                                        {resume.educationTitle || "Education"}
                                    </h1>
                                    <div className="mt-5">
                                        <h2 className="text-lg">{resume.education?.universityName || ""}</h2>
                                        <h3 className="text-sm opacity-75 mt-2">{resume.education?.universityDate || ""}</h3>
                                        <p className="text-sm mt-4 opacity-50">{resume.education?.universityPara || ""}</p>
                                    </div>
                                </div>
                        <div className="mt-12">
                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <h1 className="text-2xl font-bold">
                                    {resume.skillsTitle || "Skills"}
                                </h1>
                                <p className="text-xs uppercase tracking-[0.2em] text-black/50 font-semibold">
                                    {filteredSkillGroups.length} categories
                                </p>
                            </div>
                            <p className="mt-3 text-sm text-black/60">
                                Skill matrix grouped by capability area for quick scanning.
                            </p>

                            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-6">
                                {filteredSkillGroups.map((group, index) => (
                                    <div
                                        key={group.id || index}
                                        className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
                                    >
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${
                                                skillGradients[index % skillGradients.length]
                                            } opacity-60 pointer-events-none`}
                                        ></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between gap-3">
                                                <h2 className="text-lg font-bold">
                                                    {group.title}
                                                </h2>
                                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/80 border border-black/10">
                                                    {group.items.length}
                                                </span>
                                            </div>
                                            {group.description && (
                                                <p className="text-sm mt-2 text-black/65">
                                                    {group.description}
                                                </p>
                                            )}

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {group.items.map(
                                                    (item, itemIndex) => (
                                                        <span
                                                            key={`${group.id || "skill"}-${itemIndex}`}
                                                            className="inline-flex text-xs px-3 py-1.5 rounded-full bg-white/90 border border-black/10 font-medium"
                                                        >
                                                            {item}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
