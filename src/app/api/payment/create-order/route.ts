import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            fullName,
            email,
            domain,
            subDomain,
            plan,
            amount,
            paymentMethod,
            billingAddress
        } = body;

        // Validate required fields
        if (!fullName || !email || !domain || !subDomain || !plan || !amount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // TODO: Implement Razorpay order creation
        // const Razorpay = require('razorpay');
        // const razorpay = new Razorpay({
        //     key_id: process.env.RAZORPAY_KEY_ID,
        //     key_secret: process.env.RAZORPAY_KEY_SECRET
        // });
        //
        // const options = {
        //     amount: amount * 100, // amount in smallest currency unit (paise)
        //     currency: 'INR',
        //     receipt: `receipt_${Date.now()}`,
        //     payment_capture: 1
        // };
        //
        // const order = await razorpay.orders.create(options);

        // For now, return a mock order
        const mockOrder = {
            id: `order_${Date.now()}`,
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            status: 'created'
        };

        return NextResponse.json({
            success: true,
            order: mockOrder,
            enrollmentData: {
                fullName,
                email,
                domain,
                subDomain,
                plan,
                amount,
                paymentMethod,
                billingAddress
            }
        });

    } catch (error) {
        console.error('Payment order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
