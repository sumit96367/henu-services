"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Send } from "lucide-react";

interface FloatingPillButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "continue" | "submit";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export function FloatingPillButton({
    children,
    onClick,
    type = "button",
    variant = "continue",
    isLoading = false,
    disabled = false,
    className,
}: FloatingPillButtonProps) {
    const Icon = variant === "submit" ? Send : ArrowRight;

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={cn(
                "relative group px-8 py-4 rounded-full font-bold text-base uppercase tracking-wider",
                "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black",
                "shadow-[0_0_30px_rgba(0,212,255,0.5)]",
                "hover:shadow-[0_0_40px_rgba(0,212,255,0.8)]",
                "transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-3",
                className
            )}
        >
            <span>{children}</span>

            {isLoading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                />
            ) : (
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon className="w-5 h-5" />
                </motion.div>
            )}

            {/* Animated glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.button>
    );
}
