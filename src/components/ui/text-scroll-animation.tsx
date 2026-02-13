"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
    char: string;
    index: number;
    centerIndex: number;
    scrollYProgress: any;
};

// Text character animation - spreads from center with 3D rotation
const CharacterV1 = ({
    char,
    index,
    centerIndex,
    scrollYProgress,
}: CharacterProps) => {
    const isSpace = char === " ";
    const distanceFromCenter = index - centerIndex;

    const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

    return (
        <motion.span
            className={cn("inline-block text-purple-400", isSpace && "w-4")}
            style={{ x, rotateX }}
        >
            {char}
        </motion.span>
    );
};

// Icon/image animation - spreads with scale and Y offset
const CharacterV2 = ({
    char,
    index,
    centerIndex,
    scrollYProgress,
}: CharacterProps) => {
    const distanceFromCenter = index - centerIndex;

    const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

    return (
        <motion.img
            src={char}
            alt=""
            className="h-16 w-16 shrink-0 object-contain will-change-transform"
            style={{ x, scale, y, transformOrigin: "center" }}
        />
    );
};

// Icon/image animation - spreads with rotation effect
const CharacterV3 = ({
    char,
    index,
    centerIndex,
    scrollYProgress,
}: CharacterProps) => {
    const distanceFromCenter = index - centerIndex;

    const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

    return (
        <motion.img
            src={char}
            alt=""
            className="h-16 w-16 shrink-0 object-contain will-change-transform"
            style={{ x, rotate, y, scale, transformOrigin: "center" }}
        />
    );
};

// Reusable Text Scroll Animation Component
type TextScrollAnimationProps = {
    text: string;
    className?: string;
    textClassName?: string;
    backgroundColor?: string;
    height?: string;
};

const TextScrollAnimation = ({
    text,
    className,
    textClassName,
    backgroundColor = "#050505",
    height = "210vh",
}: TextScrollAnimationProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const characters = text.split("");
    const centerIndex = Math.floor(characters.length / 2);

    return (
        <div
            ref={targetRef}
            className={cn(
                "relative box-border flex items-center justify-center gap-[2vw] overflow-hidden p-[2vw]",
                className
            )}
            style={{ height, backgroundColor }}
        >
            <div
                className={cn(
                    "w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-white",
                    textClassName
                )}
                style={{ perspective: "500px" }}
            >
                {characters.map((char, index) => (
                    <CharacterV1
                        key={index}
                        char={char}
                        index={index}
                        centerIndex={centerIndex}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
};

// Reusable Icon Scroll Animation Component
type IconScrollAnimationProps = {
    icons: string[];
    title?: string;
    className?: string;
    backgroundColor?: string;
    height?: string;
    variant?: "scale" | "rotate";
};

const IconScrollAnimation = ({
    icons,
    title,
    className,
    backgroundColor = "#050505",
    height = "210vh",
    variant = "scale",
}: IconScrollAnimationProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const centerIndex = Math.floor(icons.length / 2);
    const CharComponent = variant === "rotate" ? CharacterV3 : CharacterV2;

    return (
        <div
            ref={targetRef}
            className={cn(
                "relative box-border flex flex-col items-center justify-center gap-[2vw] overflow-hidden p-[2vw]",
                className
            )}
            style={{ height, backgroundColor }}
        >
            {title && (
                <p className="flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-white">
                    <Bracket className="h-12 text-purple-400" />
                    <span className="font-medium">{title}</span>
                    <Bracket className="h-12 scale-x-[-1] text-purple-400" />
                </p>
            )}

            <div
                className="flex flex-wrap items-center justify-center gap-8"
                style={{ perspective: variant === "rotate" ? "500px" : undefined }}
            >
                {icons.map((icon, index) => (
                    <CharComponent
                        key={index}
                        char={icon}
                        index={index}
                        centerIndex={centerIndex}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
};

// Full Demo Component with all animations
const ScrollAnimationDemo = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const targetRef2 = useRef<HTMLDivElement | null>(null);
    const targetRef3 = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({ target: targetRef });
    const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
    const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

    const text = "see more from ";
    const characters = text.split("");
    const centerIndex = Math.floor(characters.length / 2);

    const techIcons = [
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
    ];
    const iconCenterIndex = Math.floor(techIcons.length / 2);

    return (
        <ReactLenis root>
            <main className="w-full bg-[#050505]">
                {/* Scroll indicator */}
                <div className="absolute left-1/2 top-22 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">
                    <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#050505] after:to-purple-400 after:content-['']">
                        Scroll to see more
                    </span>
                </div>

                {/* Block 1 — Text Animation */}
                <div
                    ref={targetRef}
                    className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#050505] p-[2vw]"
                >
                    <div
                        className="w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-white"
                        style={{ perspective: "500px" }}
                    >
                        {characters.map((char, index) => (
                            <CharacterV1
                                key={index}
                                char={char}
                                index={index}
                                centerIndex={centerIndex}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>

                {/* Block 2 — Icons with Scale Animation */}
                <div
                    ref={targetRef2}
                    className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#050505] p-[2vw]"
                >
                    <p className="flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-white">
                        <Bracket className="h-12 text-purple-400" />
                        <span className="font-medium">integrate with your fav tech stack</span>
                        <Bracket className="h-12 scale-x-[-1] text-purple-400" />
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {techIcons.map((char, index) => (
                            <CharacterV2
                                key={index}
                                char={char}
                                index={index}
                                centerIndex={iconCenterIndex}
                                scrollYProgress={scrollYProgress2}
                            />
                        ))}
                    </div>
                </div>

                {/* Block 3 — Icons with Rotate Animation */}
                <div
                    ref={targetRef3}
                    className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#050505] p-[2vw]"
                >
                    <p className="flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-white">
                        <Bracket className="h-12 text-purple-400" />
                        <span className="font-medium">integrate with your fav tech stack</span>
                        <Bracket className="h-12 scale-x-[-1] text-purple-400" />
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8" style={{ perspective: "500px" }}>
                        {techIcons.map((char, index) => (
                            <CharacterV3
                                key={index}
                                char={char}
                                index={index}
                                centerIndex={iconCenterIndex}
                                scrollYProgress={scrollYProgress3}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </ReactLenis>
    );
};

// Bracket SVG Component
const Bracket = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
            <path
                fill="currentColor"
                d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
            />
        </svg>
    );
};

export {
    CharacterV1,
    CharacterV2,
    CharacterV3,
    TextScrollAnimation,
    IconScrollAnimation,
    ScrollAnimationDemo,
    Bracket
};
