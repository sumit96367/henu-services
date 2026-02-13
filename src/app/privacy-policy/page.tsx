'use client';

import NeuralBackground from '@/components/ui/flow-field-background';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: 'Introduction',
            content: `At Henu OS, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.`
        },
        {
            title: 'Information We Collect',
            content: `We collect information that you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.`
        },
        {
            title: 'How We Use Your Information',
            content: `We use the information we collect to provide, maintain, and improve our services, to communicate with you, to monitor and analyze trends and usage, and to personalize your experience. We may also use your information to send you technical notices, updates, security alerts, and support messages.`
        },
        {
            title: 'Information Sharing and Disclosure',
            content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, or when required by law or to protect our rights and safety.`
        },
        {
            title: 'Data Security',
            content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`
        },
        {
            title: 'Your Rights',
            content: `You have the right to access, update, or delete your personal information. You may also have the right to object to or restrict certain types of processing. To exercise these rights, please contact us using the information provided below.`
        },
        {
            title: 'Cookies and Tracking Technologies',
            content: `We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings and other tools.`
        },
        {
            title: 'Changes to This Policy',
            content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.`
        },
        {
            title: 'Contact Us',
            content: `If you have any questions about this Privacy Policy, please contact us through our contact page.`
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
                        Privacy Policy
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Your privacy is our priority
                    </p>
                </div>
            </div>

            {/* Content Sections - ~2cm gap after hero */}
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
                                <Shield className="w-8 h-8 text-white shrink-0 mt-1" />
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
