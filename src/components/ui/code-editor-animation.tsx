'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CODE_LINES = [
    'import { useState } from "react";',
    '',
    'function App() {',
    '  const [count, setCount] = useState(0);',
    '',
    '  return (',
    '    <div className="app">',
    '      <h1>Count: {count}</h1>',
    '      <button onClick={() => setCount(count + 1)}>',
    '        Increment',
    '      </button>',
    '    </div>',
    '  );',
    '}',
];

export default function CodeEditorAnimation() {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        // Type effect
        const typeInterval = setInterval(() => {
            setVisibleLines(prev => {
                if (prev >= CODE_LINES.length) {
                    setTimeout(() => setVisibleLines(0), 2000);
                    return prev;
                }
                return prev + 1;
            });
        }, 300);

        // Cursor blink
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 530);

        return () => {
            clearInterval(typeInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-black p-8">
            {/* Editor Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-sm font-mono">App.tsx</span>
            </div>

            {/* Code Lines */}
            <div className="font-mono text-sm space-y-1">
                {CODE_LINES.slice(0, visibleLines).map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-gray-600 text-xs w-6 text-right">{index + 1}</span>
                        <span className={getLineColor(line)}>{line || '\u00A0'}</span>
                    </motion.div>
                ))}
                {visibleLines < CODE_LINES.length && (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-xs w-6 text-right">{visibleLines + 1}</span>
                        <AnimatePresence>
                            {cursorVisible && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-2 h-4 bg-purple-400"
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}

function getLineColor(line: string): string {
    if (line.includes('import') || line.includes('from')) return 'text-pink-400';
    if (line.includes('function') || line.includes('const') || line.includes('return')) return 'text-purple-400';
    if (line.includes('useState')) return 'text-cyan-400';
    if (line.includes('<') || line.includes('>')) return 'text-green-400';
    if (line.includes('{') || line.includes('}')) return 'text-yellow-400';
    return 'text-gray-300';
}
