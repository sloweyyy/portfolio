import React from "react";
import { motion } from "framer-motion";

const Marquee = ({ items, direction = "left", speed = 20, className = "" }) => {
    return (
        <div className={`relative flex overflow-hidden ${className}`}>
            <motion.div
                className="flex min-w-full shrink-0 gap-10 py-4"
                initial={{ x: 0 }}
                animate={{ x: direction === "left" ? "-100%" : "100%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="text-4xl tablet:text-6xl font-heading font-bold uppercase text-neo-black mx-4"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 gap-10 py-4 absolute top-0 left-0"
                initial={{ x: "100%" }}
                animate={{ x: direction === "left" ? "0%" : "200%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="text-4xl tablet:text-6xl font-heading font-bold uppercase text-neo-black mx-4"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
