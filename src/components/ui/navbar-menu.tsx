"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GlowingEffect } from "./glowing-effect";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
} as const;

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative flex-shrink-0">
            <motion.span
                transition={{ duration: 0.3 }}
                className="text-white hover:text-cyan-400 transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap block"
            >
                {item}
            </motion.span>
            <AnimatePresence>
                {active === item && children && (
                    <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 10 }}
                            transition={transition}
                            layoutId="active"
                            className="bg-black/95 backdrop-blur-2xl rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                        >
                            <div className="w-max h-full">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};


export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative flex items-center justify-center gap-8 lg:gap-12"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
}) => {
    return (
        <Link href={href} className="flex flex-row items-center gap-4 group w-full hover:bg-white/[0.03] p-2 rounded-xl transition-all">
            <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-xl">
                <Image
                    src={src}
                    fill
                    alt={title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col items-start gap-0.5 text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                    {title}
                </h4>
                <p className="text-gray-500 text-[11px] leading-tight line-clamp-2 max-w-[200px]">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link
            {...rest}
            className="text-gray-400 hover:text-white transition-all duration-200 text-sm md:text-[15px] font-medium block py-2 hover:translate-x-1"
        >
            {children}
        </Link>
    );
};
