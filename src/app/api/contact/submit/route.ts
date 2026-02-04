import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, service, budget, message, userId, userType, companyName } = body;

        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate a unique Order ID and Order Number for the inquiry
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const orderNumber = `SRV-${Math.floor(100000 + Math.random() * 900000)}`;

        // Save to Firestore 'orders' collection so it appears in Admin Dashboard
        const orderRef = await addDoc(collection(db, 'orders'), {
            userId: userId || null,
            userType: userType || 'company',
            companyName: companyName || null,
            fullName: name,
            email: email,
            domain: 'Professional Service',
            subDomain: service, // The services selected
            plan: budget || 'Not Specified',
            amount: 0, // Inquiries don't have an upfront amount
            paymentMethod: 'Inquiry',
            status: 'New Inquiry',
            statusColor: 'amber',
            orderId: orderId,
            orderNumber: orderNumber,
            message: message,
            type: 'service_inquiry',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return NextResponse.json({
            success: true,
            orderId: orderId,
            orderNumber: orderNumber,
            firestoreId: orderRef.id
        });

    } catch (error) {
        console.error('Contact form submission error:', error);
        return NextResponse.json(
            { error: 'Failed to process inquiry' },
            { status: 500 }
        );
    }
}
