import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div
            className={`w-full p-2 mob:p-4 rounded-none transition-all ease-out duration-200 border-2 border-neo-black shadow-neo bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none link`}
        >
            <h1 className="text-3xl font-heading font-bold uppercase">{name ? name : "Heading"}</h1>
            <p className="mt-5 opacity-70 text-xl font-body">
                {description
                    ? description
                    : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "}
            </p>
        </div>
    );
};

export default ServiceCard;
