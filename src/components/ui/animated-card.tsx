"use client"

import * as React from "react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    glowColor?: string
    spotlightColor?: string
}

export function AnimatedCard({
    children,
    className,
    glowColor = "rgba(139, 92, 246, 0.4)",
    spotlightColor = "rgba(255, 255, 255, 0.1)",
    ...props
}: AnimatedCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [rotation, setRotation] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setPosition({ x, y })

        // Calculate rotation based on mouse position
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
    }

    return (
        <div
            ref={cardRef}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)`
                    : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
                transition: "transform 0.3s ease-out",
            }}
            {...props}
        >
            {/* Spotlight effect */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
                    }}
                />
            )}

            {/* Glow border effect */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 60%)`,
                        opacity: 0.5,
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-20">{children}</div>

            {/* Shimmer effect on hover */}
            <div
                className={cn(
                    "pointer-events-none absolute inset-0 z-30 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700",
                    isHovered && "translate-x-[100%]"
                )}
            />
        </div>
    )
}

// Magnetic Button with GSAP-like physics
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    magneticStrength?: number
}

export function MagneticButton({
    children,
    className,
    magneticStrength = 0.3,
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        setPosition({ x: x * magneticStrength, y: y * magneticStrength })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <button
            ref={buttonRef}
            className={cn(
                "relative inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-3 font-semibold transition-transform duration-300 ease-out",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            {...props}
        >
            {children}
        </button>
    )
}
