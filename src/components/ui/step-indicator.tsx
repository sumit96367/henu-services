"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export function StepIndicator({
    currentStep,
    totalSteps,
    className,
}: StepIndicatorProps) {
    return (
        <div className={cn("flex items-center justify-center gap-3", className)}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <div key={stepNumber} className="flex items-center gap-3">
                        <motion.div
                            initial={false}
                            animate={{
                                scale: isActive ? 1 : 0.85,
                            }}
                            className="relative"
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                    isCompleted
                                        ? "bg-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.6)]"
                                        : isActive
                                            ? "bg-cyan-400/20 border-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                                            : "bg-transparent border-white/30"
                                )}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-5 h-5 text-black"
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
                                ) : (
                                    <span
                                        className={cn(
                                            "text-sm font-bold",
                                            isActive ? "text-cyan-400" : "text-gray-500"
                                        )}
                                    >
                                        {stepNumber}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {stepNumber < totalSteps && (
                            <div
                                className={cn(
                                    "w-12 h-0.5 transition-all duration-300",
                                    isCompleted
                                        ? "bg-cyan-400"
                                        : "bg-white/20"
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
