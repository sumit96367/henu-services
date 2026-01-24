"use client"

import { useRef, useState, ReactNode, MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// ============================================
// 3D TILT CARD - Interactive perspective tilt
// ============================================
interface TiltCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
    intensity?: number
    scale?: number
    perspective?: number
}

export function TiltCard({
    children,
    className = "",
    glowColor = "rgba(139, 92, 246, 0.4)",
    intensity = 15,
    scale = 1.02,
    perspective = 1000,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Motion values for tilt
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 300 }
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig)

    // Glow position
    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const x = (e.clientX - centerX) / rect.width
        const y = (e.clientY - centerY) / rect.height

        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    scale: isHovered ? scale : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 60%)`,
                        opacity: isHovered ? 0.6 : 0,
                    }}
                />

                {/* Content */}
                <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}

// ============================================
// MAGNETIC BUTTON - Button that follows cursor
// ============================================
interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
}

export function MagneticButton({
    children,
    className = "",
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const x = (e.clientX - centerX) * strength
        const y = (e.clientY - centerY) * strength

        setPosition({ x, y })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 300,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// HOVER GLOW CARD - Card with moving glow border
// ============================================
interface HoverGlowCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
}

export function HoverGlowCard({
    children,
    className = "",
    glowColor = "rgba(139, 92, 246, 0.5)",
}: HoverGlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        setGlowPosition({ x, y })
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl ${className}`}
            style={{
                background: isHovered
                    ? `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 40%)`
                    : "transparent",
            }}
        >
            {/* Animated border */}
            <div
                className="absolute inset-[1px] rounded-[inherit] bg-[#0a0a0a] transition-all duration-300"
                style={{
                    boxShadow: isHovered
                        ? `inset 0 0 20px ${glowColor.replace("0.5", "0.1")}`
                        : "none",
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    )
}

// ============================================
// FLOATING ELEMENT - Continuous float animation
// ============================================
interface FloatingElementProps {
    children: ReactNode
    className?: string
    duration?: number
    distance?: number
    delay?: number
}

export function FloatingElement({
    children,
    className = "",
    duration = 4,
    distance = 20,
    delay = 0,
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [-distance / 2, distance / 2, -distance / 2],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
