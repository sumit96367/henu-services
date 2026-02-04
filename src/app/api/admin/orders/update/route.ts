import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
        const { orderId, status, statusColor } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
        }

        // 3. Update Firestore
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
            status,
            statusColor: statusColor || 'amber',
            updatedAt: serverTimestamp()
        });

        return NextResponse.json({ success: true, message: 'Order updated successfully' });

    } catch (error) {
        console.error('Update order error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
