"use client";

import { useState } from "react";

export default function AdminLoginPage() {
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - redirect to dashboard
                window.location.href = "/admin/dashboard";
            } else {
                // Show error message
                setError(data.error || "Invalid admin credentials");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Failed to login. Please try again.");
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
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                maxWidth: '420px',
                backdropFilter: 'blur(10px)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#0ea5e9',
                        borderRadius: '16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: '0 0 40px rgba(14, 165, 233, 0.3)'
                    }}>
                        <span style={{ fontSize: '32px' }}>🔒</span>
                    </div>
                    <h1 style={{
                        color: '#fff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                    }}>
                        Admin Portal
                    </h1>
                    <p style={{ color: '#888', fontSize: '14px' }}>
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
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px'
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
                                padding: '12px 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px'
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
                                padding: '12px 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '14px',
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
                            padding: '14px',
                            backgroundColor: '#0ea5e9',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
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
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#666', fontSize: '12px' }}>
                        Protected access. Authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    );
}
