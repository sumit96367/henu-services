"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
    FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple
} from "react-icons/fa";
import {
    SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiVuedotjs, SiAngular,
    SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiSass, SiVite, SiFramer
} from "react-icons/si";

interface FeatureSectionProps {
    title?: string;
    highlight?: string;
    description?: string;
}

const iconConfigs = [
    { Icon: FaReact, color: "#61DAFB" },
    { Icon: SiNextdotjs, color: "#FFFFFF" },
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: SiJavascript, color: "#F7DF1E" },
    { Icon: SiTailwindcss, color: "#06B6D4" },
    { Icon: SiVuedotjs, color: "#4FC08D" },
    { Icon: SiAngular, color: "#DD0031" },
    { Icon: SiVite, color: "#646CFF" },
    { Icon: SiRedux, color: "#764ABC" },
    { Icon: SiFramer, color: "#0055FF" },
    { Icon: SiHtml5, color: "#E34F26" },
    { Icon: SiCss3, color: "#1572B6" },
    { Icon: SiSass, color: "#CC6699" },
    { Icon: SiVercel, color: "#FFFFFF" },
    { Icon: FaGithub, color: "#FFFFFF" },
];

export default function FeatureSection({
    title = "Build your idea",
    highlight,
    description = "RUIXEN is a modern and responsive UI kit for React, Next.js, and Tailwind CSS."
}: FeatureSectionProps) {
    const orbitCount = 3;
    const orbitGap = 8; // rem between orbits
    const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center overflow-hidden bg-transparent pt-24 md:pt-48 pb-20 md:pb-32">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="grid-background opacity-20"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container relative z-10 px-4">
                {/* Navbar Spacer for Mobile */}
                <div className="h-[100px] md:hidden w-full" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
                    {/* Left side: Heading and Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-3/5"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            {title} <br />
                            {highlight && <span className="gradient-text-tech">{highlight}</span>}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <Button variant="default" className="btn-primary !h-14 !px-10 text-base">
                                <Link href="/contact">Start Your Project</Link>
                            </Button>
                            <Button variant="outline" className="btn-secondary !h-14 !px-10 text-base border-white/10 text-white">
                                <Link href="#process">View Our Process</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right side: Orbit animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full lg:w-2/5 h-[400px] md:h-[600px] flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] lg:translate-x-[20%] flex items-center justify-center">
                            {/* Center Circle */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-3xl z-20">
                                <FaReact className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 animate-pulse" />
                            </div>

                            {/* Generate Orbits */}
                            {[...Array(orbitCount)].map((_, orbitIdx) => {
                                const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
                                const angleStep = (2 * Math.PI) / iconsPerOrbit;

                                return (
                                    <div
                                        key={orbitIdx}
                                        className="absolute rounded-full border border-dotted border-white/10"
                                        style={{
                                            width: size,
                                            height: size,
                                            animation: `spin_orbit ${20 + orbitIdx * 10}s linear infinite`,
                                        }}
                                    >
                                        {iconConfigs
                                            .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                                            .map((cfg, iconIdx) => {
                                                const angle = iconIdx * angleStep;
                                                const x = 50 + 50 * Math.cos(angle);
                                                const y = 50 + 50 * Math.sin(angle);

                                                return (
                                                    <div
                                                        key={iconIdx}
                                                        className="absolute bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-full p-2 md:p-3 shadow-2xl"
                                                        style={{
                                                            left: `${x}%`,
                                                            top: `${y}%`,
                                                            transform: "translate(-50%, -50%)",
                                                        }}
                                                    >
                                                        {cfg.Icon ? (
                                                            <cfg.Icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: cfg.color }} />
                                                        ) : null}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
        @keyframes spin_orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </section>
    );
}
