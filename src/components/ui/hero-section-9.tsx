"use client"

import { motion, type Variants } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

// Define the props for reusability
interface StatProps {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface ActionProps {
    text: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    className?: string;
    icon?: React.ReactNode;
}

interface HeroSectionProps {
    title: React.ReactNode;
    subtitle: string;
    actions: ActionProps[];
    stats: StatProps[];
    images: string[];
    className?: string;
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const floatingVariants: Variants = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const HeroSection = ({ title, subtitle, actions, stats, images, className }: HeroSectionProps) => {
    return (
        <section className={cn('w-full overflow-hidden bg-transparent py-12 sm:py-24', className)}>
            <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
                {/* Left Column: Text Content */}
                <motion.div
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>
                    <motion.p className="mt-6 max-w-md text-lg text-gray-400" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.div className="mt-8 mb-10 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants}>
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                onClick={action.onClick}
                                variant={action.variant}
                                className={cn("flex items-center justify-center gap-3 transition-all", action.className)}
                            >
                                {action.text}
                                {action.icon}
                            </Button>
                        ))}


                    </motion.div>

                    {/* Hard spacer */}
                    <div style={{ height: '30px', width: '100%' }} />

                    <motion.div className="flex flex-wrap justify-center gap-8 lg:justify-start" variants={itemVariants}>




                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">{stat.icon}</div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white leading-none">{stat.value}</span>
                                    <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
                                </div>


                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Column: Image Collage */}
                <motion.div
                    className="relative h-[400px] w-full sm:h-[500px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative Shapes */}
                    <motion.div
                        className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-cyan-500/20 shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                        variants={floatingVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-amber-500/20 shadow-[0_0_30px_rgba(255,149,0,0.2)]"
                        variants={floatingVariants}
                        animate="animate"
                        style={{ transitionDelay: '0.5s' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-white/10"
                        variants={floatingVariants}
                        animate="animate"
                        style={{ transitionDelay: '1s' }}
                    />

                    {/* Images */}
                    <motion.div
                        className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-2xl sm:h-64 sm:w-64"
                        style={{ transformOrigin: 'bottom center' }}
                        variants={imageVariants}
                    >
                        <img src={images[0]} alt="Marketing Campaign" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                    <motion.div
                        className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-2xl sm:h-56 sm:w-56"
                        style={{ transformOrigin: 'left center' }}
                        variants={imageVariants}
                    >
                        <img src={images[1]} alt="Data Analytics" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-2xl sm:h-48 sm:w-48"
                        style={{ transformOrigin: 'top right' }}
                        variants={imageVariants}
                    >
                        <img src={images[2]} alt="Strategy Meeting" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
