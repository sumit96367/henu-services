'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
    ExternalLink,
    ArrowRight,
    Globe,
    Smartphone,
    Bot,
    Megaphone,
    Scale,
    Coins,
    Filter,
    X,
    Twitter,
    Linkedin,
    Github,
    Instagram
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { GlowingCard } from '@/components/ui/glowing-card';
import { AnimatedLetterText } from '@/components/ui/potfolio-text';

// Project Categories
const categories = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'web', name: 'Web Development', icon: Globe },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'ai', name: 'AI & Automation', icon: Bot },
    { id: 'marketing', name: 'Digital Marketing', icon: Megaphone },
    { id: 'legal', name: 'Legal & Compliance', icon: Scale },
    { id: 'funding', name: 'Grants & Funding', icon: Coins },
];

// Projects Data
const projects = [
    {
        id: 1,
        title: 'FinServe Pro Dashboard',
        category: 'web',
        description: 'Enterprise financial dashboard with real-time analytics and AI-powered insights.',
        image: '/projects/finserve.jpg',
        tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
        color: 'from-blue-500 to-cyan-500',
        stats: { metric: '40%', label: 'Efficiency Increase' }
    },
    {
        id: 2,
        title: 'HealthMate Mobile App',
        category: 'mobile',
        description: 'Cross-platform health tracking app with telemedicine integration.',
        image: '/projects/healthmate.jpg',
        tags: ['React Native', 'Firebase', 'HealthKit'],
        color: 'from-green-500 to-emerald-500',
        stats: { metric: '100K+', label: 'Downloads' }
    },
    {
        id: 3,
        title: 'AutoSupport AI Agent',
        category: 'ai',
        description: 'Intelligent customer support agent that reduced response time by 80%.',
        image: '/projects/autosupport.jpg',
        tags: ['GPT-4', 'LangChain', 'Python'],
        color: 'from-purple-500 to-pink-500',
        stats: { metric: '80%', label: 'Faster Response' }
    },
    {
        id: 4,
        title: 'GreenTech Campaign',
        category: 'marketing',
        description: 'Multi-channel digital campaign that achieved 500% ROAS.',
        image: '/projects/greentech.jpg',
        tags: ['Meta Ads', 'Google Ads', 'SEO'],
        color: 'from-orange-500 to-red-500',
        stats: { metric: '500%', label: 'ROAS' }
    },
    {
        id: 5,
        title: 'TechStart Incorporation',
        category: 'legal',
        description: 'Complete company setup including registration, compliance, and trademark.',
        image: '/projects/techstart.jpg',
        tags: ['Pvt Ltd', 'Trademark', 'Compliance'],
        color: 'from-amber-500 to-orange-500',
        stats: { metric: '15 Days', label: 'Complete Setup' }
    },
    {
        id: 6,
        title: 'AgriTech Startup India Grant',
        category: 'funding',
        description: 'Secured ₹50L government grant for agricultural technology startup.',
        image: '/projects/agritech.jpg',
        tags: ['Startup India', 'MSME', 'Seed Fund'],
        color: 'from-yellow-500 to-amber-500',
        stats: { metric: '₹50L', label: 'Grant Secured' }
    },
    {
        id: 7,
        title: 'EduLearn Platform',
        category: 'web',
        description: 'Scalable e-learning platform with live classes and AI tutoring.',
        image: '/projects/edulearn.jpg',
        tags: ['Next.js', 'WebRTC', 'MongoDB'],
        color: 'from-indigo-500 to-purple-500',
        stats: { metric: '50K+', label: 'Active Students' }
    },
    {
        id: 8,
        title: 'FoodDash Delivery App',
        category: 'mobile',
        description: 'Food delivery app with real-time tracking and smart recommendations.',
        image: '/projects/fooddash.jpg',
        tags: ['Flutter', 'Node.js', 'Maps API'],
        color: 'from-red-500 to-pink-500',
        stats: { metric: '2M+', label: 'Orders Delivered' }
    },
    {
        id: 9,
        title: 'Legal Document Automation',
        category: 'ai',
        description: 'AI system that generates and reviews legal documents automatically.',
        image: '/projects/legaldoc.jpg',
        tags: ['NLP', 'GPT-4', 'Document AI'],
        color: 'from-cyan-500 to-blue-500',
        stats: { metric: '90%', label: 'Time Saved' }
    },
    {
        id: 10,
        title: 'D2C Brand Launch',
        category: 'marketing',
        description: 'Complete digital launch strategy for direct-to-consumer fashion brand.',
        image: '/projects/d2c.jpg',
        tags: ['Influencer', 'Performance', 'Content'],
        color: 'from-pink-500 to-rose-500',
        stats: { metric: '₹1Cr+', label: 'Revenue Generated' }
    },
    {
        id: 11,
        title: 'MedTech CDSCO Approval',
        category: 'legal',
        description: 'Regulatory compliance and licensing for medical device manufacturer.',
        image: '/projects/medtech.jpg',
        tags: ['CDSCO', 'FDA', 'Compliance'],
        color: 'from-teal-500 to-cyan-500',
        stats: { metric: '3 Months', label: 'Approval Time' }
    },
    {
        id: 12,
        title: 'CleanEnergy BioGas Grant',
        category: 'funding',
        description: 'Secured ₹2Cr MNRE grant for renewable energy project.',
        image: '/projects/cleanenergy.jpg',
        tags: ['MNRE', 'State Grant', 'Subsidy'],
        color: 'from-green-500 to-teal-500',
        stats: { metric: '₹2Cr', label: 'Grant Secured' }
    },
];



