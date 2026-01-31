'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight } from 'lucide-react';

export default function FundingHeroAnimation() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated container */}
            <div className="relative w-full max-w-md h-[400px]">

                {/* Rising coins animation */}
                <motion.div
                    className="absolute left-8 top-1/2"
                    animate={{
                        y: [0, -300],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut",
                        times: [0, 0.1, 0.8, 1]
                    }}
                >
                    <DollarSign className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
                </motion.div>

                <motion.div
                    className="absolute left-20 top-1/2"
                    animate={{
                        y: [0, -320],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5,
                        times: [0, 0.1, 0.8, 1]
                    }}
                >
                    <DollarSign className="w-6 h-6 text-yellow-400" strokeWidth={2.5} />
                </motion.div>

                {/* Growth chart bars */}
                <div className="absolute right-12 bottom-20 flex items-end gap-2">
                    {[40, 60, 50, 80, 100].map((height, index) => (
                        <motion.div
                            key={index}
                            className="w-8 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: `${height}px`,
                                opacity: [0, 1, 1],
                            }}
                            transition={{
                                duration: 1,
                                delay: index * 0.2,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        />
                    ))}
                </div>

                {/* Funding stages flow */}
                <div className="absolute left-1/2 top-12 -translate-x-1/2 flex items-center gap-3">
                    {['Idea', 'Pitch', 'Fund', 'Scale'].map((stage, index) => (
                        <div key={stage} className="flex items-center">
                            <motion.div
                                className="relative"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: [0.8, 1, 0.8],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 8,
                                    delay: index * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-400/30 flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-amber-300 text-xs font-bold">{stage}</span>
                                </div>

                                {/* Glow pulse */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-amber-400/20"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.5,
                                        repeat: Infinity
                                    }}
                                />
                            </motion.div>

                            {/* Arrow connector */}
                            {index < 3 && (
                                <motion.div
                                    className="w-8 h-0.5 bg-gradient-to-r from-amber-400/50 to-yellow-400/50 mx-1"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.5 + 0.3,
                                        repeat: Infinity,
                                        repeatDelay: 6.5
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Rising graph line */}
                <motion.div
                    className="absolute right-8 bottom-32"
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 40]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <TrendingUp className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </motion.div>

                {/* Momentum arrow */}
                <motion.div
                    className="absolute right-4 top-16"
                    animate={{
                        x: [0, 15, 30],
                        y: [0, -10, -20],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                >
                    <ArrowUpRight className="w-12 h-12 text-yellow-300" strokeWidth={2} />
                </motion.div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-amber-400"
                        style={{
                            left: `${20 + i * 10}%`,
                            top: `${30 + i * 5}%`
                        }}
                        animate={{
                            y: [0, -150, -300],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 4 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut"
                        }}
                    />
                ))}

                {/* Central glow orb */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                        filter: 'blur(20px)'
                    }}
                />
            </div>
        </div>
    );
}
