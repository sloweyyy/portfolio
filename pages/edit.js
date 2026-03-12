import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Toaster } from "../components/Toaster";

import yourData from "../data/portfolio.json";
import Cursor from "../components/Cursor";

const Edit = () => {
    const [data, setData] = useState(yourData);
    const [currentTabs, setCurrentTabs] = useState("HEADER");
    const router = useRouter();
    const isDevEnv = process.env.NODE_ENV === "development";

    useEffect(() => {
        if (!isDevEnv) {
            router.replace("/");
        }
    }, [isDevEnv, router]);

    const saveData = async () => {
        if (!isDevEnv) {
            toast.error("Editing is available only in local development.");
            return;
        }

        try {
            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error("Received non-JSON response from server");
            }

            const result = await res.json();
            if (!res.ok) {
                toast.error(result.message || "Failed to save changes");
                return;
            }

            toast.success(result.message || "Changes saved successfully");
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Error saving changes. Please try again.");
        }
    };

    if (!isDevEnv) {
        return (
            <>
                <Toaster />
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="text-center max-w-lg">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Dashboard Is Disabled
                        </h1>
                        <p className="mt-3 text-gray-700">
                            Portfolio editing is available only in local development mode.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Button onClick={() => router.push("/")} type="primary">
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    // Project Handler
    const editProjects = (projectIndex, editProject) => {
        const copyProjects = data.projects.map((project, index) =>
            index === projectIndex ? { ...editProject } : project
        );
        setData({ ...data, projects: copyProjects });
    };

    const addProject = () => {
        setData({
            ...data,
            projects: [
                ...data.projects,
                {
                    id: uuidv4(),
                    title: "New Project",
                    description: "Web Design & Development",
                    imageSrc:
                        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHxwYXN0ZWx8ZW58MHx8MHw%3D&auto=format&fit=crop&w=400&q=60",

                    url: "http://chetanverma.com/",
                    tags: ["React", "Node.js", "Product"],
                    period: "",
                    role: "",
                    highlights: [],
                },
            ],
        });
    };

    const deleteProject = (id) => {
        const copyProjects = data.projects.filter((project) => project.id !== id);
        setData({ ...data, projects: copyProjects });
    };

    // Services Handler
    const editServices = (serviceIndex, editService) => {
        const copyServices = data.services.map((service, index) =>
            index === serviceIndex ? { ...editService } : service
        );
        setData({ ...data, services: copyServices });
    };

    const addService = () => {
        setData({
            ...data,
            services: [
                ...data.services,
                {
                    id: uuidv4(),
                    title: "New Service",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                },
            ],
        });
    };

    const deleteService = (id) => {
        const copyServices = data.services.filter((service) => service.id !== id);
        setData({ ...data, services: copyServices });
    };

    // Socials Handler
    const editSocials = (socialIndex, editSocial) => {
        const copySocials = data.socials.map((social, index) =>
            index === socialIndex ? { ...editSocial } : social
        );
        setData({ ...data, socials: copySocials });
    };

    const addSocials = () => {
        setData({
            ...data,
            socials: [
                ...data.socials,
                {
                    id: uuidv4(),
                    title: "New Link",
                    link: "www.chetanverma.com",
                },
            ],
        });
    };

    const deleteSocials = (id) => {
        const copySocials = data.socials.filter((social) => social.id !== id);
        setData({ ...data, socials: copySocials });
    };

    // Resume
    const handleAddExperiences = () => {
        setData({
            ...data,
            resume: {
                ...data.resume,
                experiences: [
                    ...data.resume.experiences,
                    {
                        id: uuidv4(),
                        dates: "Enter Dates",
                        type: "Full Time",
                        position: "Frontend Engineer at X",
                        bullets: [
                            "Worked on the frontend of a React application",
                        ],
                    },
                ],
            },
        });
    };

    const handleEditExperiences = (index, editExperience) => {
        const copyExperiences = data.resume.experiences.map(
            (experience, experienceIndex) =>
                experienceIndex === index ? { ...editExperience } : experience
        );
        setData({
            ...data,
            resume: { ...data.resume, experiences: copyExperiences },
        });
    };

    return (
        <>
            <Toaster />
            <div
                className={`container mx-auto ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog></Header>
                {data.showCursor && <Cursor />}
                <div className="mt-10">
                    <div
                        className={`${
                            "bg-white"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl">Dashboard</h1>
                            <div className="flex items-center">
                                <Button onClick={saveData} type="primary">
                                    Save
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Button
                                onClick={() => setCurrentTabs("HEADER")}
                                type={currentTabs === "HEADER" && "primary"}
                            >
                                Header
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("PROJECTS")}
                                type={currentTabs === "PROJECTS" && "primary"}
                            >
                                Projects
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("SERVICES")}
                                type={currentTabs === "SERVICES" && "primary"}
                            >
                                Services
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("ABOUT")}
                                type={currentTabs === "ABOUT" && "primary"}
                            >
                                About
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("SOCIAL")}
                                type={currentTabs === "SOCIAL" && "primary"}
                            >
                                Social
                            </Button>
                            <Button
                                onClick={() => setCurrentTabs("RESUME")}
                                type={currentTabs === "RESUME" && "primary"}
                            >
                                Resume
                            </Button>
                        </div>
                    </div>
                    {/* HEADER */}
                    {currentTabs === "HEADER" && (
                        <div className="mt-10">
                            <div className="flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Name
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-sx opacity-50">
                                    Header Tagline One
                                </label>
                                <input
                                    value={data.headerTaglineOne}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineOne: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Two
                                </label>
                                <input
                                    value={data.headerTaglineTwo}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineTwo: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>

                            {/* Alternate Taglines Two */}
                            <div className="mt-8 mb-4">
                                <div className="flex items-center">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Alternate Taglines Two
                                    </label>
                                    <div className="w-4/5 ml-10">
                                        <Button
                                            onClick={() => {
                                                const updated = [
                                                    ...(data.alternateTaglinesTwo ||
                                                        []),
                                                    "",
                                                ];
                                                setData({
                                                    ...data,
                                                    alternateTaglinesTwo:
                                                        updated,
                                                });
                                            }}
                                        >
                                            Add Alternate
                                        </Button>
                                    </div>
                                </div>

                                {(data.alternateTaglinesTwo || []).map(
                                    (tagline, index) => (
                                        <div
                                            key={index}
                                            className="mt-3 flex items-center"
                                        >
                                            <div className="w-1/5"></div>
                                            <div className="w-4/5 ml-10 flex items-center">
                                                <input
                                                    value={tagline}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...data.alternateTaglinesTwo,
                                                        ];
                                                        updated[index] =
                                                            e.target.value;
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesTwo:
                                                                updated,
                                                        });
                                                    }}
                                                    className="flex-grow p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                />
                                                <Button
                                                    classes="ml-2 bg-red-500 text-white hover:bg-red-600"
                                                    onClick={() => {
                                                        const updated = [
                                                            ...data.alternateTaglinesTwo,
                                                        ];
                                                        updated.splice(
                                                            index,
                                                            1
                                                        );
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesTwo:
                                                                updated,
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Three
                                </label>
                                <input
                                    value={data.headerTaglineThree}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineThree: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>

                            {/* Alternate Taglines Three */}
                            <div className="mt-8 mb-4">
                                <div className="flex items-center">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Alternate Taglines Three
                                    </label>
                                    <div className="w-4/5 ml-10">
                                        <Button
                                            onClick={() => {
                                                const updated = [
                                                    ...(data.alternateTaglinesThree ||
                                                        []),
                                                    "",
                                                ];
                                                setData({
                                                    ...data,
                                                    alternateTaglinesThree:
                                                        updated,
                                                });
                                            }}
                                        >
                                            Add Alternate
                                        </Button>
                                    </div>
                                </div>

                                {(data.alternateTaglinesThree || []).map(
                                    (tagline, index) => (
                                        <div
                                            key={index}
                                            className="mt-3 flex items-center"
                                        >
                                            <div className="w-1/5"></div>
                                            <div className="w-4/5 ml-10 flex items-center">
                                                <input
                                                    value={tagline}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...data.alternateTaglinesThree,
                                                        ];
                                                        updated[index] =
                                                            e.target.value;
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesThree:
                                                                updated,
                                                        });
                                                    }}
                                                    className="flex-grow p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                />
                                                <Button
                                                    classes="ml-2 bg-red-500 text-white hover:bg-red-600"
                                                    onClick={() => {
                                                        const updated = [
                                                            ...data.alternateTaglinesThree,
                                                        ];
                                                        updated.splice(
                                                            index,
                                                            1
                                                        );
                                                        setData({
                                                            ...data,
                                                            alternateTaglinesThree:
                                                                updated,
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Header Tagline Four
                                </label>
                                <input
                                    value={data.headerTaglineFour}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            headerTaglineFour: e.target.value,
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Blog
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({ ...data, showBlog: true })
                                        }
                                        type={data.showBlog && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showBlog: false,
                                            })
                                        }
                                        classes={
                                            !data.showBlog &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Show Resume
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showResume: true,
                                            })
                                        }
                                        type={data.showResume && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showResume: false,
                                            })
                                        }
                                        classes={
                                            !data.showResume &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-lg opacity-50">
                                    Custom Cursor
                                </label>
                                <div className="w-4/5 ml-10 flex items-center">
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showCursor: true,
                                            })
                                        }
                                        type={data.showCursor && "primary"}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                showCursor: false,
                                            })
                                        }
                                        classes={
                                            !data.showCursor &&
                                            "bg-red-500 text-white hover:bg-red-600"
                                        }
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* PROJECTS */}
                    {currentTabs === "PROJECTS" && (
                        <>
                            <div className="mt-10">
                                {data.projects.map((project, index) => (
                                    <div className="mt-10" key={project.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {project.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteProject(project.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>

                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={project.title}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Description
                                            </label>
                                            <input
                                                value={project.description}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Image Source
                                            </label>
                                            <input
                                                value={project.imageSrc}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        imageSrc:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                URL
                                            </label>
                                            <input
                                                value={project.url}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        url: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Tags
                                            </label>
                                            <input
                                                value={(project.tags || []).join(", ")}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        tags: e.target.value
                                                            .split(",")
                                                            .map((tag) =>
                                                                tag.trim()
                                                            )
                                                            .filter(Boolean),
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                                placeholder="FastAPI, LangGraph, AWS ECS"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Period
                                            </label>
                                            <input
                                                value={project.period || ""}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        period: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                                placeholder="Apr 2025 - Present"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Role
                                            </label>
                                            <input
                                                value={project.role || ""}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        role: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                                placeholder="Product Owner • Engineering Lead"
                                            ></input>
                                        </div>
                                        <div className="flex mt-2">
                                            <label className="w-1/5 text-lg opacity-50 pt-2">
                                                Highlights
                                            </label>
                                            <textarea
                                                value={(project.highlights || []).join("\n")}
                                                onChange={(e) =>
                                                    editProjects(index, {
                                                        ...project,
                                                        highlights: e.target.value
                                                            .split("\n")
                                                            .map((line) =>
                                                                line.trim()
                                                            )
                                                            .filter(Boolean),
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2 min-h-[90px]"
                                                placeholder="One highlight per line"
                                            ></textarea>
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                ))}
                            </div>

                            <div className="my-10">
                                <Button onClick={addProject} type="primary">
                                    Add Project +
                                </Button>
                            </div>
                        </>
                    )}
                    {/* SERVICES */}
                    {currentTabs === "SERVICES" && (
                        <>
                            <div className="mt-10">
                                {data.services.map((service, index) => (
                                    <div key={service.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {service.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteService(service.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={service.title}
                                                onChange={(e) =>
                                                    editServices(index, {
                                                        ...service,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Description
                                            </label>
                                            <textarea
                                                value={service.description}
                                                onChange={(e) =>
                                                    editServices(index, {
                                                        ...service,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                            ></textarea>
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                ))}
                            </div>
                            <div className="my-10">
                                <Button onClick={addService} type="primary">
                                    Add Service +
                                </Button>
                            </div>
                        </>
                    )}
                    {currentTabs === "ABOUT" && (
                        <div className="mt-10">
                            <h1 className="text-2xl">About</h1>
                            <textarea
                                className="w-full h-96 mt-10 p-2 rounded-md shadow-md border"
                                value={data.aboutpara}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        aboutpara: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                    )}
                    {currentTabs === "SOCIAL" && (
                        <div className="mt-10">
                            {data.socials.map((social, index) => (
                                <>
                                    <div key={social.id}>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-2xl">
                                                {social.title}
                                            </h1>
                                            <Button
                                                onClick={() =>
                                                    deleteSocials(social.id)
                                                }
                                                type="primary"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Title
                                            </label>
                                            <input
                                                value={social.title}
                                                onChange={(e) =>
                                                    editSocials(index, {
                                                        ...social,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/5 text-lg opacity-50">
                                                Link
                                            </label>
                                            <input
                                                value={social.link}
                                                onChange={(e) =>
                                                    editSocials(index, {
                                                        ...social,
                                                        link: e.target.value,
                                                    })
                                                }
                                                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                type="text"
                                            />
                                        </div>
                                        <hr className="my-10"></hr>
                                    </div>
                                </>
                            ))}
                            <div className="my-10">
                                <Button onClick={addSocials} type="primary">
                                    Add Social +
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentTabs === "RESUME" && (
                        <div className="mt-10">
                            <h1>Main</h1>
                            <div className="mt-5 flex items-center">
                                <label className="w-1/5 text-sx opacity-50">
                                    Tagline
                                </label>
                                <input
                                    value={data.resume.tagline}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            resume: {
                                                ...data.resume,
                                                tagline: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                    type="text"
                                ></input>
                            </div>
                            <div className="flex items-center mt-5">
                                <label className="w-1/5 text-lg opacity-50">
                                    Description
                                </label>
                                <textarea
                                    value={data.resume.description}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            resume: {
                                                ...data.resume,
                                                description: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                ></textarea>
                            </div>
                            <hr className="my-10"></hr>

                            <h1>Experiences</h1>
                            <div className="mt-10">
                                {data.resume.experiences.map(
                                    (experiences, index) => (
                                        <div
                                            className="mt-5"
                                            key={experiences.id}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-2xl">
                                                    {experiences.position}
                                                </h1>
                                                <Button
                                                    onClick={() =>
                                                        deleteProject(
                                                            experiences.id
                                                        )
                                                    }
                                                    type="primary"
                                                >
                                                    Delete
                                                </Button>
                                            </div>

                                            <div className="flex items-center mt-5">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Dates
                                                </label>
                                                <input
                                                    value={experiences.dates}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                dates: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Type
                                                </label>
                                                <input
                                                    value={experiences.type}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                type: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Position
                                                </label>
                                                <input
                                                    value={experiences.position}
                                                    onChange={(e) =>
                                                        handleEditExperiences(
                                                            index,
                                                            {
                                                                ...experiences,
                                                                position:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        )
                                                    }
                                                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="mt-2 flex">
                                                <label className="w-1/5 text-lg opacity-50">
                                                    Bullets
                                                </label>
                                                <div className="w-4/5 ml-10 flex flex-col">
                                                    <input
                                                        value={
                                                            experiences.bullets
                                                        }
                                                        onChange={(e) =>
                                                            handleEditExperiences(
                                                                index,
                                                                {
                                                                    ...experiences,
                                                                    bullets:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        }
                                                        placeholder="Bullet One, Bullet Two, Bullet Three"
                                                        className="p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="my-10">
                                <Button
                                    onClick={handleAddExperiences}
                                    type="primary"
                                >
                                    Add Experience +
                                </Button>
                            </div>
                            <hr className="my-10"></hr>
                            <div className="mt-10">
                                <h1>Education</h1>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Name
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityName
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityName:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Dates
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityDate
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityDate:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                                <div className="flex items-center mt-5">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Detail
                                    </label>
                                    <input
                                        value={
                                            data.resume.education.universityPara
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                resume: {
                                                    ...data.resume,
                                                    education: {
                                                        ...data.resume
                                                            .education,
                                                        universityPara:
                                                            e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                                        type="text"
                                    ></input>
                                </div>
                            </div>
                            <hr className="my-10"></hr>
                            <div className="mt-10">
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Languages
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.languages.map(
                                            (language, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={language}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    languages: [
                                                                        ...data.resume.languages.slice(
                                                                            0,
                                                                            index
                                                                        ),
                                                                        e.target
                                                                            .value,
                                                                        ...data.resume.languages.slice(
                                                                            index +
                                                                                1
                                                                        ),
                                                                    ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    languages:
                                                                        data.resume.languages.filter(
                                                                            (
                                                                                value,
                                                                                i
                                                                            ) =>
                                                                                index !==
                                                                                i
                                                                        ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            type="primary"
                                            classes="hover:scale-100"
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        languages: [
                                                            ...data.resume
                                                                .languages,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-10"></hr>
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Frameworks
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.frameworks.map(
                                            (framework, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={framework}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    frameworks:
                                                                        [
                                                                            ...data.resume.frameworks.slice(
                                                                                0,
                                                                                index
                                                                            ),
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            ...data.resume.frameworks.slice(
                                                                                index +
                                                                                    1
                                                                            ),
                                                                        ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    frameworks:
                                                                        data.resume.frameworks.filter(
                                                                            (
                                                                                value,
                                                                                i
                                                                            ) =>
                                                                                index !==
                                                                                i
                                                                        ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        frameworks: [
                                                            ...data.resume
                                                                .frameworks,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                            type="primary"
                                            classes="hover:scale-100"
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                                <hr className="my-10"></hr>
                                <div className="flex">
                                    <label className="w-1/5 text-lg opacity-50">
                                        Others
                                    </label>
                                    <div className="w-4/5 ml-10 flex flex-col">
                                        {data.resume.others.map(
                                            (other, index) => (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                >
                                                    <input
                                                        value={other}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    others: [
                                                                        ...data.resume.others.slice(
                                                                            0,
                                                                            index
                                                                        ),
                                                                        e.target
                                                                            .value,
                                                                        ...data.resume.others.slice(
                                                                            index +
                                                                                1
                                                                        ),
                                                                    ],
                                                                },
                                                            });
                                                        }}
                                                        className="w-full p-2 rounded-md shadow-lg border-2"
                                                        type="text"
                                                    ></input>
                                                    <Button
                                                        onClick={() =>
                                                            setData({
                                                                ...data,
                                                                resume: {
                                                                    ...data.resume,
                                                                    others: data.resume.others.filter(
                                                                        (
                                                                            value,
                                                                            i
                                                                        ) =>
                                                                            index !==
                                                                            i
                                                                    ),
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    resume: {
                                                        ...data.resume,
                                                        others: [
                                                            ...data.resume
                                                                .others,
                                                            "Added",
                                                        ],
                                                    },
                                                })
                                            }
                                            type="primary"
                                            classes="hover:scale-100"
                                        >
                                            Add +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Edit;
