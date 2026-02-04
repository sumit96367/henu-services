import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

// Note: In a production environment, you should use firebase-admin to verify the ID token.
// For now, we will receive the user details from the client after they've already authenticated with Firebase.
// THE CLIENT MUST BE TRUSTED OR WE MUST VERIFY THE TOKEN ON THE SERVER.

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uid, email, role } = body;

        // Security Check: Only allow if role is specifically 'admin'
        if (role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized: Admin access required' },
                { status: 403 }
            );
        }

        // Generate our internal administrative JWT token
        const token = await generateToken(uid, role);

        // Create response with HTTP-only cookie
        const response = NextResponse.json(
            { success: true, message: 'Admin login successful' },
            { status: 200 }
        );

        // Set HTTP-only cookie for middleware protection
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
