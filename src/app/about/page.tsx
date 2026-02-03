'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { Spotlight } from '@/components/ui/spotlight';
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
                        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
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
                        background: 'radial-gradient(circle, rgba(255, 149, 0, 0.12) 0%, transparent 70%)',
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


                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.0] tracking-tighter text-center flex flex-col items-center w-full">
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
                        We don't just ship code—we architect foundations for your digital future.
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
                    <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent relative overflow-hidden">
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
            icon: <Cpu className="w-8 h-8 text-cyan-400" />,
            title: "Systems Over Features",
            desc: "We don't add features—we architect systems designed to evolve. Every decision considers scalability, maintainability, and how components interact over time."
        },
        {
            icon: <Focus className="w-8 h-8 text-cyan-400" />,
            title: "Clarity First",
            desc: "Simple is hard. We prioritize clear interfaces, straightforward logic, and intentional design over clever abstraction. If it's confusing, it's wrong."
        },
        {
            icon: <Layers className="w-8 h-8 text-cyan-400" />,
            title: "Engineering-Led Decisions",
            desc: "Technical constraints inform our choices—not the other way around. We build what works, even if it means saying no to trends or surface-level requests."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
            title: "Long-Term Product Vision",
            desc: "We're not building for next quarter. Every system is designed for years of iteration, growth, and continuous refinement alongside your ambitions."
        }
    ];

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent px-6">
            <div className="container mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col items-center text-center"
                >

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 mx-auto">
                        How We <span className="gradient-text">Think</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our approach isn't defined by process—it's shaped by principles that drive every decision we make.
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
                            <GlowingCard className="h-full" innerClassName="p-10 md:p-14">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
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
            icon: <Zap className="w-5 h-5 text-cyan-400" />,
            title: "Product Engineering",
            desc: "Full-stack systems designed to scale with your ambition. Web, mobile, backend—architected as unified platforms."
        },
        {
            icon: <MousePointer2 className="w-5 h-5 text-cyan-400" />,
            title: "Experience Architecture",
            desc: "Interfaces built for precision and purpose. Every interaction is deliberate, every layout optimized for clarity."
        },
        {
            icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
            title: "Applied AI & Automation",
            desc: "Intelligent systems that remove friction. From autonomous agents to workflow automation, we build AI that works."
        },
        {
            icon: <Gauge className="w-5 h-5 text-cyan-400" />,
            title: "Performance Optimization",
            desc: "Speed matters. Load times, response rates, database efficiency—we obsess over milliseconds because results matter."
        }
    ];

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent relative overflow-hidden px-6">
            <div className="container mx-auto space-y-12 flex flex-col items-center">
                {/* Header Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 flex flex-col items-center text-center gap-6 mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        What We're <span className="gradient-text">Built To Do</span>
                    </h2>
                    <p className="max-w-2xl text-lg text-gray-400 leading-relaxed mx-auto">
                        Core capabilities, not services. Outcomes, not deliverables. We architect systems that drive real business value.
                    </p>
                </motion.div>

                {/* Dashboard UI Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl"
                >
                    <GlowingCard innerClassName="p-0 overflow-hidden">
                        <div className="relative bg-[#0a0a0a] py-10 px-12 md:py-16 md:px-24">
                            {/* Gradient overlay */}
                            <div className="bg-gradient-to-t from-[#050505] via-transparent to-transparent absolute inset-0 z-30 pointer-events-none"></div>

                            {/* Henu OS Project Dashboard */}
                            <div className="relative z-10 flex flex-col gap-10">
                                {/* Top Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                            <span className="text-white text-lg font-bold">H</span>
                                        </div>
                                        <div>
                                            <span className="text-white font-semibold text-xl">Henu OS</span>
                                            <span className="text-gray-500 text-sm ml-3">Project Dashboard</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                                            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="text-sm text-gray-400">3 Active Builds</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-base font-bold text-white">S</div>
                                    </div>
                                </div>

                                {/* Main Grid */}
                                <div className="grid grid-cols-12 gap-10">
                                    {/* Left - Project Cards */}
                                    <div className="col-span-8 flex flex-col gap-8">
                                        {/* Stats Row */}
                                        <div className="grid grid-cols-4 gap-6">
                                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                                        <div className="w-5 h-5 rounded bg-cyan-400"></div>
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-bold text-white">24</div>
                                                <div className="text-sm text-gray-500 uppercase mt-1">Active Projects</div>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                        <div className="w-5 h-5 rounded bg-green-400"></div>
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-bold text-white">156</div>
                                                <div className="text-sm text-gray-500 uppercase mt-1">Completed</div>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                                        <div className="w-5 h-5 rounded bg-amber-400"></div>
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-bold text-white">8</div>
                                                <div className="text-sm text-gray-500 uppercase mt-1">AI Agents</div>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                                        <div className="w-5 h-5 rounded bg-purple-400"></div>
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-bold text-white">₹2.4Cr</div>
                                                <div className="text-sm text-gray-500 uppercase mt-1">Funding Secured</div>
                                            </div>
                                        </div>

                                        {/* Active Projects */}
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="flex justify-between items-center mb-5">
                                                <span className="text-lg text-white font-medium">Active Projects</span>
                                                <span className="text-sm text-cyan-400 cursor-pointer hover:text-cyan-300">View All →</span>
                                            </div>
                                            <div className="space-y-4">
                                                <motion.div
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                                                        <span className="text-sm text-cyan-400 font-semibold">WEB</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-base text-white font-medium truncate">E-Commerce Platform</div>
                                                        <div className="text-sm text-gray-500">Next.js + Stripe + Supabase</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                                                            <motion.div className="h-full bg-cyan-400 rounded-full" initial={{ width: 0 }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                                                        </div>
                                                        <span className="text-sm text-gray-400 w-10">75%</span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                                                        <span className="text-sm text-amber-400 font-semibold">AI</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-base text-white font-medium truncate">Customer Support Agent</div>
                                                        <div className="text-sm text-gray-500">GPT-4 + LangChain + RAG</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                                                            <motion.div className="h-full bg-amber-400 rounded-full" initial={{ width: 0 }} whileInView={{ width: "90%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} />
                                                        </div>
                                                        <span className="text-sm text-gray-400 w-10">90%</span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                                                        <span className="text-sm text-green-400 font-semibold">APP</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-base text-white font-medium truncate">FinTech Mobile App</div>
                                                        <div className="text-sm text-gray-500">React Native + Node.js</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                                                            <motion.div className="h-full bg-green-400 rounded-full" initial={{ width: 0 }} whileInView={{ width: "40%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
                                                        </div>
                                                        <span className="text-sm text-gray-400 w-10">40%</span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                                                        <span className="text-sm text-purple-400 font-semibold">SYS</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-base text-white font-medium truncate">Legal Compliance System</div>
                                                        <div className="text-sm text-gray-500">Python + FastAPI + PostgreSQL</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                                                            <motion.div className="h-full bg-purple-400 rounded-full" initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
                                                        </div>
                                                        <span className="text-sm text-gray-400 w-10">60%</span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Right Column */}
                                    <div className="col-span-4 flex flex-col gap-8">
                                        {/* Services Breakdown */}
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="text-lg text-white font-medium mb-5">Services</div>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-gray-400">Web Development</span>
                                                        <span className="text-sm text-cyan-400 font-medium">45%</span>
                                                    </div>
                                                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                                                        <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: "45%" }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-gray-400">AI Automation</span>
                                                        <span className="text-sm text-amber-400 font-medium">30%</span>
                                                    </div>
                                                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                                                        <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: "30%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-gray-400">Mobile Apps</span>
                                                        <span className="text-sm text-green-400 font-medium">25%</span>
                                                    </div>
                                                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                                                        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: "25%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Agent Status */}
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-5">
                                                <span className="text-lg text-white font-medium">AI Agents</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                                                    <span className="text-sm text-green-400">Online</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-xl">🤖</div>
                                                    <div className="flex-1">
                                                        <div className="text-base text-white">Support Bot</div>
                                                        <div className="text-sm text-gray-500">2.4K queries/day</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
                                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">⚡</div>
                                                    <div className="flex-1">
                                                        <div className="text-base text-white">Lead Qualifier</div>
                                                        <div className="text-sm text-gray-500">89% accuracy</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">📊</div>
                                                    <div className="flex-1">
                                                        <div className="text-base text-white">Data Analyzer</div>
                                                        <div className="text-sm text-gray-500">Processing...</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </GlowingCard>
                </motion.div>

                {/* 4-Column Feature Grid */}
                <div className="relative mx-auto grid grid-cols-2 gap-x-12 gap-y-12 lg:grid-cols-4 mt-16 md:mt-24">
                    {capabilities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                {item.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// ============================================
// WHAT WE DON'T DO SECTION
// ============================================
const WhatWeDontDoSection = () => {
    const items = [
        { title: "Chase Trends", desc: "We don't rebuild your app because a new framework launched. Technology serves the product—not the other way around." },
        { title: "Ship Rushed Work", desc: "Fast doesn't mean reckless. We optimize for speed without compromising quality, testing, or long-term maintainability." },
        { title: "Build Bloated Interfaces", desc: "If a feature doesn't serve a clear purpose, it doesn't ship. Clean systems beat feature lists." },
        { title: "Sell You What You Don't Need", desc: "We'll tell you when a simple solution beats a complex one. Honest guidance over maximizing billable hours." },
        { title: "Work Without Strategy", desc: "Code without context is just noise. Every build aligns with your business goals and product vision." },
        { title: "Ignore Performance", desc: "Slow products lose users. We don't ship anything that compromises speed, responsiveness, or reliability." }
    ];

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent px-6">
            <div className="container mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-col items-center text-center"
                >

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 mx-auto">
                        What We <span className="text-red-400">Don't Do</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Honesty over opportunity. These are the lines we draw to ensure we deliver high-quality, high-performance systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="flex flex-col items-center text-center p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform">
                                <X className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
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
            icon: <Users className="w-7 h-7 text-cyan-400" />,
            title: "Technical Founders",
            desc: "You understand the importance of engineering decisions and want a partner who speaks your language—not someone who just executes tickets."
        },
        {
            icon: <Lightbulb className="w-7 h-7 text-cyan-400" />,
            title: "Product-Driven Teams",
            desc: "You care about craft, performance, and building something that lasts. You're not looking for shortcuts—you're building a competitive advantage."
        },
        {
            icon: <TrendingUp className="w-7 h-7 text-cyan-400" />,
            title: "Growth-Stage Companies",
            desc: "You've proven the concept. Now you need systems that scale, technical debt resolved, and infrastructure that supports rapid expansion."
        }
    ];

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent px-6">
            <div className="container mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <div className="text-center mb-12">

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Who We're <span className="text-amber-400">Best For</span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            We work best with founders and teams who think long-term.
                        </p>
                    </div>

                    <GlowingCard innerClassName="p-8 md:p-12 w-full max-w-4xl">
                        <div className="space-y-8">
                            {audiences.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                                        {item.icon}
                                    </div>
                                    <div className="max-w-xl">
                                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="pt-6 border-t border-white/10 text-center">
                                <p className="text-gray-500 italic">
                                    <strong className="text-white">Not a fit?</strong> If you're chasing trends, need work yesterday
                                    without planning, or prioritize optics over outcomes—we're probably not the right partner.
                                </p>
                            </div>
                        </div>
                    </GlowingCard>
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
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent px-6">
            <div className="container mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        From <span className="text-cyan-400">Idea</span> to <span className="text-amber-400">System</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
                        We don't just build products—we help you establish technical foundations that evolve with your vision.
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
                                <div className="text-5xl font-black text-cyan-500/20 mb-4">{step.number}</div>
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
        <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="w-full flex flex-col items-center bg-transparent px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
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
                        If this resonates, let's talk about what you're building.
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
