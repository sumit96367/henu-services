'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import {
    UserCircle,
    Bell,
    Shield,
    Eye,
    Globe,
    Upload,
    Key,
    ChevronRight,
    Package,
    FileText,
    Smartphone,
    Mail,
    Clock,
    Download,
    AlertTriangle,
    UserX,
    Loader2,
    CheckCircle2,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SettingsProps {
    user: any;
    editName: string;
    editCompany: string;
    profilePicture: string | null;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setEditName: (name: string) => void;
    setEditCompany: (company: string) => void;
    setActiveSection: (section: string) => void;
    orders: any[];
    quotes: any[];
    addresses: any[];
}

export default function SettingsInterface({
    user,
    editName,
    editCompany,
    profilePicture,
    fileInputRef,
    handleImageUpload,
    setEditName,
    setEditCompany,
    setActiveSection,
    orders,
    quotes,
    addresses
}: SettingsProps) {
    const [activeTab, setActiveTab] = useState('notifications');
    const [phone, setPhone] = useState('');
    const [notificationSettings, setNotificationSettings] = useState({
        orderUpdates: true,
        quoteStatus: true,
        securityAlerts: true,
        smsNotifications: false,
        marketing: false
    });
    const [privacySettings, setPrivacySettings] = useState({
        dataSharing: false,
        profileVisibility: 'private'
    });
    const [preferences, setPreferences] = useState({
        language: 'en',
        timezone: 'Asia/Kolkata',
        theme: 'dark',
        currency: 'INR'
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'preferences', label: 'Preferences', icon: Globe }
    ];

    const handleSaveSettings = async () => {
        if (!user) return;
        setIsUpdating(true);
        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                name: editName,
                companyName: editCompany,
                phone,
                notificationSettings,
                privacySettings,
                preferences,
                updatedAt: new Date()
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleExportData = () => {
        const exportData = {
            profile: {
                name: user?.name,
                email: user?.email,
                phone,
                company: user?.companyName
            },
            orders,
            quotes,
            addresses,
            settings: {
                notifications: notificationSettings,
                privacy: privacySettings,
                preferences
            },
            exportedAt: new Date().toISOString()
        };
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `henu-os-data-${Date.now()}.json`;
        link.click();
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Settings</h1>

            {/* Tabs Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/10">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all",
                                activeTab === tab.id
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                                    : "bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] hover:text-white"
                            )}
                        >
                            <Icon size={18} />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Settings Content */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-[1cm]">


                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                            <p className="text-gray-400 text-sm">Manage how you receive updates and alerts</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'orderUpdates', label: 'Order Updates', icon: Package, description: 'Get notified about order status changes' },
                                { key: 'quoteStatus', label: 'Quote Status', icon: FileText, description: 'Receive updates on quote approvals' },
                                { key: 'securityAlerts', label: 'Security Alerts', icon: Shield, description: 'Important account security notifications' },
                                { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone, description: 'Receive notifications via SMS' },
                                { key: 'marketing', label: 'Marketing Emails', icon: Mail, description: 'Promotional offers and product updates' }
                            ].map(item => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.04] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                                            <item.icon size={20} className="text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{item.label}</p>
                                            <p className="text-sm text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                                            onChange={(e) => setNotificationSettings({
                                                ...notificationSettings,
                                                [item.key]: e.target.checked
                                            })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-full h-full bg-gray-700 peer-checked:bg-purple-600 rounded-full transition-all"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
                            <p className="text-gray-400 text-sm">Keep your account safe and secure</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-amber-600/10 flex items-center justify-center flex-shrink-0">
                                            <Shield size={24} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-1">Two-Factor Authentication</h3>
                                            <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account</p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 border border-amber-600/20 rounded-full">
                                                <Clock size={14} className="text-amber-400" />
                                                <span className="text-amber-400 text-xs font-semibold">Coming Soon</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-600/10 flex items-center justify-center flex-shrink-0">
                                        <Clock size={24} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-1">Login History</h3>
                                        <p className="text-gray-400 text-sm mb-3">Monitor your account access</p>
                                        <div className="text-sm text-gray-500">No recent login history available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Privacy Settings</h2>
                            <p className="text-gray-400 text-sm">Control your data and privacy preferences</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-white">Data Sharing</p>
                                        <p className="text-sm text-gray-400">Share analytics data to help improve our services</p>
                                    </div>
                                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings.dataSharing}
                                            onChange={(e) => setPrivacySettings({
                                                ...privacySettings,
                                                dataSharing: e.target.checked
                                            })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-full h-full bg-gray-700 peer-checked:bg-purple-600 rounded-full transition-all"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-600/10 flex items-center justify-center flex-shrink-0">
                                        <Download size={24} className="text-cyan-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white text-lg mb-1">Download My Data</h3>
                                        <p className="text-gray-400 text-sm mb-3">Export all your account data in JSON format</p>
                                        <button
                                            onClick={handleExportData}
                                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                                        >
                                            <Download size={16} />
                                            Export Data
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Preferences</h2>
                            <p className="text-gray-400 text-sm">Customize your app experience</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Language</label>
                                <select
                                    value={preferences.language}
                                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 hover:bg-white/[0.05] [&>option]:bg-black [&>option]:text-white"
                                >
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Timezone</label>
                                <select
                                    value={preferences.timezone}
                                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 hover:bg-white/[0.05] [&>option]:bg-black [&>option]:text-white"
                                >
                                    <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
                                    <option value="America/New_York">EST (America/New_York)</option>
                                    <option value="Europe/London">GMT (Europe/London)</option>
                                    <option value="Asia/Tokyo">JST (Asia/Tokyo)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Currency</label>
                                <select
                                    value={preferences.currency}
                                    onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 hover:bg-white/[0.05] [&>option]:bg-black [&>option]:text-white"
                                >
                                    <option value="INR">â‚¹ INR - Indian Rupee</option>
                                    <option value="USD">$ USD - US Dollar</option>
                                    <option value="EUR">€ EUR - Euro</option>
                                    <option value="GBP">£ GBP - British Pound</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">Theme</label>
                                <div className="relative">
                                    <select
                                        value={preferences.theme}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/[0.01] border border-white/5 rounded-xl text-gray-500 cursor-not-allowed"
                                    >
                                        <option value="dark">Dark (Default)</option>
                                        <option value="light">Light</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <span className="text-xs text-amber-400 bg-amber-600/10 px-2 py-1 rounded">Coming Soon</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                    <button
                        onClick={handleSaveSettings}
                        disabled={isUpdating}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>

                    {saveSuccess && (
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                            <CheckCircle2 size={20} />
                            Settings saved successfully!
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
