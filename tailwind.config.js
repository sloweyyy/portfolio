/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        screens: {
            mob: "375px",
            tablet: "768px",
            laptop: "1024px",
            desktop: "1280px",
            laptopl: "1440px",
        },
        extend: {
            colors: {
                "neo-yellow": "var(--neo-yellow)",
                "neo-pink": "var(--neo-pink)",
                "neo-purple": "var(--neo-purple)",
                "neo-green": "var(--neo-green)",
                "neo-black": "var(--neo-black)",
                "neo-white": "var(--neo-white)",
                "neo-bg": "var(--neo-bg)",
            },
            fontFamily: {
                heading: ["'Lexend Mega'", "sans-serif"],
                body: ["'Space Grotesk'", "sans-serif"],
            },
            boxShadow: {
                neo: "4px 4px 0px 0px var(--neo-border)",
                "neo-sm": "2px 2px 0px 0px var(--neo-border)",
                "neo-lg": "8px 8px 0px 0px var(--neo-border)",
            },
        },
    },
    plugins: [],
};
