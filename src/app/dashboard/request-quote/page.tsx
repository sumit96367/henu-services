'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Upload,
    X,
    FileText,
    Loader2,
    Calendar,
    DollarSign,
    Briefcase,
    AlignLeft
} from 'lucide-react';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Service options
const SERVICE_TYPES = [
    'Web Development',
    'Backend Development',
    'Mobile App Development',
    'AI Automations',
    'Graphic Design',
    'Digital Marketing',
    'Legal Services',
    'Funding Solutions',
];

// Budget ranges
const BUDGET_RANGES = [
    'Under ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    'Above ₹10,00,000',
];

interface FormData {
    serviceType: string;
    projectTitle: string;
    description: string;
    budgetRange: string;
    timeline: string;
    attachments: File[];
}

export default function RequestQuotePage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<FormData>({
        serviceType: '',
        projectTitle: '',
        description: '',
        budgetRange: '',
        timeline: '',
        attachments: [],
    });

    // Contact information state for summary box
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    // Pre-populate contact info when user loads
    useEffect(() => {
        if (user) {
            const nameParts = user.name?.split(' ') || [];
            setContactInfo({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: user.email || '',
                phone: (user as any).phone || ''
            });
        }
    }, [user]);

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Validation
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.serviceType) {
            newErrors.serviceType = 'Service type is required';
        }
        if (!formData.projectTitle.trim()) {
            newErrors.projectTitle = 'Project title is required';
        }
        if (formData.projectTitle.length > 100) {
            newErrors.projectTitle = 'Project title must be less than 100 characters';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        }
        if (formData.description.length > 2000) {
            newErrors.description = 'Description must be less than 2000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle file selection
    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const validFiles: File[] = [];
        const maxSize = 10 * 1024 * 1024; // 10MB

        Array.from(files).forEach(file => {
            if (file.size > maxSize) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                return;
            }

            const validTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'image/jpeg',
                'image/png',
                'image/gif',
            ];

            if (validTypes.includes(file.type)) {
                validFiles.push(file);
            } else {
                alert(`File ${file.name} is not a supported format.`);
            }
        });

        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...validFiles],
        }));
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    // Remove file
    const removeFile = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!user) {
            alert('You must be logged in to request a quote');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create quote request in Firestore
            const quotesRef = collection(db, 'queries');

            await addDoc(quotesRef, {
                email: user.email,
                fullName: user.name || '',
                domain: formData.projectTitle,
                subDomain: formData.serviceType,
                queries: formData.description,
                budgetRange: formData.budgetRange || 'Not specified',
                timeline: formData.timeline || 'Not specified',
                projectTitle: formData.projectTitle,
                status: 'Quotation Pending',
                timestamp: Timestamp.now(),
                createdAt: Timestamp.now(),
                // Note: File attachments would need to be uploaded to storage
                // This is a simplified version
                hasAttachments: formData.attachments.length > 0,
                attachmentCount: formData.attachments.length,
            });

            // Success - redirect to quotes page
            router.push('/dashboard/quotes');
        } catch (error) {
            console.error('Error submitting quote request:', error);
            alert('Failed to submit quote request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto py-12" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Quotes</span>
            </button>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Request Quote</h1>
                <p className="text-gray-500">Fill out the form below and we'll get back to you with a detailed quotation</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Card - Takes 2/3 width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[32px]"
                    style={{ padding: '60px' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Service Type */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <Briefcase className="w-4 h-4" />
                                Service Type *
                            </label>
                            <select
                                value={formData.serviceType}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, serviceType: e.target.value }));
                                    setErrors(prev => ({ ...prev, serviceType: '' }));
                                }}
                                className={`w-full bg-black/40 border ${errors.serviceType ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all`}
                                style={{ padding: '20px 32px' }}
                            >
                                <option value="">Select a service</option>
                                {SERVICE_TYPES.map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>
                            {errors.serviceType && (
                                <p className="mt-2 text-sm text-red-400">{errors.serviceType}</p>
                            )}
                        </div>

                        {/* Project Title */}
                        <div style={{ marginTop: '32px' }}>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <FileText className="w-4 h-4" />
                                Project Title *
                            </label>
                            <input
                                type="text"
                                value={formData.projectTitle}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, projectTitle: e.target.value }));
                                    setErrors(prev => ({ ...prev, projectTitle: '' }));
                                }}
                                placeholder="e.g., E-commerce Website Development"
                                maxLength={100}
                                className={`w-full bg-black/40 border ${errors.projectTitle ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all placeholder:text-gray-700`}
                                style={{ padding: '20px 32px' }}
                            />
                            <div className="mt-2 flex justify-between items-center">
                                {errors.projectTitle ? (
                                    <p className="text-sm text-red-400">{errors.projectTitle}</p>
                                ) : (
                                    <span />
                                )}
                                <p className="text-xs text-gray-600">{formData.projectTitle.length}/100</p>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div style={{ marginTop: '32px' }}>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <AlignLeft className="w-4 h-4" />
                                Project Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, description: e.target.value }));
                                    setErrors(prev => ({ ...prev, description: '' }));
                                }}
                                placeholder="Describe your project requirements in detail..."
                                rows={6}
                                maxLength={2000}
                                className={`w-full bg-black/40 border ${errors.description ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all placeholder:text-gray-700 resize-vertical`}
                                style={{ padding: '20px 32px' }}
                            />
                            <div className="mt-2 flex justify-between items-center">
                                {errors.description ? (
                                    <p className="text-sm text-red-400">{errors.description}</p>
                                ) : (
                                    <span />
                                )}
                                <p className="text-xs text-gray-600">{formData.description.length}/2000</p>
                            </div>
                        </div>

                        {/* Budget Range (Optional) */}
                        <div style={{ marginTop: '32px' }}>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <DollarSign className="w-4 h-4" />
                                Budget Range <span className="text-gray-600 lowercase">(optional)</span>
                            </label>
                            <select
                                value={formData.budgetRange}
                                onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '20px 32px' }}
                            >
                                <option value="">Select budget range</option>
                                {BUDGET_RANGES.map(range => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                        </div>

                        {/* Timeline (Optional) */}
                        <div style={{ marginTop: '32px' }}>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <Calendar className="w-4 h-4" />
                                Expected Completion Date <span className="text-gray-600 lowercase">(optional)</span>
                            </label>
                            <input
                                type="date"
                                value={formData.timeline}
                                onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full bg-black/40 border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '20px 32px' }}
                            />
                        </div>

                        {/* File Upload (Optional) */}
                        <div style={{ marginTop: '32px' }}>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                <Upload className="w-4 h-4" />
                                Attachments <span className="text-gray-600 lowercase">(optional)</span>
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.xlsx,.xls,image/*"
                                onChange={(e) => handleFileSelect(e.target.files)}
                                className="hidden"
                            />

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-white/10 bg-black/20 hover:border-purple-500/50 hover:bg-purple-500/5'
                                    }`}
                            >
                                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-white font-medium mb-2">
                                    Drag & drop files here or click to browse
                                </p>
                                <p className="text-sm text-gray-500">
                                    PDF, DOC, DOCX, XLSX, or images • Max 10MB per file
                                </p>
                            </div>

                            {/* File List */}
                            {formData.attachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {formData.attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile(index);
                                                }}
                                                className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                                            >
                                                <X className="w-5 h-5 text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </form>
                </motion.div>

                {/* Summary Box - Takes 1/3 width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-[32px] h-fit lg:sticky lg:top-8"
                    style={{ padding: '40px' }}
                >
                    <h3 className="text-xl font-bold text-white mb-6">Quick Summary</h3>

                    <div className="space-y-4">
                        {/* Quote Title */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quote Title <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                value={formData.projectTitle}
                                readOnly
                                className="w-full bg-black/20 border border-white/5 rounded-lg text-white font-medium cursor-not-allowed italic"
                                style={{ padding: '12px 16px' }}
                                placeholder="Enter project title above"
                            />
                        </div>

                        <div className="border-t border-white/5 my-4"></div>

                        {/* First Name */}
                        <div style={{ marginTop: '16px' }}>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                value={contactInfo.firstName}
                                onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-lg text-white font-medium focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '12px 16px' }}
                                placeholder="First Name"
                            />
                        </div>

                        {/* Last Name */}
                        <div style={{ marginTop: '16px' }}>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                value={contactInfo.lastName}
                                onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-lg text-white font-medium focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '12px 16px' }}
                                placeholder="Last Name"
                            />
                        </div>

                        {/* Email ID */}
                        <div style={{ marginTop: '16px' }}>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email ID <span className="text-red-400">*</span></label>
                            <input
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-lg text-white font-medium focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '12px 16px' }}
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Phone */}
                        <div style={{ marginTop: '16px' }}>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                            <input
                                type="tel"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-lg text-white font-medium focus:border-purple-500/50 focus:outline-none transition-all"
                                style={{ padding: '12px 16px' }}
                                placeholder="Phone number"
                            />
                        </div>
                    </div>

                    <div className="border-t border-white/5 my-6"></div>

                    {/* Form Actions */}
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
                                    <span>Send Quote</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
