import { forwardRef, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function useAnimationFrame(callback) {
    useEffect(() => {
        let frameId;
        const loop = () => {
            callback();
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [callback]);
}

function useMousePositionRef(containerRef) {
    const positionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (x, y) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                positionRef.current = { x: x - rect.left, y: y - rect.top };
            } else {
                positionRef.current = { x, y };
            }
        };

        const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
        const handleTouchMove = (ev) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [containerRef]);

    return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
    const {
        label,
        fromFontVariationSettings,
        toFontVariationSettings,
        containerRef,
        radius = 200,
        falloff = "gaussian",
        className = "",
        onClick,
        style,
        ...restProps
    } = props;

    const letterRefs = useRef([]);
    const interpolatedSettingsRef = useRef([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef({ x: null, y: null });

    const parsedSettings = useMemo(() => {
        const parseSettings = (settingsStr) =>
            new Map(
                settingsStr
                    .split(",")
                    .map((s) => s.trim())
                    .map((s) => {
                        const [name, value] = s.split(" ");
                        return [name.replace(/['"]/g, ""), parseFloat(value)];
                    })
            );

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue,
        }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateDistance = (x1, y1, x2, y2) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
            case "exponential":
                return norm ** 2;
            case "gaussian":
                return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
            case "linear":
            default:
                return norm;
        }
    };

    useAnimationFrame(() => {
        if (!containerRef?.current) return;
        const { x, y } = mousePositionRef.current;
        if (
            lastPositionRef.current.x === x &&
            lastPositionRef.current.y === y
        ) {
            return;
        }
        lastPositionRef.current = { x, y };

        const containerRect = containerRef.current.getBoundingClientRect();

        letterRefs.current.forEach((letterRef, index) => {
            if (!letterRef) return;

            const rect = letterRef.getBoundingClientRect();
            const letterCenterX =
                rect.left + rect.width / 2 - containerRect.left;
            const letterCenterY =
                rect.top + rect.height / 2 - containerRect.top;

            const distance = calculateDistance(
                mousePositionRef.current.x,
                mousePositionRef.current.y,
                letterCenterX,
                letterCenterY
            );

            if (distance >= radius) {
                letterRef.style.fontVariationSettings =
                    fromFontVariationSettings;
                return;
            }

            const falloffValue = calculateFalloff(distance);
            const newSettings = parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue =
                        fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(", ");

            interpolatedSettingsRef.current[index] = newSettings;
            letterRef.style.fontVariationSettings = newSettings;
        });
    });

    const paragraphs = label.split("\n").filter((p) => p.trim().length > 0);
    let letterIndex = 0;

    return (
        <div
            ref={ref}
            onClick={onClick}
            style={style}
            className={`variable-text-container ${className}`}
            {...restProps}
        >
            {paragraphs.map((paragraph, paragraphIndex) => {
                const words = paragraph.split(" ");

                return (
                    <div
                        key={`p-${paragraphIndex}`}
                        className={paragraphIndex > 0 ? "mt-3" : ""}
                        style={{ maxWidth: "100%", wordWrap: "break-word" }}
                    >
                        {words.map((word, wordIndex) => (
                            <span
                                key={`p-${paragraphIndex}-w-${wordIndex}`}
                                className="inline-block whitespace-normal"
                            >
                                {word.split("").map((letter) => {
                                    const currentLetterIndex = letterIndex++;
                                    return (
                                        <motion.span
                                            key={currentLetterIndex}
                                            ref={(el) => {
                                                letterRefs.current[
                                                    currentLetterIndex
                                                ] = el;
                                            }}
                                            style={{
                                                fontVariationSettings:
                                                    interpolatedSettingsRef
                                                        .current[
                                                        currentLetterIndex
                                                    ],
                                            }}
                                            className="variable-text inline-block"
                                            aria-hidden="true"
                                        >
                                            {letter}
                                        </motion.span>
                                    );
                                })}
                                {wordIndex < words.length - 1 && (
                                    <span className="inline-block">&nbsp;</span>
                                )}
                            </span>
                        ))}
                    </div>
                );
            })}
            <span className="sr-only">{label}</span>
        </div>
    );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
