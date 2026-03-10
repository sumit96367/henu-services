import { NextRequest, NextResponse } from 'next/server';
import { saveToSheet } from '@/lib/google-sheets';

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

        // Save to Google Sheets
        await saveToSheet('inquiry', {
            id: orderId,
            orderNumber: orderNumber,
            fullName: name,
            email: email,
            companyName: companyName || null,
            userType: userType || 'company',
            subDomain: service,
            plan: budget || 'Not Specified',
            message: message,
            status: 'New Inquiry'
        });

        // NOTE: Record is no longer saved to Firebase Firestore as per requirement

        return NextResponse.json({
            success: true,
            orderId: orderId,
            orderNumber: orderNumber
        });

    } catch (error: any) {
        console.error('Contact form submission error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process inquiry' },
            { status: 500 }
        );
    }
}

