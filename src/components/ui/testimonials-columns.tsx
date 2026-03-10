"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GlowingCard } from "./glowing-card";

export interface Testimonial {
    text: string;
    image?: string;
    name: string;
    role: string;
}

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const { text, image, name, role } = testimonial;
    return (
        <GlowingCard
            className="w-full h-full"
            innerClassName="p-8 md:p-10 h-full flex flex-col justify-between"
            borderWidth={2}
        >
            <div className="flex flex-col h-full">
                <div className="relative mb-6">
                    <div className="text-purple-500/30 absolute -top-8 -left-4 text-7xl font-serif select-none pointer-events-none">"</div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed relative z-10 italic font-light tracking-wide">{text}</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full blur-md opacity-30" />
                        <Image
                            width={56}
                            height={56}
                            src={image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`}
                            alt={name}
                            className="h-14 w-14 rounded-full object-cover border-2 border-white/10 relative z-10"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="font-bold text-white tracking-tight leading-5 text-base truncate">{name}</div>
                        <div className="text-xs leading-5 text-purple-400 font-bold uppercase tracking-widest mt-0.5 truncate">{role}</div>
                    </div>
                </div>
            </div>
        </GlowingCard>
    );
};

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
                            {props.testimonials.map((testimonial, i) => (
                                <div key={i} className="max-w-[340px] w-full">
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

export default TestimonialsColumn;
