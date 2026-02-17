import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getInvoicesData, updateInvoiceStatus } from '@/lib/data-store';
import type { InvoiceRecord } from '@/types/invoice';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify token
        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Await params in Next.js 15+
        const { id: invoiceId } = await params;
        const invoices = await getInvoicesData();
        const invoice = invoices.find(inv => inv.id === invoiceId || inv.invoiceNumber === invoiceId);

        if (!invoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 }
            );
        }

        // TODO: In production, integrate with actual email service
        console.log(`Resending invoice ${invoice.invoiceNumber} to ${invoice.email}`);

        // Update invoice status to sent in Firestore
        await updateInvoiceStatus(invoice.id, 'sent', true);

        return NextResponse.json({
            success: true,
            message: `Invoice resent to ${invoice.email}`,
        });
    } catch (error) {
        console.error('Error resending invoice:', error);
        return NextResponse.json(
            { error: 'Failed to resend invoice' },
            { status: 500 }
        );
    }
}
