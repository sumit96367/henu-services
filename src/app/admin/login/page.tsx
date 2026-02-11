"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AdminLoginPage() {
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setIsLoading(true);

        try {
            // 1. Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, adminId, password);
            const user = userCredential.user;

            // 2. Verify Admin Role in Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (!userDoc.exists() || userDoc.data()?.role !== 'admin') {
                setError("Access denied: You do not have administrator privileges.");
                setIsLoading(false);
                return;
            }

            const userData = userDoc.data();

            // 3. Set the secure session cookie via our API
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    role: userData.role
                }),
            });

            if (response.ok) {
                // Success - redirect to dashboard
                window.location.href = "/admin/dashboard";
            } else {
                const data = await response.json();
                setError(data.error || "Failed to establish admin session.");
                setIsLoading(false);
            }
        } catch (err: any) {
            console.error("Admin Auth Error:", err);
            setError(err.code === 'auth/invalid-credential'
                ? "Invalid admin ID or password."
                : "Authentication failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-lora), serif'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '28px',
                padding: '60px',
                width: '100%',
                maxWidth: '500px',
                backdropFilter: 'blur(10px)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        backgroundColor: '#0ea5e9',
                        borderRadius: '18px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        boxShadow: '0 0 40px rgba(14, 165, 233, 0.3)'
                    }}>
                        <span style={{ fontSize: '36px' }}>🔒</span>
                    </div>
                    <h1 style={{
                        color: '#fff',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                    }}>
                        Admin Portal
                    </h1>
                    <p style={{ color: '#888', fontSize: '16px' }}>
                        Secure access to dashboard
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '24px',
                        color: '#ef4444',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '12px'
                        }}>
                            Admin ID
                        </label>
                        <input
                            type="email"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            placeholder="admin@henuservices.com"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '12px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleLogin();
                            }}
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                fontSize: '16px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '20px',
                            backgroundColor: '#0ea5e9',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.6 : 1,
                            boxShadow: '0 4px 16px rgba(14, 165, 233, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = '#0284c7';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = '#0ea5e9';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 165, 233, 0.3)';
                            }
                        }}
                    >
                        {isLoading ? "Authenticating..." : "Login"}
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '32px',
                    paddingTop: '28px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#666', fontSize: '13px' }}>
                        Protected access. Authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    );
}
