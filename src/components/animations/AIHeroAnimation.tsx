'use client';

import { motion } from 'framer-motion';
import { Database, Cpu, Sparkles, Zap, BarChart, Bot } from 'lucide-react';

export default function AIHeroAnimation() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated container */}
            <div className="relative w-full max-w-lg h-[450px]">

                {/* Modular blocks - Data → AI Models → Automation → Output */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {[
                        { icon: Database, label: 'Data', x: -140, y: 0, color: 'cyan' },
                        { icon: Cpu, label: 'AI Model', x: -40, y: -30, color: 'blue' },
                        { icon: Zap, label: 'Automate', x: 40, y: 30, color: 'purple' },
                        { icon: BarChart, label: 'Output', x: 140, y: 0, color: 'cyan' }
                    ].map((block, index) => (
                        <motion.div
                            key={block.label}
                            className="absolute"
                            style={{ x: block.x, y: block.y }}
                            animate={{
                                y: [block.y, block.y - 10, block.y],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 3 + index * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3
                            }}
                        >
                            {/* Block card */}
                            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-${block.color}-500/10 to-${block.color}-600/5 backdrop-blur-sm border border-${block.color}-400/30 flex flex-col items-center justify-center relative overflow-hidden`}>
                                {/* Icon */}
                                <block.icon className={`w-8 h-8 text-${block.color}-400 mb-2`} strokeWidth={1.5} />
                                <span className={`text-[10px] text-${block.color}-300 font-semibold`}>{block.label}</span>

                                {/* Glow pulse */}
                                <motion.div
                                    className={`absolute inset-0 bg-${block.color}-400/10 rounded-2xl`}
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.5,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connection lines between blocks */}
                <svg className="absolute inset-0" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Line 1: Data → AI Model */}
                    <motion.line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#lineGradient1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.8, 0],
                            x1: ['40%', '43%'],
                            x2: ['43%', '46%'],
                            y1: ['50%', '45%'],
                            y2: ['45%', '40%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Line 2: AI Model → Automation */}
                    <motion.line
                        x1="50%"
                        y1="40%"
                        x2="50%"
                        y2="60%"
                        stroke="url(#lineGradient2)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 3,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Line 3: Automation → Output */}
                    <motion.line
                        x1="52%"
                        y1="60%"
                        x2="60%"
                        y2="50%"
                        stroke="url(#lineGradient3)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0, 1, 1],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 3,
                            delay: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Data flow pulses */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={`pulse-${i}`}
                        className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                        style={{
                            left: '40%',
                            top: '50%'
                        }}
                        animate={{
                            x: [0, 40, 80, 160],
                            y: [0, -30, 30, 0],
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Floating icons */}
                <motion.div
                    className="absolute left-[20%] top-[20%]"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: 1,
                        ease: "easeInOut"
                    }}
                >
                    <Bot className="w-10 h-10 text-cyan-400/60" strokeWidth={1.5} />
                </motion.div>

                <motion.div
                    className="absolute right-[15%] bottom-[25%]"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: 2.5,
                        ease: "easeInOut"
                    }}
                >
                    <Sparkles className="w-8 h-8 text-purple-400/60" strokeWidth={1.5} />
                </motion.div>

                {/* Gear icon */}
                <motion.div
                    className="absolute left-[25%] bottom-[30%]"
                    animate={{
                        rotate: [0, 360],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400/40">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>

                {/* Glowing particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            left: `${20 + i * 7}%`,
                            top: `${25 + (i * 5) % 50}%`,
                            backgroundColor: i % 2 === 0 ? '#06b6d4' : '#3b82f6'
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Central neural glow */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
                        filter: 'blur(40px)'
                    }}
                />
            </div>
        </div>
    );
}
