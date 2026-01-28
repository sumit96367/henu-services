"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SelectableCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    isSelected: boolean;
    onClick: () => void;
    className?: string;
}

export function SelectableCard({
    icon: Icon,
    title,
    description,
    isSelected,
    onClick,
    className,
}: SelectableCardProps) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative p-5 rounded-2xl border-2 transition-all duration-500 text-left group",
                "bg-black backdrop-blur-sm",
                isSelected
                    ? "border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_30px_rgba(0,212,255,0.15)] ring-1 ring-cyan-500/30"
                    : "border-white/10 hover:border-white/30 hover:bg-white/[0.06]",
                className
            )}
        >
            {/* Selection indicator */}
            <div className={cn(
                "absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center",
                isSelected ? "border-cyan-400 bg-cyan-400" : "border-white/10"
            )}>
                {isSelected && (
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl transition-all duration-500 flex items-center justify-center shadow-lg",
                        isSelected ? "bg-cyan-500 text-black scale-110 shadow-cyan-500/20" : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                    )}
                >
                    <Icon size={22} className="transition-transform group-hover:rotate-6" />
                </div>
                <div className="space-y-1.5">
                    <h4
                        className={cn(
                            "font-bold text-base transition-colors",
                            isSelected ? "text-white" : "text-gray-300"
                        )}
                    >
                        {title}
                    </h4>
                    {description && (
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </motion.button>
    );
}
