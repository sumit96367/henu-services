'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const internships = [
    {
        id: 1,
        title: 'Big Tech / Product Tech',
        description: 'Roles focused on software engineering, cloud, mobile, and scalable systems used by top product companies.',
        iconPath: '/icons/internships/big-tech.png',
        category: 'big-tech',
    },
    {
        id: 2,
        title: 'AI / ML / Data Science',
        description: 'Hands-on internships in data analysis, machine learning, AI automation, NLP, and GenAI systems.',
        iconPath: '/icons/internships/ai-ml.png',
        category: 'ai-ml',
    },
    {
        id: 3,
        title: 'Cyber Security & Networking',
        description: 'Practical exposure to security operations, ethical hacking, cloud security, and network defense.',
        iconPath: '/icons/internships/cybersecurity.png',
        category: 'cybersecurity',
    },
    {
        id: 4,
        title: 'Software Development (SDE)',
        description: 'Core development roles covering frontend, backend, mobile, APIs, and system design.',
        iconPath: '/icons/internships/software-dev.png',
        category: 'software-dev',
    },
    {
        id: 5,
        title: 'Finance & Trading',
        description: 'Internships focused on markets, trading strategies, fintech systems, and financial data analysis.',
        iconPath: '/icons/internships/finance.png',
        category: 'finance',
    },
    {
        id: 6,
        title: 'Startup & Growth',
        description: 'Work closely with startups in product, strategy, growth, analytics, and founder-led initiatives.',
        iconPath: '/icons/internships/startup.png',
        category: 'startup',
    },
    {
        id: 7,
        title: 'Research & Innovation',
        description: 'Research-oriented internships in AI research, data science research, and academic or lab-based work.',
        iconPath: '/icons/internships/research.png',
        category: 'research',
    },
    {
        id: 8,
        title: 'Cloud, DevOps & AdTech',
        description: 'Cloud infrastructure, DevOps, SRE, automation, and advertising technology internships.',
        iconPath: '/icons/internships/cloud-devops.png',
        category: 'cloud-devops',
    },
    {
        id: 9,
        title: 'Global Tech & Remote',
        description: 'Remote and international internships including open-source, global software, and AI research roles.',
        iconPath: '/icons/internships/global-remote.png',
        category: 'global-remote',
    },
    {
        id: 10,
        title: 'Design & Creative',
        description: 'UI/UX, product design, motion graphics, 3D, AR/VR, and creative technology roles.',
        iconPath: '/icons/internships/design.png',
        category: 'design',
    },
    {
        id: 11,
        title: 'Languages',
        description: 'ALL TYPES OF LANGUAGES.',
        iconPath: '/icons/internships/languages.png',
        category: 'languages',
    },
];

export default function CareersPage() {
    return (
        <main className="relative z-10">
            {/* Hero Section - Full Screen */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Grid & Effects (similar to portfolio) */}
                <div className="absolute inset-0">
                    <div className="horizon-grid" />
                    <div className="grid-background" />

                    {/* Ambient Glows */}
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

                {/* Hero Content */}
                <div className="container relative z-10 flex flex-col items-center justify-center">
                    <motion.div className="max-w-5xl w-full flex flex-col items-center text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-7xl md:text-9xl font-black uppercase tracking-wider mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                        >
                            Internship Opportunity
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed"
                        >
                            Kickstart your career with hands-on experience across cutting-edge domains.
                            <br />
                            From AI to cloud, from startups to big tech — find your perfect internship match.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Internships Grid - Below Hero */}
            <section className="section bg-transparent pt-0 relative z-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {internships.map((internship, index) => {
                            return (
                                <motion.div
                                    key={internship.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-cyan-400/50 transition-all duration-300"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* 3D Icon Image */}
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="relative w-24 h-24">
                                                <Image
                                                    src={internship.iconPath}
                                                    alt={internship.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors text-center">
                                            {internship.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-400 leading-relaxed mb-6 min-h-[3rem] text-center">
                                            {internship.description}
                                        </p>

                                        {/* Buttons */}
                                        <div className="flex gap-3">
                                            <Link href={`/careers/${internship.category}`} className="flex-1">
                                                <button className="w-full py-2.5 px-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 rounded-xl text-sm font-bold text-white hover:text-cyan-400 transition-all duration-300">
                                                    VIEW SOURCES
                                                </button>
                                            </Link>
                                            <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300">
                                                GET IT NOW
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
