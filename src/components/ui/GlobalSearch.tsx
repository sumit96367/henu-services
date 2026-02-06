'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchContent, GroupedResults, SearchItem } from '@/lib/searchData';

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GroupedResults | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults(null);
            return;
        }

        const timer = setTimeout(async () => {
            const searchResults = await searchContent(query);
            setResults(searchResults);
            setSelectedIndex(-1);
        }, 200);

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setQuery('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Get all results as flat array
    const getAllResults = useCallback((): SearchItem[] => {
        if (!results) return [];
        return [
            ...results.pages,
            ...results.services,
            ...results.software,
            ...results.categories,
            ...results.policies
        ];
    }, [results]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const allResults = getAllResults();

            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < allResults.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                const selected = allResults[selectedIndex];
                if (selected) {
                    handleResultClick(selected);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, getAllResults]);

    const handleResultClick = (item: SearchItem) => {
        router.push(item.href);
        setIsOpen(false);
        setQuery('');
        setResults(null);
    };

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
        setResults(null);
    };

    // Highlight matched text
    const highlightText = (text: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={i} className="bg-cyan-500/30 text-cyan-300 rounded px-0.5">
                            {part}
                        </mark>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </>
        );
    };

    // Result group component
    const ResultGroup = ({ title, items }: { title: string; items: SearchItem[] }) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-2">
                <div className="px-3 py-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        {title}
                    </span>
                </div>
                {items.map((item, idx) => {
                    const globalIndex = getAllResults().indexOf(item);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                        <button
                            key={`${item.type}-${idx}`}
                            onClick={() => handleResultClick(item)}
                            className={`w-full text-left px-3 py-2 transition-all duration-150 ${isSelected
                                ? 'bg-cyan-500/20 border-l-2 border-cyan-500'
                                : 'hover:bg-white/5 border-l-2 border-transparent'
                                }`}
                        >
                            <div className="text-white font-medium text-sm truncate">
                                {highlightText(item.title)}
                            </div>
                            {item.category && (
                                <div className="text-xs text-gray-400 truncate mt-0.5">
                                    {item.category}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        );
    };

    const hasResults = results && (
        results.pages.length > 0 ||
        results.services.length > 0 ||
        results.software.length > 0 ||
        results.categories.length > 0 ||
        results.policies.length > 0
    );

    return (
        <div ref={searchRef} className="relative">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    // Search Icon
                    <motion.button
                        key="icon"
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Search size={20} />
                    </motion.button>
                ) : (
                    // Inline Search Bar
                    <motion.div
                        key="search-bar"
                        className="relative"
                        initial={{ width: 40, opacity: 0 }}
                        animate={{ width: 400, opacity: 1 }}
                        exit={{ width: 40, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Search Input with Close Icon */}
                        <div className="relative flex items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-4 pr-10 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                            />
                            <button
                                onClick={handleClose}
                                className="absolute right-2 p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Inline Results Dropdown */}
                        <AnimatePresence>
                            {query.trim() && hasResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full left-0 right-0 mt-2 max-h-[400px] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[200]"
                                >
                                    <div className="py-2">
                                        <ResultGroup title="Pages" items={results.pages} />
                                        <ResultGroup title="Services" items={results.services} />
                                        <ResultGroup title="Software" items={results.software} />
                                        <ResultGroup title="Categories" items={results.categories} />
                                    </div>
                                </motion.div>
                            )}
                            {query.trim() && !hasResults && results && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[200]"
                                >
                                    <div className="py-6 px-4 text-center text-gray-400 text-sm">
                                        No results found for "{query}"
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
