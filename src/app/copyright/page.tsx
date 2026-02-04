import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { Copyright as CopyrightIcon } from 'lucide-react';
import Link from 'next/link';

export default function CopyrightPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Copyright
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Intellectual property & content ownership
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12 pb-16 max-w-4xl">
                <div className="text-center mb-12">
                    <p className="text-sm text-[#D98BBE]">Last updated: February 4, 2026</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>
                            <CopyrightIcon className="w-8 h-8" />
                            Copyright Statement
                        </h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            All content on the Henu OS website, including text, graphics, logos, images, videos, and software,
                            is the property of Henu OS or its content suppliers and is protected by Indian and international
                            copyright laws.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Protected Materials</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            The following materials are protected by copyright:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Website design, layout, and visual elements</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Written content, articles, and documentation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Graphics, logos, and brand assets</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Software, code, and technical implementations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Multimedia content including images and videos</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Restrictions on Use</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            Without prior written permission, you may not:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Reproduce, distribute, or display copyrighted materials</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Create derivative works based on our content</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Use our materials for commercial purposes</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Remove copyright notices or attributions</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Trademarks</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            "Henu OS" and related logos are trademarks or registered trademarks of our company. Use of these
                            trademarks without permission is strictly prohibited.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>DMCA Compliance</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            We respect the intellectual property rights of others. If you believe that your copyrighted work
                            has been copied in a way that constitutes copyright infringement, please notify us with detailed
                            information about the alleged infringement.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Permitted Uses</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            You may view and print content from our website for personal, non-commercial use, provided that
                            you retain all copyright and proprietary notices.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Request Permissions</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{lineHeight: '1.8'}}>
                            To request permission for any use of our copyrighted materials, please get in touch with us.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-12 py-5 bg-gradient-to-r from-gray-100 to-white text-gray-900 font-bold rounded-full text-xl hover:from-white hover:to-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-white/30 hover:-translate-y-1 border border-gray-200"
                        >
                            Contact Us
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}


