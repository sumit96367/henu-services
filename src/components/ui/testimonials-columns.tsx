"use client";
import React from "react";
import { motion } from "motion/react";
import { GlowingCard } from "./glowing-card";

export interface Testimonial {
    text: string;
    image?: string;
    name: string;
    role: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-10 pb-10"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <GlowingCard
                                    key={i}
                                    className="max-w-xs w-full"
                                    innerClassName="p-12 md:p-16 h-full"
                                    borderWidth={2}
                                >
                                    <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                                    <div className="flex items-center gap-4 mt-10">
                                        <img
                                            width={44}
                                            height={44}
                                            src={image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`}
                                            alt={name}
                                            className="h-11 w-11 rounded-full object-cover border-2 border-cyan-500/30"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-white tracking-tight leading-5">{name}</div>
                                            <div className="text-sm leading-5 text-cyan-400/80 tracking-tight">{role}</div>
                                        </div>
                                    </div>
                                </GlowingCard>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

export default TestimonialsColumn;
