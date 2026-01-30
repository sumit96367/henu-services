'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, UserType } from '@/context/AuthContext';
import {
    X,
    Building2,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

export const AuthModal = () => {
    const {
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
        login,
        signup,
        isLoading
    } = useAuth();

    const [step, setStep] = useState<'type-selection' | 'credentials'>('type-selection');
    const [selectedType, setSelectedType] = useState<UserType>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleTypeSelect = (type: UserType) => {
        setSelectedType(type);
        setStep('credentials');
    };

    const handleBack = () => {
        setStep('type-selection');
        setSelectedType(null);
        setCompanyName('');
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (authModalMode === 'signup' && !name) {
            setError('Please enter your name');
            return;
        }

        try {
            if (authModalMode === 'login') {
                await login(email, password, selectedType);
            } else {
                await signup(email, password, name, selectedType);
            }
            // Reset form
            setEmail('');
            setPassword('');
            setName('');
            setStep('type-selection');
            setSelectedType(null);
        } catch (err) {
            setError('Authentication failed. Please try again.');
        }
    };

    const handleClose = () => {
        setShowAuthModal(false);
        setStep('type-selection');
        setSelectedType(null);
        setError('');
        setEmail('');
        setPassword('');
        setName('');
    };

    const switchMode = () => {
        setAuthModalMode(authModalMode === 'login' ? 'signup' : 'login');
        setError('');
        setStep('type-selection');
        setSelectedType(null);
    };

    if (!showAuthModal) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0a0a0f]"
            >
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
                </div>

                {/* Close button - top right */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Main content - centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl px-6"
                >
                    {/* Header */}
                    <div className={`text-center ${step === 'type-selection' ? 'mb-12' : 'mb-8'}`}>
                        <motion.h2
                            key={`${authModalMode}-${step}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`font-bold text-white ${step === 'type-selection' ? 'text-4xl md:text-5xl mb-4' : 'text-3xl md:text-4xl mb-3'}`}
                        >
                            {step === 'type-selection'
                                ? (authModalMode === 'login' ? 'Welcome Back' : 'Join as a Company or Individual')
                                : (authModalMode === 'login' ? 'Sign In' : 'Create Your Account')
                            }
                        </motion.h2>
                        <p className="text-gray-400 text-lg">
                            {step === 'type-selection'
                                ? 'Choose your account type to get started'
                                : `Continue as ${selectedType === 'company' ? 'Company/Organization' : 'Individual'}`
                            }
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'type-selection' ? (
                            <motion.div
                                key="type-selection"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                {/* Cards Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Company Option */}
                                    <button
                                        onClick={() => setSelectedType('company')}
                                        className={`relative p-8 rounded-2xl border-2 transition-all duration-200 text-left min-h-[200px] flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'company'
                                            ? 'border-cyan-500 bg-cyan-500/10'
                                            : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className="mb-auto">
                                            <Building2 size={32} className={`${selectedType === 'company' ? 'text-cyan-400' : 'text-gray-400'} transition-colors`} strokeWidth={1.5} />
                                        </div>

                                        {/* Radio indicator */}
                                        <div className="absolute top-6 right-6">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedType === 'company'
                                                ? 'border-cyan-500'
                                                : 'border-white/30'
                                                }`}>
                                                {selectedType === 'company' && (
                                                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="mt-6">
                                            <h3 className={`text-lg font-semibold leading-snug ${selectedType === 'company' ? 'text-white' : 'text-gray-300'} transition-colors`}>
                                                Company / Organization
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Access legal services, grants & premium features
                                            </p>
                                        </div>
                                    </button>

                                    {/* Personal Option */}
                                    <button
                                        onClick={() => setSelectedType('personal')}
                                        className={`relative p-8 rounded-2xl border-2 transition-all duration-200 text-left min-h-[200px] flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'personal'
                                            ? 'border-amber-500 bg-amber-500/10'
                                            : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className="mb-auto">
                                            <User size={32} className={`${selectedType === 'personal' ? 'text-amber-400' : 'text-gray-400'} transition-colors`} strokeWidth={1.5} />
                                        </div>

                                        {/* Radio indicator */}
                                        <div className="absolute top-6 right-6">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedType === 'personal'
                                                ? 'border-amber-500'
                                                : 'border-white/30'
                                                }`}>
                                                {selectedType === 'personal' && (
                                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="mt-6">
                                            <h3 className={`text-lg font-semibold leading-snug ${selectedType === 'personal' ? 'text-white' : 'text-gray-300'} transition-colors`}>
                                                Personal Account
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                For individual users & freelancers
                                            </p>
                                        </div>
                                    </button>
                                </div>

                                {/* Create Account Button */}
                                <button
                                    onClick={() => selectedType && setStep('credentials')}
                                    disabled={!selectedType}
                                    className={`w-full py-4 rounded-full font-semibold text-base transition-all duration-200 ${selectedType
                                        ? selectedType === 'company'
                                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700'
                                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700'
                                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                                        }`}
                                >
                                    {authModalMode === 'login' ? 'Continue' : 'Create Account'}
                                </button>

                                {/* Switch mode */}
                                <div className="text-center">
                                    <p className="text-gray-400 text-base">
                                        {authModalMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                        <button
                                            onClick={switchMode}
                                            className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
                                        >
                                            {authModalMode === 'login' ? 'Sign Up' : 'Log In'}
                                        </button>
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="credentials"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col items-center"
                            >
                                {/* Form container with max width */}
                                <div className="w-full max-w-md">
                                    {/* Back button */}
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                                    >
                                        <ArrowLeft size={16} />
                                        <span className="text-sm">Back to account type</span>
                                    </button>

                                    {/* Form fields container */}
                                    <div className="flex flex-col gap-4">
                                        {/* Company/Organization name field (only for company signup) */}
                                        {authModalMode === 'signup' && selectedType === 'company' && (
                                            <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-all">
                                                <Building2 size={18} className="text-gray-500 flex-shrink-0" />
                                                <input
                                                    type="text"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    placeholder="Company / Organization Name"
                                                    className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                                />
                                            </div>
                                        )}

                                        {/* Name field (only for signup) */}
                                        {authModalMode === 'signup' && (
                                            <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-all">
                                                <User size={18} className="text-gray-500 flex-shrink-0" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Full Name"
                                                    className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                                />
                                            </div>
                                        )}

                                        {/* Email field */}
                                        <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-all">
                                            <Mail size={18} className="text-gray-500 flex-shrink-0" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email address"
                                                className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Password field */}
                                        <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-all">
                                            <Lock size={18} className="text-gray-500 flex-shrink-0" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>

                                        {/* Error message */}
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-sm text-center"
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full py-4 mt-2 rounded-full font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${selectedType === 'company'
                                                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700'
                                                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                                                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                                            )}
                                        </button>

                                        {/* Switch mode in form */}
                                        <div className="text-center pt-2">
                                            <p className="text-gray-400 text-sm">
                                                {authModalMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                                <button
                                                    type="button"
                                                    onClick={switchMode}
                                                    className="ml-1 text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
                                                >
                                                    {authModalMode === 'login' ? 'Sign Up' : 'Log In'}
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
