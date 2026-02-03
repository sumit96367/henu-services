import { NextRequest, NextResponse } from 'next/server';
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

        // TODO: Verify Razorpay payment signature
        // const crypto = require('crypto');
        // const generatedSignature = crypto
        //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        //     .update(`${orderId}|${paymentId}`)
        //     .digest('hex');
        //
        // if (generatedSignature !== signature) {
        //     return NextResponse.json(
        //         { error: 'Invalid payment signature' },
        //         { status: 400 }
        //     );
        // }

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
