'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
    User,
    ShoppingBag,
    FileText,
    Palette,
    Image,
    MapPin,
    UserCircle,
    Lock,
    UserX,
    LogOut,
    Eye,
    Package,
    ClipboardList,
    ChevronRight,
    Loader2,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowLeft,
    Upload
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import CircularWaveShader from '@/components/ui/circular-wave-shader';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

// Sidebar menu items
const sidebarItems = [
    { icon: User, label: 'My Account', id: 'account' },
    { icon: ShoppingBag, label: 'Orders', id: 'orders' },
    { icon: FileText, label: 'Quotes', id: 'quotes' },
    { icon: MapPin, label: 'Addresses', id: 'addresses' },
    { icon: Lock, label: 'Settings', id: 'settings' },
    { icon: UserCircle, label: 'Profile', id: 'profile' },
    { icon: Lock, label: 'Change Password', id: 'password' },
    { icon: UserX, label: 'Deactivate Account', id: 'deactivate' },
    { icon: LogOut, label: 'Logout', id: 'logout' },
];

const quickAccessCards = [
    {
        icon: ShoppingBag,
        title: 'Orders',
        id: 'orders',
        description: 'Check your complete orders and their history with a facility to reorder the designs.',
        color: 'cyan'
    },
    {
        icon: FileText,
        title: 'Quotes',
        id: 'quotes',
        description: 'View all the approved and requested quotes with the facility to place quick orders.',
        color: 'amber'
    },
    {
        icon: MapPin,
        title: 'Addresses',
        id: 'addresses',
        description: 'Manage your addresses, set default and select where to ship your orders.',
        color: 'rose'
    },
    {
        icon: Lock,
        title: 'Settings',
        id: 'settings',
        description: 'Manage your account preferences, security settings, and personal information.',
        color: 'indigo'
    },
];

// Interface for orders
interface Order {
    id: string;
    orderDate: any;
    modifiedDate: any;
    amount: string;
    status: string;
    statusColor: string;
    domain?: string;
    plan?: string;
}

