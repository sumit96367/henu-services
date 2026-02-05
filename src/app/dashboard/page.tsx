'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    ArrowLeft
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';

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
    { icon: Palette, label: 'Saved Designs', id: 'designs' },
    { icon: Image, label: 'Images', id: 'images' },
    { icon: MapPin, label: 'Addresses', id: 'addresses' },
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
        icon: Palette,
        title: 'Saved Designs',
        id: 'designs',
        description: 'View your designs, check PDF previews and place quick orders with a click.',
        color: 'purple'
    },
    {
        icon: Image,
        title: 'Images',
        id: 'images',
        description: 'Add, delete, or crop images as per design needs.',
        color: 'green'
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

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                name: editName,
                companyName: editCompany,
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

                        {/* Quick Access */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quickAccessCards.map((card) => (
                                <motion.div
                                    key={card.title}
                                    variants={fadeInUp}
                                    onClick={() => setActiveSection(card.id)}
                                    className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-6 cursor-pointer hover:border-white/10 transition-all duration-300"
                                >
                                    {(() => {
                                        const colors: Record<string, string> = {
                                            cyan: "bg-cyan-500/10 text-cyan-400",
                                            amber: "bg-amber-500/10 text-amber-400",
                                            purple: "bg-purple-500/10 text-purple-400",
                                            green: "bg-green-500/10 text-green-400",
                                            rose: "bg-rose-500/10 text-rose-400",
                                            indigo: "bg-indigo-500/10 text-indigo-400"
                                        };
                                        const colorClasses = colors[card.color] || colors.cyan;
                                        return (
                                            <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${colorClasses}`}>
                                                <card.icon size={20} />
                                            </div>
                                        );
                                    })()}
                                    <h3 className="text-white font-bold mb-2 flex items-center justify-between">
                                        {card.title}
                                        <ChevronRight size={16} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                                </motion.div>
                            ))}
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

                        <div className="max-w-xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />

                            <form onSubmit={handleUpdateProfile} className="space-y-6 relative">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Your Name"
                                            disabled={isUpdating}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={editCompany}
                                            onChange={(e) => setEditCompany(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Company (Optional)"
                                            disabled={isUpdating}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed italic"
                                        />
                                        <p className="text-[10px] text-gray-600 mt-2 px-1">Email cannot be changed for security reasons.</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-extrabold rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                                    {isUpdating ? 'Saving Changes...' : 'Save Profile'}
                                </button>
                            </form>
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
        <div className="min-h-screen bg-[#050505] w-full flex flex-col items-center" style={{ paddingTop: '100px' }}>
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-72 shrink-0"
                    >
                        {/* User Profile Card */}
                        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-8 mb-6 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                                <User size={120} />
                            </div>
                            <div className="flex flex-col items-center text-center relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                                    <span className="text-2xl font-black text-white italic">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{user?.name}</h3>
                                <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.15em] opacity-80">
                                    {user?.userType || 'Personal'}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            {sidebarItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSidebarClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-300 relative ${activeSection === item.id
                                        ? 'bg-cyan-500/10 text-cyan-400'
                                        : 'text-gray-500 hover:bg-white/[0.03] hover:text-gray-300'
                                        } ${index !== sidebarItems.length - 1 ? 'border-b border-white/5' : ''}`}
                                >
                                    {activeSection === item.id && (
                                        <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-1/2 bg-cyan-400 rounded-r-full" />
                                    )}
                                    <item.icon size={18} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                                    <span className={`text-sm tracking-wide ${activeSection === item.id ? 'font-black' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1 min-w-0"
                    >
                        {renderSection()}
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
