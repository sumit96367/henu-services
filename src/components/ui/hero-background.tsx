"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

// ============================================
// PULSATING GLOW - Breathing aura effect
// ============================================
interface PulsatingGlowProps {
    className?: string
    primaryColor?: string
    secondaryColor?: string
    size?: number
    blur?: number
}

export function PulsatingGlow({
    className = "",
    primaryColor = "rgba(139, 92, 246, 0.4)",
    secondaryColor = "rgba(59, 130, 246, 0.3)",
    size = 600,
    blur = 100,
}: PulsatingGlowProps) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            {/* Primary glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute"
                style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
                    filter: `blur(${blur}px)`,
                    borderRadius: "50%",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Secondary glow - offset for depth */}
            <motion.div
                animate={{
                    scale: [1.1, 0.9, 1.1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
                className="absolute"
                style={{
                    width: size * 0.8,
                    height: size * 0.8,
                    background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
                    filter: `blur(${blur * 1.2}px)`,
                    borderRadius: "50%",
                    left: "60%",
                    top: "40%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    )
}

// ============================================
// STAR FIELD - Animated particle background
// ============================================
interface StarFieldProps {
    className?: string
    starCount?: number
    speed?: number
}

interface Star {
    id: number
    x: number
    y: number
    size: number
    opacity: number
    animationDuration: number
    animationDelay: number
}

export function StarField({
    className = "",
    starCount = 100,
    speed = 1,
}: StarFieldProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const stars: Star[] = useMemo(() => {
        if (!mounted) return []
        return Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: (Math.random() * 3 + 2) / speed,
            animationDelay: Math.random() * 2,
        }))
    }, [starCount, speed, mounted])

    if (!mounted) return null

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: star.animationDuration,
                        delay: star.animationDelay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

// ============================================
// PARALLAX SECTION - Section with depth layers
// ============================================
interface ParallaxSectionProps {
    children: React.ReactNode
    className?: string
    speed?: number
}

export function ParallaxSection({
    children,
    className = "",
    speed = 0.5,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
    const smoothY = useSpring(y, { damping: 30, stiffness: 100 })

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    )
}

// ============================================
// PARALLAX LAYER - Individual parallax layer
// ============================================
interface ParallaxLayerProps {
    children: React.ReactNode
    className?: string
    speed?: number
    direction?: "up" | "down"
}

export function ParallaxLayer({
    children,
    className = "",
    speed = 0.3,
    direction = "up",
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const factor = direction === "up" ? -1 : 1
    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${factor * speed * 50}%`])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}

// ============================================
// GRID BACKGROUND - Animated grid pattern
// ============================================
interface GridBackgroundProps {
    className?: string
    gridSize?: number
    lineColor?: string
    fadeEdges?: boolean
}

export function GridBackground({
    className = "",
    gridSize = 60,
    lineColor = "rgba(255, 255, 255, 0.03)",
    fadeEdges = true,
}: GridBackgroundProps) {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(${lineColor} 1px, transparent 1px),
            linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
          `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                }}
            />

            {/* Fade edges */}
            {fadeEdges && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                </>
            )}
        </div>
    )
}

// ============================================
// VIGNETTE - Dark edges effect
// ============================================
interface VignetteProps {
    className?: string
    intensity?: number
}

export function Vignette({ className = "", intensity = 0.6 }: VignetteProps) {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                background: `radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, ${intensity}) 100%)`,
            }}
        />
    )
}

// ============================================
// GRADIENT ORB - Floating gradient blob
// ============================================
interface GradientOrbProps {
    className?: string
    color1?: string
    color2?: string
    size?: number
    blur?: number
    animate?: boolean
    duration?: number
}

export function GradientOrb({
    className = "",
    color1 = "#8b5cf6",
    color2 = "#3b82f6",
    size = 400,
    blur = 80,
    animate = true,
    duration = 20,
}: GradientOrbProps) {
    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
                filter: `blur(${blur}px)`,
                opacity: 0.4,
            }}
            animate={
                animate
                    ? {
                        x: [0, 50, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }
                    : undefined
            }
            transition={
                animate
                    ? {
                        duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }
                    : undefined
            }
        />
    )
}

// ============================================
// HERO BACKGROUND COMPOSITE - All effects combined
// ============================================
interface HeroBackgroundProps {
    className?: string
    showStars?: boolean
    showGlow?: boolean
    showGrid?: boolean
    showVignette?: boolean
}

export function HeroBackground({
    className = "",
    showStars = true,
    showGlow = true,
    showGrid = true,
    showVignette = true,
}: HeroBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]" />

            {/* Grid */}
            {showGrid && <GridBackground />}

            {/* Star field */}
            {showStars && <StarField starCount={80} speed={0.8} />}

            {/* Pulsating glows */}
            {showGlow && (
                <>
                    <PulsatingGlow
                        primaryColor="rgba(139, 92, 246, 0.3)"
                        secondaryColor="rgba(59, 130, 246, 0.2)"
                        size={700}
                        blur={120}
                    />
                    <GradientOrb
                        color1="#ec4899"
                        color2="#8b5cf6"
                        size={300}
                        blur={100}
                        className="top-1/4 right-1/4"
                        duration={25}
                    />
                </>
            )}

            {/* Vignette */}
            {showVignette && <Vignette intensity={0.5} />}
        </div>
    )
}
