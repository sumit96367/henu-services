'use client';

import { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, Package, Edit, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Hardcoded projects from portfolio
const hardcodedProjects = [
    { id: 1, title: 'Hospital Management System', category: 'all', description: 'Comprehensive healthcare management solution with patient records, appointment scheduling, billing, inventory management, and analytics. Streamline your hospital operations with our advanced digital platform.', image: '/projects/hospital.jpg', tags: ['Healthcare', 'Management', 'Digital'], color: 'from-purple-500 to-pink-500', formLink: '', stats: { metric: 'HMS', label: 'Solution' } },
    { id: 2, title: 'Accounting Software', category: 'all', description: 'Complete accounting solution for businesses with GST compliance, invoicing, expense tracking, financial reports, and tax management. Simplify your financial operations with automated workflows.', image: '/projects/accounting.jpg', tags: ['Finance', 'GST', 'Invoicing'], color: 'from-green-500 to-emerald-500', formLink: '', stats: { metric: 'Accounting', label: 'Software' } },
    { id: 3, title: 'Hotel Management System', category: 'all', description: 'All-in-one hotel management platform featuring room booking, guest management, POS integration, housekeeping, and revenue analytics. Enhance guest experiences and operational efficiency.', image: '/projects/hotel.jpg', tags: ['Hospitality', 'Booking', 'POS'], color: 'from-amber-500 to-orange-500', formLink: '', stats: { metric: 'Hotel', label: 'System' } },
    { id: 4, title: 'School / College Fees Management System', category: 'all', description: 'Comprehensive educational institution management with student enrollment, fee collection, attendance tracking, grade management, and parent portal. Digitize your campus operations.', image: '/projects/school.jpg', tags: ['Education', 'Fees', 'Management'], color: 'from-blue-500 to-indigo-500', formLink: '', stats: { metric: 'Education', label: 'Platform' } },
    { id: 5, title: 'Restaurant Management System', category: 'all', description: 'Complete restaurant solution with table management, order processing, kitchen display, inventory tracking, and billing. Optimize your restaurant workflow and customer service.', image: '/projects/restaurant.jpg', tags: ['Restaurant', 'POS', 'Kitchen'], color: 'from-red-500 to-pink-500', formLink: '', stats: { metric: 'Restaurant', label: 'Solution' } },
    { id: 6, title: 'Travel Agency Management System', category: 'all', description: 'End-to-end travel agency platform with booking management, itinerary creation, payment processing, customer management, and vendor coordination. Grow your travel business digitally.', image: '/projects/travel.jpg', tags: ['Travel', 'Booking', 'CRM'], color: 'from-teal-500 to-green-500', formLink: '', stats: { metric: 'Travel', label: 'Platform' } },
    { id: 7, title: 'Pharmacy Management System', category: 'all', description: 'Advanced pharmacy software with inventory management, prescription tracking, billing, expiry alerts, and sales analytics. Ensure compliance and efficient pharmacy operations.', image: '/projects/pharmacy.jpg', tags: ['Pharmacy', 'Inventory', 'Billing'], color: 'from-green-500 to-teal-500', formLink: '', stats: { metric: 'Pharmacy', label: 'Software' } },
    { id: 8, title: 'E-commerce Solutions', category: 'all', description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, order management, and customer analytics. Launch your online store with confidence.', image: '/projects/ecommerce.jpg', tags: ['E-commerce', 'Online Store', 'Payment'], color: 'from-orange-500 to-red-500', formLink: '', stats: { metric: 'E-commerce', label: 'Platform' } },
    { id: 9, title: 'Employee Management System', category: 'all', description: 'Complete HR and employee management solution with attendance, payroll, leave management, performance tracking, and employee portal. Streamline your workforce management.', image: '/projects/employee.jpg', tags: ['HR', 'Payroll', 'Attendance'], color: 'from-indigo-500 to-purple-500', formLink: '', stats: { metric: 'HRMS', label: 'Solution' } },
    { id: 10, title: 'Invoicing System', category: 'all', description: 'Professional invoicing and billing software with customizable templates, automatic payment reminders, expense tracking, and financial reports. Get paid faster and stay organized.', image: '/projects/invoicing.jpg', tags: ['Invoicing', 'Billing', 'Finance'], color: 'from-yellow-500 to-amber-500', formLink: '', stats: { metric: 'Invoicing', label: 'System' } },
    { id: 11, title: 'Inventory Management System', category: 'all', description: 'Robust inventory management solution with stock tracking, purchase orders, warehouse management, supplier management, and real-time reports. Optimize your inventory control.', image: '/projects/inventory.jpg', tags: ['Inventory', 'Warehouse', 'Stock'], color: 'from-pink-500 to-rose-500', formLink: '', stats: { metric: 'Inventory', label: 'System' } },
];

interface Software {
    id: number;
    title: string;
    category: string;
    description: string;
    tags: string[];
    color: string;
    formLink?: string;
    paymentLink?: string;
}

export default function ManageSoftwarePage() {
    const [allSoftware, setAllSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editingSoftware, setEditingSoftware] = useState<Software | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        category: '',
        tags: '',
        formLink: '',
        paymentLink: ''
    });
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    // Fetch custom software and merge with hardcoded
    useEffect(() => {
        fetchAllSoftware();
    }, []);

    const fetchAllSoftware = async () => {
        try {
            const response = await fetch('/api/admin/software');
            const data = await response.json();
            const customSoftware = data.software || [];

            // Merge hardcoded and custom software
            setAllSoftware([...hardcodedProjects, ...customSoftware]);
        } catch (error) {
            console.error('Error fetching software:', error);
            // Show hardcoded on error
            setAllSoftware(hardcodedProjects);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (software: Software) => {
        setEditingSoftware(software);
        setEditForm({
            name: software.title,
            description: software.description,
            category: software.category || '',
            tags: software.tags.join(', '),
            formLink: software.formLink || '',
            paymentLink: software.paymentLink || ''
        });
    };

    const handleUpdate = async () => {
        if (!editingSoftware) return;

        setIsSaving(true);
        try {
            const tagsArray = editForm.tags.split(',').map(t => t.trim()).filter(t => t);

            const response = await fetch('/api/admin/software', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingSoftware.id,
                    name: editForm.name,
                    description: editForm.description,
                    category: editForm.category,
                    tags: tagsArray,
                    formLink: editForm.formLink,
                    paymentLink: editForm.paymentLink
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update');
            }

            // Update local state
            setAllSoftware(allSoftware.map(s =>
                s.id === editingSoftware.id ? { ...s, ...data.software } : s
            ));

            setNotification({
                type: 'success',
                message: 'Software updated successfully!'
            });
            setEditingSoftware(null);
        } catch (error: any) {
            setNotification({
                type: 'error',
                message: error.message || 'Failed to update software'
            });
        } finally {
            setIsSaving(false);
            setTimeout(() => setNotification(null), 3000);
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
            setAllSoftware(allSoftware.filter(s => s.id !== id));
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

    const isHardcoded = (id: number) => id < 1000;

    return (
        <div className="manage-software-container">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="page-header" style={{ marginBottom: "48px" }}>
                    <h1
                        style={{
                            fontWeight: "900",
                            marginBottom: "12px",
                            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.03em"
                        }}
                        className="page-title"
                    >
                        Manage Software
                    </h1>
                    <p className="page-subtitle" style={{ color: "#888", fontWeight: "500" }}>
                        View and manage all software entries
                    </p>
                </div>

                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-8 p-6 rounded-2xl flex items-center gap-4 backdrop-blur-xl ${notification.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}
                        >
                            {notification.type === 'success' ? (
                                <CheckCircle2 className="w-8 h-8" />
                            ) : (
                                <AlertTriangle className="w-8 h-8" />
                            )}
                            <span className="font-bold text-lg">{notification.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-24">
                        <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 mt-6 font-bold uppercase tracking-widest text-sm">Synchronizing Database...</p>
                    </div>
                )}

                {/* Software Table */}
                {!loading && (
                    <div
                        className="table-card"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            borderRadius: "32px",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            overflow: "hidden",
                            backdropFilter: "blur(20px)"
                        }}
                    >
                        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="px-10 py-8 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            Software Name
                                        </th>
                                        <th className="px-10 py-8 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            Tags
                                        </th>
                                        <th className="px-10 py-8 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            Form Link
                                        </th>
                                        <th className="px-10 py-8 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            Type
                                        </th>
                                        <th className="px-10 py-8 text-right text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {allSoftware.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-white/[0.03] transition-all duration-300"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="font-black text-white text-xl mb-2">
                                                    {item.title}
                                                </div>
                                                <div className="text-base text-gray-500 line-clamp-2 leading-relaxed max-w-md">
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/5"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                {item.formLink ? (
                                                    <a
                                                        href={item.formLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-black uppercase tracking-widest flex items-center gap-2 group"
                                                    >
                                                        View Form
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-10 py-8">
                                                {isHardcoded(item.id) ? (
                                                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-xs font-black uppercase tracking-widest border border-purple-500/20 flex items-center gap-2 w-fit">
                                                        <Lock className="w-4 h-4" />
                                                        Internal
                                                    </span>
                                                ) : (
                                                    <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-500/20 flex items-center gap-2 w-fit">
                                                        <Package className="w-4 h-4" />
                                                        External
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex gap-3 justify-end items-center">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/20 transition-all active:scale-95"
                                                        title="Edit Software"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(item.id)}
                                                        disabled={isHardcoded(item.id)}
                                                        className={`p-3 rounded-xl border transition-all active:scale-95 ${isHardcoded(item.id)
                                                            ? 'bg-gray-500/5 text-gray-700 border-transparent cursor-not-allowed opacity-30'
                                                            : 'bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border-white/10 hover:border-red-500/20'
                                                            }`}
                                                        title={isHardcoded(item.id) ? "Built-in software cannot be deleted" : "Delete Software"}
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                <AnimatePresence>
                    {editingSoftware && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[100] p-6 lg:p-12"
                            onClick={() => !isSaving && setEditingSoftware(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[40px] max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto modal-content"
                                style={{ padding: '64px' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h2 className="text-4xl font-black text-white mb-2">Edit Asset</h2>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Modify software parameters</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingSoftware(null)}
                                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid gap-8">
                                    {/* Name & Category Row */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="input-group">
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                                Software Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                                Category *
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.category}
                                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                placeholder="e.g., Healthcare, CRM"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="input-group">
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                            Detailed Description *
                                        </label>
                                        <textarea
                                            value={editForm.description}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            rows={6}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Links Row */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="input-group">
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                                Documentation Link
                                            </label>
                                            <input
                                                type="url"
                                                value={editForm.formLink}
                                                onChange={(e) => setEditForm({ ...editForm, formLink: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                                Transaction Page
                                            </label>
                                            <input
                                                type="url"
                                                value={editForm.paymentLink}
                                                onChange={(e) => setEditForm({ ...editForm, paymentLink: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Tokens */}
                                    <div className="input-group">
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                                            Search Tags (Comma Separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.tags}
                                            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                                            placeholder="tag1, tag2..."
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse md:flex-row gap-4 mt-12">
                                    <button
                                        onClick={() => setEditingSoftware(null)}
                                        disabled={isSaving}
                                        className="flex-1 px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={isSaving}
                                        className="flex-1 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95"
                                    >
                                        {isSaving ? 'Synchronizing...' : 'Apply Changes'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {deleteId !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-[110] p-6"
                            onClick={() => !isDeleting && setDeleteId(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="bg-gray-900 border border-red-500/20 rounded-[40px] p-12 max-w-lg w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col items-center text-center mb-10">
                                    <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                                        <AlertTriangle className="w-12 h-12 text-red-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4">
                                        Dangerous Action
                                    </h3>
                                    <p className="text-gray-400 font-bold leading-relaxed">
                                        Are you absolutely sure you want to delete{' '}
                                        <span className="text-white underline decoration-red-500/50">
                                            {allSoftware.find(s => s.id === deleteId)?.title}
                                        </span>
                                        ? This data will be purged immediately.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => handleDelete(deleteId)}
                                        disabled={isDeleting}
                                        className="w-full px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-95"
                                    >
                                        {isDeleting ? 'Purging...' : 'Yes, Delete Asset'}
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        disabled={isDeleting}
                                        className="w-full px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all"
                                    >
                                        Cancel Action
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .manage-software-container {
                    padding: 0;
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-title {
                    font-size: 3.5rem;
                }
                .page-subtitle {
                    font-size: 1.25rem;
                }

                @media (max-width: 1024px) {
                    .page-title { font-size: 2.75rem; }
                    .modal-content { padding: 48px !important; }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2.25rem; }
                    .table-card { borderRadius: 24px !important; }
                    .modal-content { padding: 32px 24px !important; borderRadius: 32px !important; }
                    .modal-content h2 { font-size: 2rem; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 2rem; }
                    .page-subtitle { font-size: 1rem; }
                    .modal-content { padding: 24px 16px !important; }
                }
            `}</style>
        </div>
    );

}
