'use client';

import NeuralBackground from '@/components/ui/flow-field-background';
import { ScrollText } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export default function PoliciesPage() {
    const sections = [
        {
            title: 'Policy Overview',
            content: `This page provides an overview of all policies governing the use of the Henu OS website and services. By using our website, you agree to comply with these policies. Please review them carefully to understand your rights and obligations.`
        },
        {
            title: 'Cookie Policy',
            content: `Our website uses cookies to enhance your browsing experience and provide personalized content. Cookies are small text files stored on your device that help us remember your preferences, analyze website traffic, improve functionality, and provide relevant content. You can control cookie settings through your browser preferences.`
        },
        {
            title: 'Acceptable Use Policy',
            content: `When using our website and services, you must not engage in any unlawful or fraudulent activities, transmit viruses or harmful code, attempt to gain unauthorized access to our systems, harass or harm other users, violate any applicable laws, or use automated systems to scrape or collect data.`
        },
        {
            title: 'Content Policy',
            content: `All content on the Henu OS website is provided for informational purposes only. We strive to ensure accuracy and timeliness, but we do not guarantee the accuracy, completeness, or currency of any content, that the website will be error-free or uninterrupted, or that content is suitable for your specific needs.`
        },
        {
            title: 'Third-Party Links Policy',
            content: `Our website may contain links to third-party websites or services. These links are provided for your convenience only. We do not endorse or take responsibility for the content, privacy practices, or terms of use of any third-party sites. Accessing third-party links is at your own risk.`
        },
        {
            title: 'Data Protection Policy',
            content: `We are committed to protecting your personal data and complying with applicable data protection laws. Our practices include collecting only necessary personal information, implementing appropriate security measures, limiting data access to authorized personnel, retaining data only as long as necessary, and providing transparent privacy notices.`
        },
        {
            title: 'Policy Updates',
            content: `We may update these policies from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will update the "Last updated" date. We encourage you to review these policies periodically to stay informed about how we protect your information and ensure website compliance.`
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
                        Website Policies
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Platform-wide rules & compliance
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="w-full" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="policy-container mx-auto px-6">
                    {/* Intro Section - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12"
                    >
                        <GlowingCard innerClassName="policy-box-padding">
                            <div className="flex items-start gap-4 mb-6">
                                <ScrollText className="w-8 h-8 text-white shrink-0 mt-1" />
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    {sections[0].title}
                                </h2>
                            </div>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {sections[0].content}
                            </p>
                        </GlowingCard>
                    </motion.div>

                    {/* Remaining Sections - Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {sections.slice(1).map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                            >
                                <GlowingCard innerClassName="policy-box-padding h-full">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        {section.title}
                                    </h2>
                                    <p className="text-lg text-gray-400 leading-relaxed">
                                        {section.content}
                                    </p>
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
