'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseScrollAnimationOptions {
    /**
     * Offset from top of viewport where animation starts (0-1)
     * 0 = top of viewport, 1 = bottom of viewport
     */
    startOffset?: number;

    /**
     * Offset from top of viewport where animation ends (0-1)
     * 0 = top of viewport, 1 = bottom of viewport
     */
    endOffset?: number;

    /**
     * Enable smooth progress updates (throttled)
     */
    smooth?: boolean;
}

interface ScrollAnimationResult {
    /** Reference to attach to the element */
    ref: React.RefObject<HTMLDivElement | null>;

    /** Scroll progress from 0 to 1 */
    progress: MotionValue<number>;

    /** Whether element is in viewport */
    isInView: boolean;
}

/**
 * Custom hook for scroll-driven animations
 * Returns progress (0-1) based on element's scroll position
 */
export function useScrollAnimation(
    options: UseScrollAnimationOptions = {}
): ScrollAnimationResult {
    const {
        startOffset = 0.8, // Start when element is 80% down the viewport
        endOffset = 0.2,   // End when element is 20% down the viewport
        smooth = true
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Get scroll progress for the element
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${startOffset * 100}%`, `start ${endOffset * 100}%`]
    });

    // Transform to 0-1 range
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Track if element is in viewport
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '-10% 0px'
            }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, progress, isInView };
}

/**
 * Hook for section-based scroll animations
 * Returns progress for the entire section
 */
export function useSectionScroll() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    return { ref, scrollYProgress };
}

/**
 * Utility to create smooth scroll progress values
 */
export function createScrollValues(
    progress: MotionValue<number>,
    inputRange: number[],
    outputRange: number[]
) {
    return useTransform(progress, inputRange, outputRange);
}
