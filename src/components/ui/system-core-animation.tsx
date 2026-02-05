'use client';

import { motion } from 'framer-motion';

const NODES = [
    { id: 1, x: 50, y: 50, label: 'Core', size: 16 },
    { id: 2, x: 150, y: 40, label: 'API', size: 12 },
    { id: 3, x: 150, y: 80, label: 'DB', size: 12 },
    { id: 4, x: 250, y: 30, label: 'Auth', size: 10 },
    { id: 5, x: 250, y: 70, label: 'Cache', size: 10 },
    { id: 6, x: 50, y: 120, label: 'Queue', size: 10 },
];

const CONNECTIONS = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 1, to: 6 },
    { from: 3, to: 5 },
];

export default function SystemCoreAnimation() {
    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-950 via-teal-950 to-black flex items-center justify-center p-12">
            <svg className="w-full h-full max-w-md" viewBox="0 0 300 150">
                {/* Connections */}
                {CONNECTIONS.map((conn, index) => {
                    const from = NODES.find(n => n.id === conn.from)!;
                    const to = NODES.find(n => n.id === conn.to)!;

                    return (
                        <motion.line
                            key={index}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="#06b6d4"
                            strokeWidth="1"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 2,
                                delay: index * 0.2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    );
                })}

                {/* Data Flow Animation */}
                {CONNECTIONS.map((conn, index) => {
                    const from = NODES.find(n => n.id === conn.from)!;
                    const to = NODES.find(n => n.id === conn.to)!;

                    return (
                        <motion.circle
                            key={`flow-${index}`}
                            r="2"
                            fill="#14b8a6"
                            animate={{
                                cx: [from.x, to.x],
                                cy: [from.y, to.y],
                            }}
                            transition={{
                                duration: 1.5,
                                delay: index * 0.3,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: "linear"
                            }}
                        />
                    );
                })}

                {/* Nodes */}
                {NODES.map((node, index) => (
                    <g key={node.id}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size}
                            fill="rgba(6, 182, 212, 0.2)"
                            stroke="#06b6d4"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                                duration: 2,
                                delay: index * 0.1,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <text
                            x={node.x}
                            y={node.y + node.size + 12}
                            textAnchor="middle"
                            fill="#06b6d4"
                            fontSize="8"
                            fontFamily="monospace"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Ambient Glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity
                }}
            />
        </div>
    );
}
