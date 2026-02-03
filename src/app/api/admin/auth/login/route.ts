import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { adminId, password } = body;

        // Validate input
        if (!adminId || !password) {
            return NextResponse.json(
                { error: 'Admin ID and password are required' },
                { status: 400 }
            );
        }

        // Verify credentials
        const isValid = await verifyAdminCredentials(adminId, password);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = await generateToken(adminId);

        // Create response with token in HTTP-only cookie
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            adminId
        });

        // Set HTTP-only cookie with the token
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
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
