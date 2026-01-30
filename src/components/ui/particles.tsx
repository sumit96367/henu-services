"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface Orb {
    id: number
    size: number
    x: number
    y: number
    duration: number
    delay: number
    color: string
}

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
}

interface ParticleBackgroundProps {
    className?: string
    particleCount?: number
    colors?: string[]
    speed?: number
    connectionDistance?: number
    showConnections?: boolean
    interactive?: boolean
}

export function ParticleBackground({
    className,
    particleCount = 50,
    colors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#6366f1"],
    speed = 0.5,
    connectionDistance = 150,
    showConnections = true,
    interactive = true,
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number | null>(null)

    const initParticles = useCallback((width: number, height: number) => {
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
        }))
    }, [particleCount, speed, colors])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            const parent = canvas.parentElement
            if (parent) {
                canvas.width = parent.clientWidth
                canvas.height = parent.clientHeight
                initParticles(canvas.width, canvas.height)
            }
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        if (interactive) {
            canvas.addEventListener("mousemove", handleMouseMove)
        }

        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Bounce off walls
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Interactive: attract to mouse
                if (interactive) {
                    const dx = mouseRef.current.x - particle.x
                    const dy = mouseRef.current.y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 200) {
                        const force = (200 - distance) / 200
                        particle.vx += (dx / distance) * force * 0.02
                        particle.vy += (dy / distance) * force * 0.02
                    }
                }

                // Limit velocity
                const maxSpeed = speed * 2
                const currentSpeed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
                if (currentSpeed > maxSpeed) {
                    particle.vx = (particle.vx / currentSpeed) * maxSpeed
                    particle.vy = (particle.vy / currentSpeed) * maxSpeed
                }

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.globalAlpha = particle.opacity
                ctx.fill()

                // Draw connections
                if (showConnections) {
                    for (let j = i + 1; j < particlesRef.current.length; j++) {
                        const other = particlesRef.current[j]
                        const dx = particle.x - other.x
                        const dy = particle.y - other.y
                        const distance = Math.sqrt(dx * dx + dy * dy)

                        if (distance < connectionDistance) {
                            ctx.beginPath()
                            ctx.moveTo(particle.x, particle.y)
                            ctx.lineTo(other.x, other.y)
                            ctx.strokeStyle = particle.color
                            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.2
                            ctx.lineWidth = 0.5
                            ctx.stroke()
                        }
                    }
                }
            })

            ctx.globalAlpha = 1
            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (interactive) {
                canvas.removeEventListener("mousemove", handleMouseMove)
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [initParticles, interactive, showConnections, connectionDistance, speed])

    return (
        <canvas
            ref={canvasRef}
            className={cn("pointer-events-none absolute inset-0", className)}
        />
    )
}

// Floating orbs background
interface FloatingOrbsProps {
    className?: string
    orbCount?: number
}

export function FloatingOrbs({ className, orbCount = 6 }: FloatingOrbsProps) {
    const [orbs, setOrbs] = useState<Orb[]>([])

    useEffect(() => {
        setOrbs(Array.from({ length: orbCount }, (_, i) => ({
            id: i,
            size: Math.random() * 300 + 200,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
            color:
                i % 3 === 0
                    ? "bg-purple-500/20"
                    : i % 3 === 1
                        ? "bg-blue-500/20"
                        : "bg-pink-500/20",
        })))
    }, [orbCount])

    if (orbs.length === 0) return null

    return (
        <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
            {orbs.map((orb: Orb) => (
                <div
                    key={orb.id}
                    className={cn(
                        "absolute rounded-full blur-3xl",
                        orb.color
                    )}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        animation: `float ${orb.duration}s ease-in-out infinite`,
                        animationDelay: `${orb.delay}s`,
                    }}
                />
            ))}
        </div>
    )
}

// Gradient mesh background
export function GradientMesh({ className }: { className?: string }) {
    return (
        <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(264, 97%, 62%, 0.15) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.15) 0px, transparent 50%),
            radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.15) 0px, transparent 50%),
            radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.15) 0px, transparent 50%),
            radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.15) 0px, transparent 50%),
            radial-gradient(at 67% 75%, hsla(343, 68%, 79%, 0.15) 0px, transparent 50%)
          `,
                }}
            />
        </div>
    )
}
