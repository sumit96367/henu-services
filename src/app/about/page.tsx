'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GlowingCard } from '@/components/ui/glowing-card';
import ASMRStaticBackground from '@/components/ui/asmr-background';
import {
    Cpu,
    Layers,
    Focus,
    TrendingUp,
    Wrench,
    Sparkles,
    Gauge,
    Target,
    XCircle,
    Users,
    Lightbulb,
    ArrowRight
} from 'lucide-react';

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main className="relative bg-black">
            {/* Hero Section - Bold, No Buttons */}
            <section
                ref={heroRef}
                className="relative min-h-[85vh] pb-24 flex items-center overflow-hidden"
                style={{ paddingTop: '140px' }}
            >
                {/* ASMR Particle Background - Hero Only */}
                <div className="absolute inset-0">
                    <ASMRStaticBackground />
                </div>

                <motion.div style={{ y, opacity }} className="container relative z-10">
                    <div className="max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
                        >
                            We Build Systems<br />That <span className="text-cyan-400">Matter</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-2xl text-gray-400 max-w-3xl leading-relaxed"
                        >
                            Engineering-led product studio focused on clarity, performance, and long-term thinking.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* How We Think */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            How We <span className="text-cyan-400">Think</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl">
                            Our approach isn't defined by process—it's shaped by principles.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <GlowingCard className="h-full" innerClassName="p-12">
                                <Cpu className="w-10 h-10 text-cyan-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Systems Over Features</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    We don't add features—we architect systems designed to evolve. Every decision considers
                                    scalability, maintainability, and how components interact over time.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlowingCard className="h-full" innerClassName="p-12">
                                <Focus className="w-10 h-10 text-cyan-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Clarity First</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Simple is hard. We prioritize clear interfaces, straightforward logic, and intentional
                                    design over clever abstraction. If it's confusing, it's wrong.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <GlowingCard className="h-full" innerClassName="p-12">
                                <Layers className="w-10 h-10 text-cyan-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Engineering-Led Decisions</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Technical constraints inform our choices—not the other way around. We build what works,
                                    even if it means saying no to trends or surface-level requests.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlowingCard className="h-full" innerClassName="p-12">
                                <TrendingUp className="w-10 h-10 text-cyan-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Long-Term Product Vision</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    We're not building for next quarter. Every system is designed for years of iteration,
                                    growth, and continuous refinement alongside your ambitions.
                                </p>
                            </GlowingCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We're Built To Do */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            What We're <span className="text-cyan-400">Built To Do</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl">
                            Core capabilities, not services. Outcomes, not deliverables.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlowingCard innerClassName="p-12">
                                <Wrench className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Product Engineering</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Full-stack systems designed to scale with your ambition. Web, mobile, backend—architected
                                    as unified platforms, not disconnected projects.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlowingCard innerClassName="p-12">
                                <Target className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Experience Architecture</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Interfaces built for precision and purpose. Every interaction is deliberate, every
                                    layout optimized for clarity and conversion.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlowingCard innerClassName="p-12">
                                <Sparkles className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Applied AI & Automation</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Intelligent systems that remove friction. From autonomous agents to workflow automation,
                                    we build AI that works—not experiments.
                                </p>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlowingCard innerClassName="p-12">
                                <Gauge className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Performance Optimization</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Speed matters. Load times, response rates, database efficiency—we obsess over milliseconds
                                    because your users notice.
                                </p>
                            </GlowingCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Who We're Best For */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-3xl mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Who We're <span className="text-cyan-400">Best For</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-xl text-gray-400 max-w-3xl mb-16"
                    >
                        Not everyone. We work best with people who value craft, think long-term, and understand
                        that great products require both vision and discipline.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <GlowingCard innerClassName="p-12 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.02, x: 8 }}
                                className="flex gap-6 group cursor-default"
                            >
                                <Users className="w-8 h-8 text-cyan-400 shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
                                <div>
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400"
                                        whileHover={{ x: 4 }}
                                    >
                                        Technical Founders
                                    </motion.h3>
                                    <p className="text-gray-400 text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                        You understand the importance of engineering decisions and want a partner who
                                        speaks your language—not someone who just executes tickets.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.02, x: 8 }}
                                className="flex gap-6 group cursor-default"
                            >
                                <Lightbulb className="w-8 h-8 text-cyan-400 shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
                                <div>
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400"
                                        whileHover={{ x: 4 }}
                                    >
                                        Product-Driven Teams
                                    </motion.h3>
                                    <p className="text-gray-400 text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                        You care about craft, performance, and building something that lasts. You're not
                                        looking for shortcuts—you're building a competitive advantage.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.02, x: 8 }}
                                className="flex gap-6 group cursor-default"
                            >
                                <TrendingUp className="w-8 h-8 text-cyan-400 shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
                                <div>
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400"
                                        whileHover={{ x: 4 }}
                                    >
                                        Growth-Stage Companies
                                    </motion.h3>
                                    <p className="text-gray-400 text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                        You've proven the concept. Now you need systems that scale, technical debt resolved,
                                        and infrastructure that supports rapid expansion.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.95 }}
                                className="pt-6 border-t border-white/10"
                            >
                                <p className="text-gray-500 italic">
                                    <strong className="text-white">Not a fit?</strong> If you're chasing trends, need work yesterday
                                    without planning, or prioritize optics over outcomes—we're probably not the right partner.
                                </p>
                            </motion.div>
                        </GlowingCard>
                    </motion.div>
                </div>
            </section>

            {/* Our Role in Your Journey */}
            <section className="section bg-transparent">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-5xl md:text-6xl font-bold text-white mb-8"
                        >
                            From <span className="text-cyan-400">Idea</span> to <span className="text-amber-400">System</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                        >
                            We don't just build products—we help you establish technical foundations that evolve with your vision.
                            Whether you're at concept stage or scaling fast, we meet you where you are and architect what comes next.
                        </motion.p>

                        <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                className="group cursor-default"
                            >
                                <motion.div
                                    className="text-4xl font-bold text-cyan-400/40 mb-4 transition-all duration-300 group-hover:text-cyan-400/70"
                                    whileHover={{ scale: 1.15, x: 4 }}
                                >
                                    01
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400">
                                    Discovery & Strategy
                                </h3>
                                <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                    We map your vision to technical reality. Requirements definition, architecture planning,
                                    and strategic roadmapping.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                className="group cursor-default"
                            >
                                <motion.div
                                    className="text-4xl font-bold text-cyan-400/40 mb-4 transition-all duration-300 group-hover:text-cyan-400/70"
                                    whileHover={{ scale: 1.15, x: 4 }}
                                >
                                    02
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400">
                                    Build & Iterate
                                </h3>
                                <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                    Disciplined execution with continuous feedback. We ship incrementally, test rigorously,
                                    and refine based on real usage.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                className="group cursor-default"
                            >
                                <motion.div
                                    className="text-4xl font-bold text-cyan-400/40 mb-4 transition-all duration-300 group-hover:text-cyan-400/70"
                                    whileHover={{ scale: 1.15, x: 4 }}
                                >
                                    03
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400">
                                    Scale & Evolve
                                </h3>
                                <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                    Performance optimization, infrastructure scaling, and continuous system improvement as
                                    your product grows.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA - Keep it subtle */}
            <section className="section relative overflow-hidden bg-transparent pb-32">
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <p className="text-2xl text-gray-400 mb-8">
                            If this resonates, let's talk about what you're building.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 text-cyan-400 text-lg font-semibold hover:gap-5 transition-all duration-300 group"
                        >
                            Start a Conversation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
