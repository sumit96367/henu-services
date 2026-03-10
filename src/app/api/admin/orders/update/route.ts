import { NextRequest, NextResponse } from 'next/server';
import { saveToSheet } from '@/lib/google-sheets';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // 1. Verify Admin Authentication
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Parse Request
        const body = await request.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
        }

        // 3. Update Google Sheets
        await saveToSheet('update_inquiry', {
            id: orderId,
            status
        });

        return NextResponse.json({ success: true, message: 'Inquiry updated successfully' });

    } catch (error: any) {
        console.error('Update inquiry error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

