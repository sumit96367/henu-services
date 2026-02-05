'use client';

import ShaderDemo_ATC from '@/components/ui/atc-shader';
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
            {/* Hero Section - DO NOT MODIFY */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
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
                <div className="container mx-auto px-6 space-y-16">
                    {/* Intro Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlowingCard innerClassName="p-10 md:p-14">
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

                    {/* Remaining Sections */}
                    {sections.slice(1).map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <GlowingCard innerClassName="p-10 md:p-14">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                    {section.title}
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {section.content}
                                </p>
                            </GlowingCard>
                        </motion.div>
                    ))}

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center pt-8"
                    >
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
