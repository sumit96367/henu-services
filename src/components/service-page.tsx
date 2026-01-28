'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, ReactNode, useState } from 'react';
import {
    ArrowRight,
    Check,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import { cn } from '@/lib/utils';

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
    heroAccentColor: 'cyan' | 'amber';

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



// ============================================
// SERVICE HERO
// ============================================
export const ServiceHero = ({
    title,
    highlight,
    description,
    accentColor
}: {
    title: string;
    highlight: string;
    description: string;
    accentColor: 'cyan' | 'amber';
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const gradientClass = accentColor === 'cyan' ? 'gradient-text-tech' : 'gradient-text-legal';
    const glowColor = accentColor === 'cyan' ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 149, 0, 0.15)';

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen pt-48 pb-32 flex items-center overflow-hidden bg-transparent"
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
                        className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight"
                    >
                        {title} <span className={gradientClass}>{highlight}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 mb-6 max-w-2xl"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/contact" className="btn-primary">
                            Start Your Project
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="#process" className="btn-secondary">
                            View Process
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

// ============================================
// FEATURES SECTION (with hover effects)
// ============================================
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';

export const ServiceFeatures = ({ features, accentColor }: { features: ServiceFeature[]; accentColor: 'cyan' | 'amber' }) => {
    return (
        <section className="section bg-transparent">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 space-y-4 text-center"
                >

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';

export const ServiceProcess = ({ process, accentColor }: { process: ServiceProcess[]; accentColor: 'cyan' | 'amber' }) => {
    // Transform process steps into StickyScroll content format
    const stickyContent = process.map((step, index) => {
        const gradients = accentColor === 'cyan'
            ? [
                "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))",
                "linear-gradient(to bottom right, rgb(34 211 238), rgb(59 130 246))",
                "linear-gradient(to bottom right, rgb(56 189 248), rgb(99 102 241))"
            ]
            : [
                "linear-gradient(to bottom right, rgb(251 146 60), rgb(234 179 8))",
                "linear-gradient(to bottom right, rgb(249 115 22), rgb(239 68 68))",
                "linear-gradient(to bottom right, rgb(245 158 11), rgb(217 119 6))"
            ];

        return {
            title: `${step.step}. ${step.title}`,
            description: step.description,
            content: step.image ? (
                <div className="h-full w-full relative">
                    <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover"
                    />
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
        <section id="process" className="section pt-8 bg-transparent">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
import { BrandScroller, BrandScrollerReverse } from '@/components/ui/brand-scroller';

export const ServiceTechnologies = ({ technologies }: { technologies: ServiceTech[] }) => {
    // Extract just the names from the technologies array
    const techNames = technologies.map(tech => tech.name);

    return (
        <section className="section bg-transparent">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
export const ServiceCTA = ({ title, description, accentColor }: { title: string; description: string; accentColor: 'cyan' | 'amber' }) => {
    const glowColor = accentColor === 'cyan' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 149, 0, 0.2)';
    const gradientClass = accentColor === 'cyan' ? 'gradient-text-tech' : 'gradient-text-legal';

    return (
        <section className="section relative overflow-hidden bg-transparent">
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
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to <span className={gradientClass}>{title}</span>?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
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


// ============================================
// SERVICE FAQ SECTION
// ============================================
export interface ServiceFAQ {
    question: string;
    answer: string;
}

export const ServiceFAQSection = ({ faqs }: { faqs: ServiceFAQ[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="section bg-transparent py-32">
            <div className="container max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-6xl font-light text-white tracking-wide">
                        Got <span className="text-cyan-400 font-normal">Questions</span><span className="text-amber-400">?</span>
                    </h2>
                </motion.div>

                <div className="space-y-0">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="border-b border-white/[0.06] last:border-0"
                        >
                            <button
                                className="w-full py-10 flex items-center justify-between text-left group transition-all duration-300"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={cn(
                                    "text-xl md:text-2xl font-normal tracking-wide pr-8 transition-colors duration-300",
                                    openIndex === index
                                        ? "text-cyan-400"
                                        : index === 0
                                            ? "text-cyan-400 group-hover:text-cyan-300"
                                            : "text-white/90 group-hover:text-white"
                                )}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{
                                        rotate: openIndex === index ? 180 : 0,
                                        scale: openIndex === index ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className={cn(
                                        "w-6 h-6 transition-colors duration-300",
                                        openIndex === index ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"
                                    )} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-12 pt-2 text-gray-400 text-lg leading-relaxed max-w-4xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};



// FULL SERVICE PAGE COMPONENT
// ============================================
export const ServicePage = ({
    heroTitle,
    heroHighlight,
    heroDescription,
    heroAccentColor,
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
