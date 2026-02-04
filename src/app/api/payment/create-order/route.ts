import { NextRequest, NextResponse } from 'next/server';
import { saveEnrollment, savePayment } from '@/lib/data-store';
import { EnrollmentRecord, PaymentRecord } from '@/types/admin';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
            domainCategory,
            userId,
            userType,
            companyName
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

        // Create enrollment record (local store)
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

        // Create payment record (local store)
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

        // Save to local data store
        saveEnrollment(enrollmentRecord);
        savePayment(paymentRecord);

        // Save to Firestore for real-time dashboard updates
        let firestoreId = null;
        try {
            const orderRef = await addDoc(collection(db, 'orders'), {
                userId: userId || null,
                fullName,
                email,
                domain,
                subDomain,
                plan,
                amount,
                paymentMethod,
                billingAddress,
                status: 'Processing',
                statusColor: 'cyan',
                userType: userType || 'personal',
                companyName: companyName || null,
                type: 'internship_enrollment',
                enrollmentId,
                invoiceNumber,
                orderId,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            firestoreId = orderRef.id;
        } catch (fsError) {
            console.error('Firestore save error:', fsError);
            // Non-blocking for now, as local save succeeded
        }

        // For now, return a mock response that includes the IDs
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
            enrollmentId,
            firestoreId,
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
