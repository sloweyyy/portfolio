import React from "react";
import Button from "../Button";
import { motion } from "framer-motion";

const ShowcaseSection = () => {
    const items = [
        {
            id: 1,
            title: "Presentations",
            description: "Engaging talks on the future of web development, AI integration, and building scalable digital products.",
            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop",
            theme: "orange", // bg-orange-500
            tag: "Speaking"
        },
        {
            id: 2,
            title: "Workshops",
            description: "Hands-on sessions teaching modern frontend architectures, React performance, and design systems.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
            theme: "green", // bg-green-600
            tag: "Education"
        }
    ];

    const getThemeClasses = (theme) => {
        switch (theme) {
            case "orange": return "bg-[#f97316]";
            case "green": return "bg-[#16a34a]";
            case "purple": return "bg-[#9333ea]";
            case "blue": return "bg-[#2563eb]";
            default: return "bg-neo-black";
        }
    };

    return (
        <div className="py-20 bg-neo-bg">
            <div className="container mx-auto px-4 laptop:px-0">
                <div className="text-center mb-20">
                    <h1 className="text-5xl laptop:text-7xl font-heading font-bold uppercase text-neo-black mb-4">
                        Speaking & <span className="text-[#f97316] italic">Workshops</span>
                    </h1>
                    <div className="inline-block bg-neo-yellow border-2 border-neo-black px-4 py-2 transform -rotate-2">
                        <span className="font-heading font-bold uppercase">Sharing Knowledge</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 laptop:grid-cols-2 gap-10">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`${getThemeClasses(item.theme)} border-4 border-neo-black rounded-[2rem] p-8 relative overflow-hidden group`}
                        >
                            {/* Sticker/Badge */}
                            <div className="absolute top-8 left-8 z-10">
                                <div className="bg-neo-green text-neo-black font-bold uppercase px-4 py-2 border-2 border-neo-black transform -rotate-12">
                                    {item.tag}
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className="w-full h-64 border-4 border-neo-black rounded-xl overflow-hidden mb-8 bg-white relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <h2 className="text-4xl laptop:text-5xl font-heading font-bold uppercase text-neo-yellow mb-4 leading-none">
                                {item.title}
                            </h2>
                            <p className="text-white font-body text-lg mb-8 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="flex justify-center">
                                <Button onClick={() => window.open("mailto:hello@slowey.com")}>
                                    Invite to Speak
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowcaseSection;
