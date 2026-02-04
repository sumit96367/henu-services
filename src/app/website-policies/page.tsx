import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { ScrollText } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
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

            <div className="container mx-auto px-6 pt-12 pb-16 max-w-4xl">
                <div className="text-center mb-12">
                    <p className="text-sm text-[#D98BBE]">Last updated: February 4, 2026</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>
                            <ScrollText className="w-8 h-8" />
                            Policy Overview
                        </h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            This page provides an overview of all policies governing the use of the Henu OS website and
                            services. By using our website, you agree to comply with these policies. Please review them
                            carefully to understand your rights and obligations.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Cookie Policy</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            Our website uses cookies to enhance your browsing experience and provide personalized content.
                            Cookies are small text files stored on your device that help us:
                        </p>
                        <ul className="space-y-3 text-[#F6F1EB] mb-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Remember your preferences and settings</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Analyze website traffic and usage patterns</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Improve website functionality and performance</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Provide relevant content and advertisements</span>
                            </li>
                        </ul>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            You can control cookie settings through your browser preferences. However, disabling cookies
                            may affect certain features of our website.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Acceptable Use Policy</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            When using our website and services, you must not:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Engage in any unlawful or fraudulent activities</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Transmit viruses, malware, or harmful code</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Attempt to gain unauthorized access to our systems</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Harass, threaten, or harm other users</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Violate any applicable laws or regulations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Use automated systems to scrape or collect data</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Content Policy</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            All content on the Henu OS website is provided for informational purposes only. We strive to
                            ensure accuracy and timeliness, but we do not guarantee:
                        </p>
                        <ul className="space-y-3 text-[#F6F1EB] mb-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">The accuracy, completeness, or currency of any content</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">That the website will be error-free or uninterrupted</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">That content is suitable for your specific needs</span>
                            </li>
                        </ul>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            Content on our website may be updated or removed without notice. We reserve the right to modify
                            or discontinue any aspect of our website at any time.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Third-Party Links Policy</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            Our website may contain links to third-party websites or services. These links are provided for
                            your convenience only. We do not endorse or take responsibility for the content, privacy practices,
                            or terms of use of any third-party sites. Accessing third-party links is at your own risk.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Data Protection Policy</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            We are committed to protecting your personal data and complying with applicable data protection
                            laws. Our data protection practices include:
                        </p>
                        <ul className="space-y-3 text-[#F6F1EB] mb-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Collecting only necessary personal information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Implementing appropriate security measures</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Limiting data access to authorized personnel</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Retaining data only as long as necessary</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Providing transparent privacy notices</span>
                            </li>
                        </ul>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            For detailed information, please refer to our Privacy Policy.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Policy Updates</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            We may update these policies from time to time to reflect changes in our practices or legal
                            requirements. When we make significant changes, we will update the "Last updated" date at the
                            top of this page. We encourage you to review these policies periodically to stay informed about
                            how we protect your information and ensure website compliance.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Questions About Our Policies</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{lineHeight: '1.8'}}>
                            If you have any questions or concerns about our website policies, please get in touch with us.
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