export default function DashboardPage() {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('account');
    const [orders, setOrders] = useState<Order[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Profile Edit State
    const [editName, setEditName] = useState('');
    const [editCompany, setEditCompany] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !authLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router, mounted]);

    useEffect(() => {
        if (user) {
            setEditName(user.name || '');
            setEditCompany(user.companyName || '');
            setProfilePicture((user as any).profilePicture || null);
            fetchUserOrders();
        }
    }, [user]);

    const fetchUserOrders = async () => {
        if (!user) return;
        setIsDataLoading(true);
        try {
            const ordersRef = collection(db, 'orders');

            // Fetch by User ID
            const qById = query(
                ordersRef,
                where('userId', '==', user.id)
            );

            // Fetch by Email as fallback
            const qByEmail = query(
                ordersRef,
                where('email', '==', user.email)
            );

            const [snapshotById, snapshotByEmail] = await Promise.all([
                getDocs(qById),
                getDocs(qByEmail)
            ]);

            const orderMap = new Map<string, Order>();

            const processSnapshot = (snapshot: any) => {
                snapshot.forEach((doc: any) => {
                    const data = doc.data();
                    orderMap.set(doc.id, {
                        id: doc.id,
                        orderDate: data.createdAt?.toDate().toLocaleDateString() || 'Recently',
                        modifiedDate: data.updatedAt?.toDate().toLocaleDateString() || 'Recently',
                        amount: typeof data.amount === 'number' ? `₹${data.amount}` : data.amount || '₹0',
                        status: data.status || 'Pending',
                        statusColor: data.statusColor || getStatusColor(data.status),
                        domain: data.domain,
                        plan: data.plan
                    });
                });
            };

            processSnapshot(snapshotById);
            processSnapshot(snapshotByEmail);

            // Convert map to array and sort by date (since merged from two queries)
            const sortedOrders = Array.from(orderMap.values()).sort((a, b) => {
                // Approximate sort if full dates aren't available, but usually we have createdAt
                return 0; // Simple merge for now, or use actual timestamp comparison if needed
            });

            // Improved sorting if we had the raw timestamps
            const allFetched: any[] = [];
            [snapshotById, snapshotByEmail].forEach(s => s.forEach((d: any) => allFetched.push({ id: d.id, ...d.data() })));

            const uniqueOrders = Array.from(new Map(allFetched.map(o => [o.id, o])).values());
            const finalOrders = uniqueOrders
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
                .map(data => ({
                    id: data.id,
                    orderDate: data.createdAt?.toDate().toLocaleDateString() || 'Recently',
                    modifiedDate: data.updatedAt?.toDate().toLocaleDateString() || 'Recently',
                    amount: typeof data.amount === 'number' ? `₹${data.amount}` : data.amount || '₹0',
                    status: data.status || 'Pending',
                    statusColor: data.statusColor || getStatusColor(data.status),
                    domain: data.domain,
                    plan: data.plan
                }));

            setOrders(finalOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsDataLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'green';
            case 'shipped': return 'emerald';
            case 'processing': return 'cyan';
            default: return 'amber';
        }
    };

    // Compress and resize image to stay under Firestore's 1MB limit
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for resizing
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Max dimensions (400x400 is plenty for profile pictures)
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;

                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions while maintaining aspect ratio
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = height * (MAX_WIDTH / width);
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = width * (MAX_HEIGHT / height);
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw resized image
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to base64 with compression (0.8 quality for JPEG)
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

                    // Check size (Firestore limit is ~1MB, base64 adds ~33% overhead)
                    const sizeInBytes = compressedDataUrl.length;
                    const sizeInKB = sizeInBytes / 1024;

                    console.log(`Compressed image size: ${sizeInKB.toFixed(2)} KB`);

                    if (sizeInBytes > 1048487) {
                        // If still too large, compress more
                        const veryCompressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
                        resolve(veryCompressedDataUrl);
                    } else {
                        resolve(compressedDataUrl);
                    }
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedImage = await compressImage(file);
                setProfilePicture(compressedImage);
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Failed to process image. Please try a different image.');
            }
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                name: editName,
                companyName: editCompany,
                profilePicture: profilePicture,
                updatedAt: new Date()
            });
            // Profile will automatically update via AuthContext listener
            setActiveSection('account');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSidebarClick = (id: string) => {
        if (id === 'logout') {
            logout();
            router.push('/');
        } else {
            setActiveSection(id);
        }
    };

    if (!mounted || authLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                    <p className="text-gray-400 font-medium">Loading your space...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const renderSection = () => {
        switch (activeSection) {
            case 'settings':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <h1 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Settings</h1>
                        <div className="max-w-2xl bg-white/[0.02] border border-white/5 rounded-3xl p-12 text-center">
                            <Lock size={48} className="mx-auto text-indigo-400 mb-4" />
                            <h2 className="text-xl font-bold text-white mb-2">Account Settings</h2>
                            <p className="text-gray-500 mb-6">Manage your preferences, security, and notifications</p>
                            <p className="text-sm text-gray-600">Settings interface coming soon</p>
                        </div>
                    </motion.div>
                );
            case 'account':
                return (
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12">
                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Welcome back, {user?.name || 'User'}
                            </h1>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                        </div>

                        {/* Order Status Summary */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                                <div className="flex items-center gap-2">
                                    <ClipboardList size={20} className="text-cyan-400" />
                                    <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                                </div>
                                <button
                                    onClick={() => setActiveSection('orders')}
                                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                                >
                                    View All <ChevronRight size={14} />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                {isDataLoading ? (
                                    <div className="p-12 flex justify-center">
                                        <Loader2 className="w-8 h-8 text-cyan-500/50 animate-spin" />
                                    </div>
                                ) : orders.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-xs text-gray-500 border-b border-white/5 uppercase tracking-wider">
                                                <th className="px-6 py-4 font-bold">Order ID</th>
                                                <th className="px-6 py-4 font-bold">Date</th>
                                                <th className="px-6 py-4 font-bold">Status</th>
                                                <th className="px-6 py-4 font-bold text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 3).map((order) => (
                                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-6 py-5">
                                                        <span className="text-cyan-400 font-mono text-sm">{order.id.slice(0, 8)}...</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm text-gray-400">{order.orderDate}</td>
                                                    <td className="px-6 py-5">
                                                        {(() => {
                                                            const colors: Record<string, string> = {
                                                                green: "bg-green-500/10 text-green-400 border-green-500/20",
                                                                emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                                                cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                                                                amber: "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                            };
                                                            return (
                                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${colors[order.statusColor] || colors.amber}`}>
                                                                    {order.status}
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td className="px-6 py-5 text-right font-medium text-white">{order.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-16 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center mb-4 border border-white/5">
                                            <Package size={24} className="text-gray-600" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-1">No orders yet</h3>
                                        <p className="text-gray-500 text-sm max-w-xs">Your order history will appear here once you make your first purchase.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </motion.div>
                );

            case 'orders':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
                                <p className="text-gray-500">Track and manage your order history</p>
                            </div>
                            <button
                                onClick={() => setActiveSection('account')}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                            {isDataLoading ? (
                                <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-cyan-500" /></div>
                            ) : orders.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.01]">
                                            <div className="flex gap-4 items-start">
                                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                                    <Package className="text-cyan-400" size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold mb-1">Order #{order.id.slice(0, 8).toUpperCase()}</h4>
                                                    <p className="text-xs text-gray-500">{order.orderDate} • {order.plan || 'Standard'} Plan</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8 justify-between md:justify-end">
                                                <div className="text-right">
                                                    <p className="text-white font-bold mb-1">{order.amount}</p>
                                                    {(() => {
                                                        const colors: Record<string, string> = {
                                                            green: "text-green-400",
                                                            emerald: "text-emerald-400",
                                                            cyan: "text-cyan-400",
                                                            amber: "text-amber-400"
                                                        };
                                                        return (
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${colors[order.statusColor] || colors.amber}`}>
                                                                {order.status}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5">
                                                    <Eye size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-20 text-center">
                                    <Package size={48} className="mx-auto text-gray-700 mb-4 opacity-20" />
                                    <h3 className="text-white font-bold">No orders found</h3>
                                    <p className="text-gray-500 text-sm mt-1">You haven't placed any orders with us yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );

            case 'profile':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <h1 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Edit Profile</h1>

                        <div className="flex flex-col md:flex-row" style={{ gap: '0.4cm' }}>
                            {/* Profile Picture Upload Box */}
                            <div className="border border-cyan-500/30 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center" style={{ padding: '2.5rem', width: '520px', height: '520px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)', backdropFilter: 'blur(16px)', boxShadow: '0 0 40px rgba(6, 182, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)' }}>
                                {/* Background glowing orbs */}
                                <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

                                {/* Tech lines decoration */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute top-1/4 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                                    <div className="absolute top-3/4 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                                </div>

                                <div className="relative flex flex-col items-center justify-center gap-6 w-full h-full">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold tracking-[0.3em] text-white/90 mb-2" style={{ fontFamily: 'monospace', letterSpacing: '0.3em' }}>PROFILE IDENTITY</h3>

                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    {/* Circular Avatar Display */}
                                    <div className="relative flex items-center justify-center mb-4">
                                        <div
                                            className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden relative"
                                            style={{
                                                boxShadow: '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)',
                                                background: 'rgba(0, 0, 0, 0.6)'
                                            }}
                                        >
                                            {/* Animated Wave Shader - always show, no profile picture */}
                                            <CircularWaveShader />
                                        </div>
                                    </div>

                                    {/* Button(s) */}
                                    {!profilePicture ? (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-12 py-3 border border-white/20 rounded-xl font-semibold tracking-wider transition-all hover:bg-white/5 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                            style={{ background: 'rgba(255, 255, 255, 0.02)', color: '#d1d5db' }}
                                        >
                                            UPLOAD IMAGE
                                        </button>
                                    ) : (
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-8 py-3 border border-white/20 rounded-xl font-semibold tracking-wider transition-all hover:bg-white/5 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                                style={{ background: 'rgba(255, 255, 255, 0.02)', color: '#d1d5db' }}
                                            >
                                                REPLACE
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setProfilePicture(null)}
                                                className="px-8 py-3 border border-white/20 rounded-xl font-semibold tracking-wider transition-all hover:bg-white/5 hover:border-red-400/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                                style={{ background: 'rgba(255, 255, 255, 0.02)', color: '#d1d5db' }}
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Form */}
                            <div className="border border-cyan-500/30 rounded-3xl shadow-2xl relative overflow-hidden" style={{ padding: '2.5rem', width: '520px', height: '520px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)', backdropFilter: 'blur(16px)', boxShadow: '0 0 40px rgba(6, 182, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)' }}>
                                {/* Background glowing orbs */}
                                <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

                                {/* Tech lines decoration */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute top-1/4 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                                    <div className="absolute top-3/4 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                                </div>

                                <form onSubmit={handleUpdateProfile} className="relative flex flex-col justify-between h-full">
                                    <div className="flex flex-col gap-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                                placeholder="Your Name"
                                                disabled={isUpdating}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Company Name</label>
                                            <input
                                                type="text"
                                                value={editCompany}
                                                onChange={(e) => setEditCompany(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                                placeholder="Company (Optional)"
                                                disabled={isUpdating}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={user?.email || ''}
                                                disabled
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-gray-500 text-lg cursor-not-allowed italic"
                                            />
                                            <p className="text-xs text-gray-600 mt-3 px-1">Email cannot be changed for security reasons.</p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="w-full py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-extrabold text-lg rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
                                    >
                                        {isUpdating ? <Loader2 className="animate-spin" size={22} /> : <CheckCircle2 size={22} />}
                                        {isUpdating ? 'Saving Changes...' : 'Save Profile'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return (
                    <div className="p-20 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
                        <AlertCircle size={40} className="mx-auto text-gray-800 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Under Construction</h2>
                        <p className="text-gray-500">The <strong>{activeSection}</strong> module is currently being improved.</p>
                        <button
                            onClick={() => setActiveSection('account')}
                            className="mt-6 px-6 py-2 bg-white/5 rounded-full text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Return to Overview
                        </button>
                    </div>
                );
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex' }}>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    zIndex: 1000,
                    display: 'none',
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: 'pointer',
                }}
                className="mobile-menu-toggle"
            >
                <span style={{ fontSize: '24px' }}>{isMobileMenuOpen ? '✕' : '☰'}</span>
            </button>

            {/* Sidebar */}
            <aside
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '280px',
                    backgroundColor: 'rgba(10, 10, 10, 1)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 999,
                    transform: isMobileMenuOpen ? 'translateX(0)' : undefined,
                }}
                className="dashboard-sidebar"
            >
                {/* User Profile Header */}
                <div
                    style={{
                        padding: '32px 24px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: (profilePicture || (user as any)?.profilePicture) ? 'transparent' : 'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff',
                                overflow: 'hidden',
                            }}
                        >
                            {(profilePicture || (user as any)?.profilePicture) ? (
                                <img
                                    src={profilePicture || (user as any).profilePicture}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                user?.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#fff',
                                    margin: 0,
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {user?.name}
                            </h3>
                            <p
                                style={{
                                    fontSize: '0.75rem',
                                    color: '#888',
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        flex: 1,
                        padding: '24px 0',
                        overflowY: 'auto',
                    }}
                >
                    {sidebarItems.map((item) => {
                        const active = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    handleSidebarClick(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 24px',
                                    margin: '4px 12px',
                                    marginLeft: '12px',
                                    marginRight: '12px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    color: active ? '#fff' : '#888',
                                    backgroundColor: active
                                        ? 'rgba(6, 182, 212, 0.1)'
                                        : 'transparent',
                                    borderLeft: active ? '3px solid #06b6d4' : '3px solid transparent',
                                    borderTop: 'none',
                                    borderRight: 'none',
                                    borderBottom: 'none',
                                    transition: 'all 0.2s ease',
                                    fontWeight: active ? '600' : '500',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                        e.currentTarget.style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#888';
                                    }
                                }}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    marginLeft: '280px',
                    minHeight: '100vh',
                    padding: '40px 48px',
                    flex: 1,
                }}
                className="dashboard-main-content"
            >
                {renderSection()}
            </main>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 998,
                        display: 'none',
                    }}
                    className="mobile-overlay"
                />
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block !important;
                    }

                    .dashboard-sidebar {
                        transform: ${isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
                        transition: transform 0.3s ease;
                    }

                    .dashboard-main-content {
                        margin-left: 0 !important;
                        padding: 80px 24px 40px 24px !important;
                    }

                    .mobile-overlay {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}
