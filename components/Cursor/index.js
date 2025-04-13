import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const Cursor = () => {
    const { theme, resolvedTheme } = useTheme();
    const router = useRouter();
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    const currentTheme = mounted ? theme || resolvedTheme || "light" : "light";

    const getCursorColor = () => {
        return currentTheme === "dark" ? "#fff" : "#000";
    };

    useEffect(() => {
        setMounted(true);

        if (typeof window !== "undefined") {
            const storedX = parseFloat(sessionStorage.getItem("cursorX"));
            const storedY = parseFloat(sessionStorage.getItem("cursorY"));

            if (!isNaN(storedX) && !isNaN(storedY)) {
                setMousePosition({ x: storedX, y: storedY });
                setIsVisible(true);
            }
        }
    }, []);

    useEffect(() => {
        const handleBeforeRouteChange = () => {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("cursorX", mousePosition.x);
                sessionStorage.setItem("cursorY", mousePosition.y);
            }
        };

        router.events.on("routeChangeStart", handleBeforeRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleBeforeRouteChange);
        };
    }, [mousePosition, router.events]);

    useEffect(() => {
        if (!mounted) return;

        const onMouseMove = (e) => {
            const position = { x: e.clientX, y: e.clientY };
            setMousePosition(position);
            setIsVisible(true);

            if (typeof window !== "undefined") {
                sessionStorage.setItem("cursorX", position.x);
                sessionStorage.setItem("cursorY", position.y);
            }
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        const onMouseDown = () => setIsActive(true);
        const onMouseUp = () => setIsActive(false);

        const handleLinkHover = () => {
            setIsActive(true);
        };

        const handleLinkLeave = () => {
            setIsActive(false);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        const links = document.querySelectorAll(".link");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleLinkHover);
            link.addEventListener("mouseleave", handleLinkLeave);
        });

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);

            links.forEach((link) => {
                link.removeEventListener("mouseenter", handleLinkHover);
                link.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, [mounted]);

    useEffect(() => {
        if (!mounted || !cursorRef.current || !cursorDotRef.current) return;

        cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${
            mousePosition.y
        }px) scale(${isActive ? 2 : 1})`;

        cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }, [mousePosition, isActive, mounted]);

    if (!mounted) return null;

    const color = getCursorColor();

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[10000] h-8 w-8 rounded-full border border-solid transition-transform duration-200 ease-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    borderColor: color,
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    transitionProperty: "transform, opacity, background-color",
                    top: "-16px",
                    left: "-16px",
                }}
            />
            <div
                ref={cursorDotRef}
                className={`fixed pointer-events-none z-[10000] h-2 w-2 rounded-full transition-transform duration-100 ease-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    backgroundColor: color,
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    top: "-1px",
                    left: "-1px",
                }}
            />
        </>
    );
};

export default Cursor;
