import React, { useState, useEffect } from "react";
import data from "../../data/portfolio.json";

const Button = ({ children, type, onClick, classes }) => {
    // Remove import { useTheme } ...
    // Remove all useTheme, theme variables and logic. Only default to light mode.

    return (
        <button
            onClick={onClick}
            type="button"
            className={`
        ${classes} 
        overflow-hidden p-2 px-8 laptop:px-10 border-4 border-neo-black 
        ${
            type === "primary"
                ? "rounded-full bg-neo-yellow text-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                : "rounded-none bg-white text-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        } 
        transition-all ease-out hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        font-heading font-bold uppercase tracking-wider text-sm tablet:text-base
        ${data.showCursor && "cursor-none"}
      `}
        >
            {children}
        </button>
    );
};

export default Button;
