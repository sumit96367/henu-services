'use client';

import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export default function FeedbackPage() {
    const sections = [
        {
            title: 'Share Your Thoughts',
            content: `At Henu OS, we believe that feedback is essential for continuous improvement. Whether you have suggestions for our services, want to report an issue, or simply share your experience, we'd love to hear from you.`
        },
        {
            title: 'What Can You Share?',
            subsections: [
                { title: 'Service Feedback', desc: 'Tell us about your experience with our development, AI automation, legal, or marketing services.' },
                { title: 'Website Experience', desc: 'Share your thoughts on website navigation, design, or functionality improvements.' },
                { title: 'Feature Requests', desc: "Suggest new features or services you'd like to see us offer." },
                { title: 'Bug Reports', desc: "Report any technical issues or bugs you've encountered." }
            ]
        },
        {
            title: 'How to Provide Feedback',
            content: `You can share your feedback with us through our contact form, reach out through our social media channels, or submit detailed bug reports or feature requests. We value every contribution and take all feedback seriously.`
        },
        {
            title: 'What Happens Next?',
            content: `After you submit your feedback, we'll acknowledge receipt within 24-48 hours. Our team will carefully review and categorize your input, and we'll take appropriate action. We may reach out for clarification if needed to ensure we fully understand your feedback.`
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section - DO NOT MODIFY */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Feedback
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Share your experience with Henu OS
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
                                <MessageSquare className="w-8 h-8 text-white shrink-0 mt-1" />
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    {sections[0].title}
                                </h2>
                            </div>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {sections[0].content}
                            </p>
                        </GlowingCard>
                    </motion.div>

                    {/* What Can You Share Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlowingCard innerClassName="p-10 md:p-14">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                {sections[1].title}
                            </h2>
                            <div className="space-y-6">
                                {sections[1].subsections?.map((sub, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xl font-semibold text-white mb-2">{sub.title}</h3>
                                        <p className="text-lg text-gray-400 leading-relaxed">{sub.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </GlowingCard>
                    </motion.div>

                    {/* How to Provide Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlowingCard innerClassName="p-10 md:p-14">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                {sections[2].title}
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {sections[2].content}
                            </p>
                        </GlowingCard>
                    </motion.div>

                    {/* What Happens Next Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlowingCard innerClassName="p-10 md:p-14">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                {sections[3].title}
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {sections[3].content}
                            </p>
                        </GlowingCard>
                    </motion.div>

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
