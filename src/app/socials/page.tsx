'use client';

import { motion } from 'framer-motion';
import {
    Github,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    ArrowRight,
    Globe,
    Facebook,
    Users
} from 'lucide-react';
import {
    IconBrandWhatsapp,
    IconBrandTelegram,
    IconBrandDiscord
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

// --- Data Configuration ---
type SocialItem = {
    name: string;
    icon: React.ReactNode;
    url: string;
    description: string;
    cta: string;
    gradient?: string;
};

type SocialCategory = {
    title: string;
    items: SocialItem[];
};

const socialCategories: SocialCategory[] = [
    {
        title: "Official & Core",
        items: [
            {
                name: "HENU OS Website",
                icon: <Globe className="w-8 h-8" />,
                url: "https://henuos.netlify.app/",
                description: "Our official ecosystem hub.",
                cta: "Visit",
                gradient: "from-purple-500/20 to-blue-500/20"
            },
            {
                name: "Community Website",
                icon: <Users className="w-8 h-8" />,
                url: "https://siddsingh.mystrikingly.com/",
                description: "Community-driven initiatives.",
                cta: "Explore",
                gradient: "from-pink-500/20 to-rose-500/20"
            }
        ]
    },
    {
        title: "Professional",
        items: [
            {
                name: "LinkedIn",
                icon: <Linkedin className="w-8 h-8" />,
                url: "https://www.linkedin.com/company/henuos/",
                description: "Corporate updates & insights.",
                cta: "Connect",
                gradient: "from-blue-600/20 to-cyan-500/20"
            },
            {
                name: "GitHub",
                icon: <Github className="w-8 h-8" />,
                url: "https://github.com/henu-os",
                description: "Open-source codebase.",
                cta: "Star",
                gradient: "from-gray-600/20 to-gray-400/20"
            }
        ]
    },
    {
        title: "Social Media",
        items: [
            {
                name: "Instagram",
                icon: <Instagram className="w-8 h-8" />,
                url: "https://www.instagram.com/henuos/",
                description: "Visual stories & culture.",
                cta: "Follow",
                gradient: "from-orange-500/20 via-pink-500/20 to-purple-500/20"
            },
            {
                name: "Twitter (X)",
                icon: <Twitter className="w-8 h-8" />,
                url: "https://x.com/HenuOs13178",
                description: "Real-time announcements.",
                cta: "Follow",
                gradient: "from-blue-400/20 to-blue-600/20"
            },
            {
                name: "Facebook",
                icon: <Facebook className="w-8 h-8" />,
                url: "https://www.facebook.com/share/1ZCPYkVQSF/",
                description: "News & social updates.",
                cta: "Like",
                gradient: "from-blue-700/20 to-blue-900/20"
            },
            {
                name: "YouTube",
                icon: <Youtube className="w-8 h-8" />,
                url: "https://www.youtube.com/@HenuOS",
                description: "Demos & video content.",
                cta: "Subscribe",
                gradient: "from-red-600/20 to-red-900/20"
            }
        ]
    },
    {
        title: "Community",
        items: [
            {
                name: "Discord",
                icon: <IconBrandDiscord className="w-8 h-8" />,
                url: "https://discord.gg/hgcFGEFd8p",
                description: "Chat with developers.",
                cta: "Join",
                gradient: "from-indigo-500/20 to-purple-500/20"
            },
            {
                name: "Telegram",
                icon: <IconBrandTelegram className="w-8 h-8" />,
                url: "https://t.me/+VjtCzFe7ooM5Y2Jl",
                description: "Instant messaging channel.",
                cta: "Join",
                gradient: "from-sky-400/20 to-blue-500/20"
            },
            {
                name: "WhatsApp Community",
                icon: <IconBrandWhatsapp className="w-8 h-8" />,
                url: "https://chat.whatsapp.com/F4Krdv2DxPa8J84ZaG1iUe",
                description: "Official community group.",
                cta: "Join",
                gradient: "from-green-500/20 to-emerald-600/20"
            }
        ]
    },
    {
        title: "Direct Connect",
        items: [
            {
                name: "WhatsApp Chat",
                icon: <IconBrandWhatsapp className="w-8 h-8" />,
                url: "https://wa.me/918094100513",
                description: "Direct support line.",
                cta: "Chat",
                gradient: "from-green-500/20 to-emerald-600/20"
            },
            {
                name: "Email",
                icon: <Mail className="w-8 h-8" />,
                url: "mailto:henuosr@gmail.com",
                description: "Business inquiries.",
                cta: "Email",
                gradient: "from-purple-500/20 to-indigo-500/20"
            }
        ]
    }
];

// --- Components ---

const SocialCard = ({ item }: { item: SocialItem }) => {
    return (
        <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
        >
            <div className="relative h-full !p-10 md:!p-14 rounded-2xl bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_20px_40px_-10px_rgba(109,40,217,0.3)]">

                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.gradient || 'from-purple-500/10 to-transparent'}`} />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Header */}
                    <div className="mb-6 flex items-start justify-between">
                        <div className="p-3.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 origin-left border border-white/5 group-hover:border-white/10">
                            {item.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-auto">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">{item.name}</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6 font-medium">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                            <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-purple-400 transition-colors">
                                {item.cta}
                            </span>
                            <div className="flex items-center gap-1 text-purple-500/0 group-hover:text-purple-400/100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function SocialsPage() {
    return (
        <main className="min-h-screen bg-[#020205] text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">

                {/* 1. HERO SECTION */}
                <section className="min-h-[70vh] flex flex-col items-center justify-center text-center pb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
                            Stay <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Connected</span>
                            <br />
                            With Henu OS.
                        </h1>
                        <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
                            Follow our journey across platforms and be part of our digital ecosystem.
                        </p>
                    </motion.div>


                </section>

                {/* 2. SECTION DIVIDER (Gradient Fade) */}
                <div className="relative w-full h-32 -mt-16 mb-24 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                </div>

                {/* 3. SOCIAL PLATFORMS SECTION */}
                <section className="pt-10">
                    {/* Section Header */}
                    <div className="flex flex-col items-center justify-center text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Platforms</h2>
                        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto !text-center">
                            Connect with us across professional networks, media platforms, and direct channels.
                        </p>
                    </div>

                    {/* 4. CATEGORIZED GRID LAYOUT */}
                    <div className="flex flex-col gap-12">
                        {socialCategories.map((category, catIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: catIndex * 0.1 }}
                                className="relative"
                            >
                                {/* Category Header */}
                                <div className="flex items-end gap-6 mb-12 border-b border-white/5 pb-4">
                                    <h3 className="text-3xl font-bold text-white tracking-tight leading-none">{category.title}</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {category.items.map((item) => (
                                        <SocialCard key={item.name} item={item} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer spacing */}
                <div className="h-32" />
            </div>
        </main>
    );
}
