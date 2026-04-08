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

    const actionButtons = (
        <>
            <Button onClick={handleViewPdf} type="primary" classes="w-full">
                View PDF
            </Button>
            {process.env.NODE_ENV === "development" && (
                <Button
                    onClick={() => router.push("/edit")}
                    classes="w-full bg-white text-black border border-black hover:bg-gray-100"
                >
                    Edit Resume
                </Button>
            )}
        </>
    );

    return (
        <div className={data.showCursor ? "cursor-none" : ""}>
            <Head>
                <title>Resume - SloWey</title>
            </Head>

            {data.showCursor && <Cursor />}
            <div
                className={`w-full max-w-[1440px] mx-auto px-4 laptop:px-14 mb-10 pb-24 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header />
                <div className="mt-16 w-full flex justify-center">
                    <div className="w-full max-w-6xl flex flex-col laptop:flex-row laptop:items-start gap-6">
                        <div className="resume-body w-full bg-gray-50 p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm border border-black/10">
                            <h1 className="text-4xl font-bold">{data.name}</h1>
                            <p className="text-xl mt-8">{resume.tagline}</p>
                            <div className="mt-6 flex flex-wrap gap-3 laptop:hidden">
                                {actionButtons}
                            </div>
                            <p className="w-full text-xl mt-8 opacity-75 leading-relaxed tracking-wide max-w-4xl">
                                {resume.description}
                            </p>
                            <div className="mt-6">
                                <Socials />
                            </div>

                            <section className="mt-12" aria-labelledby="resume-experience-heading">
                                <h2 id="resume-experience-heading" className="text-2xl font-bold">
                                    {resume.experienceTitle || "Experience"}
                                </h2>
                                {experiences.map(({ id, dates, type, position, bullets }) => (
                                    <ProjectResume
                                        key={id}
                                        dates={dates}
                                        type={type}
                                        position={position}
                                        bullets={bullets}
                                    />
                                ))}
                            </section>

                            <section className="mt-12" aria-labelledby="resume-education-heading">
                                <h2 id="resume-education-heading" className="text-2xl font-bold">
                                    {resume.educationTitle || "Education"}
                                </h2>
                                <div className="mt-5 flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {resume.education?.universityName || ""}
                                        </h3>
                                        <p className="text-sm text-black/60 mt-0.5">
                                            Bachelor of Software Engineering &middot; {resume.education?.universityDate || ""}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 shrink-0">
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-black/5 font-semibold">GPA: 8.72/10</span>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-black/5 font-semibold">Thesis: 9.5/10</span>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-12" aria-labelledby="resume-skills-heading">
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <h2 id="resume-skills-heading" className="text-2xl font-bold">
                                        {resume.skillsTitle || "Skills"}
                                    </h2>
                                    <p className="text-xs uppercase tracking-[0.2em] text-black/60 font-semibold">
                                        {filteredSkillGroups.length} categories
                                    </p>
                                </div>
                                <p className="mt-3 text-sm text-black/75 max-w-3xl">
                                    Skill matrix grouped by capability area for quick screening.
                                </p>

                                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4 mt-6">
                                    {filteredSkillGroups.map((group, index) => (
                                        <article
                                            key={group.id || index}
                                            className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-sm min-h-[220px]"
                                        >
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${
                                                    skillGradients[index % skillGradients.length]
                                                } opacity-60 pointer-events-none`}
                                            ></div>
                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="text-base font-bold leading-tight">
                                                        {group.title}
                                                    </h3>
                                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/90 border border-black/10 shrink-0">
                                                        {group.items.length}
                                                    </span>
                                                </div>
                                                {group.description && (
                                                    <p className="text-xs mt-2 text-black/75 leading-relaxed">
                                                        {group.description}
                                                    </p>
                                                )}

                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {group.items.map((item, itemIndex) => (
                                                        <span
                                                            key={`${group.id || "skill"}-${itemIndex}`}
                                                            className="inline-flex text-xs px-2.5 py-1.5 rounded-full bg-white border border-black/15 font-semibold text-black/80"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="hidden laptop:flex laptop:w-56 laptop:sticky laptop:top-24 flex-col gap-3 shrink-0">
                            {actionButtons}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
