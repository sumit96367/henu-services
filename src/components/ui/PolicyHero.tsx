'use client';

import { motion } from 'framer-motion';

interface PolicyHeroProps {
    title: string;
    subtitle: string;
}

export function PolicyHero({ title, subtitle }: PolicyHeroProps) {
    return (
        <section
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{ minHeight: '35vh', height: '40vh' }}
        >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
