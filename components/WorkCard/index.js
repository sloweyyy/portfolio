import React from "react";

const WorkCard = ({ img, name, description, onClick }) => {
    return (
        <div
            className="overflow-hidden rounded-none p-2 laptop:p-4 first:ml-0 link border-2 border-neo-black shadow-neo bg-white transition-all duration-200 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
            onClick={onClick}
        >
            <div
                className="relative rounded-none overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto border-2 border-neo-black"
                style={{ height: "600px" }}
            >
                <img
                    alt={name}
                    className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
                    src={img}
                ></img>
            </div>
            <h1 className="mt-5 text-3xl font-heading font-bold uppercase">
                {name ? name : "Project Name"}
            </h1>
            <h2 className="text-xl opacity-70 font-body mt-2">
                {description ? description : "Description"}
            </h2>
        </div>
    );
};

export default WorkCard;
