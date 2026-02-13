import { NextRequest, NextResponse } from 'next/server';
import { saveEnrollment, savePayment, saveQuery } from '@/lib/data-store';
import { EnrollmentRecord, PaymentRecord } from '@/types/admin';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Razorpay from 'razorpay';

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
            companyName,
            queries
        } = body;

        // Validate required fields
        if (!fullName || !email || !domain || !subDomain || !plan || !amount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate unique enrollment ID first
        const enrollmentId = `ENR_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        let orderId = `ORDER_STORE_${Date.now()}`;
        let razorpayOrder = { id: orderId, amount: amount * 100, currency: 'INR', status: 'created' };

        // 1. Create a real Razorpay order ONLY if keys are present
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
            try {
                const razorpay = new Razorpay({
                    key_id: process.env.RAZORPAY_KEY_ID,
                    key_secret: process.env.RAZORPAY_KEY_SECRET,
                });

                const rzpOrder = await razorpay.orders.create({
                    amount: amount * 100, // amount in paise
                    currency: 'INR',
                    receipt: `receipt_${enrollmentId}`,
                    notes: {
                        enrollmentId,
                        fullName,
                        email,
                        domain,
                        subDomain,
                        plan
                    }
                });

                razorpayOrder = {
                    id: rzpOrder.id,
                    amount: rzpOrder.amount as number,
                    currency: rzpOrder.currency,
                    status: rzpOrder.status
                };
                orderId = rzpOrder.id;
            } catch (rzpError) {
                console.error('Razorpay Error (Skipping API):', rzpError);
                // Continue with local orderId if API fails
            }
        }
        const invoiceNumber = `INV-${Date.now()}`;
        const timestamp = new Date().toISOString();

        // 2. Create enrollment record (local store)
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

        // 3. Create payment record (local store)
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

        // 4. Save to admin data store (Firestore)
        await saveEnrollment(enrollmentRecord);
        await savePayment(paymentRecord);

        // 5. Save queries if provided
        if (queries && queries.trim()) {
            await saveQuery({
                enrollmentId,
                fullName,
                email,
                domain,
                subDomain,
                queries,
                timestamp
            });
        }

        // 6. Save to Firestore for real-time dashboard updates
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
        }

        return NextResponse.json({
            success: true,
            order: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                status: razorpayOrder.status
            },
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

    } catch (error: any) {
        console.error('Payment order creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
