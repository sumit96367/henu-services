import { NextRequest, NextResponse } from 'next/server';
import { generateToken, validateCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { adminId, password } = body;

        // Validate credentials
        if (!validateCredentials(adminId, password)) {
            return NextResponse.json(
                { error: 'Invalid admin credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = await generateToken(adminId);

        // Create response with HTTP-only cookie
        const response = NextResponse.json(
            { success: true, message: 'Login successful' },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
