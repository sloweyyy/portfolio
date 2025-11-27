import React from "react";
import Socials from "../Socials";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden" style={{ backgroundColor: '#EBD22F' }}>
            {/* Curved top edge - Organic wavy pattern */}
            <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(-50%)' }}>
                <svg 
                    viewBox="0 0 1440 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-24 laptop:h-40"
                    style={{ display: 'block' }}
                >
                    <path 
                        d="M0,50 C120,80 240,20 360,40 C480,60 600,30 720,50 C840,70 960,40 1080,50 C1200,60 1320,30 1440,50 L1440,100 L0,100 Z" 
                        fill="#EBD22F"
                    />
                </svg>
            </div>

            {/* Decorative elements */}
            <motion.div 
                className="absolute top-16 right-[8%] hidden laptop:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <svg width="80" height="80" viewBox="0 0 80 80" stroke="#1F1F1F" fill="none" strokeWidth="1.5">
                    <circle cx="40" cy="40" r="35"/>
                    <ellipse cx="40" cy="40" rx="15" ry="35"/>
                    <line x1="5" y1="40" x2="75" y2="40"/>
                    <path d="M10 25 Q40 30 70 25"/>
                    <path d="M10 55 Q40 50 70 55"/>
                </svg>
            </motion.div>

            <motion.div 
                className="absolute bottom-20 left-[5%] hidden laptop:block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
            >
                <svg width="40" height="40" viewBox="0 0 100 100" fill="#1F8D42">
                    <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"/>
                </svg>
            </motion.div>

            <div className="max-w-[1440px] mx-auto px-4 laptop:px-14 pt-20 laptop:pt-32 pb-10">
                {/* Main Heading - Large and Bold */}
                <div className="text-center mb-16 laptop:mb-24">
                    <motion.div 
                        className="relative inline-block"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-5xl tablet:text-7xl laptop:text-[9rem] font-heading font-bold uppercase text-black leading-[0.85] tracking-tight">
                            I&apos;ve Got
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        className="relative inline-block"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-5xl tablet:text-7xl laptop:text-[9rem] font-heading font-bold uppercase text-black leading-[0.85] tracking-tight">
                            Your Back
                        </h1>
                        
                        {/* Badge - Byooooob style circle */}
                        <motion.div 
                            className="absolute -top-4 -right-8 laptop:-top-8 laptop:-right-20 hidden tablet:flex"
                            initial={{ scale: 0, rotate: -20 }}
                            whileInView={{ scale: 1, rotate: 15 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        >
                            <div 
                                className="w-16 h-16 laptop:w-24 laptop:h-24 rounded-full flex items-center justify-center shadow-lg"
                                style={{ 
                                    backgroundColor: '#4D17F5',
                                    border: '3px solid black'
                                }}
                            >
                                <span className="font-heading font-bold text-3xl laptop:text-5xl text-white">S</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Social Section - Centered */}
                <motion.div 
                    className="flex flex-col items-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 
                        className="text-lg font-heading font-bold uppercase mb-6 tracking-widest"
                        style={{ color: 'black' }}
                    >
                        Social Stuff
                    </h2>
                    <Socials />
                </motion.div>

                {/* Bottom Bar */}
                <div 
                    className="pt-8 flex flex-col tablet:flex-row justify-between items-center gap-4"
                    style={{ borderTop: '2px solid rgba(0,0,0,0.15)' }}
                >
                    <div className="font-heading font-bold uppercase text-xl tracking-wider text-black">
                        SloWey.
                    </div>
                    <div className="text-sm text-black/50">
                        © {new Date().getFullYear()} All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
