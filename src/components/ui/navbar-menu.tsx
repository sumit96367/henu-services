"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GlowingEffect } from "./glowing-effect";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    setActive: (item: string | null) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            onMouseLeave={() => setActive(null)}
            className="relative flex-shrink-0"
        >
            <div
                onMouseEnter={() => setActive(item)}
                className="cursor-pointer"
            >
                <motion.span
                    transition={{ duration: 0.3 }}
                    className="text-white hover:text-cyan-400 transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5"
                >
                    {item}
                    {children && (
                        <ChevronDown
                            size={14}
                            className={cn(
                                "transition-transform duration-300 opacity-50 group-hover:opacity-100",
                                active === item ? "rotate-180" : "rotate-0"
                            )}
                        />
                    )}
                </motion.span>
            </div>
            <AnimatePresence>
                {active === item && children && (
                    <motion.div
                        initial={{ opacity: 0, pointerEvents: "none" }}
                        animate={{ opacity: 1, pointerEvents: "auto" }}
                        exit={{ opacity: 0, pointerEvents: "none" }}
                        className="absolute top-[calc(100%)] left-1/2 transform -translate-x-1/2 pt-[1.2rem] z-50"
                    >
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
                    </motion.div>
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
        <nav className="relative flex items-center justify-center gap-8 lg:gap-12 py-2">
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

export const ServiceSubItem = ({
    title,
    href,
    icon: Icon,
}: {
    title: string;
    href: string;
    icon: any;
}) => {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 p-3 rounded-2xl transition-all hover:bg-white/[0.03] group"
        >
            <div className="w-11 h-11 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/10 transition-all group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 shadow-lg">
                <Icon size={22} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <span className="font-bold text-[15px] text-gray-300 group-hover:text-white transition-colors tracking-tight">
                {title}
            </span>
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
