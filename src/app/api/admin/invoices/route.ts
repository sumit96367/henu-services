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

export async function GET(request: NextRequest) {
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

        // Get query parameters for filtering
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const search = searchParams.get('search')?.toLowerCase();

        let invoices = getInvoices();

        // Apply filters
        if (status) {
            invoices = invoices.filter(inv => inv.status === status);
        }

        if (search) {
            invoices = invoices.filter(inv =>
                inv.invoiceNumber.toLowerCase().includes(search) ||
                inv.email.toLowerCase().includes(search)
            );
        }

        // Sort by timestamp (newest first)
        invoices.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json({
            success: true,
            invoices,
            total: invoices.length
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoices' },
            { status: 500 }
        );
    }
}
