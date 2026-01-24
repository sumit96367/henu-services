'use client';

import { motion, useInView, useAnimation, Variants, Easing } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    once?: boolean;
    threshold?: number;
}

const getInitialPosition = (direction: string, distance: number): { x?: number; y?: number } => {
    switch (direction) {
        case 'up':
            return { y: distance };
        case 'down':
            return { y: -distance };
        case 'left':
            return { x: distance };
        case 'right':
            return { x: -distance };
        default:
            return {};
    }
};

// Common easing curve
const easeOutQuart: Easing = [0.25, 1, 0.5, 1];

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = 50,
    once = true,
    threshold = 0.2,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });
    const controls = useAnimation();

    const initialPosition = getInitialPosition(direction, distance);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!once) {
            controls.start('hidden');
        }
    }, [isInView, controls, once]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initialPosition }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration, delay, ease: easeOutQuart }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger children animation wrapper
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.2,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggerItem({
    children,
    className = '',
    direction = 'up',
}: StaggerItemProps) {
    const initialPosition = getInitialPosition(direction, 30);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, ...initialPosition },
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOutQuart },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Parallax effect component
interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: 'up' | 'down';
}

export function Parallax({
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ willChange: 'transform' }}
            initial={{ y: 0 }}
            whileInView={{
                y: direction === 'up' ? -50 * speed : 50 * speed,
            }}
            transition={{ duration: 0 }}
            viewport={{ once: false, amount: 'some' }}
        >
            {children}
        </motion.div>
    );
}

// Text reveal animation (word by word)
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

export function TextReveal({
    text,
    className = '',
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, amount: 0.5 });
    const words = text.split(' ');

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.05,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4, ease: easeOutQuart },
                        },
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Scale on scroll component
interface ScaleOnScrollProps {
    children: ReactNode;
    className?: string;
    scaleFrom?: number;
    scaleTo?: number;
}

export function ScaleOnScroll({
    children,
    className = '',
    scaleFrom = 0.8,
    scaleTo = 1,
}: ScaleOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ scale: scaleFrom, opacity: 0 }}
            animate={isInView ? { scale: scaleTo, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: easeOutQuart }}
        >
            {children}
        </motion.div>
    );
}

// Fade in on scroll
interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

export function FadeIn({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration, delay, ease: easeOutQuart }}
        >
            {children}
        </motion.div>
    );
}

export default ScrollReveal;
