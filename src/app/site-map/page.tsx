import Link from 'next/link';
import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { Map } from 'lucide-react';

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
            <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden">
                <ShaderDemo_ATC />
                <div className="absolute pointer-events-none z-10 text-center px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Site Map
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Navigate the structure of our platform
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12 pb-16 max-w-4xl">
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>
                            <Map className="w-8 h-8" />
                            Main Pages
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Careers
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Development Services</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/services/web-development" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Website Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/backend-development" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Backend Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/mobile-apps" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Mobile Apps
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/ai-automations" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> AI Automations
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Growth & Legal Services</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/services/graphic-design" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Graphic Design
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/digital-marketing" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Digital Marketing & Ads
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/legal-services" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Legal Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/funding-solutions" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Funding Solutions
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>Legal & Policies</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy-policy" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-use" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link href="/copyright" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Copyright
                                </Link>
                            </li>
                            <li>
                                <Link href="/feedback" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Feedback
                                </Link>
                            </li>
                            <li>
                                <Link href="/site-map" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Site Map
                                </Link>
                            </li>
                            <li>
                                <Link href="/website-policies" className="text-lg text-[#F6F1EB] hover:text-[#B88CFF] transition-colors flex items-center gap-2">
                                    <span className="text-[#B88CFF]">→</span> Website Policies
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section className="text-center">
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{lineHeight: '1.8'}}>
                            This sitemap provides an overview of all the main pages and sections of the Henu OS website.
                            If you can't find what you're looking for, please get in touch with us.
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


