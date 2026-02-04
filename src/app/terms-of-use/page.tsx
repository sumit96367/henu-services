import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Terms of Use
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Rules and conditions for using Henu OS
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
                            <FileText className="w-8 h-8" />
                            Acceptance of Terms
                        </h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            By accessing and using the Henu OS website and services, you agree to be bound by these Terms of Use.
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>License to Use</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            We grant you a limited, non-exclusive, non-transferable license to access and use our services
                            for personal or business purposes, subject to these terms.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Services and Content</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            Henu OS provides a range of technology and development services. Our services are subject to:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Availability and modification without notice</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Terms specific to individual service agreements</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Compliance with applicable laws and regulations</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>User Responsibilities</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            As a user of our services, you agree to:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Provide accurate and complete information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Maintain the security of your account credentials</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Use our services in compliance with all applicable laws</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Not engage in any prohibited activities</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Limitation of Liability</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            To the maximum extent permitted by law, Henu OS shall not be liable for any indirect, incidental,
                            special, consequential, or punitive damages arising from your use of our services.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Governing Law</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            These Terms of Use shall be governed by and construed in accordance with the laws of India,
                            without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Contact CTA */}
                    <section className="text-center">
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{lineHeight: '1.8'}}>
                            If you have any questions about these Terms of Use, please get in touch with us.
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


