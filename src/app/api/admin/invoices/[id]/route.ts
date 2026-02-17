import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { generateInvoicePDF } from '@/lib/invoice-generator';
import { getInvoicesData } from '@/lib/data-store';
import type { InvoiceRecord } from '@/types/invoice';

export async function GET(
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

        // Generate PDF
        const pdfBuffer = await generateInvoicePDF({
            invoiceNumber: invoice.invoiceNumber,
            date: new Date(invoice.timestamp).toLocaleDateString('en-IN'),
            time: new Date(invoice.timestamp).toLocaleTimeString('en-IN'),
            fullName: invoice.fullName,
            email: invoice.email,
            domain: invoice.domain,
            subDomain: invoice.subDomain,
            plan: invoice.plan.charAt(0).toUpperCase() + invoice.plan.slice(1),
            amount: invoice.amount,
            paymentId: invoice.paymentId,
            billingAddress: invoice.billingAddress,
        });

        // Return PDF
        return new NextResponse(new Uint8Array(pdfBuffer), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="${invoice.invoiceNumber}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
