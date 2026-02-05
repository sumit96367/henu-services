'use client';

import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { CopyrightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export default function CopyrightPage() {
    const sections = [
        {
            title: 'Copyright Notice',
            content: `All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Henu OS or its content suppliers and is protected by international copyright laws.`
        },
        {
            title: 'Ownership of Materials',
            content: `The compilation of all content on this site is the exclusive property of Henu OS and is protected by international copyright laws. All software used on this site is the property of Henu OS or its software suppliers and is protected by international copyright laws.`
        },
        {
            title: 'Permitted Use',
            content: `You may view, download, and print material from this website for personal, non-commercial use only, provided you do not modify the materials and that you retain all copyright and other proprietary notices contained in the materials.`
        },
        {
            title: 'Restrictions',
            content: `You may not reproduce, distribute, publicly display, publicly perform, or create derivative works from any materials on this website without the express written permission of Henu OS.`
        },
        {
            title: 'Trademarks',
            content: `All trademarks, service marks, and trade names of Henu OS used on this site are trademarks or registered trademarks of Henu OS. You may not use any trademark of Henu OS without our prior written permission.`
        },
        {
            title: 'User-Generated Content',
            content: `If you submit any content to our website, you grant Henu OS a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, and display such content in any media.`
        },
        {
            title: 'Copyright Infringement Claims',
            content: `If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify us immediately with detailed information about the alleged infringement.`
        },
        {
            title: 'Digital Millennium Copyright Act',
            content: `Henu OS respects the intellectual property rights of others and expects its users to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law.`
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section - DO NOT MODIFY */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Copyright
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Intellectual property rights and usage terms
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
                                <CopyrightIcon className="w-8 h-8 text-white shrink-0 mt-1" />
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
