import { NextRequest, NextResponse } from 'next/server';
import {
    updateEnrollmentStatusByInternalId,
    updatePaymentStatusByInternalId,
    addInvoiceData
} from '@/lib/data-store';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { generateInvoicePDF } from '@/lib/invoice-generator';
import { sendInvoiceEmail } from '@/lib/email-service';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            paymentId,
            orderId,
            fullName,
            email,
            domain,
            subDomain,
            plan,
            amount,
            billingAddress,
            enrollmentId,
            domainCategory
        } = body;

        // Verify Razorpay payment signature
        const crypto = require('crypto');
        const sign = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(sign.toString())
            .digest('hex');

        if (expectedSignature !== body.signature) {
            console.error('Invalid signature:', { expectedSignature, receivedSignature: body.signature });
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Generate invoice data for PDF and Email
        const invoiceNumber = `INV-${Date.now()}`;
        const timestamp = new Date().toISOString();

        const invoiceData = {
            invoiceNumber,
            date: new Date(timestamp).toLocaleDateString('en-IN'),
            time: new Date(timestamp).toLocaleTimeString('en-IN'),
            fullName,
            email,
            domain,
            subDomain,
            plan: plan.toUpperCase(),
            amount,
            paymentId: paymentId || `PAY_${Date.now()}`,
            billingAddress
        };

        // Update status in database
        try {
            // 1. Update orders collection (using firestoreId if provided)
            if (body.firestoreId) {
                const orderRef = doc(db, 'orders', body.firestoreId);
                await updateDoc(orderRef, {
                    status: 'Completed',
                    statusColor: 'green',
                    paymentId: paymentId,
                    updatedAt: serverTimestamp()
                });
            }

            // 2. Update enrollments and payments
            if (enrollmentId) {
                await updateEnrollmentStatusByInternalId(enrollmentId, 'completed');
            }
            if (orderId) {
                await updatePaymentStatusByInternalId(orderId, 'paid');
            }

            // 3. Save Invoice to Firestore for Admin Panel
            const fullInvoiceRecord = {
                id: invoiceNumber,
                invoiceNumber,
                timestamp,
                enrollmentId: enrollmentId || '',
                paymentId: paymentId,
                fullName,
                email,
                domain,
                domainCategory: domainCategory || domain,
                subDomain,
                plan: plan.toLowerCase(),
                amount,
                billingAddress,
                paymentMethod: 'card', // Razorpay default in this flow
                status: 'sent',
                pdfGenerated: true
            };

            await addInvoiceData(fullInvoiceRecord);

        } catch (dbError) {
            console.error('Database update error:', dbError);
            // Continue even if DB update fails, as payment is verified
        }

        // Generate PDF invoice
        const pdfBuffer = await generateInvoicePDF(invoiceData);

        // Send invoice via email
        try {
            await sendInvoiceEmail({
                to: email,
                fullName,
                invoiceData,
                pdfBuffer
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Non-blocking for the API response
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified, invoice saved and sent',
            invoiceNumber
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
