"use client";

export default function AdminPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
            }}>
                Admin Access Page – Base Setup Successful
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: '#888'
            }}>
                No authentication applied yet
            </p>
        </div>
    );
}
