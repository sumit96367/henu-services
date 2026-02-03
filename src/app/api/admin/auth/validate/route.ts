import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { isValid: false, error: 'No token found' },
                { status: 401 }
            );
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { isValid: false, error: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            isValid: true,
            adminId: payload.adminId
        });
    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json(
            { isValid: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
