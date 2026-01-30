'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, MessageSquare, CheckCircle2, Users, Briefcase } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';

export interface Review {
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    date: string;
    image?: string;
}

export const ReviewSection = ({ onReviewSubmitted }: { onReviewSubmitted: (review: Review) => void }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const newReview: Review = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            role: formData.get('role') as string,
            text: formData.get('review') as string,
            rating: rating,
            date: new Date().toLocaleDateString(),
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        onReviewSubmitted(newReview);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setRating(0);

        // Reset success message after some time
        setTimeout(() => {
            setIsSubmitted(false);
            formRef.current?.reset();
        }, 5000);
    };

    return (
        <section className="section bg-transparent relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Text and Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >


                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Share Your <br />
                            <span className="gradient-text">Growth Story.</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                            We value your feedback. Tell us about your journey with HENU OS and how we helped accelerate your business goals. Your insights help us improve and inspire others.
                        </p>


                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlowingCard innerClassName="overflow-hidden !bg-black">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-15 px-10"
                                    >
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">Review Published!</h3>
                                        <p className="text-sm text-gray-400 max-w-sm mx-auto">Thank you for sharing your experience.</p>
                                    </motion.div>
                                ) : (
                                    <form key="form" ref={formRef} onSubmit={handleSubmit} className="space-y-12 !p-10">
                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Full Name</label>
                                                <div className="relative group flex items-center">
                                                    <User className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                    <input
                                                        required
                                                        name="name"
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Company / Role</label>
                                                <div className="relative group flex items-center">
                                                    <Briefcase className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                    <input
                                                        required
                                                        name="role"
                                                        type="text"
                                                        placeholder="CEO, TechStart"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 !mt-10" id="experience-section">
                                            <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">How was your experience?</label>
                                            <div className="relative group">
                                                <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                <textarea
                                                    required
                                                    name="review"
                                                    rows={4}
                                                    placeholder="What did you build with us? How did it help your business?"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl !pt-5 !pl-14 !pr-4 !pb-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium resize-none text-sm leading-relaxed"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-4 border-t border-white/5">
                                            <div className="space-y-5">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] block">Rating</label>
                                                <div className="flex items-center gap-1.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setRating(star)}
                                                            onMouseEnter={() => setHoverRating(star)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            className="transition-transform active:scale-95 hover:scale-110"
                                                        >
                                                            <Star
                                                                className={`w-6 h-6 transition-all ${(hoverRating || rating) >= star
                                                                    ? 'text-amber-400 fill-amber-400 shadow-amber-400/20'
                                                                    : 'text-white/10 fill-transparent'
                                                                    }`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                disabled={isSubmitting || rating === 0}
                                                type="submit"
                                                className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed !py-3.5 !px-8 text-sm !rounded-xl"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Publishing...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[12px]">
                                                        Publish Review
                                                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </AnimatePresence>
                        </GlowingCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
