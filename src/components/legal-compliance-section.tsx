'use client';

import { motion } from 'framer-motion';
import { FileText, Coins, BadgeCheck, Scale } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';

const complianceCards = [
    {
        icon: FileText,
        title: 'Legal Services',
        desc: 'Business registration, tax filings, and annual compliance.'
    },
    {
        icon: Coins,
        title: 'Funding Solutions',
        desc: 'Strategic paths to grants, private lending, and investor pitches.'
    },
    {
        icon: BadgeCheck,
        title: 'Precision AI',
        desc: 'AI-driven automation and efficiency for your core operations.'
    }
];

export const ComplianceSection = () => {
    return (
        <section className="section relative overflow-hidden bg-transparent">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        <PremiumTextReveal text="Navigating the" /> <span className="text-amber-500"><PremiumTextReveal text="Red Tape." delay={0.4} /></span>
                    </h2>
                </motion.div>

                {/* Split Content: Graphic Left, Text Right */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
                    {/* Rotating Circular Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0"
                    >
                        {/* Center Icon Box */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: 'rgba(255, 149, 0, 0.08)',
                                    border: '1px solid rgba(255, 149, 0, 0.2)',
                                    boxShadow: '0 0 50px rgba(255, 149, 0, 0.1)'
                                }}
                            >
                                <Scale className="w-8 h-8 lg:w-10 lg:h-10 text-amber-500" />
                            </div>
                        </div>

                        {/* Rotating Text Ring */}
                        <svg className="w-full h-full animate-rotate-text z-10" viewBox="0 0 256 256">
                            <defs>
                                <path
                                    id="compliancePath"
                                    d="M 128,128 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                                />
                            </defs>
                            <text className="fill-amber-500/40 text-[12px] font-medium tracking-[0.25em] uppercase">
                                <textPath href="#compliancePath">
                                    Registration • Compliance • Grants • IP Protection •
                                </textPath>
                            </text>
                        </svg>

                        {/* Decorative concentric circles */}
                        <div className="absolute inset-4 border border-amber-500/10 rounded-full z-0" />
                        <div className="absolute inset-12 border border-amber-500/5 rounded-full z-0" />
                    </motion.div>

                    {/* Expert Guidance Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex-1"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold text-white mb-8 leading-tight">
                            Expert guidance through complex regulatory landscapes.
                        </h3>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl text-left">
                            We specialize in helping businesses secure government funding, maintain legal compliance, and protect their intellectual property. Our team of experts takes the complexity out of bureaucratic processes so you can focus on building your business.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Row */}
                <div className="grid md:grid-cols-3 gap-8">
                    {complianceCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full group"
                        >
                            <GlowingCard className="h-full" innerClassName="p-12 h-full flex flex-col items-start bg-transparent">
                                <div className="flex flex-col items-start gap-6 mb-2">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/15 group-hover:scale-110 transition-all duration-500 border border-amber-500/20 shadow-xl shrink-0">
                                        <card.icon className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors leading-tight">{card.title}</h4>
                                </div>
                                <p className="text-gray-400 text-lg leading-relaxed flex-1 font-medium text-left">{card.desc}</p>

                                {/* Subtle hover accent */}
                                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </GlowingCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
