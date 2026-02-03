import { NextRequest, NextResponse } from 'next/server';
import { saveEnrollment, savePayment } from '@/lib/data-store';
import { EnrollmentRecord, PaymentRecord } from '@/types/admin';

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
            billingAddress,
            domainCategory
        } = body;

        // Validate required fields
        if (!fullName || !email || !domain || !subDomain || !plan || !amount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate unique IDs
        const enrollmentId = `ENR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const orderId = `order_${Date.now()}`;
        const invoiceNumber = `INV-${Date.now()}`;
        const timestamp = new Date().toISOString();

        // Create enrollment record
        const enrollmentRecord: EnrollmentRecord = {
            id: enrollmentId,
            timestamp,
            fullName,
            email,
            domain,
            domainCategory: domainCategory || domain,
            subDomain,
            plan,
            amount,
            billingAddress,
            paymentMethod,
            orderId,
            status: 'pending'
        };

        // Create payment record
        const paymentRecord: PaymentRecord = {
            id: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp,
            enrollmentId,
            invoiceNumber,
            fullName,
            email,
            amount,
            status: 'pending',
            paymentMethod,
            orderId
        };

        // Save to data store
        saveEnrollment(enrollmentRecord);
        savePayment(paymentRecord);

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
            id: orderId,
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
                billingAddress,
                enrollmentId,
                invoiceNumber
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
