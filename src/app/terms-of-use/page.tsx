'use client';

import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export default function TermsOfUsePage() {
    const sections = [
        {
            title: 'Acceptance of Terms',
            content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this site.`
        },
        {
            title: 'License to Use Website',
            content: `Unless otherwise stated, Henu OS and/or its licensors own the intellectual property rights for all material on this website. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.`
        },
        {
            title: 'User Restrictions',
            content: `You are specifically restricted from publishing website material in any media, selling or commercializing website material, publicly performing or showing website material, using this website in any damaging way, or engaging in data mining or similar activities.`
        },
        {
            title: 'Your Content',
            content: `In these terms and conditions, "Your Content" shall mean any audio, video, text, images, or other material you choose to display on this website. By displaying Your Content, you grant Henu OS a non-exclusive, worldwide, irrevocable license to use, reproduce, and publish it.`
        },
        {
            title: 'Limitation of Liability',
            content: `In no event shall Henu OS, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.`
        },
        {
            title: 'Indemnification',
            content: `You hereby indemnify to the fullest extent Henu OS from and against any and all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.`
        },
        {
            title: 'Severability',
            content: `If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole.`
        },
        {
            title: 'Variation of Terms',
            content: `Henu OS is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this website.`
        },
        {
            title: 'Assignment',
            content: `Henu OS shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification or consent required. However, you shall not be permitted to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.`
        },
        {
            title: 'Governing Law',
            content: `These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which Henu OS operates, and you submit to the non-exclusive jurisdiction of the courts located in that jurisdiction.`
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section - DO NOT MODIFY */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Terms of Use
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Legal terms governing our services
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
                                <FileText className="w-8 h-8 text-white shrink-0 mt-1" />
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
