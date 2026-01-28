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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative p-5 rounded-xl border-2 transition-all duration-300 text-left",
                "bg-white/5 hover:bg-white/10",
                isSelected
                    ? "border-cyan-400 shadow-[0_0_25px_rgba(0,212,255,0.5)]"
                    : "border-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]",
                className
            )}
        >
            {/* Selection indicator */}
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
                >
                    <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>
            )}

            <div className="flex items-start gap-3">
                <div
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isSelected ? "bg-cyan-400/20" : "bg-white/10"
                    )}
                >
                    <Icon
                        className={cn(
                            "w-5 h-5 transition-colors",
                            isSelected ? "text-cyan-400" : "text-gray-400"
                        )}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4
                        className={cn(
                            "font-semibold text-sm mb-1 transition-colors",
                            isSelected ? "text-cyan-400" : "text-white"
                        )}
                    >
                        {title}
                    </h4>
                    {description && (
                        <p className="text-xs text-gray-400 leading-snug">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </motion.button>
    );
}
