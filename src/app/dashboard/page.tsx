'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Scale,
    FileText,
    Smartphone,
    Package,
    DollarSign,
    Award,
    ArrowRight,
    Building2,
    TrendingUp,
    Shield,
    Briefcase,
    CheckCircle2
} from 'lucide-react';
import { BlurredPricing } from '@/components/dashboard/BlurredPricing';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function DashboardPage() {
    const { user, isAuthenticated, userType, isLoading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router, mounted]);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    // Company Dashboard
    if (userType === 'company') {
        return <CompanyDashboard user={user} />;
    }

    // Personal Dashboard
    return <PersonalDashboard user={user} />;
}

interface DashboardUser {
    name: string;
    email: string;
}

function CompanyDashboard({ user }: { user: DashboardUser | null }) {
    const services = [
        {
            icon: Scale,
            title: 'Legal Services',
            description: 'Comprehensive legal documentation, compliance, and advisory services for your business.',
            features: ['Contract Drafting', 'Legal Compliance', 'IP Protection', 'Business Advisory'],
            color: 'cyan'
        },
        {
            icon: Award,
            title: 'Section Grant',
            description: 'Access government grants, subsidies, and funding opportunities for your organization.',
            features: ['Grant Applications', 'Subsidy Programs', 'Tax Benefits', 'Government Schemes'],
            color: 'amber'
        },
        {
            icon: Smartphone,
            title: 'Mobile Application',
            description: 'Custom mobile app development for iOS and Android platforms.',
            features: ['iOS Development', 'Android Development', 'Cross-Platform', 'App Maintenance'],
            color: 'cyan'
        },
        {
            icon: Package,
            title: 'Legal Packages',
            description: 'Pre-designed legal packages tailored for startups, SMEs, and enterprises.',
            features: ['Startup Package', 'SME Package', 'Enterprise Package', 'Custom Solutions'],
            color: 'amber'
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                            <Building2 size={28} className="text-black" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Company Dashboard</h1>
                            <p className="text-gray-400">Welcome back, {user?.name}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
                >
                    {[
                        { label: 'Active Services', value: '4', icon: Briefcase, color: 'cyan' },
                        { label: 'Pending Requests', value: '2', icon: FileText, color: 'amber' },
                        { label: 'Compliance Score', value: '98%', icon: Shield, color: 'green' },
                        { label: 'Growth Rate', value: '+24%', icon: TrendingUp, color: 'purple' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <stat.icon size={22} className={`text-${stat.color}-400`} />
                                <span className="text-2xl font-bold text-white">{stat.value}</span>
                            </div>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Your Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                variants={fadeInUp}
                                className="group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative">
                                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${service.color === 'cyan'
                                            ? 'bg-cyan-500/10 text-cyan-400'
                                            : 'bg-amber-500/10 text-amber-400'
                                        }`}>
                                        <service.icon size={24} />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                                <CheckCircle2 size={14} className="text-cyan-400" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
                                        Learn More <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Blurred Pricing Section */}
                <BlurredPricing />
            </div>
        </div>
    );
}

function PersonalDashboard({ user }: { user: DashboardUser | null }) {
    const quickActions = [
        { icon: FileText, label: 'Request Quote', href: '/contact' },
        { icon: Briefcase, label: 'View Portfolio', href: '/portfolio' },
        { icon: Scale, label: 'Legal Help', href: '/services/legal-services' },
        { icon: Smartphone, label: 'App Development', href: '/services/mobile-app-development' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <span className="text-3xl font-bold text-black">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.name}!</h1>
                    <p className="text-gray-400">Your personal dashboard</p>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {quickActions.map((action) => (
                        <motion.a
                            key={action.label}
                            href={action.href}
                            variants={fadeInUp}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 text-center group"
                        >
                            <action.icon size={28} className="mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
                    <div className="space-y-4">
                        {[
                            { text: 'Explore our services', completed: true },
                            { text: 'Check out our portfolio', completed: false },
                            { text: 'Request a project estimate', completed: false },
                            { text: 'Contact our team', completed: false },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? 'bg-amber-500' : 'border border-white/20'
                                    }`}>
                                    {item.completed && <CheckCircle2 size={14} className="text-black" />}
                                </div>
                                <span className={`${item.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
