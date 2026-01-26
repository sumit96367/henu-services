'use client';

import { motion } from 'framer-motion';
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
    return (
        <main>

            {/* Hero Section */}
            <section className="pt-32 pb-24 relative" style={{ background: '#050505' }}>
                <div className="grid-background absolute inset-0" />
                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                            <PremiumTextReveal text="Our" /> <span className="gradient-text"><PremiumTextReveal text="Services" delay={0.2} /></span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-8">
                            Comprehensive solutions spanning technology, legal, and finance.
                            Everything you need to build, grow, and protect your business.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            {services.map((category, categoryIndex) => (
                <section
                    key={category.category}
                    className="section"
                    style={{ background: categoryIndex % 2 === 0 ? '#0A0A0A' : '#050505' }}
                >
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}

                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {category.category}
                            </h2>
                            <div
                                className="w-20 h-1 rounded"
                                style={{
                                    background: category.color === 'cyan'
                                        ? 'linear-gradient(90deg, #00D4FF, #007AFF)'
                                        : 'linear-gradient(90deg, #FF9500, #FFB340)'
                                }}
                            />
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.items.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}

                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={service.href}>
                                        <GlowingCard innerClassName="p-14 md:p-20 group cursor-pointer h-full flex flex-col items-start text-left">
                                            <div className="flex items-center gap-6 mb-6">
                                                <div
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shrink-0"
                                                    style={{
                                                        background: category.color === 'cyan'
                                                            ? 'rgba(0, 212, 255, 0.12)'
                                                            : 'rgba(255, 149, 0, 0.12)',
                                                        border: `1px solid ${category.color === 'cyan' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 149, 0, 0.2)'}`
                                                    }}
                                                >
                                                    <service.icon
                                                        size={24}
                                                        className={category.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}
                                                    />
                                                </div>
                                                <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-400 text-lg leading-relaxed mb-auto">
                                                {service.description}
                                            </p>
                                            <div className={`mt-10 flex items-center gap-2 font-bold text-sm uppercase tracking-widest ${category.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                                                } group-hover:gap-4 transition-all opacity-80 group-hover:opacity-100`}>
                                                Explore Service
                                                <ArrowRight size={18} />
                                            </div>
                                        </GlowingCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

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
