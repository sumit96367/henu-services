"use client"

import { useEffect, useRef, ReactNode } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProviderProps {
    children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis with buttery smooth settings
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        // Integrate Lenis with GSAP ScrollTrigger
        lenisRef.current.on("scroll", ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenisRef.current?.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        return () => {
            lenisRef.current?.destroy()
            gsap.ticker.remove((time) => {
                lenisRef.current?.raf(time * 1000)
            })
        }
    }, [])

    return <>{children}</>
}
