'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchContent, GroupedResults, SearchItem } from '@/lib/searchData';

const highlightText = (text: string, query: string) => {
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

interface ResultGroupProps {
    title: string;
    items: SearchItem[];
    query: string;
    selectedIndex: number;
    allResults: SearchItem[];
    onResultClick: (item: SearchItem) => void;
}

const ResultGroup = ({ title, items, query, selectedIndex, allResults, onResultClick }: ResultGroupProps) => {
    if (items.length === 0) return null;

    return (
        <div className="mb-2">
            <div className="px-3 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {title}
                </span>
            </div>
            {items.map((item, idx) => {
                const globalIndex = allResults.indexOf(item);
                const isSelected = globalIndex === selectedIndex;

                return (
                    <button
                        key={`${item.type}-${idx}`}
                        onClick={() => onResultClick(item)}
                        className={`w-full text-left px-3 py-2 transition-all duration-150 ${isSelected
                            ? 'bg-cyan-500/20 border-l-2 border-cyan-500'
                            : 'hover:bg-white/5 border-l-2 border-transparent'
                            }`}
                    >
                        <div className="text-white font-medium text-sm truncate">
                            {highlightText(item.title, query)}
                        </div>
                        {item.category && (
                            <div className="text-xs text-gray-400 truncate mt-0.5">
                                {highlightText(item.category, query)}
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GroupedResults | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchRefMobile = useRef<HTMLDivElement>(null);
    const searchRefDesktop = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounced search
    useEffect(() => {
        const queryTrimmed = query.trim();
        if (!queryTrimmed) return;

        const timer = setTimeout(async () => {
            const searchResults = await searchContent(queryTrimmed);
            setResults(searchResults);
            setSelectedIndex(-1);
        }, 200);

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const isMobileClick = searchRefMobile.current && !searchRefMobile.current.contains(e.target as Node);
            const isDesktopClick = searchRefDesktop.current && !searchRefDesktop.current.contains(e.target as Node);

            if (isMobileClick && isDesktopClick) {
                setIsOpen(false);
                setQuery('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Focus handler - called when animation completes
    const handleAnimationComplete = () => {
        // Only focus if we're still open (not during close animation)
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Multi-layered focus strategy to ensure immediate focus
    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Immediate attempt
            inputRef.current.focus();

            // Backup attempt after 50ms
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const activeResults = query.trim() ? results : null;

    // Get all results as flat array (sections first due to highest priority)
    const getAllResults = useCallback((): SearchItem[] => {
        if (!activeResults) return [];
        return [
            ...activeResults.sections,
            ...activeResults.pages,
            ...activeResults.services,
            ...activeResults.software,
            ...activeResults.categories,
            ...activeResults.policies
        ];
    }, [activeResults]);

    const handleResultClick = useCallback((item: SearchItem) => {
        router.push(item.href);
        setIsOpen(false);
        setQuery('');
        setResults(null);
    }, [router]);

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
            } else if (e.key === 'Enter') {
                e.preventDefault();

                // If item selected, navigate to it
                if (selectedIndex >= 0 && allResults[selectedIndex]) {
                    handleResultClick(allResults[selectedIndex]);
                }
                // If Enter pressed with query but no selection, go to best match
                else if (query.trim() && allResults.length > 0) {
                    handleResultClick(allResults[0]); // Redirect to top match
                }
                // If no matches, redirect to site map
                else if (query.trim() && allResults.length === 0) {
                    router.push('/site-map');
                    setIsOpen(false);
                    setQuery('');
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, query, results, router, getAllResults, handleResultClick]);

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
        setResults(null);
    };

    const hasResults = activeResults && (
        activeResults.sections.length > 0 ||
        activeResults.pages.length > 0 ||
        activeResults.services.length > 0 ||
        activeResults.software.length > 0 ||
        activeResults.categories.length > 0 ||
        activeResults.policies.length > 0
    );

    const allResults = getAllResults();

    return (
        <>
            {/* MOBILE VERSION - Inline Expanding Search (hidden on md+) */}
            <div ref={searchRefMobile} className="relative md:hidden">
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
                            animate={{ width: 300, opacity: 1 }}
                            exit={{ width: 40, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onAnimationComplete={handleAnimationComplete}
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
                                {query.trim() && hasResults && activeResults && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 right-0 mt-2 max-h-[400px] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[200]"
                                    >
                                        <div className="py-2">
                                            <ResultGroup title="Products & Features" items={activeResults.sections} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                            <ResultGroup title="Pages" items={activeResults.pages} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                            <ResultGroup title="Services" items={activeResults.services} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                            <ResultGroup title="Software" items={activeResults.software} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                            <ResultGroup title="Categories" items={activeResults.categories} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                        </div>
                                    </motion.div>
                                )}
                                {query.trim() && !hasResults && activeResults && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[200]"
                                    >
                                        <div className="py-6 px-4 text-center text-gray-400 text-sm">
                                            No results found for &quot;{query}&quot;
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* DESKTOP VERSION - Dropdown Search (hidden below md) */}
            <div ref={searchRefDesktop} className="relative hidden md:block">
                {/* Search Icon - Always Visible */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                    <Search size={20} />
                </button>

                {/* Dropdown Search Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute top-full right-0 mt-2 w-[400px] max-w-[90vw] z-[200]"
                            onAnimationComplete={handleAnimationComplete}
                        >
                            {/* Search Input Container */}
                            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                                {/* Search Input with Close Icon */}
                                <div className="relative flex items-center p-3 border-b border-white/10">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full pl-4 pr-10 py-2.5 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={handleClose}
                                        className="absolute right-5 p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Results Section */}
                                <AnimatePresence>
                                    {query.trim() && hasResults && activeResults && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="max-h-[400px] overflow-y-auto"
                                        >
                                            <div className="py-2">
                                                <ResultGroup title="Products & Features" items={activeResults.sections} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                                <ResultGroup title="Pages" items={activeResults.pages} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                                <ResultGroup title="Services" items={activeResults.services} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                                <ResultGroup title="Software" items={activeResults.software} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                                <ResultGroup title="Categories" items={activeResults.categories} query={query} selectedIndex={selectedIndex} allResults={allResults} onResultClick={handleResultClick} />
                                            </div>
                                        </motion.div>
                                    )}
                                    {query.trim() && !hasResults && activeResults && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="py-6 px-4 text-center text-gray-400 text-sm"
                                        >
                                            No results found for &quot;{query}&quot;
                                        </motion.div>
                                    )}
                                    {!query.trim() && (
                                        <div className="py-6 px-4 text-center text-gray-500 text-sm">
                                            Start typing to search...
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
