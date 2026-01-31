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
    ChevronRight
} from 'lucide-react';

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

// Quick access cards data
const quickAccessCards = [
    {
        icon: ShoppingBag,
        title: 'Orders',
        description: 'Check your complete orders and their history with a facility to reorder the designs.',
        color: 'cyan'
    },
    {
        icon: FileText,
        title: 'Quotes',
        description: 'View all the approved and requested quotes with the facility to place quick orders.',
        color: 'amber'
    },
    {
        icon: Palette,
        title: 'Saved Designs',
        description: 'View your designs, check PDF previews and place quick orders with a click.',
        color: 'purple'
    },
    {
        icon: Image,
        title: 'Images',
        description: 'Add, delete, or crop images as per design needs.',
        color: 'green'
    },
    {
        icon: MapPin,
        title: 'Addresses',
        description: 'Manage your addresses, set default and select where to ship your orders.',
        color: 'rose'
    },
];

// Mock order data
const mockOrders = [
    {
        id: 'KD-114842',
        orderDate: '30 Jan, 2026',
        modifiedDate: '30 Jan, 2026',
        amount: '₹510.35',
        status: 'Order Processing',
        statusColor: 'cyan'
    },
    {
        id: 'KD-114789',
        orderDate: '28 Jan, 2026',
        modifiedDate: '29 Jan, 2026',
        amount: '₹1,245.00',
        status: 'Shipped',
        statusColor: 'green'
    },
    {
        id: 'KD-114650',
        orderDate: '25 Jan, 2026',
        modifiedDate: '26 Jan, 2026',
        amount: '₹890.50',
        status: 'Delivered',
        statusColor: 'emerald'
    },
];

export default function DashboardPage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('account');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router, mounted]);

    const handleSidebarClick = (id: string) => {
        if (id === 'logout') {
            logout();
            router.push('/');
        } else {
            setActiveSection(id);
        }
    };

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#050505]" style={{ paddingTop: '100px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-[120px]">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-72 shrink-0"
                    >
                        {/* User Profile Card */}
                        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-8 mb-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                                    <span className="text-2xl font-bold text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{user?.name}</h3>
                                <p className="text-sm text-gray-400 break-all">{user?.email}</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                            {sidebarItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSidebarClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 ${activeSection === item.id
                                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                                        } ${index !== sidebarItems.length - 1 ? 'border-b border-white/5' : ''}`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1"
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                        </div>

                        {/* Order Status Section */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden" style={{ marginBottom: '120px' }}>
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
                                <ClipboardList size={20} className="text-cyan-400" />
                                <h2 className="text-lg font-semibold text-white">Order Status</h2>
                            </div>

                            {/* Orders Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-400 border-b border-white/5">
                                            <th className="px-6 py-4 font-medium">#</th>
                                            <th className="px-6 py-4 font-medium">Order Details</th>
                                            <th className="px-6 py-4 font-medium">Latest Updates</th>
                                            <th className="px-6 py-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockOrders.map((order, index) => (
                                            <tr
                                                key={order.id}
                                                className={`${index !== mockOrders.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="text-cyan-400 font-semibold">{order.id}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-300">
                                                            <span className="text-gray-500">Order Date:</span> {order.orderDate}
                                                        </p>
                                                        <p className="text-gray-300">
                                                            <span className="text-gray-500">Modified Date:</span> {order.modifiedDate}
                                                        </p>
                                                        <p className="text-gray-300">
                                                            <span className="text-gray-500">Amount:</span> <span className="text-white font-medium">{order.amount}</span>
                                                        </p>
                                                        <p className="text-gray-300">
                                                            <span className="text-gray-500">Status:</span>{' '}
                                                            <span className={`${order.statusColor === 'cyan' ? 'text-cyan-400' :
                                                                order.statusColor === 'green' ? 'text-green-400' :
                                                                    'text-emerald-400'
                                                                }`}>{order.status}</span>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-gray-500">-----</span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all duration-200">
                                                        <Eye size={16} />
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        {/* Quick Access Cards */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            style={{ marginBottom: '150px' }}
                        >
                            {quickAccessCards.map((card) => (
                                <motion.div
                                    key={card.title}
                                    variants={fadeInUp}
                                    className={`group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 px-8 py-10 cursor-pointer hover:border-white/10 transition-all duration-300`}
                                >
                                    {/* Hover gradient overlay */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${card.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/10 to-transparent' :
                                        card.color === 'amber' ? 'bg-gradient-to-br from-amber-500/10 to-transparent' :
                                            card.color === 'purple' ? 'bg-gradient-to-br from-purple-500/10 to-transparent' :
                                                card.color === 'green' ? 'bg-gradient-to-br from-green-500/10 to-transparent' :
                                                    'bg-gradient-to-br from-rose-500/10 to-transparent'
                                        }`} />

                                    <div className="relative">
                                        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${card.color === 'cyan' ? 'bg-cyan-500/10' :
                                            card.color === 'amber' ? 'bg-amber-500/10' :
                                                card.color === 'purple' ? 'bg-purple-500/10' :
                                                    card.color === 'green' ? 'bg-green-500/10' :
                                                        'bg-rose-500/10'
                                            }`}>
                                            <card.icon size={24} className={`${card.color === 'cyan' ? 'text-cyan-400' :
                                                card.color === 'amber' ? 'text-amber-400' :
                                                    card.color === 'purple' ? 'text-purple-400' :
                                                        card.color === 'green' ? 'text-green-400' :
                                                            'text-rose-400'
                                                }`} />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            {card.title}
                                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-gray-400" />
                                        </h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
