'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Search,
    ChevronDown,
    Loader2,
    Plus,
    Eye,
    Calendar,
    Tag
} from 'lucide-react';

// Quote interface with comprehensive status tracking
interface Quote {
    id: string;
    serviceType: string;
    projectTitle?: string;
    description: string;
    status: string;
    createdAt: Date | { toDate: () => Date };
    amount?: string | number;
    email?: string;
}

// Status options for filtering
const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'Quotation Pending', label: 'Quotation Pending' },
    { value: 'Customer Review Pending', label: 'Customer Review Pending' },
    { value: 'Admin Review Pending', label: 'Admin Review Pending' },
    { value: 'Quotation', label: 'Quotation' },
    { value: 'Quote Rejected', label: 'Quote Rejected' },
    { value: 'Quotation Approved', label: 'Quotation Approved' },
    { value: 'Quote Cancelled', label: 'Quote Cancelled' },
    { value: 'Quotation Completed', label: 'Quotation Completed' },
    { value: 'Quotation Partially Completed', label: 'Quotation Partially Completed' },
    // Legacy statuses for backward compatibility
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

// Get status badge colors
const getStatusColors = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower.includes('pending') || statusLower === 'quotation') {
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
    if (statusLower.includes('approved') || statusLower.includes('completed')) {
        return 'bg-green-500/10 text-green-400 border-green-500/20';
    }
    if (statusLower.includes('rejected')) {
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
    if (statusLower.includes('cancelled')) {
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
    if (statusLower.includes('review')) {
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }

    return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
};

export default function QuotesPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !authLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router, mounted]);

    useEffect(() => {
        if (user && isAuthenticated) {
            fetchQuotes();
        }
    }, [user, isAuthenticated]);

    const fetchQuotes = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            // Fetch from Firebase directly (similar to existing dashboard implementation)
            const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
            const { db } = await import('@/lib/firebase');

            const quotesRef = collection(db, 'queries');
            const q = query(
                quotesRef,
                where('email', '==', user.email),
                orderBy('timestamp', 'desc')
            );
            const snapshot = await getDocs(q);

            const fetchedQuotes: Quote[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    serviceType: data.domain || data.subDomain || 'General Query',
                    projectTitle: data.projectTitle || data.domain,
                    description: data.queries || data.description || '',
                    status: data.status || 'pending',
                    createdAt: data.timestamp || data.createdAt || new Date(),
                    amount: data.amount,
                    email: data.email,
                };
            });

            setQuotes(fetchedQuotes);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter and search logic
    const filteredQuotes = useMemo(() => {
        return quotes.filter(quote => {
            // Status filter
            const statusMatch = statusFilter === 'all' || quote.status === statusFilter;

            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const searchMatch = searchQuery === '' ||
                quote.id.toLowerCase().includes(searchLower) ||
                quote.projectTitle?.toLowerCase().includes(searchLower) ||
                quote.serviceType.toLowerCase().includes(searchLower) ||
                quote.description.toLowerCase().includes(searchLower);

            return statusMatch && searchMatch;
        });
    }, [quotes, statusFilter, searchQuery]);

    const formatDate = (date: Date | { toDate: () => Date }) => {
        const dateObj = date instanceof Date ? date : date.toDate();
        return dateObj.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (!mounted || authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    <p className="text-gray-400 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 pt-28 pb-12">
            {/* Header Section */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Quotes</h1>
                    <p className="text-gray-500">View and manage your quote requests</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/request-quote')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
                >
                    <Plus className="w-5 h-5" />
                    <span>Request Quote</span>
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
                    {/* Status Filter Dropdown */}
                    <div className="relative w-full sm:w-64">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-gray-300 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-200"
                        >
                            <span className="text-sm font-medium truncate">
                                {STATUS_OPTIONS.find(opt => opt.value === statusFilter)?.label || 'All Status'}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 min-w-[280px] w-full bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 max-h-[400px] overflow-y-auto"
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: '#6D28D9 rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        {STATUS_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setStatusFilter(option.value);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${statusFilter === option.value
                                                    ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500'
                                                    : 'text-gray-300 hover:bg-white/[0.05] border-l-2 border-transparent'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 w-full sm:max-w-md">
                        <input
                            type="text"
                            placeholder="Search by project name or quote ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {
                isLoading ? (
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-20 flex justify-center items-center min-h-[400px]">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : filteredQuotes.length === 0 ? (
                    // Empty State
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-16 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                                <FileText className="w-12 h-12 text-gray-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {quotes.length === 0 ? 'No Quotes Available' : 'No Results Found'}
                            </h3>
                            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                                {quotes.length === 0
                                    ? 'Submit a request to receive a quotation.'
                                    : 'Try adjusting your filters or search query.'}
                            </p>
                            {quotes.length === 0 && (
                                <button
                                    onClick={() => router.push('/dashboard/request-quote')}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                                >
                                    <Plus className="w-5 h-5" />
                                    Request Quote
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    // Quotes Table
                    <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Quote ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Service
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Date Submitted
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuotes.map((quote, index) => (
                                        <tr
                                            key={quote.id}
                                            className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                                                }`}
                                        >
                                            <td className="px-6 py-5">
                                                <code className="text-sm text-purple-400 font-mono font-semibold">
                                                    #{quote.id.slice(0, 8).toUpperCase()}
                                                </code>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-white font-medium">
                                                        {quote.serviceType}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {formatDate(quote.createdAt)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColors(quote.status)}`}>
                                                    {quote.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <button
                                                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-lg font-medium text-sm transition-all duration-200"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
