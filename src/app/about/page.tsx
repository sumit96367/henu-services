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
        <main className="relative">
            {/* ASMR Particle Background */}
            <ASMRStaticBackground />

            {/* Hero Section - Bold, No Buttons */}
            <section
                ref={heroRef}
                className="relative min-h-[85vh] pb-24 flex items-center overflow-hidden"
                style={{ paddingTop: '140px' }}
            >
                <div className="absolute inset-0">
                    <div className="grid-background" />
                    <motion.div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
                            filter: 'blur(120px)'
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            x: [-10, 10, -10]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
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

            {/* What We Don't Do */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            What We <span className="text-red-400">Don't Do</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Honesty over opportunity. These are the lines we draw.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Chase Trends", desc: "We don't rebuild your app because a new framework launched. Technology serves the product—not the other way around." },
                            { title: "Ship Rushed Work", desc: "Fast doesn't mean reckless. We optimize for speed without compromising quality, testing, or long-term maintainability." },
                            { title: "Build Bloated Interfaces", desc: "If a feature doesn't serve a clear purpose, it doesn't ship. Clean systems beat feature lists." },
                            { title: "Sell You What You Don't Need", desc: "We'll tell you when a simple solution beats a complex one. Honest guidance over maximizing billable hours." },
                            { title: "Work Without Strategy", desc: "Code without context is just noise. Every build aligns with your business goals and product vision." },
                            { title: "Ignore Performance", desc: "Slow products lose users. We don't ship anything that compromises speed, responsiveness, or reliability." }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="p-8 border border-white/10 rounded-xl hover:border-red-400/30 transition-colors bg-white/[0.02]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
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
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
                            Who We're <span className="text-cyan-400">Best For</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 text-center">
                            We work best with founders and teams who think long-term.
                        </p>

                        <GlowingCard innerClassName="p-12 md:p-16">
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <Users className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Technical Founders</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            You understand the importance of engineering decisions and want a partner who
                                            speaks your language—not someone who just executes tickets.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <Lightbulb className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Product-Driven Teams</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            You care about craft, performance, and building something that lasts. You're not
                                            looking for shortcuts—you're building a competitive advantage.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <TrendingUp className="w-8 h-8 text-cyan-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Growth-Stage Companies</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">
                                            You've proven the concept. Now you need systems that scale, technical debt resolved,
                                            and infrastructure that supports rapid expansion.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
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

            {/* Our Role in Your Journey */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            From <span className="text-cyan-400">Idea</span> to <span className="text-amber-400">System</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                            We don't just build products—we help you establish technical foundations that evolve with your vision.
                            Whether you're at concept stage or scaling fast, we meet you where you are and architect what comes next.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="text-4xl font-bold text-cyan-400/40 mb-4">01</div>
                                <h3 className="text-2xl font-bold text-white mb-3">Discovery & Strategy</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    We map your vision to technical reality. Requirements definition, architecture planning,
                                    and strategic roadmapping.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-4xl font-bold text-cyan-400/40 mb-4">02</div>
                                <h3 className="text-2xl font-bold text-white mb-3">Build & Iterate</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Disciplined execution with continuous feedback. We ship incrementally, test rigorously,
                                    and refine based on real usage.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="text-4xl font-bold text-cyan-400/40 mb-4">03</div>
                                <h3 className="text-2xl font-bold text-white mb-3">Scale & Evolve</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Performance optimization, infrastructure scaling, and continuous system improvement as
                                    your product grows.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
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
