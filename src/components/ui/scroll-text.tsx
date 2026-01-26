'use client';

import { motion, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { ReactNode } from 'react';

type AnimationVariant =
    | 'fade-scale'
    | 'blur-focus'
    | 'rise'
    | 'expand'
    | 'stagger-words'
    | 'stagger-lines';

interface ScrollTextProps {
    children: ReactNode;
    variant?: AnimationVariant;
    className?: string;
    delay?: number;
    startOffset?: number;
    endOffset?: number;
}

/**
 * Text component with scroll-driven animations
 * Animations are tied to scroll position, not time
 */
export function ScrollText({
    children,
    variant = 'fade-scale',
    className = '',
    delay = 0,
    startOffset = 0.8,
    endOffset = 0.2
}: ScrollTextProps) {
    const { ref, progress } = useScrollAnimation({ startOffset, endOffset });

    // Animation variants
    const animations = {
        'fade-scale': {
            opacity: useTransform(progress, [0, 1], [0, 1]),
            scale: useTransform(progress, [0, 1], [0.95, 1]),
        },
        'blur-focus': {
            opacity: useTransform(progress, [0, 1], [0, 1]),
            filter: useTransform(progress, [0, 1], ['blur(8px)', 'blur(0px)']),
        },
        'rise': {
            opacity: useTransform(progress, [0, 1], [0, 1]),
            y: useTransform(progress, [0, 1], [40, 0]),
        },
        'expand': {
            opacity: useTransform(progress, [0, 0.5, 1], [0, 1, 1]),
            letterSpacing: useTransform(progress, [0, 0.5, 1], ['0.2em', '0.05em', '0em']),
        },
        'stagger-words': {
            opacity: useTransform(progress, [0, 1], [0, 1]),
            y: useTransform(progress, [0, 1], [20, 0]),
        },
        'stagger-lines': {
            opacity: useTransform(progress, [0, 1], [0, 1]),
            y: useTransform(progress, [0, 1], [30, 0]),
        }
    };

    const style = animations[variant];

    return (
        <motion.div
            ref={ref}
            style={style}
            transition={{
                delay,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Custom easing for premium feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Staggered words variant
 * Each word animates individually
 */
export function ScrollTextWords({
    children,
    className = '',
    startOffset = 0.8,
    endOffset = 0.2
}: Omit<ScrollTextProps, 'variant'>) {
    const text = typeof children === 'string' ? children : String(children);
    const words = text.split(' ');
    const { ref, progress } = useScrollAnimation({ startOffset, endOffset });

    return (
        <div ref={ref} className={className}>
            {words.map((word, i) => {
                const wordProgress = useTransform(
                    progress,
                    [0, 1],
                    [0, 1]
                );

                const opacity = useTransform(
                    wordProgress,
                    [i / words.length, (i + 1) / words.length],
                    [0, 1]
                );

                const y = useTransform(
                    wordProgress,
                    [i / words.length, (i + 1) / words.length],
                    [20, 0]
                );

                return (
                    <motion.span
                        key={i}
                        style={{ opacity, y }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </div>
    );
}

/**
 * Staggered lines variant
 * Each line animates individually
 */
export function ScrollTextLines({
    lines,
    className = '',
    lineClassName = '',
    startOffset = 0.8,
    endOffset = 0.2
}: {
    lines: string[];
    className?: string;
    lineClassName?: string;
    startOffset?: number;
    endOffset?: number;
}) {
    const { ref, progress } = useScrollAnimation({ startOffset, endOffset });

    return (
        <div ref={ref} className={className}>
            {lines.map((line, i) => {
                const opacity = useTransform(
                    progress,
                    [i / lines.length, (i + 0.5) / lines.length],
                    [0, 1]
                );

                const y = useTransform(
                    progress,
                    [i / lines.length, (i + 0.5) / lines.length],
                    [30, 0]
                );

                return (
                    <motion.div
                        key={i}
                        style={{ opacity, y }}
                        className={lineClassName}
                    >
                        {line}
                    </motion.div>
                );
            })}
        </div>
    );
}

export default ScrollText;
