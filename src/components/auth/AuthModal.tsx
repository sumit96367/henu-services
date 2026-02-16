'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
                className="fixed inset-0 z-[500] overflow-y-auto bg-[#0a0a0f]"
            >
                {/* Background decorations */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
                </div>

                {/* Close button */}
                <button
                    onClick={() => setShowAuthModal(false)}
                    className="fixed top-6 right-6 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                >
                    <X size={24} />
                </button>

                <div className="flex min-h-screen items-start justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl my-auto !px-12 !py-8 md:!p-8"
                    >
                        <div className="flex flex-col items-center text-center">
                            {/* Logo */}
                            <div className="w-56 h-32 -mb-4 relative flex items-center justify-center group">
                                {/* Logo Glow */}
                                <div className="absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full" />

                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        filter: "drop-shadow(0 0 30px rgba(109, 40, 217, 0.8))"
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        scale: { duration: 6, repeat: Infinity }, // for the pulse
                                        filter: { duration: 0.3 } // for the hover
                                    }}
                                    className="relative w-48 h-48 z-10 cursor-pointer"
                                >
                                    <Image
                                        src="/logo.png"
                                        alt="Henu OS Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            <h2 className={`font-bold text-white ${step === 'type-selection' ? 'text-3xl md:text-4xl mb-3' : 'text-2xl md:text-3xl mb-2'}`}>
                                {step === 'type-selection'
                                    ? (authModalMode === 'login' ? 'Welcome Back' : 'Join Henu OS')
                                    : (verificationStep === 'otp' ? 'Verify OTP' : (authModalMode === 'login' ? 'Sign In' : 'Create Account'))
                                }
                            </h2>
                            <p className="text-gray-400 text-base">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            onClick={() => setSelectedType('company')}
                                            className={`relative rounded-2xl border-2 transition-all duration-200 text-left !min-h-[160px] md:!min-h-[200px] !p-6 md:!p-8 flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'company' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className="mb-auto">
                                                <Building2 size={32} className={selectedType === 'company' ? 'text-purple-400' : 'text-gray-400'} />
                                            </div>
                                            <div className="mt-6">
                                                <h3 className={`text-lg font-semibold ${selectedType === 'company' ? 'text-white' : 'text-gray-300'}`}>Company / Organization</h3>
                                                <p className="text-sm text-gray-500 mt-1">Access grants & premium features</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedType('personal')}
                                            className={`relative rounded-2xl border-2 transition-all duration-200 text-left !min-h-[160px] md:!min-h-[200px] !p-6 md:!p-8 flex flex-col bg-white/[0.03] backdrop-blur-sm ${selectedType === 'personal' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
                                        >
                                            <User size={32} className={selectedType === 'personal' ? 'text-indigo-400' : 'text-gray-400'} />
                                            <div className="mt-6">
                                                <h3 className={`text-lg font-semibold ${selectedType === 'personal' ? 'text-white' : 'text-gray-300'}`}>Personal Account</h3>
                                                <p className="text-sm text-gray-500 mt-1">For freelancers & individuals</p>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex justify-center" style={{ marginTop: '0.4cm', marginBottom: '0.2cm' }}>
                                        <button
                                            onClick={() => selectedType && setStep('credentials')}
                                            disabled={!selectedType}
                                            className={`w-64 py-3 min-h-[48px] rounded-full font-bold text-lg transition-all ${selectedType ? (selectedType === 'company' ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30') : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                                        >
                                            Continue
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-400">
                                            {authModalMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                            <button onClick={switchMode} className="ml-2 text-purple-400 hover:underline">
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
                                        <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" style={{ marginBottom: '28px' }}>
                                            <ArrowLeft size={16} /> <span className="text-sm">Back</span>
                                        </button>

                                        {/* Auth Method Toggle */}
                                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10" style={{ marginBottom: '16px' }}>
                                            <button
                                                onClick={() => setAuthMethod('email')}
                                                className={`flex-1 text-sm font-semibold rounded-xl transition-all ${authMethod === 'email' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                                style={{ padding: '14px 0' }}
                                            >
                                                Email
                                            </button>
                                            <button
                                                onClick={() => setAuthMethod('phone')}
                                                className={`flex-1 text-sm font-semibold rounded-xl transition-all ${authMethod === 'phone' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                                style={{ padding: '14px 0' }}
                                            >
                                                Phone
                                            </button>
                                        </div>

                                        {authMethod === 'email' ? (
                                            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                {authModalMode === 'signup' && (
                                                    <>
                                                        {selectedType === 'company' && (
                                                            <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                                <Building2 size={20} className="text-gray-500" />
                                                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name" className="flex-1 bg-transparent text-white outline-none text-base" />
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                            <User size={20} className="text-gray-500" />
                                                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="flex-1 bg-transparent text-white outline-none text-base" required />
                                                        </div>
                                                    </>
                                                )}
                                                <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                    <Mail size={20} className="text-gray-500" />
                                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="flex-1 bg-transparent text-white outline-none text-base" required />
                                                </div>
                                                <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                    <Lock size={20} className="text-gray-500" />
                                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="flex-1 bg-transparent text-white outline-none text-base" required />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white">
                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                                <button type="submit" disabled={isLoading} className={`w-full rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} ${isLoading ? 'opacity-50' : ''}`} style={{ padding: '14px', marginTop: '2px' }}>
                                                    {isLoading ? <Loader2 className="animate-spin" /> : (authModalMode === 'login' ? 'Sign In' : 'Create Account')}
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="space-y-4">
                                                {verificationStep === 'input' ? (
                                                    <form onSubmit={handlePhoneRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                        <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                            <Smartphone size={20} className="text-gray-500" />
                                                            <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+91 99999 99999" className="flex-1 bg-transparent text-white outline-none text-base" required />
                                                        </div>
                                                        <div id="recaptcha-container"></div>
                                                        <button type="submit" disabled={isLoading} className={`w-full rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-purple-600' : 'bg-indigo-600'} ${isLoading ? 'opacity-50' : ''}`} style={{ padding: '14px', marginTop: '2px' }}>
                                                            {isLoading ? <Loader2 className="animate-spin" /> : 'Send Code'}
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <form onSubmit={handlePhoneVerify} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                        <div className="flex items-center gap-3 w-full px-4 bg-white/5 border-2 border-white/10 rounded-xl focus-within:border-purple-500/50" style={{ height: '50px' }}>
                                                            <Lock size={20} className="text-gray-500" />
                                                            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" className="flex-1 bg-transparent text-white outline-none text-center tracking-widest text-base" required maxLength={6} />
                                                        </div>
                                                        <button type="submit" disabled={isLoading} className={`w-full rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 ${selectedType === 'company' ? 'bg-purple-600' : 'bg-indigo-600'} ${isLoading ? 'opacity-50' : ''}`} style={{ padding: '14px', marginTop: '2px' }}>
                                                            {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        )}

                                        {/* Social Auth */}
                                        <div style={{ marginTop: '20px' }}>
                                            <div className="relative" style={{ marginBottom: '14px' }}>
                                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                                <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#0a0a0f] text-gray-500">Or continue with</span></div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-5">
                                                <button onClick={() => handleSocialAuth('google')} className="flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all" style={{ padding: '12px 16px' }}>
                                                    <FaGoogle size={22} className="text-red-500" />
                                                    <span className="text-base font-semibold">Google</span>
                                                </button>
                                                <button onClick={() => handleSocialAuth('apple')} className="flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all" style={{ padding: '12px 16px' }}>
                                                    <FaApple size={22} />
                                                    <span className="text-base font-semibold">Apple</span>
                                                </button>
                                            </div>
                                        </div>

                                        {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
