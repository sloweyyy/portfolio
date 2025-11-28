import React, { useEffect, useState } from "react";

const PageTransition = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-neo-yellow">
            <div className="w-full max-w-md px-8">
                <h2 className="text-4xl font-black mb-8 text-center uppercase tracking-tighter border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    Loading...
                </h2>
                <div className="w-full h-12 border-4 border-black bg-white p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div
                        className="h-full bg-black transition-all duration-200 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="mt-4 text-right font-bold font-mono text-xl">
                    {Math.min(Math.floor(progress), 100)}%
                </p>
            </div>
        </div>
    );
};

export default PageTransition;
