"use client";
import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const cardLength = content.length;

    const gradients = [
        {
            start: "rgb(8, 0, 20)",
            end: "rgb(0, 10, 40)",
            first: "0, 212, 255", // cyan
            second: "0, 122, 255", // blue
            third: "100, 220, 255",
            fourth: "0, 180, 255",
            fifth: "0, 80, 200",
        },
        {
            start: "rgb(20, 10, 0)",
            end: "rgb(40, 20, 0)",
            first: "255, 149, 0", // amber
            second: "255, 179, 64", // amber-light
            third: "230, 134, 0", // amber-dark
            fourth: "255, 120, 0",
            fifth: "200, 100, 0",
        },
        {
            start: "rgb(10, 0, 20)",
            end: "rgb(20, 0, 40)",
            first: "18, 113, 255",
            second: "221, 74, 255",
            third: "100, 220, 255",
            fourth: "200, 50, 50",
            fifth: "180, 180, 50",
        },
    ];

    return (
        <div ref={ref} className="relative">
            <style jsx global>{`
                .sticky-text-content {
                    padding-left: 0;
                    text-align: center;
                }
                @media (min-width: 1024px) {
                    .sticky-text-content {
                        padding-left: 80px;
                        text-align: left;
                    }
                }
            `}</style>
            {content.map((item, index) => {
                const targetScale = 1 - ((content.length - index) * 0.02);
                const gradientProps = gradients[index % gradients.length];

                return (
                    <StickyCard
                        key={item.title + index}
                        item={item}
                        index={index}
                        total={cardLength}
                        progress={scrollYProgress}
                        gradientProps={gradientProps}
                        targetScale={targetScale}
                        contentClassName={contentClassName}
                    />
                );
            })}
        </div>
    );
};

const StickyCard = ({
    item,
    index,
    total,
    progress,
    gradientProps,
    targetScale,
    contentClassName,
}: {
    item: { title: string; description: string; content?: React.ReactNode };
    index: number;
    total: number;
    progress: any;
    gradientProps: any;
    targetScale: number;
    contentClassName?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);

    return (
        <div
            ref={ref}
            className="min-h-[50vh] flex items-center justify-center sticky top-20"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{ scale, opacity }}
                className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 min-h-[200px] md:min-h-[250px]"
            >
                <BackgroundGradientAnimation
                    containerClassName="absolute inset-0 z-0"
                    gradientBackgroundStart={gradientProps.start}
                    gradientBackgroundEnd={gradientProps.end}
                    firstColor={gradientProps.first}
                    secondColor={gradientProps.second}
                    thirdColor={gradientProps.third}
                    fourthColor={gradientProps.fourth}
                    fifthColor={gradientProps.fifth}
                    interactive={false}
                >
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 md:p-12 md:pt-12 lg:pt-12">
                        {/* Left: Text Content */}
                        <div className="flex-1 sticky-text-content">
                            <h2 className="text-lg md:text-2xl font-bold text-white mb-4">
                                {item.title}
                            </h2>

                            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-lg">
                                {item.description}
                            </p>
                        </div>

                        {/* Right: Visual Content */}
                        <div
                            className={cn(
                                "hidden lg:flex h-64 w-64 md:h-72 md:w-72 rounded-2xl overflow-hidden items-center justify-center shadow-2xl shrink-0 bg-white/5 backdrop-blur-md border border-white/10",
                                contentClassName
                            )}
                        >
                            {item.content ?? (
                                <span className="text-6xl font-bold text-white/30">
                                    {index + 1}
                                </span>
                            )}
                        </div>
                    </div>
                </BackgroundGradientAnimation>
            </motion.div>
        </div>
    );
};
