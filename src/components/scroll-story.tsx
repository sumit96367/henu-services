'use client';

import { ReactNode } from 'react';
import { StaticGradientBg } from './ui/static-gradient-bg';

interface ScrollStoryProps {
    children: ReactNode;
    background?: 'dark' | 'minimal' | 'grain';
    className?: string;
}

/**
 * Main wrapper for scroll-driven story experience
 * Provides static background and smooth scroll container
 */
export function ScrollStory({
    children,
    background = 'dark',
    className = ''
}: ScrollStoryProps) {
    return (
        <>
            <StaticGradientBg variant={background} />
            <div className={`relative ${className}`}>
                {children}
            </div>
        </>
    );
}

interface StorySection {
    children: ReactNode;
    className?: string;
    fullHeight?: boolean;
    id?: string;
}

/**
 * Individual section within the scroll story
 * Can be full viewport height or content-based
 */
export function StorySection({
    children,
    className = '',
    fullHeight = true,
    id
}: StorySection) {
    return (
        <section
            id={id}
            className={`
        relative
        ${fullHeight ? 'min-h-screen' : 'min-h-[50vh]'}
        flex items-center justify-center
        px-6 md:px-12 lg:px-20
        ${className}
      `}
        >
            <div className="max-w-6xl w-full mx-auto">
                {children}
            </div>
        </section>
    );
}

export default ScrollStory;
