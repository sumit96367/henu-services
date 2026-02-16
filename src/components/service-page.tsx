'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import {
    ArrowRight,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import { cn } from '@/lib/utils';
import { FAQ } from '@/components/ui/faq-section';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { BrandScroller, BrandScrollerReverse } from '@/components/ui/brand-scroller';
import Image from 'next/image';
import { useState } from 'react';

export interface ServiceFAQ {
    question: string;
    answer: string;
}

// Helper component for images with error handling
const SafeImage = ({ src, alt, step }: { src: string; alt: string; step: number }) => {
    const [error, setError] = useState(false);

    if (error) return null;

    return (
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setError(true)}
            loading="lazy"
        />
    );
};

// ============================================
// TYPES
// ============================================
interface ServiceFeature {
    title: string;
    description: string;
    icon: ReactNode;
}

interface ServiceProcess {
    step: number;
    title: string;
    description: string;
    image?: string;
}

interface ServiceTech {
    name: string;
    icon?: ReactNode;
}

interface ServicePageProps {
    // Hero
    heroTitle: string;
    heroHighlight: string;
    heroDescription: string;
    heroAccentColor: 'purple' | 'indigo';
    heroAnimation?: ReactNode;

    // Features
    features: ServiceFeature[];

    // Process
    process: ServiceProcess[];

    // Technologies
    technologies?: ServiceTech[];

    // CTA
    ctaTitle: string;
    ctaDescription: string;

    // FAQs
    faqs: ServiceFAQ[];
}



// SERVICE HERO
// ============================================
export const ServiceHero = ({
    title,
    highlight,
    description,
    accentColor,
    animation
}: {
    title: string;
    highlight: string;
    description: string;
    accentColor: 'purple' | 'indigo';
    animation?: ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const gradientClass = accentColor === 'purple' ? 'gradient-text' : 'gradient-text-legal';
    const glowColor = accentColor === 'purple' ? 'rgba(109, 40, 217, 0.15)' : 'rgba(79, 70, 229, 0.15)';

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen pt-24 md:pt-48 pb-32 flex flex-col md:flex-row items-center overflow-hidden bg-transparent"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="grid-background opacity-20"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                        filter: 'blur(80px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container relative z-10"
            >
                {/* Navbar Spacer for Mobile */}
                <div className="h-[100px] md:hidden w-full" />
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-gray-500 text-sm mb-8"
                >
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-300">{highlight}</span>
                </motion.div>

                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-2 leading-tight"
                    >
                        {title} <span className={gradientClass}>{highlight}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 max-w-2xl"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/contact" className="btn-primary w-full sm:w-auto">
                            Start Your Project
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="#process" className="btn-secondary">
                            View Process
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Animation section (Absolute on desktop, relative on mobile to avoid overlap) */}
            {animation && (
                <div
                    className="animation-container"
                    style={{
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        opacity: 1,
                        visibility: 'visible'
                    }}
                >
                    {animation}
                </div>
            )}

            {/* Responsive Animation Styles */}
            <style jsx>{`
                .animation-container {
                    /* Desktop (≥1024px) - unchanged from original */
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 0;
                }
                
                /* Tablet and Mobile (< 1024px) */
                @media (max-width: 1023px) {
                    .animation-container {
                        position: relative;
                        width: 100%;
                        height: 350px;
                        margin-top: 40px;
                        margin-bottom: -40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 0;
                        opacity: 0.5;
                        transform: scale(0.8);
                    }
                }
                
                /* Small Mobile (< 768px) */
                @media (max-width: 767px) {
                    .animation-container {
                        height: 320px;
                        margin-top: 20px;
                        transform: scale(0.75);
                        opacity: 0.4;
                    }
                    
                    /* Reduce blur on mobile for performance */
                    .animation-container :global(div[style*="blur"]) {
                        filter: blur(40px) !important;
                    }
                }
            `}</style>
        </section>
    );
};

// ============================================
// FEATURES SECTION (with hover effects)
// ============================================


export const ServiceFeatures = ({ features, accentColor }: { features: ServiceFeature[]; accentColor: 'purple' | 'indigo' }) => {
    return (
        <section className="section bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 space-y-4 text-center"
                >

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        What We <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="max-w-[52ch] text-gray-400 pb-8">
                        Comprehensive solutions tailored to your business needs
                    </p>
                </motion.div>



                <FeaturesSectionWithHoverEffects
                    features={features}
                    accentColor={accentColor}
                />
            </div>
        </section>
    );
};

