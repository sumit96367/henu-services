import { NextRequest, NextResponse } from 'next/server';
import { updateEnrollmentStatusByInternalId, updatePaymentStatusByInternalId } from '@/lib/data-store';
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
            billingAddress
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

        // Generate invoice data
        const invoiceData = {
            invoiceNumber: `INV-${Date.now()}`,
            date: new Date().toLocaleDateString('en-IN'),
            time: new Date().toLocaleTimeString('en-IN'),
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
            if (body.enrollmentId) {
                await updateEnrollmentStatusByInternalId(body.enrollmentId, 'completed');
            }
            if (orderId) {
                await updatePaymentStatusByInternalId(orderId, 'paid');
            }
        } catch (dbError) {
            console.error('Database update error:', dbError);
            // Continue even if DB update fails, as payment is verified
        }

        // Generate PDF invoice
        const pdfBuffer = await generateInvoicePDF(invoiceData);

        // Send invoice via email
        await sendInvoiceEmail({
            to: email,
            fullName,
            invoiceData,
            pdfBuffer
        });

        return NextResponse.json({
            success: true,
            message: 'Payment verified and invoice sent',
            invoiceNumber: invoiceData.invoiceNumber
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
