'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
    Globe,
    Smartphone,
    Server,
    Bot,
    Megaphone,
    Target,
    FileText,
    Building,
    Coins,
    ArrowRight,
    Twitter,
    Linkedin,
    Github,
    Instagram
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { GlowingCard } from '@/components/ui/glowing-card';
import GalleryHoverGrid from '@/components/ui/gallery-hover-grid';
import { Spotlight } from '@/components/ui/spotlight';

const services = [
    {
        category: 'Core Technology',
        color: 'cyan',
        items: [
            {
                title: 'Website Development',
                description: 'Innovative web solutions powered by HENU OS AI for smarter performance and extreme scalability.',
                icon: Globe,
                href: '/services/web-development'
            },
            {
                title: 'Backend Development',
                description: 'Scalable backend infrastructure with real-time AI and seamless reliability built on HENU OS.',
                icon: Server,
                href: '/services/backend-development'
            },
            {
                title: 'Mobile App Development',
                description: 'Powerful native and cross-platform mobile experiences that users love and businesses rely on.',
                icon: Smartphone,
                href: '/services/mobile-app-development'
            },
            {
                title: 'AI Automations',
                description: 'Automate your workflows with custom HENU AI agents to save time, cut costs, and boost efficiency.',
                icon: Bot,
                href: '/services/ai-automations'
            }
        ]
    },
    {
        category: 'Growth & Design',
        color: 'cyan',
        items: [
            {
                title: 'Graphic Design',
                description: 'Stunning visuals and brand identities infused with modern AI tools for precision and impact.',
                icon: Target, // Or Palette if imported
                href: '/services/graphic-design'
            },
            {
                title: 'Digital Marketing & Ads',
                description: 'Data-backed campaigns across all channels to skyrocket your visibility and sales.',
                icon: Megaphone,
                href: '/services/digital-marketing'
            }
        ]
    },
    {
        category: 'Institutional & Financial',
        color: 'amber',
        items: [
            {
                title: 'Legal Services',
                description: 'Full-spectrum legal support and business compliance for startups and SMEs—India-focused expertise.',
                icon: FileText,
                href: '/services/legal-services'
            },
            {
                title: 'Funding Solutions',
                description: 'Strategic funding paths from government grants to investor pitches to fuel your growth.',
                icon: Coins,
                href: '/services/funding-solutions'
            }
        ]
    }
];

export default function ServicesPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main className="w-full flex flex-col items-center">
            {/* Hero Section */}
            <section
                ref={containerRef}
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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto"
                    >
                        <div className="flex flex-col items-center justify-center mb-12 w-full">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-tight tracking-tighter text-center flex flex-col items-center w-full">
                                <PremiumTextReveal text="Our" className="justify-center" />
                                <span className="gradient-text block">
                                    <PremiumTextReveal text="Services" delay={0.2} className="justify-center" />
                                </span>
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-center mb-12 leading-relaxed font-medium">
                            Comprehensive solutions spanning technology, legal, and finance.
                            Everything you need to build, grow, and protect your business foundation.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
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

            {/* Services Showcase Grid */}
            <div className="w-full pb-32">
                <GalleryHoverGrid
                    heading="Our Expertise"
                    items={[
                        {
                            id: 'web-dev',
                            title: 'Website Development',
                            summary: 'Innovative web solutions powered by HENU OS AI for smarter performance and extreme scalability.',
                            url: '/services/web-development',
                            image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=2070&auto=format&fit=crop'
                        },
                        {
                            id: 'ai-auto',
                            title: 'AI Automations',
                            summary: 'Automate your workflows with custom HENU AI agents to save time, cut costs, and boost efficiency.',
                            url: '/services/ai-automations',
                            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
                        },
                        {
                            id: 'marketing',
                            title: 'Digital Marketing & Ads',
                            summary: 'Data-backed campaigns across all channels to skyrocket your visibility and sales.',
                            url: '/services/digital-marketing',
                            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'
                        },
                        {
                            id: 'graphic',
                            title: 'Graphic Design',
                            summary: 'Stunning visuals and brand identities infused with modern AI tools for precision and impact.',
                            url: '/services/graphic-design',
                            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1964&auto=format&fit=crop'
                        },
                        {
                            id: 'legal',
                            title: 'Legal Services',
                            summary: 'Full-spectrum legal support and business compliance for startups and SMEs—India-focused expertise.',
                            url: '/services/legal-services',
                            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'
                        },
                        {
                            id: 'funding',
                            title: 'Funding Solutions',
                            summary: 'Strategic funding paths from government grants to investor pitches to fuel your growth.',
                            url: '/services/funding-solutions',
                            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop'
                        }
                    ]}
                />
            </div>

            {/* CTA Section */}
            <section className="section relative overflow-hidden" style={{ background: '#050505' }}>
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 60%)'
                    }}
                />
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}

                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Not Sure What You Need?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Let&apos;s have a conversation. We&apos;ll help you identify the right services for your business goals.
                        </p>
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                            Schedule a Free Consultation
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
