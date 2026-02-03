import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { authenticated: true, adminId: payload.adminId },
            { status: 200 }
        );
    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json(
            { authenticated: false },
            { status: 401 }
        );
    }
}
