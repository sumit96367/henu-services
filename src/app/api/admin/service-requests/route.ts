import { NextRequest, NextResponse } from 'next/server';
import { getServiceRequests } from '@/lib/data-store';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify token
        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const requests = await getServiceRequests();

        return NextResponse.json({
            success: true,
            requests,
            total: requests.length
        });
    } catch (error) {
        console.error('Error fetching service requests:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service requests' },
            { status: 500 }
        );
    }
}
