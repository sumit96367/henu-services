'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
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
import { ProjectCard } from '@/components/ui/project-card';
import { AnimatedLetterText } from '@/components/ui/potfolio-text';
import { MouseTrailComponent } from '@/components/ui/mouse-trail';
import Casestudies from '@/components/ui/case-studies';
import GalleryHoverCarousel from '@/components/ui/gallery-hover-carousel';
import { Spotlight } from '@/components/ui/spotlight';

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



// The ProjectCard is now imported from @/components/ui/project-card



export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') return projects;
        return projects.filter(project => project.category === activeCategory);
    }, [activeCategory]);

    return (
        <main className="relative z-10">
            {/* Mouse Trail Effect */}
            <MouseTrailComponent />


            {/* Hero Section */}
            <section
                ref={containerRef}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden"
                style={{ background: 'transparent' }}
            >
                {/* Spotlight Effect */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Animated Grid Background */}
                <div className="absolute inset-0">
                    <div className="horizon-grid" />
                    <div className="grid-background" />

                    {/* Ambient Glows from Landing Page */}
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

                <div className="container relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                        style={{ y, opacity }}
                        className="max-w-5xl w-full flex flex-col items-center text-center"
                    >
                        <div className="flex flex-col items-center mb-6">
                            <PremiumTextReveal text="Our Digital" className="text-gray-400" delay={0.2} />
                            <AnimatedLetterText
                                text="Portfolio"
                                letterToReplace="o"
                                className="text-7xl md:text-9xl text-white mt-[-20px]"
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-16 leading-relaxed text-center"
                        >
                            A curated selection of our most impactful work across technology, marketing, and strategy.
                        </motion.p>

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
            <section className="section bg-transparent pt-0 relative z-20">
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    imgSrc={project.image}
                                    title={project.title}
                                    description={project.description}
                                    link={`/portfolio/${project.id}`}
                                    linkText="View Details"
                                />
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
            <section className="py-20 relative z-20" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 149, 0, 0.05) 100%)' }}>
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

            {/* Featured Projects Carousel */}
            <GalleryHoverCarousel heading="Featured Innovation" />

            {/* Case Studies Section */}
            <Casestudies />

            {/* CTA Section */}
            <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6" style={{ background: '#050505' }}>
                {/* Background Glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                        filter: 'blur(100px)'
                    }}
                />

                <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
                            Ready to <br />
                            <span className="gradient-text">Start Your Project</span>?
                        </h2>

                        <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                            Let&apos;s architect the next generation of your digital presence together.
                        </p>

                        <div className="flex flex-col items-center justify-center">
                            <Link href="/contact" className="btn-primary !h-20 !px-12 text-xl group flex items-center gap-4 hover:scale-105 transition-transform duration-500">
                                Get a Free Quote
                                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements for centering feel */}
                <div className="absolute top-1/2 left-10 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden xl:block" />
                <div className="absolute top-1/2 right-10 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden xl:block" />
            </section>

        </main>
    );
}
