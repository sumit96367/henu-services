'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumTextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function PremiumTextReveal({ text, className = "", delay = 0 }: PremiumTextRevealProps) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            }
        }
    };

    const childVariants = {
        hidden: {
            opacity: 0,
            y: "100%",
        },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1] as any // Custom ease for premium feel
            }
        }
    };

    const words = text.split(" ");

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`inline-flex flex-wrap ${className}`}
            style={{ verticalAlign: 'top' }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <span key={charIndex} className="inline-block overflow-hidden vertical-top">
                            <motion.span
                                variants={childVariants}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        </span>
                    ))}
                    {/* Add space after word if it's not the last word */}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </motion.span>
    );
}
