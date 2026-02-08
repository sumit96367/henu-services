import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface InvoiceData {
    invoiceNumber: string;
    date: string;
    time: string;
    fullName: string;
    email: string;
    domain: string;
    subDomain: string;
    plan: string;
    amount: number;
    paymentId: string;
    billingAddress: string;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let yPosition = height - 50;

    // Header - Company Name
    page.drawText('HENU SERVICES', {
        x: 50,
        y: yPosition,
        size: 24,
        font: boldFont,
        color: rgb(0, 0.831, 1) // Cyan color
    });
    yPosition -= 10;

    page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 2,
        color: rgb(0, 0.831, 1)
    });
    yPosition -= 40;

    // Invoice Title
    page.drawText('INTERNSHIP ENROLLMENT INVOICE', {
        x: 50,
        y: yPosition,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    yPosition -= 30;

    // Invoice Details (Left column)
    page.drawText(`Invoice Number: ${data.invoiceNumber}`, {
        x: 50,
        y: yPosition,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 20;

    page.drawText(`Date: ${data.date} | Time: ${data.time}`, {
        x: 50,
        y: yPosition,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 20;

    page.drawText(`Payment ID: ${data.paymentId}`, {
        x: 50,
        y: yPosition,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 40;

    // Customer Details
    page.drawText('BILL TO:', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    yPosition -= 20;

    page.drawText(data.fullName, {
        x: 50,
        y: yPosition,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 18;

    page.drawText(data.email, {
        x: 50,
        y: yPosition,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 18;

    // Wrap billing address text
    const addressLines = wrapText(data.billingAddress, 60);
    for (const line of addressLines) {
        page.drawText(line, {
            x: 50,
            y: yPosition,
            size: 11,
            font,
            color: rgb(0.2, 0.2, 0.2)
        });
        yPosition -= 18;
    }
    yPosition -= 20;

    // Table Header
    const tableTop = yPosition;
    page.drawRectangle({
        x: 50,
        y: tableTop - 30,
        width: width - 100,
        height: 30,
        color: rgb(0.9, 0.9, 0.9)
    });

    page.drawText('Description', {
        x: 60,
        y: tableTop - 20,
        size: 11,
        font: boldFont,
        color: rgb(0, 0, 0)
    });

    page.drawText('Amount', {
        x: width - 150,
        y: tableTop - 20,
        size: 11,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    yPosition = tableTop - 50;

    // Table Content - Domain
    page.drawText(`Domain: ${data.domain}`, {
        x: 60,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 18;

    // Sub-domain
    page.drawText(`Role: ${data.subDomain}`, {
        x: 60,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 18;

    // Plan
    page.drawText(`Plan: ${data.plan}`, {
        x: 60,
        y: yPosition,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0)
    });

    // Amount
    page.drawText(`Rs. ${data.amount.toLocaleString('en-IN')}`, {
        x: width - 150,
        y: yPosition,
        size: 11,
        font: boldFont,
        color: rgb(0, 0, 0)
    });
    yPosition -= 30;

    // Total line
    page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5)
    });
    yPosition -= 25;

    // Total Amount
    page.drawText('TOTAL AMOUNT PAID:', {
        x: width - 300,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0)
    });

    page.drawText(`Rs. ${data.amount.toLocaleString('en-IN')}`, {
        x: width - 150,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0, 0.831, 1)
    });
    yPosition -= 60;

    // Footer
    page.drawText('Thank you for enrolling with Henu Services!', {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4)
    });
    yPosition -= 15;

    page.drawText('For support, contact: support@henuservices.com', {
        x: 50,
        y: yPosition,
        size: 9,
        font,
        color: rgb(0.4, 0.4, 0.4)
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}

function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (testLine.length <= maxWidth) {
            currentLine = testLine;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);

    return lines;
}
