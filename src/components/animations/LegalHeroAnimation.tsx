'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, Shield, Lock, FileCheck } from 'lucide-react';

export default function LegalHeroAnimation() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated container */}
            <div className="relative w-full max-w-lg h-[450px]">

                {/* Floating document cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="absolute w-48 h-64 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl"
                            style={{
                                transformStyle: 'preserve-3d'
                            }}
                            animate={{
                                y: [0, -15, 0],
                                rotateY: [0, 5, 0],
                                x: [0, index * 3, 0]
                            }}
                            transition={{
                                duration: 5 + index,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.5
                            }}
                        >
                            {/* Document lines */}
                            <div className="p-6 space-y-3">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-1.5 bg-gradient-to-r from-amber-400/30 to-transparent rounded"
                                        style={{ width: `${100 - i * 8}%` }}
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 0.6, scaleX: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.5 + i * 0.1,
                                            repeat: Infinity,
                                            repeatDelay: 8
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Document icon */}
                            <div className="absolute top-4 right-4">
                                <FileText className="w-6 h-6 text-amber-400/50" strokeWidth={1.5} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Workflow stages */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    {[
                        { icon: FileText, label: 'Draft', color: 'amber' },
                        { icon: FileCheck, label: 'Review', color: 'yellow' },
                        { icon: CheckCircle, label: 'Approve', color: 'green' },
                        { icon: Shield, label: 'Comply', color: 'blue' }
                    ].map((stage, index) => (
                        <motion.div
                            key={stage.label}
                            className="flex flex-col items-center gap-2"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: [0, 1, 1, 0.3],
                                y: [-20, 0]
                            }}
                            transition={{
                                duration: 8,
                                delay: index * 1,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${stage.color}-400/20 to-${stage.color}-500/10 border border-${stage.color}-400/30 flex items-center justify-center relative`}>
                                <stage.icon className={`w-5 h-5 text-${stage.color}-400`} strokeWidth={2} />

                                {/* Pulse effect */}
                                <motion.div
                                    className={`absolute inset-0 rounded-full bg-${stage.color}-400/20`}
                                    animate={{
                                        scale: [1, 1.6],
                                        opacity: [0.5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 1 + 0.5,
                                        repeat: Infinity,
                                        repeatDelay: 6
                                    }}
                                />
                            </div>
                            <span className="text-[10px] text-amber-300/60 font-medium">{stage.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Digital signature animation */}
                <motion.svg
                    className="absolute bottom-24 left-1/2 -translate-x-1/2"
                    width="200"
                    height="80"
                    viewBox="0 0 200 80"
                >
                    <motion.path
                        d="M 10 50 Q 40 20, 70 45 T 130 40 Q 160 35, 190 50"
                        stroke="url(#signatureGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                        }}
                    />
                    <defs>
                        <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                </motion.svg>

                {/* Signature line */}
                <motion.div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: 2
                    }}
                >
                    <div className="w-48 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    <span className="text-[10px] text-amber-400/40 mt-1">Authorized Signature</span>
                </motion.div>

                {/* Security shield */}
                <motion.div
                    className="absolute right-8 top-1/3"
                    animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Shield className="w-20 h-20 text-amber-400/30" strokeWidth={1} />
                    <Lock className="w-8 h-8 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={2} />
                </motion.div>

                {/* Compliance checkmarks */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${25 + i * 25}%`,
                            bottom: `${40 + i * 8}%`
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.8 + 4,
                            repeat: Infinity,
                            repeatDelay: 6,
                            ease: "easeOut"
                        }}
                    >
                        <CheckCircle className="w-8 h-8 text-green-400" strokeWidth={2.5} fill="rgba(74, 222, 128, 0.2)" />
                    </motion.div>
                ))}

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-amber-400/60"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + i * 10}%`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Central glow */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
                        filter: 'blur(30px)'
                    }}
                />
            </div>
        </div>
    );
}
