import React from "react";
import Socials from "../Socials";

const Footer = () => {
    return (
        <>
            <div className="relative -mt-20 z-10">
                {/* Wavy Transition */}
                <svg className="w-full h-20 text-neo-yellow fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 C320,100 420,0 720,50 C1020,100 1120,0 1440,50 L1440,100 L0,100 Z"></path>
                </svg>
            </div>
            
            <footer className="bg-neo-yellow pt-10 pb-20 mt-0">
                <div className="container mx-auto px-4 laptop:px-0">
                    <div className="text-center mb-20">
                        <h1 className="text-6xl tablet:text-8xl laptop:text-[10rem] font-heading font-bold uppercase text-neo-black leading-[0.8] mb-4">
                            We&apos;ve Got
                        </h1>
                        <div className="relative inline-block">
                            <h1 className="text-6xl tablet:text-8xl laptop:text-[10rem] font-heading font-bold uppercase text-neo-black leading-[0.8]">
                                Your Back
                            </h1>
                            {/* B Logo Sticker */}
                            <div className="absolute -top-10 -right-20 transform rotate-12 hidden laptop:block">
                                <div className="text-8xl">😎</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-10 justify-center">
                        <div className="tablet:col-span-2 laptop:col-span-3 flex flex-col items-center">
                            <h2 className="text-2xl font-heading font-bold uppercase mb-5 text-neo-black">Social Stuff</h2>
                            <Socials />
                        </div>
                    </div>

                    <div className="mt-20 border-t-2 border-neo-black pt-10 flex justify-center items-center">
                        <div className="font-heading font-bold uppercase text-2xl">SloWey.</div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
