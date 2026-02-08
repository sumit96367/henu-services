'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export type UserType = 'company' | 'personal' | null;
export type UserRole = 'admin' | 'user';

interface User {
    id: string;
    email: string;
    name: string;
    companyName?: string;
    userType: UserType;
    role: UserRole;
    createdAt: Date;
    phoneNumber?: string;
    profilePicture?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    userType: UserType;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, type: UserType, companyName?: string) => Promise<void>;
    signInWithGoogle: (type: UserType) => Promise<void>;
    signInWithApple: (type: UserType) => Promise<void>;
    requestPhoneOTP: (phoneNumber: string, containerId: string) => Promise<ConfirmationResult>;
    verifyPhoneOTP: (confirmationResult: ConfirmationResult, otp: string, type: UserType) => Promise<void>;
    logout: () => void;
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
    authModalMode: 'login' | 'signup';
    setAuthModalMode: (mode: 'login' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

    // Sync with Firebase Auth state
    useEffect(() => {
        let unsubscribeDoc: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Set up real-time listener for user document
                unsubscribeDoc = onSnapshot(doc(db, 'users', firebaseUser.uid), (userDoc: any) => {
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            id: firebaseUser.uid,
                            email: firebaseUser.email || '',
                            name: userData.name || '',
                            companyName: userData.companyName,
                            userType: userData.userType,
                            role: userData.role || 'user',
                            createdAt: userData.createdAt?.toDate() || new Date(),
                            phoneNumber: firebaseUser.phoneNumber || undefined,
                            profilePicture: userData.profilePicture,
                        });
                    } else {
                        setUser({
                            id: firebaseUser.uid,
                            email: firebaseUser.email || '',
                            name: firebaseUser.displayName || '',
                            userType: 'personal',
                            role: 'user',
                            createdAt: new Date(),
                            phoneNumber: firebaseUser.phoneNumber || undefined,
                        });
                    }
                    setIsLoading(false);
                }, (error: Error) => {
                    console.error('Error listening to user profile:', error);
                    setIsLoading(false);
                });
            } else {
                if (unsubscribeDoc) {
                    unsubscribeDoc();
                    unsubscribeDoc = null;
                }
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
        };
    }, []);

    const ensureUserProfile = async (firebaseUser: { uid: string; email: string | null; displayName: string | null; phoneNumber: string | null }, type: UserType, extraData: { name?: string; companyName?: string; role?: UserRole } = {}) => {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || null,
                name: firebaseUser.displayName || extraData.name || 'User',
                userType: type || 'personal',
                companyName: extraData.companyName || null,
                phoneNumber: firebaseUser.phoneNumber || null,
                role: extraData.role || 'user',
                createdAt: serverTimestamp(),
            };
            await setDoc(userRef, userData);
            return userData;
        }
        return userSnap.data();
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowAuthModal(false);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string, type: UserType, companyName?: string) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await ensureUserProfile(userCredential.user, type, { name, companyName });
            setShowAuthModal(false);
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async (type: UserType) => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await ensureUserProfile(result.user, type);
            setShowAuthModal(false);
        } catch (error) {
            console.error('Google sign in failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithApple = async (type: UserType) => {
        setIsLoading(true);
        try {
            const provider = new OAuthProvider('apple.com');
            const result = await signInWithPopup(auth, provider);
            await ensureUserProfile(result.user, type);
            setShowAuthModal(false);
        } catch (error) {
            console.error('Apple sign in failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const requestPhoneOTP = async (phoneNumber: string, containerId: string) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
        });
        return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    };

    const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, otp: string, type: UserType) => {
        setIsLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            await ensureUserProfile(result.user, type);
            setShowAuthModal(false);
        } catch (error) {
            console.error('Phone verification failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        userType: user?.userType || null,
        isLoading,
        login,
        signup,
        signInWithGoogle,
        signInWithApple,
        requestPhoneOTP,
        verifyPhoneOTP,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
