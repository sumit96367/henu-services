"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
    id: number
    name: string
    role: string
    company: string
    content: string
    avatar: string
    rating: number
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[]
    className?: string
    autoPlay?: boolean
    autoPlayInterval?: number
}

export function TestimonialCarousel({
    testimonials,
    className,
    autoPlay = true,
    autoPlayInterval = 5000,
}: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (autoPlay && !isHovered) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }, autoPlayInterval)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [autoPlay, autoPlayInterval, isHovered, testimonials.length])

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    return (
        <div
            className={cn("relative", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                <div
                    className="flex gap-4 transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="w-full flex-shrink-0 p-6 md:p-8 lg:p-12 testimonial-item"
                        >
                            <div className="glass-card p-6 md:p-8 lg:p-12 relative">
                                {/* Quote icon */}
                                <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 text-primary/20" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-4 md:mb-6">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className={cn(
                                                "w-4 h-4 md:w-5 md:h-5",
                                                i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                                            )}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm md:text-base">{testimonial.name}</p>
                                        <p className="text-white/60 text-xs md:text-sm">
                                            {testimonial.role} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                <button
                    onClick={goToPrevious}
                    className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>

                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                i === currentIndex
                                    ? "bg-primary w-6 md:w-8"
                                    : "bg-white/30 w-2 hover:bg-white/50 hover:scale-125"
                            )}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
            </div>
        </div>
    )
}

// Single testimonial card with hover effects
interface TestimonialCardProps {
    testimonial: Testimonial
    className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
    return (
        <div
            className={cn(
                "glass-card p-6 relative group",
                className
            )}
        >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />

            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={cn(
                            "w-4 h-4",
                            i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            <p className="text-white/70 text-sm mb-6 line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
            </p>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <p className="font-medium text-white text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.role}</p>
                </div>
            </div>
        </div>
    )
}