// ============================================
// PROCESS SECTION (Sticky Scroll)
// ============================================


export const ServiceProcess = ({ process, accentColor }: { process: ServiceProcess[]; accentColor: 'purple' | 'indigo' }) => {
    // Transform process steps into StickyScroll content format
    const stickyContent = process.map((step, index) => {
        const gradients = accentColor === 'purple'
            ? [
                "linear-gradient(to bottom right, #6D28D9, #4F46E5)",
                "linear-gradient(to bottom right, #4F46E5, #0EA5E9)",
                "linear-gradient(to bottom right, #6D28D9, #0EA5E9)"
            ]
            : [
                "linear-gradient(to bottom right, #4F46E5, #0EA5E9)",
                "linear-gradient(to bottom right, #0EA5E9, #06B6D4)",
                "linear-gradient(to bottom right, #4F46E5, #06B6D4)"
            ];

        return {
            title: `${step.step}. ${step.title}`,
            description: step.description,
            content: step.image ? (
                <div className="h-64 w-64 md:h-72 md:w-72 relative rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                    <SafeImage
                        src={step.image}
                        alt={step.title}
                        step={step.step}
                    />
                    {/* Fallback step number if image takes too long or fails */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent">
                        <span className="text-8xl font-black text-white/10">{step.step}</span>
                    </div>
                </div>
            ) : (
                <div
                    className="h-full w-full flex items-center justify-center text-white text-4xl font-bold"
                    style={{ background: gradients[index % gradients.length] }}
                >
                    {step.step}
                </div>
            ),
        };
    });

    return (
        <section id="process" className="section pt-8 bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-8"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="gradient-text">Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-center">
                        A proven methodology that delivers results
                    </p>
                </motion.div>

                <StickyScroll content={stickyContent} />
            </div>
        </section>
    );

};


// ============================================
// TECHNOLOGIES SECTION
// ============================================


export const ServiceTechnologies = ({ technologies }: { technologies: ServiceTech[] }) => {
    // Extract just the names from the technologies array
    const techNames = technologies.map(tech => tech.name);

    return (
        <section className="section bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Technologies We <span className="gradient-text">Use</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-6">
                    <BrandScroller technologies={techNames} />
                    <BrandScrollerReverse technologies={techNames} />
                </div>
            </div>
        </section>
    );
};

// ============================================
// CTA SECTION
// ============================================
export const ServiceCTA = ({ title, description, accentColor }: { title: string; description: string; accentColor: 'purple' | 'indigo' }) => {
    const glowColor = accentColor === 'purple' ? 'rgba(109, 40, 217, 0.2)' : 'rgba(79, 70, 229, 0.2)';
    const gradientClass = accentColor === 'purple' ? 'gradient-text' : 'gradient-text-legal';

    return (
        <section className="section relative overflow-hidden bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
            {/* Background glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 60%)`
                }}
            />

            <div className="container relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto flex flex-col items-center text-center w-full"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to <span className={gradientClass}>{title}</span>?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                            Start Your Project
                            <ArrowRight size={20} />
                        </Link>
                        <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4">
                            View Our Work
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export const ServiceFAQSection = ({ faqs }: { faqs: ServiceFAQ[] }) => {
    return <FAQ faqs={faqs} />;
};



// FULL SERVICE PAGE COMPONENT
// ============================================
export const ServicePage = ({
    heroTitle,
    heroHighlight,
    heroDescription,
    heroAccentColor,
    heroAnimation,
    features,
    process,
    technologies,
    ctaTitle,
    ctaDescription,
    faqs,
}: ServicePageProps) => {
    return (
        <main>
            <ServiceHero
                title={heroTitle}
                highlight={heroHighlight}
                description={heroDescription}
                accentColor={heroAccentColor}
                animation={heroAnimation}
            />
            <ServiceFeatures features={features} accentColor={heroAccentColor} />
            <ServiceProcess process={process} accentColor={heroAccentColor} />
            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}
            <ServiceFAQSection faqs={faqs} />
            <ServiceCTA
                title={ctaTitle}
                description={ctaDescription}
                accentColor={heroAccentColor}
            />
        </main>
    );
};
