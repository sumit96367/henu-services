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
    Tag,
    ArrowLeft
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
        <div
            className="min-h-screen bg-[#050505] text-white"
            style={{
                padding: '120px max(24px, 5%) 100px max(24px, 5%)',
                maxWidth: '1400px',
                margin: '0 auto'
            }}
        >
            <style jsx global>{`
                @media (max-width: 768px) {
                    .quotes-container {
                        padding-top: 140px !important;
                        padding-left: 20px !important;
                        padding-right: 20px !important;
                    }
                }
            `}</style>
            <div className="quotes-container">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex justify-end w-full mb-8">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black tracking-[0.2em] uppercase text-[10px]">Back</span>
                        </button>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Quotes</h1>
                        <p className="text-gray-500 font-medium text-[13px] text-center md:text-left">Track and manage your bespoke quote requests and project valuations</p>
                        <div className="h-1 w-16 bg-purple-500/40 rounded-full mt-1" />
                    </div>
                </div>


                {/* Content Container */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden" style={{ padding: 'max(20px, 4%)' }}>
                    {isLoading ? (
                        <div className="p-20 flex justify-center items-center">
                            <Loader2 className="animate-spin text-purple-500" size={32} />
                        </div>
                    ) : filteredQuotes.length === 0 ? (
                        <div className="text-center" style={{ padding: '60px' }}>
                            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-2xl">
                                <FileText size={40} className="text-purple-400 opacity-60" strokeWidth={1} />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">No quotes found</h3>
                            <p className="text-gray-500 text-lg font-medium">Submit a request to receive a bespoke quotation.</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {filteredQuotes.map((quote) => (
                                <div key={quote.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all group"
                                    style={{ padding: '60px' }}
                                >
                                    <div className="flex gap-6 items-start">
                                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                                            <FileText className="text-purple-400" size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>
                                                {quote.serviceType}
                                            </div>
                                            <div className="flex items-center gap-2" style={{ marginTop: '8px' }}>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded-md">#{quote.id.slice(0, 8).toUpperCase()}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                                <span className="text-[10px] text-gray-500 font-medium">{formatDate(quote.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between md:justify-end">
                                        <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColors(quote.status)}`}>
                                                {quote.status}
                                            </span>
                                        </div>
                                        <button
                                            className="flex items-center gap-2 px-6 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-200"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
