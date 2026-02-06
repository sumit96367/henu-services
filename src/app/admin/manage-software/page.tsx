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
        formLink: ''
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
            formLink: software.formLink || ''
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
                    formLink: editForm.formLink
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-12">
            <div className="max-w-full mx-auto px-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        Manage Software
                    </h1>
                    <p className="text-gray-400 text-lg">
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
                            className={`mb-6 p-6 rounded-lg flex items-center gap-4 ${notification.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}
                        >
                            {notification.type === 'success' ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <AlertTriangle className="w-6 h-6" />
                            )}
                            <span className="font-medium text-lg">{notification.message}</span>
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

                {/* Software Table */}
                {!loading && (
                    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden" style={{ padding: '0.5cm' }}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-8 py-6 text-left text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                            Software Name
                                        </th>
                                        <th className="px-8 py-6 text-left text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-8 py-6 text-left text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                            Form Link
                                        </th>
                                        <th className="px-8 py-6 text-left text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-8 py-6 text-right text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {allSoftware.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="font-medium text-white text-lg">
                                                    {item.title}
                                                </div>
                                                <div className="text-base text-gray-400 mt-2 line-clamp-2">
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-2 bg-white/5 text-gray-300 rounded text-sm font-medium"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {item.formLink ? (
                                                    <a
                                                        href={item.formLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-cyan-400 hover:text-cyan-300 text-base underline font-medium"
                                                    >
                                                        View Form
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500 text-base">No link</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6">
                                                {isHardcoded(item.id) ? (
                                                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-base font-medium flex items-center gap-2 w-fit">
                                                        <Lock className="w-4 h-4" />
                                                        Built-in
                                                    </span>
                                                ) : (
                                                    <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-base font-medium">
                                                        Custom
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex gap-3 justify-end">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-all font-medium text-base bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(item.id)}
                                                        disabled={isHardcoded(item.id)}
                                                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-all font-medium text-base ${isHardcoded(item.id)
                                                            ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                                                            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:shadow-lg hover:shadow-red-500/20'
                                                            }`}
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                        Delete
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
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => !isSaving && setEditingSoftware(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                                style={{ padding: '0.5cm' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-3xl font-bold text-white mb-8">Edit Software</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2cm' }}>
                                    {/* Name */}
                                    <div>
                                        <label className="block text-base font-medium text-gray-300 mb-3">
                                            Software Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-base focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-base font-medium text-gray-300 mb-3">
                                            Description *
                                        </label>
                                        <textarea
                                            value={editForm.description}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            rows={5}
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-base focus:outline-none focus:border-cyan-500/50 resize-none"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-base font-medium text-gray-300 mb-3">
                                            Category *
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.category}
                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                            placeholder="e.g., Healthcare, E-commerce, Finance"
                                            required
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-base font-medium text-gray-300 mb-3">
                                            Tags (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.tags}
                                            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                                            placeholder="e.g., Healthcare, Management, Digital"
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>

                                    {/* Form Link */}
                                    <div>
                                        <label className="block text-base font-medium text-gray-300 mb-3">
                                            Google Form Link
                                        </label>
                                        <input
                                            type="url"
                                            value={editForm.formLink}
                                            onChange={(e) => setEditForm({ ...editForm, formLink: e.target.value })}
                                            placeholder="https://forms.google.com/your-form-link"
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setEditingSoftware(null)}
                                        disabled={isSaving}
                                        className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-base rounded-lg transition-colors font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={isSaving}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-base rounded-lg transition-all font-medium disabled:opacity-50 hover:shadow-lg hover:shadow-cyan-500/50"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
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
                                        {allSoftware.find(s => s.id === deleteId)?.title}
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
