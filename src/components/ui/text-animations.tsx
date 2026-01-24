"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Animated text reveal with character-by-character animation
interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    stagger?: number
    trigger?: boolean
}

export function TextReveal({
    text,
    className,
    delay = 0,
    stagger = 0.03,
    trigger = true,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(!trigger)

    useEffect(() => {
        if (!containerRef.current || !trigger) return

        const chars = containerRef.current.querySelectorAll(".char")

        gsap.set(chars, { y: 50, opacity: 0 })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
            onEnter: () => {
                setIsVisible(true)
                gsap.to(chars, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: stagger,
                    delay: delay,
                    ease: "power4.out",
                })
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [delay, stagger, trigger])

    return (
        <div ref={containerRef} className={cn("overflow-hidden", className)}>
            <span className="inline-block">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className="char inline-block"
                        style={{ opacity: isVisible ? undefined : 0 }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </div>
    )
}

// Typewriter effect
interface TypewriterProps {
    texts: string[]
    className?: string
    speed?: number
    deleteSpeed?: number
    pauseDuration?: number
}

export function Typewriter({
    texts,
    className,
    speed = 100,
    deleteSpeed = 50,
    pauseDuration = 2000,
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentText = texts[currentIndex]

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < currentText.length) {
                        setDisplayText(currentText.slice(0, displayText.length + 1))
                    } else {
                        setTimeout(() => setIsDeleting(true), pauseDuration)
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1))
                    } else {
                        setIsDeleting(false)
                        setCurrentIndex((prev) => (prev + 1) % texts.length)
                    }
                }
            },
            isDeleting ? deleteSpeed : speed
        )

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pauseDuration])

    return (
        <span className={cn("inline-block min-h-[1.5em]", className)}>
            {displayText}
            <span className="animate-pulse text-primary">|</span>
        </span>
    )
}

// Gradient text with animated background
interface GradientTextProps {
    children: React.ReactNode
    className?: string
    animate?: boolean
    colors?: string[]
}

export function GradientText({
    children,
    className,
    animate = true,
    colors = ["#8b5cf6", "#a78bfa", "#6366f1", "#8b5cf6"],
}: GradientTextProps) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent",
                animate && "animate-gradient-x",
                className
            )}
            style={{
                backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
                backgroundSize: animate ? "300% 100%" : "100% 100%",
            }}
        >
            {children}
        </span>
    )
}

// Counter animation
interface AnimatedCounterProps {
    end: number
    duration?: number
    prefix?: string
    suffix?: string
    className?: string
}

export function AnimatedCounter({
    end,
    duration = 2,
    prefix = "",
    suffix = "",
    className,
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null)
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (!counterRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true)

                    const startTime = performance.now()
                    const animate = (currentTime: number) => {
                        const elapsed = (currentTime - startTime) / 1000
                        const progress = Math.min(elapsed / duration, 1)

                        // Easing function
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
                        setCount(Math.floor(easeOutQuart * end))

                        if (progress < 1) {
                            requestAnimationFrame(animate)
                        }
                    }

                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(counterRef.current)

        return () => observer.disconnect()
    }, [end, duration, hasAnimated])

    return (
        <span ref={counterRef} className={className}>
            {prefix}
            {count}
            {suffix}
        </span>
    )
}

// Floating text with parallax
interface FloatingTextProps {
    children: React.ReactNode
    className?: string
    speed?: number
}

export function FloatingText({
    children,
    className,
    speed = 20,
}: FloatingTextProps) {
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        const handleScroll = () => {
            if (!textRef.current) return
            const scrollY = window.scrollY
            const rect = textRef.current.getBoundingClientRect()
            const elementCenter = rect.top + rect.height / 2
            const viewportCenter = window.innerHeight / 2
            const distance = elementCenter - viewportCenter

            textRef.current.style.transform = `translateY(${distance / speed}px)`
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [speed])

    return (
        <div ref={textRef} className={cn("transition-transform", className)}>
            {children}
        </div>
    )
}

// Marquee/Ticker
interface MarqueeProps {
    children: React.ReactNode
    className?: string
    speed?: number
    direction?: "left" | "right"
    pauseOnHover?: boolean
}

export function Marquee({
    children,
    className,
    speed = 30,
    direction = "left",
    pauseOnHover = true,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex overflow-hidden",
                pauseOnHover && "[&:hover_.marquee-content]:pause",
                className
            )}
        >
            <div
                className={cn(
                    "marquee-content flex shrink-0 gap-8",
                    direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
                )}
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {children}
            </div>
            <div
                className={cn(
                    "marquee-content flex shrink-0 gap-8",
                    direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
                )}
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {children}
            </div>
        </div>
    )
}
