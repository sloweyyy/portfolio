import React from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const Custom404 = () => {
    const router = useRouter();

    return (
        <>
            {data.showCursor && <Cursor />}
            <div className={`w-full h-screen flex flex-col ${data.showCursor && "cursor-none"}`}>
                <div className="w-full max-w-[1440px] mx-auto px-4 laptop:px-14">
                    <Header />
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-9xl font-bold font-heading mb-4">404</h1>
                    <h2 className="text-3xl font-bold font-heading mb-8">Page Not Found</h2>
                    <p className="text-xl opacity-75 mb-12 max-w-lg">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    
                    <div className="flex gap-4">
                        <Button onClick={() => router.push("/")} type="primary">
                            Go Home
                        </Button>
                        <Button onClick={() => router.back()}>
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Custom404;
