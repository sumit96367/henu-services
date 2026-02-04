import ShaderDemo_ATC from '@/components/ui/atc-shader';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shader Hero Section */}
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

            <div className="container mx-auto px-6 pt-12 pb-16 max-w-4xl">
                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>
                            <MessageSquare className="w-8 h-8" />
                            Share Your Thoughts
                        </h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            At Henu OS, we believe that feedback is essential for continuous improvement. Whether you have
                            suggestions for our services, want to report an issue, or simply share your experience, we'd
                            love to hear from you.
                        </p>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>What Can You Share?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-3">Service Feedback</h3>
                                <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                    Tell us about your experience with our development, AI automation, legal, or marketing services.
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-3">Website Experience</h3>
                                <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                    Share your thoughts on website navigation, design, or functionality improvements.
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-3">Feature Requests</h3>
                                <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                    Suggest new features or services you'd like to see us offer.
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-white mb-3">Bug Reports</h3>
                                <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                    Report any technical issues or bugs you've encountered.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>How to Provide Feedback</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            You can share your feedback with us through any of the following channels:
                        </p>
                        <ul className="space-y-2.5 text-[#F6F1EB] mt-3 mb-7 pl-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Use our contact form on the Contact page</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Reach out through our social media channels</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#B88CFF] mt-1">•</span>
                                <span className="text-lg leading-relaxed">Submit detailed bug reports or feature requests</span>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    <section>
                        <h2 className="text-3xl font-bold text-[#B88CFF] mt-12 mb-5 leading-tight" style={{letterSpacing: '0.3px'}}>What Happens Next?</h2>
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                            After you submit your feedback:
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-[#B88CFF] font-bold text-lg border border-cyan-500/30">
                                    1
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Acknowledgment</h4>
                                    <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                        We'll acknowledge receipt of your feedback within 24-48 hours.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-[#B88CFF] font-bold text-lg border border-cyan-500/30">
                                    2
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Review</h4>
                                    <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                        Our team will carefully review and categorize your feedback.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-[#B88CFF] font-bold text-lg border border-cyan-500/30">
                                    3
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Action</h4>
                                    <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-5" style={{lineHeight: '1.8'}}>
                                        We'll take appropriate action and may reach out for clarification if needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                    {/* Contact CTA */}
                    <section className="text-center">
                        <p className="text-lg text-[#F6F1EB] leading-relaxed max-w-[720px] mb-8 mx-auto" style={{lineHeight: '1.8'}}>
                            Ready to share your feedback? We'd love to hear from you.
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


