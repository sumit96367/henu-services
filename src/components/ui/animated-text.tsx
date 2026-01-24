"use client"

import { useRef, useEffect, ReactNode } from "react"
import { motion, useInView, Variants } from "framer-motion"

// ============================================
// ANIMATED HEADING - Staggered word reveal
// ============================================
interface AnimatedHeadingProps {
    children: string
    className?: string
    delay?: number
    staggerDelay?: number
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export function AnimatedHeading({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.05,
    as: Component = "h1",
}: AnimatedHeadingProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })
    const words = children.split(" ")

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    const wordVariants: Variants = {
        hidden: {
            y: 50,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 200,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <Component className={className}>
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={wordVariants}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </Component>
        </motion.div>
    )
}

// ============================================
// SPLIT TEXT REVEAL - Character by character
// ============================================
interface SplitTextRevealProps {
    children: string
    className?: string
    delay?: number
    charDelay?: number
}

export function SplitTextReveal({
    children,
    className = "",
    delay = 0,
    charDelay = 0.02,
}: SplitTextRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })
    const chars = children.split("")

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: charDelay,
                delayChildren: delay,
            },
        },
    }

    const charVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0,
            rotateX: -90,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
            style={{ perspective: "1000px" }}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    )
}

// ============================================
// FADE UP - Simple fade up on scroll
// ============================================
interface FadeUpProps {
    children: ReactNode
    className?: string
    delay?: number
    duration?: number
    y?: number
}

export function FadeUp({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    y = 40,
}: FadeUpProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ y, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// STAGGERED CONTAINER - Stagger children animations
// ============================================
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    delay?: number
    staggerDelay?: number
}

export function StaggerContainer({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// STAGGERED ITEM - Use inside StaggerContainer
// ============================================
interface StaggerItemProps {
    children: ReactNode
    className?: string
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: {
            y: 30,
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 150,
            },
        },
    }

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}

// ============================================
// TEXT SHIMMER - Animated gradient shimmer
// ============================================
interface TextShimmerProps {
    children: string
    className?: string
}

export function TextShimmer({ children, className = "" }: TextShimmerProps) {
    return (
        <span
            className={`text-shimmer ${className}`}
            style={{
                background: "linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd, #8b5cf6)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 3s linear infinite",
            }}
        >
            {children}
        </span>
    )
}

// ============================================
// BLUR REVEAL - Blur to clear reveal
// ============================================
interface BlurRevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function BlurReveal({
    children,
    className = "",
    delay = 0,
}: BlurRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={
                isInView
                    ? { opacity: 1, filter: "blur(0px)" }
                    : { opacity: 0, filter: "blur(20px)" }
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// SCALE REVEAL - Scale up reveal
// ============================================
interface ScaleRevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function ScaleReveal({
    children,
    className = "",
    delay = 0,
}: ScaleRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
                isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
            }
            transition={{
                duration: 0.6,
                delay,
                type: "spring",
                damping: 25,
                stiffness: 200,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
