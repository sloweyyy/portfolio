import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import data from "../data/portfolio.json";

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
                <div className="fixed bottom-6 right-6">
                    <Button onClick={handleViewPdf} type={"primary"}>
                        View PDF
                    </Button>
                </div>
            )}

            {data.showCursor && <Cursor />}
            <div
                className={`container mx-auto mb-10 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog />
                {mount && (
                    <div className="mt-16 w-full flex flex-col items-center">
                        <div
                            className={`w-full ${
                                mount && theme.theme === "dark"
                                    ? "bg-slate-800"
                                    : "bg-gray-50"
                            } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
                        >
                            <h1 className="text-4xl font-bold">{data.name}</h1>
                            <h2 className="text-xl mt-8">
                                {data.resume.tagline}
                            </h2>
                            <h2 className="w-4/5 text-xl mt-8 opacity-50">
                                {data.resume.description}
                            </h2>
                            <div className="mt-6">
                                <Socials />
                            </div>
                            <div className="mt-12">
                                <h1 className="text-2xl font-bold">
                                    Experience
                                </h1>

                                {data.resume.experiences.map(
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
                                        ></ProjectResume>
                                    )
                                )}
                            </div>
                            <div className="mt-12">
                                <h1 className="text-2xl font-bold">
                                    Education
                                </h1>
                                <div className="mt-5">
                                    <h2 className="text-lg">
                                        {data.resume.education.universityName}
                                    </h2>
                                    <h3 className="text-sm opacity-75 mt-2">
                                        {data.resume.education.universityDate}
                                    </h3>
                                    <p className="text-sm mt-4 opacity-50">
                                        {data.resume.education.universityPara}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-12">
                                <h1 className="text-2xl font-bold">Skills</h1>
                                <div className="flex mob:flex-col desktop:flex-row justify-between mt-6">
                                    {data.resume.languages && (
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
                                    )}

                                    {data.resume.frameworks && (
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
                                    )}

                                    {data.resume.others && (
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Resume;
