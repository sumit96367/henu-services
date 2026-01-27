"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableTextareaProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

export function ExpandableTextarea({
    label,
    value,
    onChange,
    required = false,
    placeholder = "",
    className,
}: ExpandableTextareaProps) {
    const [isFocused, setIsFocused] = useState(false);
    const isFloating = isFocused || value.length > 0;

    return (
        <div className={cn("relative", className)}>
            <motion.textarea
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                placeholder={isFloating ? placeholder : ""}
                animate={{
                    height: isFocused ? "180px" : "60px",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "peer w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white text-base resize-none",
                    "focus:outline-none focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,212,255,0.3)]",
                    "transition-all duration-300 font-medium placeholder-gray-500 leading-relaxed"
                )}
            />
            <motion.label
                initial={false}
                animate={{
                    y: isFloating ? -32 : 12,
                    scale: isFloating ? 0.85 : 1,
                    color: isFocused ? "#00d4ff" : "#9ca3af",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-5 pointer-events-none font-semibold uppercase tracking-wide origin-left"
            >
                {label} {required && "*"}
            </motion.label>
        </div>
    );
}
