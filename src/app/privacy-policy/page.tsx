import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        How we collect, use, and protect your data
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12 pb-16 max-w-4xl">
                {/* Last Updated */}
                <div className="text-center mb-12">
                    <p className="text-sm text-[#D98BBE]">Last updated: February 4, 2026</p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{ letterSpacing: '0.3px' }}>
                            <Shield className="w-8 h-8 inline-block mr-3" />
                            Introduction
                        </h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{ lineHeight: '1.8' }}>
                            At Henu OS, we are committed to protecting your privacy and ensuring the security of your
                            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                            your data when you visit our website or use our services.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{ letterSpacing: '0.3px' }}>Information We Collect</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{ lineHeight: '1.8' }}>
                            We may collect the following types of information:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Personal identification information (name, email address, phone number)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Usage data and analytics</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Device and browser information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Cookies and tracking technologies</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{ letterSpacing: '0.3px' }}>How We Use Your Information</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{ lineHeight: '1.8' }}>
                            We use the collected information for various purposes, including:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Providing and maintaining our services</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Improving user experience and website functionality</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Communicating with you about updates and promotions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Analyzing usage patterns and trends</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Data Security */}
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{ letterSpacing: '0.3px' }}>Data Security</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{ lineHeight: '1.8' }}>
                            We implement appropriate technical and organizational security measures to protect your personal
                            data against unauthorized access, alteration, disclosure, or destruction. However, no method of
                            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{ letterSpacing: '0.3px' }}>Your Rights</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{ lineHeight: '1.8' }}>
                            You have the following rights regarding your personal data:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Access and review your personal information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Request correction of inaccurate data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Request deletion of your data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#D98BBE] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Opt-out of marketing communications</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Contact CTA */}
                    <section className="text-center">
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{ lineHeight: '1.8' }}>
                            If you have any questions about this privacy policy or our privacy practices, please get in touch with us.
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
