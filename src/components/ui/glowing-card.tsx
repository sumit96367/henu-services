"use client";

import React from "react";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    style?: React.CSSProperties;
    borderWidth?: number;
    spread?: number;
    proximity?: number;
    inactiveZone?: number;
}

export function GlowingCard({
    children,
    className,
    innerClassName,
    style,
    borderWidth = 3,
    spread = 40,
    proximity = 64,
    inactiveZone = 0.01,
}: GlowingCardProps) {
    return (
        <div className={cn("relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem]", className)}>
            <GlowingEffect
                spread={spread}
                glow={true}
                disabled={false}
                proximity={proximity}
                inactiveZone={inactiveZone}
                borderWidth={borderWidth}
            />
            <div
                className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/40 backdrop-blur-xl shadow-sm",
                    innerClassName
                )}
                style={style}
            >
                {children}
            </div>
        </div>
    );
}
