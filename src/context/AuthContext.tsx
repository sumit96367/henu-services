'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'company' | 'personal' | null;

interface User {
    id: string;
    email: string;
    name: string;
    userType: UserType;
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    userType: UserType;
    isLoading: boolean;
    login: (email: string, password: string, type: UserType) => Promise<void>;
    signup: (email: string, password: string, name: string, type: UserType) => Promise<void>;
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

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('henu_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('henu_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string, type: UserType) => {
        setIsLoading(true);
        try {
            // Simulate API call - In production, replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock login - In production, validate credentials with backend
            const newUser: User = {
                id: `user_${Date.now()}`,
                email,
                name: email.split('@')[0],
                userType: type,
                createdAt: new Date(),
            };

            setUser(newUser);
            localStorage.setItem('henu_user', JSON.stringify(newUser));
            setShowAuthModal(false);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string, type: UserType) => {
        setIsLoading(true);
        try {
            // Simulate API call - In production, replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: `user_${Date.now()}`,
                email,
                name,
                userType: type,
                createdAt: new Date(),
            };

            setUser(newUser);
            localStorage.setItem('henu_user', JSON.stringify(newUser));
            setShowAuthModal(false);
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('henu_user');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        userType: user?.userType || null,
        isLoading,
        login,
        signup,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
