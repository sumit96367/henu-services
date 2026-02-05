'use client';

import { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Software {
    id: number;
    title: string;
    category: string;
    description: string;
    tags: string[];
    color: string;
}

export default function ManageSoftwarePage() {
    const [software, setSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    // Fetch all custom software
    useEffect(() => {
        fetchSoftware();
    }, []);

    const fetchSoftware = async () => {
        try {
            const response = await fetch('/api/admin/software');
            const data = await response.json();
            setSoftware(data.software || []);
        } catch (error) {
            console.error('Error fetching software:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/software?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete');
            }

            // Success - update local state
            setSoftware(software.filter(s => s.id !== id));
            setNotification({
                type: 'success',
                message: 'Software deleted successfully!'
            });
            setDeleteId(null);
        } catch (error: any) {
            setNotification({
                type: 'error',
                message: error.message || 'Failed to delete software'
            });
        } finally {
            setIsDeleting(false);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Manage Software
                    </h1>
                    <p className="text-gray-400">
                        View and delete custom software entries
                    </p>
                </div>

                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${notification.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}
                        >
                            {notification.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <AlertTriangle className="w-5 h-5" />
                            )}
                            <span className="font-medium">{notification.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 mt-4">Loading software...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && software.length === 0 && (
                    <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10" style={{ padding: '1cm' }}>
                        <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            No Custom Software
                        </h3>
                        <p className="text-gray-400 mb-6">
                            You haven't added any custom software yet.
                        </p>
                        <a
                            href="/admin/software"
                            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-white/50 transition-all"
                        >
                            Add Software
                        </a>
                    </div>
                )}

                {/* Software Table */}
                {!loading && software.length > 0 && (
                    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden" style={{ padding: '1cm' }}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                                            Software Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {software.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white">
                                                    {item.title}
                                                </div>
                                                <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium capitalize">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setDeleteId(item.id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/20 font-medium"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {deleteId !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => !isDeleting && setDeleteId(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            Confirm Deletion
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            This action cannot be undone
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete{' '}
                                    <span className="font-semibold text-white">
                                        {software.find(s => s.id === deleteId)?.title}
                                    </span>
                                    ? This will permanently remove it from your portfolio.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        disabled={isDeleting}
                                        className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteId)}
                                        disabled={isDeleting}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/50"
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
