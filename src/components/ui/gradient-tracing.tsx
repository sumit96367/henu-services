import React, { useMemo } from "react"
import { motion } from "framer-motion"

interface GradientTracingProps {
    width: number
    height: number
    baseColor?: string
    gradientColors?: [string, string, string]
    animationDuration?: number
    strokeWidth?: number
    path?: string
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
    width,
    height,
    baseColor = "black",
    gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
    animationDuration = 2,
    strokeWidth = 2,
    path = `M0,${height / 2} L${width},${height / 2}`,
}) => {
    // Generate stable IDs based on path to prevent hydration mismatch
    const gradientId = useMemo(() => {
        const hash = path.split('').reduce((acc, char) => {
            return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
        }, 0);
        return `pulse-${Math.abs(hash)}`;
    }, [path]);

    const glowId = useMemo(() => {
        const hash = path.split('').reduce((acc, char) => {
            return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
        }, 0);
        return `glow-${Math.abs(hash)}`;
    }, [path]);

    return (
        <div className="relative" style={{ width, height }}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
            >
                <path
                    d={path}
                    stroke={baseColor}
                    strokeOpacity="0.2"
                    strokeWidth={strokeWidth}
                />
                <path
                    d={path}
                    stroke={`url(#${gradientId})`}
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    filter={`url(#${glowId})`}
                />
                <defs>
                    {/* Glow Filter */}
                    <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <motion.linearGradient
                        animate={{
                            x1: [0, width * 2],
                            x2: [0, width],
                        }}
                        transition={{
                            duration: animationDuration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor={gradientColors[0]} stopOpacity="0" />
                        <stop stopColor={gradientColors[1]} />
                        <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
                    </motion.linearGradient>
                </defs>
            </svg>
        </div>
    )
}
