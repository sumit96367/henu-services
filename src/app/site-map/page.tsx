'use client';

import Link from 'next/link';
import NeuralBackground from '@/components/ui/flow-field-background';
import { Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';

export default function SitemapPage() {
    const sections = [
        {
            title: 'Main Pages',
            links: [
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Careers', href: '/careers' }
            ]
        },
        {
            title: 'Development Services',
            links: [
                { name: 'Website Development', href: '/services/web-development' },
                { name: 'Backend Development', href: '/services/backend-development' },
                { name: 'Mobile App Development', href: '/services/mobile-app-development' },
                { name: 'AI Automations', href: '/services/ai-automations' }
            ]
        },
        {
            title: 'Growth & Legal Services',
            links: [
                { name: 'Graphic Design', href: '/services/graphic-design' },
                { name: 'Digital Marketing & Ads', href: '/services/digital-marketing' },
                { name: 'Legal Services', href: '/services/legal-services' },
                { name: 'Funding Solutions', href: '/services/funding-solutions' }
            ]
        },
        {
            title: 'Legal & Policies',
            links: [
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Use', href: '/terms-of-use' },
                { name: 'Copyright', href: '/copyright' },
                { name: 'Feedback', href: '/feedback' },
                { name: 'Site Map', href: '/site-map' },
                { name: 'Website Policies', href: '/website-policies' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <NeuralBackground
                    color="#a855f7"
                    trailOpacity={0.1}
                    speed={0.8}
                />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Site Map
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Navigate the structure of our platform
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="w-full" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="policy-container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                            >
                                <GlowingCard innerClassName="policy-box-padding h-full">
                                    <div className="flex items-start gap-4 mb-8">
                                        {index === 0 && <Map className="w-8 h-8 text-white shrink-0 mt-1" />}
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="grid gap-4">
                                        {section.links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                href={link.href}
                                                className="group flex items-center gap-3 text-lg text-gray-400 hover:text-white transition-colors"
                                            >
                                                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                                                <span className="leading-relaxed">{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </GlowingCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                        style={{ marginTop: '0.5cm' }}
                    >
                        <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
                            This sitemap provides an overview of all the main pages and sections of the Henu OS website.
                            If you can't find what you're looking for, please get in touch with us.
                        </p>
                        <Link
                            href="/contact"
                            className="policy-cta-button rounded-full transition-all duration-300 hover:shadow-lg"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