// Project Card
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            transition={{ delay: index * 0.1 }}
            className="group h-full"
        >
            <GlowingCard className="h-full" innerClassName="p-0 flex flex-col">
                {/* Image Placeholder */}
                <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/20">
                            {project.title.charAt(0)}
                        </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="flex gap-3"
                        >
                            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                <ExternalLink size={20} />
                            </button>
                        </motion.div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                        <span className="text-white font-bold">{project.stats.metric}</span>
                        <span className="text-gray-300 text-sm ml-1">{project.stats.label}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-14 md:p-22 flex-1 flex flex-col">
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 flex-1 font-medium">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] rounded-md bg-white/[0.03] text-gray-500 border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-400/80 transition-all duration-300 whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </GlowingCard>
        </motion.div>
    );
};



export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <main className="relative z-10">

            {/* Hero Section */}
            <section
                className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
                style={{ background: '#050505', paddingTop: '160px' }}
            >
                <div className="absolute inset-0">
                    <div className="grid-background" />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                            filter: 'blur(100px)'
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="container relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl w-full flex flex-col items-center text-center"
                    >
                        <div className="flex flex-col items-center">
                            <AnimatedLetterText
                                text="Portfolio"
                                letterToReplace="o"
                                className="text-7xl md:text-9xl text-white"
                            />
                        </div>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-16 leading-relaxed text-center">
                            A curated selection of our most impactful work across technology, marketing, and strategy.
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 border whitespace-nowrap ${activeCategory === category.id
                                        ? 'bg-white/10 text-white border-cyan-500/50 shadow-[0_0_30px_rgba(0,212,255,0.1)] scale-105'
                                        : 'bg-white/[0.02] text-gray-500 hover:text-gray-300 border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }`}
                                >
                                    <category.icon size={14} className={activeCategory === category.id ? 'text-cyan-400' : 'text-gray-600'} />
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-transparent pt-0">
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-40">
                            <p className="text-2xl text-gray-500 font-medium">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 149, 0, 0.05) 100%)' }}>
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}

                        >
                            <div className="text-5xl font-bold gradient-text mb-2">200+</div>
                            <div className="text-gray-400">Projects Completed</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}

                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">150+</div>
                            <div className="text-gray-400">Happy Clients</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}

                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">98%</div>
                            <div className="text-gray-400">Success Rate</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}

                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">5.0</div>
                            <div className="text-gray-400">Client Rating</div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
                            Ready to <span className="gradient-text">Start Your Project</span>?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Let&apos;s discuss how we can help you build something amazing.
                        </p>
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                            Get a Free Quote
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
