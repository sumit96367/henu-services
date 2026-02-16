'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import {
    User,
    ShoppingBag,
    FileText,
    Palette,
    Image as ImageIcon,
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
    ArrowRight,
    Upload,
    Plus,
    Edit,
    Trash2,
    Home,
    Phone,
    Key,
    AlertTriangle,
    Menu as MenuIcon,
    X as CloseIcon
} from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import CircularWaveShader from '@/components/ui/circular-wave-shader';
import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import SettingsInterface from '@/components/SettingsInterface';

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
    orderDate: string;
    modifiedDate: string;
    amount: string;
    status: string;
    statusColor: string;
    domain?: string;
    plan?: string;
}

// Interface for quotes
interface Quote {
    id: string;
    email: string;
    serviceType: string;
    description: string;
    amount?: string | number;
    status: string;
    createdAt: any;
}

// Interface for addresses
interface Address {
    id: string;
    userId: string;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
    createdAt: Timestamp | Date;
    updatedAt: Timestamp | Date;
}

export default function DashboardPage() {
    const isMobile = useMediaQuery("(max-width: 768px)");
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

    // Quotes State
    const [quotes, setQuotes] = useState<Quote[]>([]);

    // Addresses State
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
    });

    // Password Change State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // Deactivate Account State
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !authLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router, mounted]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (user) {
                setEditName(user.name || '');
                setEditCompany(user.companyName || '');
                setProfilePicture(user.profilePicture || null);

                setIsDataLoading(true);
                await Promise.all([
                    fetchUserOrders(),
                    fetchUserQuotes(),
                    fetchUserAddresses()
                ]);
                setIsDataLoading(false);
            }
        };
        fetchAllData();
    }, [user]);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const fetchUserOrders = async () => {
        if (!user) return;
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

            const processSnapshot = (snapshot: { forEach: (callback: (doc: { id: string; data: () => any }) => void) => void }) => {
                snapshot.forEach((doc) => {
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
            const allFetched: { id: string;[key: string]: any }[] = [];
            [snapshotById, snapshotByEmail].forEach(s => s.forEach((d) => allFetched.push({ id: d.id, ...d.data() })));

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

    const fetchUserQuotes = async () => {
        if (!user) return;
        try {
            const quotesRef = collection(db, 'queries');

            // Triple-query pattern for exhaustive lookup
            const qById = query(quotesRef, where('userId', '==', user.id));
            const qByEmail = query(quotesRef, where('email', '==', user.email));
            const qByEmailLower = query(quotesRef, where('email', '==', user.email.toLowerCase()));

            const [snapshotById, snapshotByEmail, snapshotByEmailLower] = await Promise.all([
                getDocs(qById),
                getDocs(qByEmail),
                getDocs(qByEmailLower)
            ]);

            const quoteMap = new Map<string, Quote>();

            const processSnapshot = (snapshot: any) => {
                snapshot.forEach((doc: any) => {
                    const data = doc.data();
                    quoteMap.set(doc.id, {
                        id: doc.id,
                        email: data.email || '',
                        serviceType: data.projectTitle || data.domain || data.subDomain || 'General Query',
                        description: data.queries || data.description || '',
                        amount: data.amount,
                        status: data.status || 'Pending',
                        createdAt: data.timestamp || data.createdAt || new Date()
                    });
                });
            };

            processSnapshot(snapshotById);
            processSnapshot(snapshotByEmail);
            processSnapshot(snapshotByEmailLower);

            const sortedQuotes = Array.from(quoteMap.values()).sort((a, b) => {
                const getTime = (date: any) => {
                    if (!date) return 0;
                    if (typeof date.toMillis === 'function') return date.toMillis();
                    if (date.seconds) return date.seconds * 1000;
                    if (date instanceof Date) return date.getTime();
                    if (typeof date === 'string') return new Date(date).getTime();
                    return 0;
                };
                return getTime(b.createdAt) - getTime(a.createdAt);
            });

            setQuotes(sortedQuotes);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

    const fetchUserAddresses = async () => {
        if (!user) return;
        try {
            const addressesRef = collection(db, 'addresses');

            // Triple-query pattern
            const qById = query(addressesRef, where('userId', '==', user.id));
            const qByEmail = query(addressesRef, where('email', '==', user.email));
            const qByEmailLower = query(addressesRef, where('email', '==', user.email.toLowerCase()));

            const [snapshotById, snapshotByEmail, snapshotByEmailLower] = await Promise.all([
                getDocs(qById),
                getDocs(qByEmail),
                getDocs(qByEmailLower)
            ]);

            const addressMap = new Map<string, Address>();

            const processSnapshot = (snapshot: any) => {
                snapshot.forEach((doc: any) => {
                    addressMap.set(doc.id, {
                        id: doc.id,
                        ...doc.data()
                    } as Address);
                });
            };

            processSnapshot(snapshotById);
            processSnapshot(snapshotByEmail);
            processSnapshot(snapshotByEmailLower);

            const sortedAddresses = Array.from(addressMap.values()).sort((a, b) => {
                const getSeconds = (date: any) => {
                    if (!date) return 0;
                    if (date.seconds) return date.seconds;
                    if (date instanceof Date) return date.getTime() / 1000;
                    if (typeof date === 'string') return new Date(date).getTime() / 1000;
                    return 0;
                };
                return getSeconds((b as any).createdAt) - getSeconds((a as any).createdAt);
            });

            setAddresses(sortedAddresses);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    // Compress and resize image to stay under Firestore's 1MB limit
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
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

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        try {
            const addressData = {
                ...newAddress,
                userId: user.id,
                email: user.email,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            };

            // If this is set as default, unset all other defaults
            if (newAddress.isDefault) {
                const defaultAddresses = addresses.filter(addr => addr.isDefault);
                for (const addr of defaultAddresses) {
                    await updateDoc(doc(db, 'addresses', addr.id), { isDefault: false });
                }
            }

            await addDoc(collection(db, 'addresses'), addressData);

            // Reset form
            setNewAddress({
                name: '',
                phone: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                pincode: '',
                isDefault: false
            });
            setIsAddingAddress(false);
            await fetchUserAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
            alert('Failed to add address. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAddress) return;

        setIsUpdating(true);
        try {
            const addressRef = doc(db, 'addresses', editingAddress.id);

            // If setting as default, unset all others
            if (editingAddress.isDefault) {
                const defaultAddresses = addresses.filter(addr => addr.isDefault && addr.id !== editingAddress.id);
                for (const addr of defaultAddresses) {
                    await updateDoc(doc(db, 'addresses', addr.id), { isDefault: false });
                }
            }

            await updateDoc(addressRef, {
                ...editingAddress,
                updatedAt: Timestamp.now()
            });

            setEditingAddress(null);
            await fetchUserAddresses();
        } catch (error) {
            console.error('Error updating address:', error);
            alert('Failed to update address. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        if (!confirm('Are you sure you want to delete this address?')) return;

        setIsUpdating(true);
        try {
            await deleteDoc(doc(db, 'addresses', addressId));
            await fetchUserAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('Failed to delete address. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSetDefaultAddress = async (addressId: string) => {
        setIsUpdating(true);
        try {
            // Unset all other defaults
            const defaultAddresses = addresses.filter(addr => addr.isDefault);
            for (const addr of defaultAddresses) {
                await updateDoc(doc(db, 'addresses', addr.id), { isDefault: false });
            }

            // Set new default
            await updateDoc(doc(db, 'addresses', addressId), { isDefault: true });
            await fetchUserAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            alert('Failed to set default address. Please try again.');
        } finally {
            setIsUpdating(false);
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

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess(false);

        // Validation
        if (passwordForm.newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters long');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (!auth.currentUser) {
            setPasswordError('No user signed in');
            return;
        }

        setIsUpdating(true);
        try {
            // Reauthenticate user
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email!,
                passwordForm.currentPassword
            );

            await reauthenticateWithCredential(auth.currentUser, credential);

            // Update password
            await updatePassword(auth.currentUser, passwordForm.newPassword);

            setPasswordSuccess(true);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            // Logout after 2 seconds
            setTimeout(() => {
                logout();
                router.push('/');
            }, 2000);
        } catch (error: unknown) {
            console.error('Error changing password:', error);
            const firebaseError = error as { code: string };
            if (firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
                setPasswordError('Current password is incorrect');
            } else {
                setPasswordError('Failed to change password. Please try again.');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeactivateAccount = async () => {
        if (!user) return;

        setIsUpdating(true);
        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                status: 'deactivated',
                deactivatedAt: Timestamp.now()
            });

            // Logout immediately
            setTimeout(() => {
                logout();
                router.push('/');
            }, 500);
        } catch (error) {
            console.error('Error deactivating account:', error);
            alert('Failed to deactivate account. Please try again.');
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
                    <SettingsInterface
                        user={user}
                        editName={editName}
                        editCompany={editCompany}
                        profilePicture={profilePicture}
                        fileInputRef={fileInputRef}
                        handleImageUpload={handleImageUpload}
                        setEditName={setEditName}
                        setEditCompany={setEditCompany}
                        setActiveSection={setActiveSection}
                        orders={orders}
                        quotes={quotes}
                        addresses={addresses}
                    />
                );
            case 'account':
                return (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="mb-10 pt-4 md:pt-0 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                                Welcome back, {user?.name || 'User'}
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(109,40,217,0.4)] mx-auto md:mx-0" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '60px' }}>
                            <div
                                className="bg-white/[0.03] border border-white/10 rounded-[24px] hover:bg-white/[0.05] transition-all group flex flex-col items-center justify-center text-center"
                                style={{ padding: '24px', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="flex flex-col items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-[12px] bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <Package size={20} className="text-cyan-400" />
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Total Orders</h3>
                                </div>
                                <p className="text-4xl font-black text-white tracking-tighter" style={{ lineHeight: 1 }}>{orders.length}</p>
                            </div>

                            <div
                                className="bg-white/[0.03] border border-white/10 rounded-[24px] hover:bg-white/[0.05] transition-all group flex flex-col items-center justify-center text-center"
                                style={{ padding: '24px', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="flex flex-col items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-[12px] bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <FileText size={20} className="text-amber-400" />
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Active Quotes</h3>
                                </div>
                                <p className="text-4xl font-black text-white tracking-tighter" style={{ lineHeight: 1 }}>{quotes.filter(q => q.status === 'pending').length}</p>
                            </div>

                            <div
                                className="bg-white/[0.03] border border-white/10 rounded-[24px] hover:bg-white/[0.05] transition-all group flex flex-col items-center justify-center text-center"
                                style={{ padding: '24px', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="flex flex-col items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-[12px] bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <MapPin size={20} className="text-rose-400" />
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Address</h3>
                                </div>
                                {addresses.length > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <p className="text-xs font-bold text-white mb-1">
                                            {(addresses.find(a => a.isDefault) || addresses[0]).addressLine1}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-medium">
                                            {(addresses.find(a => a.isDefault) || addresses[0]).city}, {(addresses.find(a => a.isDefault) || addresses[0]).state}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-xs font-bold text-gray-500">No address added</p>
                                )}
                            </div>

                            <div
                                className="bg-white/[0.03] border border-white/10 rounded-[24px] hover:bg-white/[0.05] transition-all group flex flex-col items-center justify-center text-center"
                                style={{ padding: '24px', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="flex flex-col items-center gap-2 mb-3">
                                    <div className="w-10 h-10 rounded-[12px] bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <User size={20} className="text-green-400" />
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Member Since</h3>
                                </div>
                                <p className="text-xl font-black text-white tracking-tight uppercase" style={{ lineHeight: 1.2 }}>
                                    {(() => {
                                        try {
                                            const d = user?.createdAt ? new Date(user.createdAt) : new Date();
                                            return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                                        } catch {
                                            return 'Recently';
                                        }
                                    })()}
                                </p>
                            </div>
                        </div>

                        {/* Quick Access Cards */}
                        <div className="space-y-20">
                            <div className="flex items-center gap-8 mb-16">
                                <h2 className="text-6xl font-black text-white uppercase tracking-[0.3em] opacity-95">Quick Access</h2>
                                <div className="h-1 flex-1 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {quickAccessCards.map((card) => {
                                    const Icon = card.icon;
                                    const colorClasses = {
                                        cyan: 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.1)]',
                                        amber: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20 text-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.1)]',
                                        rose: 'bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 text-rose-400 shadow-[0_0_60px_rgba(244,63,94,0.1)]',
                                        indigo: 'bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 shadow-[0_0_60px_rgba(99,102,241,0.1)]'
                                    };
                                    return (
                                        <button
                                            key={card.id}
                                            onClick={() => card.id === 'quotes' ? router.push('/dashboard/quotes') : setActiveSection(card.id)}
                                            className={`${colorClasses[card.color as keyof typeof colorClasses]} border rounded-[32px] text-left hover:scale-[1.05] transition-all cursor-pointer group flex flex-col items-start min-h-[280px] hover:shadow-[0_40px_100px_rgba(0,0,0,0.9)]`}
                                            style={{ padding: '40px' }}
                                        >
                                            <div className="flex items-start justify-between w-full mb-8">
                                                <div className={`w-14 h-14 rounded-[16px] ${colorClasses[card.color as keyof typeof colorClasses]} flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl`}>
                                                    <Icon size={28} />
                                                </div>
                                                <ChevronRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                                            </div>
                                            <h3 className="text-white font-black text-2xl mb-3 tracking-tighter leading-none italic">{card.title}</h3>
                                            <p className="text-gray-400/80 text-base font-bold leading-relaxed">{card.description}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ marginTop: '80px' }}>
                            {/* Recent Orders */}
                            <div className="bg-white/[0.04] border border-white/10 rounded-[32px]" style={{ padding: '40px', boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)' }}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em] opacity-80">Recent Orders</h3>
                                    <button
                                        onClick={() => setActiveSection('orders')}
                                        className="text-sm font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 uppercase tracking-[0.2em]"
                                    >
                                        <span className="hidden md:inline">View All</span> <ChevronRight size={18} />
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {isDataLoading ? (
                                        <div className="p-8 flex justify-center">
                                            <Loader2 className="w-6 h-6 text-cyan-500/50 animate-spin" />
                                        </div>
                                    ) : orders.length > 0 ? (
                                        orders.slice(0, 3).map((order) => (
                                            <div key={order.id}
                                                className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all group"
                                                style={{ padding: '32px' }}
                                            >
                                                <div className="flex gap-6 items-start">
                                                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                                                        <Package className="text-cyan-400" size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>
                                                            Order #{order.id.slice(0, 8).toUpperCase()}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-medium tracking-wide transition-all" style={{ marginTop: '4px' }}>
                                                            {order.orderDate} • {order.plan || 'Standard'} Plan
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-start md:justify-end">
                                                    <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                                        <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>{order.amount}</div>
                                                        {(() => {
                                                            const colors: Record<string, string> = {
                                                                green: "text-green-400",
                                                                emerald: "text-emerald-400",
                                                                cyan: "text-cyan-400",
                                                                amber: "text-amber-400"
                                                            };
                                                            return (
                                                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-none ${colors[order.statusColor] || colors.amber}`} style={{ marginTop: '4px' }}>
                                                                    {order.status}
                                                                </span>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <Package size={32} className="mx-auto text-gray-600 mb-2 opacity-20" />
                                            <p className="text-sm text-gray-500">No orders yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Quotes */}
                            <div className="bg-white/[0.04] border border-white/10 rounded-[32px]" style={{ padding: '40px', boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)' }}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em] opacity-80">Recent Quotes</h3>
                                    <button
                                        onClick={() => router.push('/dashboard/quotes')}
                                        className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 uppercase tracking-[0.2em]"
                                    >
                                        <span className="hidden md:inline">View All</span> <ChevronRight size={18} />
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {quotes.length > 0 ? (
                                        quotes.slice(0, 3).map((quote) => (
                                            <div key={quote.id}
                                                className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all group"
                                                style={{ padding: '32px' }}
                                            >
                                                <div className="flex gap-6 items-start">
                                                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                                                        <FileText size={18} className="text-purple-400" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>
                                                            {quote.serviceType}
                                                        </div>
                                                        <div className="text-[10px] text-gray-500 font-medium line-clamp-1 max-w-[220px]" style={{ marginTop: '4px' }}>
                                                            {quote.description}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end">
                                                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${quote.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        quote.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        }`}>
                                                        {quote.status}
                                                    </span>
                                                <div className="flex items-center justify-start md:justify-end">
                                                    <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-none ${quote.status === 'approved' ? 'text-green-400' :
                                                            quote.status === 'rejected' ? 'text-red-400' :
                                                                'text-amber-400'
                                                            }`} style={{ marginTop: '0' }}>
                                                            {quote.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <FileText size={32} className="mx-auto text-gray-600 mb-2 opacity-20" />
                                            <p className="text-sm text-gray-500">No quotes yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                );

            case 'orders':
                return (
                    <div className="w-full">
                        <div className="mb-12">
                            <div className="flex justify-end w-full mb-8">
                                <button
                                    onClick={() => setActiveSection('account')}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-black tracking-[0.2em] uppercase text-[10px]">Back</span>
                                </button>
                            </div>

                            <div className="flex flex-col items-center md:items-start gap-2">
                                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Orders</h1>
                                <p className="text-gray-500 font-medium text-[13px] text-center md:text-left">Track and manage your order history and fulfillment status</p>
                                <div className="h-1 w-16 bg-cyan-500/40 rounded-full mt-1" />
                            </div>
                        </div>

                        <div
                            className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden"
                            style={{ padding: 'max(20px, 4%)' }}
                        >
                            {isDataLoading ? (
                                <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-cyan-500" /></div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-12">
                                    {orders.map((order) => (
                                        <div key={order.id}
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all group"
                                            style={{ padding: '60px' }}
                                        >
                                            <div className="flex gap-6 items-start">
                                                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                                                    <Package className="text-cyan-400" size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>
                                                        Order #{order.id.slice(0, 8).toUpperCase()}
                                                    </div>
                                                    <div className="text-xs text-gray-500 font-medium tracking-wide transition-all" style={{ marginTop: '4px' }}>
                                                        {order.orderDate} • {order.plan || 'Standard'} Plan
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start md:justify-end">
                                                <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                                    <div className="text-white font-black text-lg" style={{ margin: 0, padding: 0, lineHeight: 1 }}>{order.amount}</div>
                                                    {(() => {
                                                        const colors: Record<string, string> = {
                                                            green: "text-green-400",
                                                            emerald: "text-emerald-400",
                                                            cyan: "text-cyan-400",
                                                            amber: "text-amber-400"
                                                        };
                                                        return (
                                                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-none ${colors[order.statusColor] || colors.amber}`} style={{ marginTop: '4px' }}>
                                                                {order.status}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-8 md:p-[60px]">
                                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-2xl">
                                        <Package size={40} className="text-cyan-400 opacity-60" strokeWidth={1} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">No orders found</h3>
                                    <p className="text-gray-500 text-lg font-medium">You haven&apos;t placed any orders with us yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <h1 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Edit Profile</h1>

                        <div className="flex flex-col md:flex-row" style={{ gap: '0.4cm' }}>
                            {/* Profile Picture Upload Box */}
                            <div className="border border-cyan-500/30 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center" style={{ flex: 1, minHeight: '600px', padding: '120px 80px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)', backdropFilter: 'blur(16px)', boxShadow: '0 0 50px rgba(6, 182, 212, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 12px 48px rgba(0, 0, 0, 0.5)' }}>
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
                                            {/* Profile Picture or Animated Wave Shader */}
                                            {profilePicture ? (
                                                <img
                                                    src={profilePicture}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <CircularWaveShader />
                                            )}
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
                                                className="border border-white/20 rounded-xl font-semibold tracking-wider transition-all hover:bg-white/5 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                                style={{ padding: '20px 48px', background: 'rgba(255, 255, 255, 0.02)', color: '#d1d5db' }}
                                            >
                                                REPLACE
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setProfilePicture(null)}
                                                className="border border-white/20 rounded-xl font-semibold tracking-wider transition-all hover:bg-white/5 hover:border-red-400/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                                style={{ padding: '20px 48px', background: 'rgba(255, 255, 255, 0.02)', color: '#d1d5db' }}
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Form */}
                            <div className="border border-cyan-500/30 rounded-[40px] shadow-2xl relative overflow-hidden" style={{ flex: 1.3, minHeight: '600px', padding: '120px 90px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)', backdropFilter: 'blur(16px)', boxShadow: '0 0 50px rgba(6, 182, 212, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 12px 48px rgba(0, 0, 0, 0.5)' }}>
                                {/* Background glowing orbs */}
                                <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

                                {/* Tech lines decoration */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <div className="absolute top-1/4 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                                    <div className="absolute top-3/4 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                                </div>

                                <form onSubmit={handleUpdateProfile} className="relative flex flex-col h-full">
                                    <div className="flex flex-col gap-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                                style={{ padding: '24px 32px' }}
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
                                                className="w-full bg-black/40 border border-white/10 rounded-xl text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                                style={{ padding: '24px 32px' }}
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
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl text-gray-500 text-lg cursor-not-allowed italic"
                                                style={{ padding: '24px 32px' }}
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

            case 'quotes':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="mb-12">
                            <div className="flex justify-end w-full mb-8">
                                <button
                                    onClick={() => setActiveSection('account')}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-black tracking-[0.2em] uppercase text-[10px]">Back</span>
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="flex flex-col items-center md:items-start gap-2">
                                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Quotes</h1>
                                    <p className="text-gray-500 font-medium text-[13px] text-center md:text-left">Track and manage your bespoke quote requests and project valuations</p>
                                    <div className="h-1 w-16 bg-purple-500/40 rounded-full mt-1" />
                                </div>
                                <button
                                    onClick={() => router.push('/dashboard/request-quote')}
                                    className="btn-primary mt-4 md:mt-0"
                                >
                                    <span>New Quote Request</span>
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden"
                            style={{ padding: 'max(20px, 4%)' }}
                        >
                            {isDataLoading ? (
                                <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-purple-500" /></div>
                            ) : quotes.length > 0 ? (
                                <div className="space-y-12">
                                    {quotes.map((quote) => (
                                        <div key={quote.id}
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all group p-10 md:p-14"
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
                                                        <span className="text-[10px] text-gray-500 font-medium">
                                                            {(() => {
                                                                const date = quote.createdAt;
                                                                if (!date) return 'Recently';
                                                                if (date instanceof Date) return date.toLocaleDateString();
                                                                if (date && typeof date.toDate === 'function') return date.toDate().toLocaleDateString();
                                                                if (date && typeof date.seconds === 'number') return new Date(date.seconds * 1000).toLocaleDateString();
                                                                return 'Recently';
                                                            })()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between md:justify-end">
                                                <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${(() => {
                                                        const s = quote.status.toLowerCase();
                                                        if (s.includes('pending') || s === 'quotation') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                                                        if (s.includes('approved') || s.includes('completed')) return 'bg-green-500/10 text-green-400 border-green-500/20';
                                                        if (s.includes('rejected')) return 'bg-red-500/10 text-red-400 border-red-500/20';
                                                        if (s.includes('cancelled')) return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
                                                        if (s.includes('review')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
                                                        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
                                                    })()}`}>
                                                        {quote.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-8 md:p-[60px]">
                                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-2xl">
                                        <FileText size={40} className="text-purple-400 opacity-60" strokeWidth={1} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">No quotes found</h3>
                                    <p className="text-gray-500 text-lg font-medium">You haven&apos;t submitted any quote requests yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );

            case 'addresses':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">My Addresses</h1>
                                <p className="text-gray-500">Manage your shipping addresses</p>
                            </div>
                            <div className="flex gap-3">
                                {!isAddingAddress && !editingAddress && (
                                    <button
                                        onClick={() => setIsAddingAddress(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                                    >
                                        <Plus size={16} /> Add Address
                                    </button>
                                )}
                                <button
                                    onClick={() => setActiveSection('account')}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                            </div>
                        </div>

                        {(isAddingAddress || editingAddress) && (
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 mb-8">
                                <h3 className="text-xl font-bold text-white mb-6">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                                <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingAddress ? editingAddress.name : newAddress.name}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, name: e.target.value })
                                                : setNewAddress({ ...newAddress, name: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            value={editingAddress ? editingAddress.phone : newAddress.phone}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, phone: e.target.value })
                                                : setNewAddress({ ...newAddress, phone: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Address Line 1</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingAddress ? editingAddress.addressLine1 : newAddress.addressLine1}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, addressLine1: e.target.value })
                                                : setNewAddress({ ...newAddress, addressLine1: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Address Line 2 (Optional)</label>
                                        <input
                                            type="text"
                                            value={editingAddress ? (editingAddress.addressLine2 || '') : newAddress.addressLine2}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, addressLine2: e.target.value })
                                                : setNewAddress({ ...newAddress, addressLine2: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingAddress ? editingAddress.city : newAddress.city}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, city: e.target.value })
                                                : setNewAddress({ ...newAddress, city: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">State</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingAddress ? editingAddress.state : newAddress.state}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, state: e.target.value })
                                                : setNewAddress({ ...newAddress, state: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Pincode</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingAddress ? editingAddress.pincode : newAddress.pincode}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, pincode: e.target.value })
                                                : setNewAddress({ ...newAddress, pincode: e.target.value })
                                            }
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                                            style={{ padding: '20px 32px' }}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isDefault"
                                            checked={editingAddress ? editingAddress.isDefault : newAddress.isDefault}
                                            onChange={(e) => editingAddress
                                                ? setEditingAddress({ ...editingAddress, isDefault: e.target.checked })
                                                : setNewAddress({ ...newAddress, isDefault: e.target.checked })
                                            }
                                            className="mr-2"
                                        />
                                        <label htmlFor="isDefault" className="text-sm text-gray-400">Set as default address</label>
                                    </div>
                                    <div className="col-span-2 flex gap-4 mt-2">
                                        <button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-2xl hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isUpdating ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    <CheckCircle2 size={20} />
                                                    {editingAddress ? 'Update Address' : 'Save Address'}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAddingAddress(false);
                                                setEditingAddress(null);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-gray-300 font-bold rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
                                        >
                                            <CloseIcon size={20} />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {addresses.length > 0 ? addresses.map((address) => (
                                <div key={address.id} className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 hover:bg-white/[0.01] transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-white font-bold">{address.name}</h4>
                                                {address.isDefault && (
                                                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-bold">DEFAULT</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-400 mb-1">{address.phone}</p>
                                            <p className="text-sm text-gray-400">
                                                {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}<br />
                                                {address.city}, {address.state} - {address.pincode}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {!address.isDefault && (
                                                <button
                                                    onClick={() => handleSetDefaultAddress(address.id)}
                                                    className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                                    title="Set as default"
                                                >
                                                    <Home size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setEditingAddress(address)}
                                                className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAddress(address.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-20 text-center">
                                    <MapPin size={48} className="mx-auto text-gray-700 mb-4 opacity-20" />
                                    <h3 className="text-white font-bold">No addresses found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Add your first shipping address</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );

            case 'password':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Change Password</h1>
                            <p className="text-gray-500">Update your account password</p>
                        </div>

                        <div className="max-w-2xl bg-white/[0.02] border border-white/5 rounded-3xl p-16 shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)', backdropFilter: 'blur(16px)' }}>
                            {/* Background glowing orbs */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
                            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl opacity-50" />

                            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.6cm', position: 'relative' }}>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Current Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-none text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                        style={{ padding: '24px 32px' }}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-none text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                        style={{ padding: '24px 32px' }}
                                        placeholder="••••••••"
                                    />
                                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-3 px-1">Min. 8 characters required</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-none text-white text-lg focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                                        style={{ padding: '24px 32px' }}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {passwordError && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                        {passwordError}
                                    </div>
                                )}

                                {passwordSuccess && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                                        Password changed successfully! Logging out...
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isUpdating || passwordSuccess}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-extrabold text-lg rounded-none hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                                    style={{ padding: '20px 48px' }}
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={22} /> : <CheckCircle2 size={22} />}
                                    {isUpdating ? 'Updating Password...' : 'Save Password'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                );

            case 'deactivate':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Deactivate Account</h1>
                            <p className="text-gray-500">Temporarily deactivate your account</p>
                        </div>

                        <div className="max-w-xl bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                            {!showDeactivateConfirm ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                        <AlertTriangle className="w-8 h-8 text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Deactivate Your Account?</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        This will temporarily deactivate your account. You can reactivate it anytime by logging in again.
                                    </p>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowDeactivateConfirm(true)}
                                            className="w-full py-3 bg-red-500/20 text-red-400 font-bold rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                                        >
                                            Continue to Deactivation
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('account')}
                                            className="w-full py-3 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-3">Are you absolutely sure?</h3>
                                    <p className="text-gray-400 mb-6">
                                        This action will deactivate your account and log you out immediately.
                                    </p>
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleDeactivateAccount}
                                            disabled={isUpdating}
                                            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <UserX size={20} />}
                                            {isUpdating ? 'Deactivating...' : 'Yes, Deactivate Account'}
                                        </button>
                                        <button
                                            onClick={() => setShowDeactivateConfirm(false)}
                                            className="w-full py-3 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            No, Keep Account Active
                                        </button>
                                    </div>
                                </div>
                            )}
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
        <div className="min-h-screen bg-transparent flex flex-col md:flex-row dashboard-layout relative overflow-hidden">
            {/* Background elements to match home page */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                <div className="horizon-grid opacity-30" />
                <div className="grid-background opacity-20" />
            </div>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    position: 'absolute',
                    top: '70px',
                    left: '15px',
                    zIndex: 50,
                    display: isMobileMenuOpen ? 'none' : 'flex',
                    padding: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className={cn(
                    "mobile-menu-toggle hover:bg-white/10 active:scale-95",
                    isMobileMenuOpen ? "hidden" : "flex md:hidden"
                )}
            >
                <MenuIcon size={24} />
            </button>

            {/* Sidebar */}
            <aside
                data-lenis-prevent
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 'min(300px, 80vw)',
                    backgroundColor: 'rgba(2, 2, 5, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 999,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflowX: 'hidden',
                }}
                className="dashboard-sidebar shadow-2xl"
            >
                {/* User Profile Header */}
                <div
                    style={{
                        padding: '40px 28px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        position: 'relative',
                    }}
                >
                    {/* Mobile Close Button inside Sidebar */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                        <CloseIcon size={24} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: (profilePicture || user?.profilePicture) ? 'transparent' : 'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff',
                                overflow: 'hidden',
                            }}
                        >
                            {(profilePicture || user?.profilePicture) ? (
                                <img
                                    src={profilePicture || user?.profilePicture}
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
                    className="custom-scrollbar"
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
                                    width: 'calc(100% - 32px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '18px',
                                    padding: '22px 32px',
                                    margin: '8px 16px',
                                    borderRadius: '20px',
                                    textDecoration: 'none',
                                    color: active ? '#fff' : '#888',
                                    backgroundColor: active
                                        ? 'rgba(109, 40, 217, 0.15)'
                                        : 'transparent',
                                    borderLeft: active ? '4px solid #6D28D9' : '4px solid transparent',
                                    borderTop: 'none',
                                    borderRight: 'none',
                                    borderBottom: 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: active ? '700' : '500',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    boxShadow: active ? '0 4px 12px rgba(109, 40, 217, 0.15)' : 'none'
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

            <main
                style={{
                    marginLeft: '300px',
                    minHeight: '100vh',
                    padding: '120px max(24px, 5%) 100px max(24px, 5%)',
                    flex: 1,
                    maxWidth: '1400px',
                    marginRight: 'auto',
                }}
                className="dashboard-main-content"
            >
                {renderSection()}
            </main>

            {/* Mobile Overlay */}
            {
                isMobileMenuOpen && (
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
                )
            }

            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block !important;
                    }

                    .dashboard-sidebar {
                        transform: ${isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'} !important;
                        transition: transform 0.3s ease;
                    }

                    .dashboard-main-content {
                        margin-left: 0 !important;
                        padding: 100px 20px 40px 20px !important;
                    }

                    .mobile-overlay {
                        display: block !important;
                    }
                }
            `}</style>
        </div >
    );
}
