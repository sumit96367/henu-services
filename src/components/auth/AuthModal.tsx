'use client';

import { useState, useEffect } from 'react';
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
    CheckCircle2,
    Phone,
    Smartphone
} from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';

export const AuthModal = () => {
    const {
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
        login,
        signup,
        signInWithGoogle,
        signInWithApple,
        requestPhoneOTP,
        verifyPhoneOTP,
        isLoading
    } = useAuth();

    const [step, setStep] = useState<'type-selection' | 'credentials'>('type-selection');
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [selectedType, setSelectedType] = useState<UserType>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationStep, setVerificationStep] = useState<'input' | 'otp'>('input');
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleBack = () => {
        if (verificationStep === 'otp') {
            setVerificationStep('input');
            setConfirmationResult(null);
            setOtp('');
        } else {
            setStep('type-selection');
            setSelectedType(null);
            setCompanyName('');
            setError('');
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
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
                await login(email, password);
            } else {
                await signup(email, password, name, selectedType, companyName);
            }
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please try again.');
        }
    };

    const handlePhoneRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phoneNumber) {
            setError('Please enter your phone number');
            return;
        }

        try {
            const result = await requestPhoneOTP(phoneNumber, 'recaptcha-container');
            setConfirmationResult(result);
            setVerificationStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send code. Please check the number.');
        }
    };

    const handlePhoneVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!otp) {
            setError('Please enter the verification code');
            return;
        }

        try {
            await verifyPhoneOTP(confirmationResult, otp, selectedType);
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Invalid code. Please try again.');
        }
    };

    const handleSocialAuth = async (provider: 'google' | 'apple') => {
        setError('');
        try {
            if (provider === 'google') await signInWithGoogle(selectedType);
            else await signInWithApple(selectedType);
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Social sign in failed.');
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setPhoneNumber('');
        setOtp('');
        setStep('type-selection');
        setSelectedType(null);
        setVerificationStep('input');
        setConfirmationResult(null);
        setShowAuthModal(false);
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

                {/* Close button */}
                <button
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-6 right-6 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl px-6"
                >
                    <div className={`text-center ${step === 'type-selection' ? 'mb-12' : 'mb-8'}`}>
                        <h2 className={`font-bold text-white ${step === 'type-selection' ? 'text-4xl md:text-5xl mb-4' : 'text-3xl md:text-4xl mb-3'}`}>
                            {step === 'type-selection'
                                ? (authModalMode === 'login' ? 'Welcome Back' : 'Join Henu OS')
                                : (verificationStep === 'otp' ? 'Verify OTP' : (authModalMode === 'login' ? 'Sign In' : 'Create Account'))
                            }
                        </h2>
                        <p className="text-gray-400 text-lg">
                            {step === 'type-selection'
                                ? 'Choose your account type to get started'
                                : (verificationStep === 'otp' ? `Code sent to ${phoneNumber}` : `Continue as ${selectedType === 'company' ? 'Company' : 'Individual'}`)
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
                                <div className="grid grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setSelectedType('company')}
                                        className={`relative rounded-2xl border-2 transition-all duration-200 text-left min-h-[200px] flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'company' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'}`}
                                        style={{ padding: 'max(37.8px, 1.5rem)' }}
                                    >
                                        <div className="mb-auto">
                                            <Building2 size={32} className={selectedType === 'company' ? 'text-cyan-400' : 'text-gray-400'} />
                                        </div>
                                        <div className="mt-6">
                                            <h3 className={`text-lg font-semibold ${selectedType === 'company' ? 'text-white' : 'text-gray-300'}`}>Company / Organization</h3>
                                            <p className="text-sm text-gray-500 mt-1">Access grants & premium features</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setSelectedType('personal')}
                                        className={`relative rounded-2xl border-2 transition-all duration-200 text-left min-h-[200px] flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'personal' ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 hover:border-white/20'}`}
                                        style={{ padding: 'max(37.8px, 1.5rem)' }}
                                    >
                                        <User size={32} className={selectedType === 'personal' ? 'text-amber-400' : 'text-gray-400'} />
                                        <div className="mt-6">
                                            <h3 className={`text-lg font-semibold ${selectedType === 'personal' ? 'text-white' : 'text-gray-300'}`}>Personal Account</h3>
                                            <p className="text-sm text-gray-500 mt-1">For freelancers & individuals</p>
                                        </div>
                                    </button>
                                </div>

                                <button
                                    onClick={() => selectedType && setStep('credentials')}
                                    disabled={!selectedType}
                                    className={`w-full py-4 rounded-full font-semibold transition-all ${selectedType ? (selectedType === 'company' ? 'bg-cyan-500 text-white' : 'bg-amber-500 text-black') : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                                    style={{ marginTop: '2cm' }}
                                >
                                    Continue
                                </button>

                                <div className="text-center">
                                    <p className="text-gray-400">
                                        {authModalMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                        <button onClick={switchMode} className="ml-2 text-cyan-400 hover:underline">
                                            {authModalMode === 'login' ? 'Sign Up' : 'Log In'}
                                        </button>
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="credentials"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full flex flex-col items-center"
                            >
                                <div className="w-full max-w-md">
                                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                                        <ArrowLeft size={16} /> <span className="text-sm">Back</span>
                                    </button>

                                    {/* Auth Method Toggle */}
                                    <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/10">
                                        <button
                                            onClick={() => setAuthMethod('email')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMethod === 'email' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Email
                                        </button>
                                        <button
                                            onClick={() => setAuthMethod('phone')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMethod === 'phone' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Phone
                                        </button>
                                    </div>

                                    {authMethod === 'email' ? (
                                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                                            {authModalMode === 'signup' && (
                                                <>
                                                    {selectedType === 'company' && (
                                                        <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                            <Building2 size={18} className="text-gray-500" />
                                                            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name" className="flex-1 bg-transparent text-white outline-none" />
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                        <User size={18} className="text-gray-500" />
                                                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="flex-1 bg-transparent text-white outline-none" required />
                                                    </div>
                                                </>
                                            )}
                                            <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                <Mail size={18} className="text-gray-500" />
                                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="flex-1 bg-transparent text-white outline-none" required />
                                            </div>
                                            <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                <Lock size={18} className="text-gray-500" />
                                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="flex-1 bg-transparent text-white outline-none" required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-amber-500 text-black hover:bg-amber-600'} ${isLoading ? 'opacity-50' : ''}`}>
                                                {isLoading ? <Loader2 className="animate-spin" /> : (authModalMode === 'login' ? 'Sign In' : 'Create Account')}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="space-y-4">
                                            {verificationStep === 'input' ? (
                                                <form onSubmit={handlePhoneRequest} className="space-y-4">
                                                    <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                        <Smartphone size={18} className="text-gray-500" />
                                                        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+91 99999 99999" className="flex-1 bg-transparent text-white outline-none" required />
                                                    </div>
                                                    <div id="recaptcha-container"></div>
                                                    <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-cyan-500' : 'bg-amber-500 text-black'} ${isLoading ? 'opacity-50' : ''}`}>
                                                        {isLoading ? <Loader2 className="animate-spin" /> : 'Send Code'}
                                                    </button>
                                                </form>
                                            ) : (
                                                <form onSubmit={handlePhoneVerify} className="space-y-4">
                                                    <div className="flex items-center gap-3 w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-cyan-500/50">
                                                        <Lock size={18} className="text-gray-500" />
                                                        <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" className="flex-1 bg-transparent text-white outline-none text-center tracking-widest" required maxLength={6} />
                                                    </div>
                                                    <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-cyan-500' : 'bg-amber-500 text-black'} ${isLoading ? 'opacity-50' : ''}`}>
                                                        {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {/* Social Auth */}
                                    <div className="mt-8">
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#0a0a0f] text-gray-500">Or continue with</span></div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => handleSocialAuth('google')} className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                                                <FaGoogle size={20} className="text-red-500" />
                                                <span className="text-sm font-medium">Google</span>
                                            </button>
                                            <button onClick={() => handleSocialAuth('apple')} className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                                                <FaApple size={20} />
                                                <span className="text-sm font-medium">Apple</span>
                                            </button>
                                        </div>
                                    </div>

                                    {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
