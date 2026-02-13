'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { Spotlight } from '@/components/ui/spotlight';
import AIAssistantAnimation from '@/components/ui/ai-assistant-animation';
import CodeEditorAnimation from '@/components/ui/code-editor-animation';
import SystemCoreAnimation from '@/components/ui/system-core-animation';
import {
    Cpu,
    Layers,
    Focus,
    TrendingUp,
    Zap,
    MousePointer2,
    Sparkles,
    Gauge,
    Users,
    Lightbulb,
    ArrowRight,
    X,
    ExternalLink
} from 'lucide-react';

// ============================================
// HERO SECTION
// ============================================
const AboutHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#050505' }}
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Aesthetic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="horizon-grid" />
                <div className="grid-background opacity-20" />

                {/* Ambient Glow */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full flex flex-col items-center justify-center px-6"
            >
                <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    {/* Badge */}


                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter text-center flex flex-col items-center w-full">
                        <PremiumTextReveal text="We Build Systems" className="w-full justify-center" />
                        <span className="gradient-text block w-full text-center">
                            <PremiumTextReveal text="That Matter" delay={0.2} className="w-full justify-center" />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-center"
                    >
                        Engineering-led product studio focused on clarity, performance, and long-term thinking.
                        We don&apos;t just ship code—we architect foundations for your digital future.
                    </motion.p>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/50 to-transparent relative overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white w-full h-1/2"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

// ============================================
// HOW WE THINK SECTION
// ============================================
const HowWeThinkSection = () => {
    const principles = [
        {
            icon: <Cpu className="w-8 h-8 text-purple-400" />,
            title: "Systems Over Features",
            desc: "We don&apos;t add features—we architect systems designed to evolve. Every decision considers scalability, maintainability, and how components interact over time."
        },
        {
            icon: <Focus className="w-8 h-8 text-purple-400" />,
            title: "Clarity First",
            desc: "Simple is hard. We prioritize clear interfaces, straightforward logic, and intentional design over clever abstraction. If it&apos;s confusing, it&apos;s wrong."
        },
        {
            icon: <Layers className="w-8 h-8 text-purple-400" />,
            title: "Engineering-Led Decisions",
            desc: "Technical constraints inform our choices—not the other way around. We build what works, even if it means saying no to trends or surface-level requests."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
            title: "Long-Term Product Vision",
            desc: "We&apos;re not building for next quarter. Every system is designed for years of iteration, growth, and continuous refinement alongside your ambitions."
        }
    ];

    return (
        <section className="w-full flex flex-col items-center bg-transparent py-24 px-6 md:px-12">
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                    style={{ marginBottom: '0.1cm' }}
                >

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 mx-auto">
                        How We <span className="gradient-text">Think</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our approach isn&apos;t defined by process—it&apos;s shaped by principles that drive every decision we make.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {principles.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlowingCard className="h-full" innerClassName="bg-[#0A0A0A] border border-white/5" style={{ padding: 'calc(2rem + 0.3cm)' }}>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </GlowingCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// WHAT WE'RE BUILT TO DO SECTION
// ============================================
const BuiltToDoSection = () => {
    const capabilities = [
        {
            icon: <Zap className="w-5 h-5 text-purple-400" />,
            title: "Product Engineering",
            desc: "Full-stack systems designed to scale with your ambition. Web, mobile, backend—architected as unified platforms."
        },
        {
            icon: <MousePointer2 className="w-5 h-5 text-purple-400" />,
            title: "Experience Architecture",
            desc: "Interfaces built for precision and purpose. Every interaction is deliberate, every layout optimized for clarity."
        },
        {
            icon: <Sparkles className="w-5 h-5 text-purple-400" />,
            title: "Applied AI & Automation",
            desc: "Intelligent systems that remove friction. From autonomous agents to workflow automation, we build AI that works."
        },
        {
            icon: <Gauge className="w-5 h-5 text-purple-400" />,
            title: "Performance Optimization",
            desc: "Speed matters. Load times, response rates, database efficiency—we obsess over milliseconds because results matter."
        }
    ];

    return (
        <section className="w-full flex flex-col items-center bg-transparent relative overflow-hidden py-24 px-6 md:px-12">
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
                {/* Header Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 flex flex-col items-center text-center gap-6 mb-12 md:mb-16"
                >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        What We&apos;re <span className="gradient-text">Built To Do</span>
                    </h2>
                    <p className="max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed mx-auto">
                        Core capabilities, not services. Outcomes, not deliverables. We architect systems that drive real business value.
                    </p>
                </motion.div>

                {/* Product Showcases */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
                    {/* Henu OS */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlowingCard innerClassName="p-0 overflow-hidden bg-[#0A0A0A] border border-white/5">
                            <div className="grid md:grid-cols-2 gap-0 items-center">
                                <div className="relative h-80 md:h-96">
                                    <div className="absolute inset-0 bg-purple-500/10 blur-[80px]" />
                                    <div className="relative z-10 w-full h-full p-8">
                                        <SystemCoreAnimation />
                                    </div>
                                </div>
                                <div className="p-8 md:p-12">
                                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                        HENU <span className="gradient-text">OS</span>
                                    </h3>
                                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8">
                                        The core ecosystem that powers Henu&apos;s digital products. The foundational operating layer for automation, scalability, and system-level intelligence.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="https://henuos.netlify.app/" className="btn-primary group w-full sm:w-auto">
                                            Explore Henu OS
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </GlowingCard>
                    </motion.div>

                    {/* Henu IDE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlowingCard innerClassName="p-0 overflow-hidden bg-[#0A0A0A] border border-white/5">
                            <div className="grid md:grid-cols-2 gap-0 items-center">
                                <div className="p-8 md:p-12 md:order-1 order-2">
                                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                        HENU <span className="gradient-text">IDE</span>
                                    </h3>
                                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8">
                                        A next-generation development environment that combines a clean coding workspace with an integrated voice assistant for faster, smarter coding.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="https://henuos.netlify.app/" className="btn-primary group w-full sm:w-auto">
                                            Explore Henu IDE
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative h-80 md:h-96 md:order-2 order-1">
                                    <div className="absolute inset-0 bg-purple-500/10 blur-[80px]" />
                                    <div className="relative z-10 w-full h-full p-8">
                                        <CodeEditorAnimation />
                                    </div>
                                </div>
                            </div>
                        </GlowingCard>
                    </motion.div>

                    {/* Henu PA+++ */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlowingCard innerClassName="p-0 overflow-hidden bg-[#0A0A0A] border border-white/5">
                            <div className="grid md:grid-cols-2 gap-0 items-center">
                                <div className="relative h-80 md:h-96">
                                    <div className="absolute inset-0 bg-indigo-500/10 blur-[80px]" />
                                    <div className="relative z-10 w-full h-full p-8">
                                        <AIAssistantAnimation />
                                    </div>
                                </div>
                                <div className="p-8 md:p-12">
                                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                        HENU <span className="gradient-text">PA+++</span>
                                    </h3>
                                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8">
                                        An intelligent personal assistant that simplifies daily digital tasks through natural interaction, adapting over time to reduce decision fatigue.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="https://henuos.netlify.app/" className="btn-primary group w-full sm:w-auto">
                                            Explore Henu PA+++
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </GlowingCard>
                    </motion.div>
                </div>

                {/* 4-Column Feature Grid */}
                <div className="relative mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mt-16 md:mt-24">
                    {capabilities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div >
                    ))}
                </div >
            </div >
        </section >
    );
};


// ============================================
// WHAT WE DON'T DO SECTION
// ============================================
const WhatWeDontDoSection = () => {
    const items = [
        { title: "Chase Trends", desc: "We don&apos;t rebuild your app because a new framework launched. Technology serves the product—not the other way around." },
        { title: "Ship Rushed Work", desc: "Fast doesn&apos;t mean reckless. We optimize for speed without compromising quality, testing, or long-term maintainability." },
        { title: "Build Bloated Interfaces", desc: "If a feature doesn&apos;t serve a clear purpose, it doesn&apos;t ship. Clean systems beat feature lists." },
        { title: "Sell You What You Don&apos;t Need", desc: "We&apos;ll tell you when a simple solution beats a complex one. Honest guidance over maximizing billable hours." },
        { title: "Work Without Strategy", desc: "Code without context is just noise. Every build aligns with your business goals and product vision." },
        { title: "Ignore Performance", desc: "Slow products lose users. We don&apos;t ship anything that compromises speed, responsiveness, or reliability." }
    ];

    return (
        <section className="w-full flex flex-col items-center bg-transparent py-24 px-6 md:px-12">
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                    style={{ marginBottom: '0.1cm' }}
                >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        What We <span className="text-red-500">Don&apos;t Do</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                        Honesty over opportunity. These are the lines we draw to ensure we deliver high-quality, high-performance systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <GlowingCard className="h-full" innerClassName="flex flex-col items-center text-center group bg-[#0A0A0A] border border-white/5" style={{ padding: '0.2cm' }}>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h3>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlowingCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// WHO WE'RE BEST FOR SECTION
// ============================================
const WhoWereBestForSection = () => {
    const audiences = [
        {
            icon: <Users className="w-8 h-8 text-purple-400" />,
            title: "Technical Founders",
            desc: "You understand the importance of engineering decisions and want a partner who speaks your language—not someone who just executes tickets."
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-purple-400" />,
            title: "Product-Driven Teams",
            desc: "You care about craft, performance, and building something that lasts. You're not looking for shortcuts—you're building a competitive advantage."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
            title: "Growth Companies",
            desc: "You've proven the concept. Now you need systems that scale, technical debt resolved, and infrastructure that supports rapid expansion."
        }
    ];

    return (
        <section className="w-full flex flex-col items-center bg-transparent py-24 px-6 md:px-12">
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                    style={{ marginBottom: '0.1cm' }}
                >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Who We&apos;re <span className="text-indigo-400">Best For</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                        We work best with founders and teams who think long-term and value technical excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {audiences.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlowingCard className="h-full" innerClassName="flex flex-col items-center text-center group bg-[#0A0A0A] border border-white/5" style={{ padding: '0.2cm' }}>
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/5">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlowingCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-white/5 text-center w-full"
                >
                    <p className="text-gray-500 italic text-lg">
                        <strong className="text-white not-italic">Not a fit?</strong> If you prioritize optics over outcomes or need work yesterday without planning—we&apos;re not the right partner.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// JOURNEY SECTION
// ============================================
const JourneySection = () => {
    const steps = [
        {
            number: "01",
            title: "Discovery & Strategy",
            desc: "We map your vision to technical reality. Requirements definition, architecture planning, and strategic roadmapping."
        },
        {
            number: "02",
            title: "Build & Iterate",
            desc: "Disciplined execution with continuous feedback. We ship incrementally, test rigorously, and refine based on real usage."
        },
        {
            number: "03",
            title: "Scale & Evolve",
            desc: "Performance optimization, infrastructure scaling, and continuous system improvement as your product grows."
        }
    ];

    return (
        <section className="w-full flex flex-col items-center bg-transparent py-24 px-6 md:px-12">
            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        From <span className="text-purple-400">Idea</span> to <span className="text-indigo-400">System</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
                        We don&apos;t just build products—we help you establish technical foundations that evolve with your vision.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="relative flex flex-col items-center"
                            >
                                <div className="text-5xl font-black text-purple-500/20 mb-4">{step.number}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed mx-auto max-w-xs">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
    return (
        <section className="w-full flex flex-col items-center bg-transparent relative overflow-hidden py-24 px-6 md:px-12">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to build something that matters?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        If this resonates, let&apos;s talk about what you&apos;re building.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="btn-primary group">
                            Start a Conversation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="https://henuos.netlify.app/" target="_blank" className="btn-secondary group">
                            Explore Henu OS
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function AboutPage() {
    return (
        <main className="relative">
            <AboutHero />
            <HowWeThinkSection />
            <BuiltToDoSection />
            <WhatWeDontDoSection />
            <WhoWereBestForSection />
            <JourneySection />
            <CTASection />
        </main>
    );
}
