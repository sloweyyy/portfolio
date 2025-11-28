import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const Cursor = () => {
    const router = useRouter();
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

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

        const onMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
            setIsActive(!!isClickable);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseover", onMouseOver);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseover", onMouseOver);
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

    return (
        <div
            ref={cursorRef}
            className={`fixed pointer-events-none z-[10000] transition-transform duration-100 ease-out ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(${isActive ? "-15deg" : "0deg"}) scale(${isActive ? 0.9 : 1})`,
                top: "0px",
                left: "0px",
                willChange: "transform",
            }}
        >
            <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 5L10 28L15 23L19 32L22 30L18 21L25 21L10 5Z"
                    fill="var(--neo-yellow)"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Cursor;
