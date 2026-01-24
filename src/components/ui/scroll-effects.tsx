"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Aurora background effect
export function AuroraBackground({ className }: { className?: string }) {
    return (
        <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute h-[400px] w-[400px] rounded-full blur-[100px] animate-aurora-1"
                    style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
                        left: "10%",
                        top: "20%",
                    }}
                />
                <div
                    className="absolute h-[350px] w-[350px] rounded-full blur-[100px] animate-aurora-2"
                    style={{
                        background: "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
                        right: "20%",
                        top: "30%",
                    }}
                />
                <div
                    className="absolute h-[500px] w-[500px] rounded-full blur-[100px] animate-aurora-3"
                    style={{
                        background: "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)",
                        left: "30%",
                        bottom: "10%",
                    }}
                />
            </div>
        </div>
    )
}

// Reveal on scroll wrapper
interface RevealOnScrollProps {
    children: React.ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right" | "scale"
    delay?: number
    duration?: number
}

export function RevealOnScroll({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 0.9,
}: RevealOnScrollProps) {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!elementRef.current) return

        const element = elementRef.current

        const getInitialState = () => {
            switch (direction) {
                case "up":
                    return { y: 50, opacity: 0, scale: 0.95 }
                case "down":
                    return { y: -50, opacity: 0, scale: 0.95 }
                case "left":
                    return { x: 50, opacity: 0, scale: 0.95 }
                case "right":
                    return { x: -50, opacity: 0, scale: 0.95 }
                case "scale":
                    return { scale: 0.85, opacity: 0 }
                default:
                    return { y: 50, opacity: 0, scale: 0.95 }
            }
        }

        gsap.set(element, getInitialState())

        const scrollTrigger = ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration,
                    delay,
                    ease: "power3.out",
                })
            },
        })

        return () => {
            scrollTrigger?.kill()
        }
    }, [direction, delay, duration])

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    )
}

// Parallax section
interface ParallaxSectionProps {
    children: React.ReactNode
    className?: string
    speed?: number
}

export function ParallaxSection({
    children,
    className,
    speed = 0.5,
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const element = sectionRef.current

        const scrollTrigger = gsap.to(element, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        })

        return () => {
            scrollTrigger?.scrollTrigger?.kill()
        }
    }, [speed])

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    )
}

// Staggered children animation
interface StaggerContainerProps {
    children: React.ReactNode
    className?: string
    stagger?: number
    delay?: number
}

export function StaggerContainer({
    children,
    className,
    stagger = 0.1,
    delay = 0,
}: StaggerContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const childElements = containerRef.current.children

        gsap.set(childElements, { y: 40, opacity: 0, scale: 0.95 })

        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.to(childElements, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger,
                    delay,
                    ease: "power3.out",
                })
            },
        })

        return () => {
            scrollTrigger?.kill()
        }
    }, [stagger, delay])

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    )
}

// Scroll progress indicator
export function ScrollProgress({ className }: { className?: string }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const currentProgress = Math.min((window.scrollY / totalHeight) * 100, 100)
            setProgress(currentProgress)
        }

        // Use requestAnimationFrame for smoother updates
        let rafId: number | null = null
        const updateProgress = () => {
            handleScroll()
            rafId = requestAnimationFrame(updateProgress)
        }

        rafId = requestAnimationFrame(updateProgress)
        
        // Also listen to scroll for immediate updates
        window.addEventListener("scroll", handleScroll, { passive: true })
        
        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className={cn("fixed top-0 left-0 right-0 h-0.5 md:h-1 z-50 bg-black/20 backdrop-blur-sm", className)}>
            <div
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

// Glow cursor effect
export function GlowCursor({ className }: { className?: string }) {
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out",
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div
            ref={cursorRef}
            className={cn(
                "pointer-events-none fixed z-50 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]",
                "bg-gradient-to-r from-primary to-purple-600",
                className
            )}
        />
    )
}

// Noise overlay
export function NoiseOverlay({ className, opacity = 0.03 }: { className?: string; opacity?: number }) {
    return (
        <div
            className={cn("pointer-events-none fixed inset-0 z-40", className)}
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity,
            }}
        />
    )
}

// Horizontal scroll section
interface HorizontalScrollProps {
    children: React.ReactNode
    className?: string
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || !scrollRef.current) return

        const scrollContainer = scrollRef.current
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth

        gsap.to(scrollContainer, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrollWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <div ref={containerRef} className={cn("overflow-hidden", className)}>
            <div ref={scrollRef} className="flex">
                {children}
            </div>
        </div>
    )
}
