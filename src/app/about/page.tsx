'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import {
    Target,
    Eye,
    Heart,
    Rocket,
    Users,
    Award,
    Globe,
    Zap,
    ArrowRight,
    Twitter,
    Linkedin,
    Github,
    Instagram,
    Code2,
    Scale,
    Coins
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';

// Team Members
const teamMembers = [
    {
        name: 'Himanshu Sharma',
        role: 'Founder & CEO',
        bio: 'Visionary leader with 10+ years in tech and entrepreneurship.',
        avatar: 'HS',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        name: 'Priya Mehta',
        role: 'CTO',
        bio: 'Full-stack architect passionate about scalable systems.',
        avatar: 'PM',
        color: 'from-purple-500 to-pink-600'
    },
    {
        name: 'Rajesh Kumar',
        role: 'Head of Legal',
        bio: 'Expert in corporate law and compliance with 15+ years experience.',
        avatar: 'RK',
        color: 'from-amber-500 to-orange-600'
    },
    {
        name: 'Ananya Singh',
        role: 'AI Lead',
        bio: 'ML engineer specializing in LLMs and autonomous agents.',
        avatar: 'AS',
        color: 'from-green-500 to-teal-600'
    },
    {
        name: 'Vikram Patel',
        role: 'Finance Director',
        bio: 'Grant specialist who has secured $50M+ in government funding.',
        avatar: 'VP',
        color: 'from-cyan-500 to-indigo-600'
    },
    {
        name: 'Neha Gupta',
        role: 'Marketing Head',
        bio: 'Digital marketing strategist with proven ROI track record.',
        avatar: 'NG',
        color: 'from-pink-500 to-rose-600'
    }
];

// Values
const values = [
    {
        icon: Target,
        title: 'Excellence',
        description: 'We deliver nothing less than exceptional quality in every project we undertake.'
    },
    {
        icon: Heart,
        title: 'Client First',
        description: 'Your success is our success. We build lasting partnerships, not just products.'
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We embrace cutting-edge technology to solve tomorrow\'s problems today.'
    },
    {
        icon: Users,
        title: 'Collaboration',
        description: 'The best solutions emerge from diverse perspectives working together.'
    }
];

// Journey/Timeline
const timeline = [
    {
        year: '2020',
        title: 'Founded',
        description: 'Henu OS started as a small web development agency in Jodhpur.'
    },
    {
        year: '2021',
        title: 'Expansion',
        description: 'Added mobile development and expanded to 20+ team members.'
    },
    {
        year: '2022',
        title: 'Legal Services',
        description: 'Launched legal documentation and compliance services.'
    },
    {
        year: '2023',
        title: 'AI Division',
        description: 'Pioneered AI agent development with enterprise clients.'
    },
    {
        year: '2024',
        title: 'Grants Program',
        description: 'Crossed $50M in secured government grants for clients.'
    },
    {
        year: '2025',
        title: 'Global Reach',
        description: 'Serving clients across 15+ countries with 200+ projects delivered.'
    }
];



