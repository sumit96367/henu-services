"use client";

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Interface for the props of each individual icon.
interface IconProps {
    id: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color?: string; // Brand color for the icon
    className: string; // Used for custom positioning of the icon.
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
    title: string;
    highlight?: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    icons: IconProps[];
}

// A single icon component with its own motion logic
const Icon = ({
    mouseX,
    mouseY,
    iconData,
    index,
}: {
    mouseX: React.MutableRefObject<number>;
    mouseY: React.MutableRefObject<number>;
    iconData: IconProps;
    index: number;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    // Motion values for the icon's position, with spring physics for smooth movement
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;
                const iconCenterY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(mouseX.current - iconCenterX, 2) +
                    Math.pow(mouseY.current - iconCenterY, 2)
                );

                // If the cursor is close enough, repel the icon
                if (distance < 150) {
                    const angle = Math.atan2(
                        mouseY.current - iconCenterY,
                        mouseX.current - iconCenterX
                    );
                    // The closer the cursor, the stronger the repulsion
                    const force = (1 - distance / 150) * 50;
                    x.set(-Math.cos(angle) * force);
                    y.set(-Math.sin(angle) * force);
                } else {
                    // Return to original position when cursor is away
                    x.set(0);
                    y.set(0);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y, mouseX, mouseY]);

    return (
        <motion.div
            ref={ref}
            key={iconData.id}
            style={{
                x: springX,
                y: springY,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cn('absolute z-0', iconData.className)}
        >
            {/* Inner wrapper for the continuous floating animation */}
            <motion.div
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-4 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                animate={{
                    y: [0, -8, 0, 8, 0],
                    x: [0, 6, 0, -6, 0],
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            >
                <iconData.icon
                    className="w-10 h-10 md:w-12 md:h-12"
                    style={{ color: iconData.color || 'white' }}
                />
            </motion.div>
        </motion.div>
    );
};

const FloatingIconsHero = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, highlight, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
    // Refs to track the raw mouse position
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseX.current = event.clientX;
        mouseY.current = event.clientY;
    };

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn(
                'relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-32 pb-32',
                className
            )}
            {...props}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="grid-background opacity-20"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Container for the background floating icons */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {icons.map((iconData, index) => (
                    <Icon
                        key={iconData.id}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        iconData={iconData}
                        index={index}
                    />
                ))}
            </div>

            {/* Container for the foreground content */}
            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                        {title} <br />
                        {highlight && <span className="gradient-text-tech">{highlight}</span>}
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
                        {subtitle}
                    </p>
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
                        <Button asChild className="btn-primary !h-14 !px-10 text-base">
                            <Link href={ctaHref}>{ctaText}</Link>
                        </Button>
                        <Button variant="outline" asChild className="btn-secondary !h-14 !px-10 text-base border-white/10 text-white">
                            <Link href="#process">Our Process</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
