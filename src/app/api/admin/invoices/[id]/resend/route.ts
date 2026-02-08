import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import type { InvoiceRecord } from '@/types/invoice';

const INVOICES_FILE = path.join(process.cwd(), 'data', 'invoices.json');

// Read invoices from file
function getInvoices(): InvoiceRecord[] {
    try {
        if (!fs.existsSync(INVOICES_FILE)) {
            return [];
        }
        const data = fs.readFileSync(INVOICES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading invoices:', error);
        return [];
    }
}

// Write invoices to file
function saveInvoices(invoices: InvoiceRecord[]) {
    try {
        fs.writeFileSync(INVOICES_FILE, JSON.stringify(invoices, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving invoices:', error);
        throw error;
    }
}

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
        const invoices = getInvoices();
        const invoiceIndex = invoices.findIndex(inv => inv.id === invoiceId);

        if (invoiceIndex === -1) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 }
            );
        }

        const invoice = invoices[invoiceIndex];

        // TODO: In production, integrate with actual email service
        console.log(`Resending invoice ${invoice.invoiceNumber} to ${invoice.email}`);

        // Update invoice status to sent
        invoices[invoiceIndex].status = 'sent';
        invoices[invoiceIndex].pdfGenerated = true;
        saveInvoices(invoices);

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