export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[90vh] pb-24 flex items-start overflow-hidden"
                style={{ background: '#050505', paddingTop: '180px' }}
            >
                <div className="absolute inset-0">
                    <div className="grid-background" />
                    <motion.div
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                            filter: 'blur(100px)'
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <motion.div style={{ y, opacity }} className="container relative z-10 flex justify-center">
                    <div className="max-w-6xl w-full flex flex-col items-center text-center">

                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 leading-[1.0] tracking-tighter text-center">
                            <PremiumTextReveal text="Bridging" className="block mb-2 justify-center" />
                            <span className="gradient-text">Technology, Law & Finance</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 max-w-2xl mb-10 text-center"
                        >
                            We are a holistic agency that combines cutting-edge technology development with
                            comprehensive legal and financial services to fuel your business growth.
                        </motion.p>

                        {/* Three Pillars */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-16 max-w-2xl mt-16"
                        >
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300 transform group-hover:scale-110">
                                    <Code2 className="w-6 h-6 text-cyan-400" />
                                </div>
                                <span className="text-white font-semibold tracking-wide">Technology</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300 transform group-hover:scale-110">
                                    <Scale className="w-6 h-6 text-amber-400" />
                                </div>
                                <span className="text-white font-semibold tracking-wide">Legal</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300 transform group-hover:scale-110">
                                    <Coins className="w-6 h-6 text-amber-400" />
                                </div>
                                <span className="text-white font-semibold tracking-wide">Finance</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Mission & Vision */}
            <section className="section bg-transparent">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="h-full"
                        >
                            <GlowingCard className="h-full" innerClassName="p-10 md:p-14">
                                <div className="flex gap-6 group text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                                        <Rocket className="w-7 h-7 text-cyan-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-bold text-white mb-1 leading-tight m-0">
                                            Our <span className="text-cyan-400">Mission</span>
                                        </div>
                                        <div className="text-gray-400 text-lg leading-relaxed font-medium m-0">
                                            To democratize access to enterprise-grade technology, legal services, and
                                            government funding for businesses of all sizes. We believe every entrepreneur
                                            deserves the tools and support to succeed.
                                        </div>
                                    </div>
                                </div>
                            </GlowingCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <GlowingCard className="h-full" innerClassName="p-10 md:p-14">
                                <div className="flex gap-6 group text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg">
                                        <Eye className="w-7 h-7 text-amber-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-bold text-white mb-1 leading-tight m-0">
                                            Our <span className="text-amber-400">Vision</span>
                                        </div>
                                        <div className="text-gray-400 text-lg leading-relaxed font-medium m-0">
                                            To become the most trusted partner for businesses navigating the intersection
                                            of technology and regulations. We envision a world where great ideas are never
                                            held back by bureaucracy or lack of resources.
                                        </div>
                                    </div>
                                </div>
                            </GlowingCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Journey Timeline */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our <span className="gradient-text">Journey</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            From a small agency to a holistic business solutions provider
                        </p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-amber-500 to-cyan-500 opacity-30" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Year Badge */}
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                                        {item.year.slice(2)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <GlowingCard innerClassName="p-10 md:p-14">
                                        <div className="text-cyan-400 text-sm font-bold mb-3 uppercase tracking-widest">{item.year}</div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed font-medium">{item.description}</p>
                                    </GlowingCard>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our <span className="gradient-text">Values</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full group"
                            >
                                <GlowingCard className="h-full" innerClassName="p-10 md:p-12 text-left flex flex-col items-start">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-amber-500/10 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shrink-0">
                                            <value.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white leading-tight">{value.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed font-medium">{value.description}</p>
                                </GlowingCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Meet Our <span className="gradient-text">Team</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The diverse experts behind Henu OS
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full group"
                            >
                                <GlowingCard className="h-full" innerClassName="p-14 text-left flex flex-col items-start">
                                    <div className="flex items-center gap-10 mb-8 w-full">
                                        <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl font-bold text-white shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-white/10 shrink-0`}>
                                            {member.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{member.name}</h3>
                                            <div className="text-cyan-400 font-extrabold text-sm uppercase tracking-[0.2em] mb-0">{member.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed font-medium">{member.bio}</p>
                                </GlowingCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-24 bg-transparent">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">200+</div>
                            <div className="text-gray-400">Projects Delivered</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">50+</div>
                            <div className="text-gray-400">Team Members</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">15+</div>
                            <div className="text-gray-400">Countries Served</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">$50M+</div>
                            <div className="text-gray-400">Funding Secured</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section relative overflow-hidden bg-transparent">
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to <span className="gradient-text">Partner With Us</span>?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Let&apos;s discuss how Henu OS can help accelerate your business growth.
                        </p>
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                            Get in Touch
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main >
    );
}
