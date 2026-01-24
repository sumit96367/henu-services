'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import {
    ArrowRight,
    Check,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';

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
            className="relative min-h-[80vh] pt-48 pb-24 flex items-center overflow-hidden bg-transparent"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="grid-background" />
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
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
import { FeaturesSectionWithHoverEffects, FeatureItem } from '@/components/ui/feature-section-with-hover-effects';

export const ServiceFeatures = ({ features, accentColor }: { features: ServiceFeature[]; accentColor: 'cyan' | 'amber' }) => {
    // Transform ServiceFeature[] to FeatureItem[] for the hover effects component
    const featureItems: FeatureItem[] = features.map(f => ({
        title: f.title,
        description: f.description,
        icon: f.icon
    }));

    return (
        <section className="section bg-transparent">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        What We <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-center">
                        Comprehensive solutions tailored to your business needs
                    </p>
                </motion.div>

                <FeaturesSectionWithHoverEffects
                    features={featureItems}
                    accentColor={accentColor}
                />
            </div>
        </section>
    );
};

// ============================================
// PROCESS SECTION
// ============================================
export const ServiceProcess = ({ process, accentColor }: { process: ServiceProcess[]; accentColor: 'cyan' | 'amber' }) => {
    const lineColor = accentColor === 'cyan' ? 'bg-cyan-500' : 'bg-amber-500';
    const stepBg = accentColor === 'cyan' ? 'from-cyan-500 to-cyan-600' : 'from-amber-500 to-amber-600';

    return (
        <section id="process" className="section bg-transparent">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="gradient-text">Process</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-center">
                        A proven methodology that delivers results
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px ${lineColor} opacity-20`} />

                    {process.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Step Number */}
                            <div className="flex-shrink-0 relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stepBg} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                                    {step.step}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <GlowingCard innerClassName={`p-12 md:p-16 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{step.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-medium">{step.description}</p>
                                </GlowingCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// TECHNOLOGIES SECTION
// ============================================
export const ServiceTechnologies = ({ technologies }: { technologies: ServiceTech[] }) => {
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

                <div className="flex flex-wrap justify-center gap-6">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <GlowingCard innerClassName="px-12 py-8 md:px-16 md:py-10 flex items-center gap-6 hover:scale-105 transition-transform duration-300">
                                {tech.icon && <div className="text-gray-400">{tech.icon}</div>}
                                <span className="text-white font-medium">{tech.name}</span>
                            </GlowingCard>
                        </motion.div>
                    ))}
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

            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to <span className={gradientClass}>{title}</span>?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 mx-auto text-center">
                        {description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
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
// WHY CHOOSE US SECTION
// ============================================
const whyChooseUs = [
    "10+ years of industry experience",
    "100% transparency in development process",
    "Dedicated project manager for each project",
    "24/7 support and maintenance",
    "Agile development methodology",
    "Competitive pricing"
];

export const WhyChooseUs = () => {
    return (
        <section className="section bg-transparent">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why Choose <span className="gradient-text">Henu OS</span>?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            We combine technical excellence with business acumen to deliver solutions that drive real results.
                        </p>
                        <ul className="space-y-4">
                            {whyChooseUs.map((item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-gray-300">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative space-y-6"
                    >
                        <GlowingCard innerClassName="p-14 md:p-22">
                            <div className="text-7xl font-bold gradient-text mb-6">200+</div>
                            <div className="text-2xl text-white font-bold mb-3 tracking-tight">Projects Delivered</div>
                            <div className="text-gray-400 text-lg leading-relaxed font-medium">Across web, mobile, AI, and enterprise solutions</div>
                        </GlowingCard>
                        <div className="ml-12">
                            <GlowingCard innerClassName="p-14 md:p-22">
                                <div className="text-7xl font-bold gradient-text mb-6">98%</div>
                                <div className="text-2xl text-white font-bold mb-3 tracking-tight">Client Satisfaction</div>
                                <div className="text-gray-400 text-lg leading-relaxed font-medium">Based on post-project surveys</div>
                            </GlowingCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};



// ============================================
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
            <WhyChooseUs />
            <ServiceCTA
                title={ctaTitle}
                description={ctaDescription}
                accentColor={heroAccentColor}
            />
        </main>
    );
};
