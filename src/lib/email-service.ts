import nodemailer from 'nodemailer';

interface EmailData {
    to: string;
    fullName: string;
    invoiceData: {
        invoiceNumber: string;
        domain: string;
        subDomain: string;
        plan: string;
        amount: number;
    };
    pdfBuffer: Buffer;
}

export async function sendInvoiceEmail(data: EmailData): Promise<void> {
    // Create transporter (configure with your SMTP details)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    // Email HTML template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #00D4FF 0%, #3B82F6 100%);
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }
        .detail-box {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 6px;
            border-left: 4px solid #00D4FF;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
        }
        .amount {
            font-size: 24px;
            font-weight: bold;
            color: #00D4FF;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #00D4FF 0%, #3B82F6 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Payment Successful!</h1>
    </div>
    <div class="content">
        <p>Dear <strong>${data.fullName}</strong>,</p>
        
        <p>Thank you for enrolling in the <strong>${data.invoiceData.domain}</strong> internship program with Henu Services!</p>
        
        <div class="detail-box">
            <div class="detail-row">
                <span class="label">Invoice Number:</span>
                <span class="value">${data.invoiceData.invoiceNumber}</span>
            </div>
            <div class="detail-row">
                <span class="label">Domain:</span>
                <span class="value">${data.invoiceData.domain}</span>
            </div>
            <div class="detail-row">
                <span class="label">Role:</span>
                <span class="value">${data.invoiceData.subDomain}</span>
            </div>
            <div class="detail-row">
                <span class="label">Plan:</span>
                <span class="value">${data.invoiceData.plan}</span>
            </div>
        </div>
        
        <div class="amount">
            Total Paid: ₹${data.invoiceData.amount.toLocaleString('en-IN')}
        </div>
        
        <p>Your payment has been successfully processed. Please find your invoice attached to this email.</p>
        
        <p><strong>What's Next?</strong></p>
        <ul>
            <li>You will receive access to curated internship sources within 24 hours</li>
            <li>Our mentorship team will reach out to schedule your first session</li>
            <li>Check your email regularly for important updates</li>
        </ul>
        
        <center>
            <a href="https://henuservices.com/dashboard" class="cta-button">Access Your Dashboard</a>
        </center>
        
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        
        <div class="footer">
            <p><strong>Henu Services</strong></p>
            <p>Email: support@henuservices.com | Website: www.henuservices.com</p>
            <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply directly to this message.</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send email
    const mailOptions = {
        from: `"Henu Services" <${process.env.SMTP_USER}>`,
        to: data.to,
        subject: `Invoice ${data.invoiceData.invoiceNumber} - Internship Enrollment Confirmation`,
        html: htmlContent,
        attachments: [
            {
                filename: `Invoice_${data.invoiceData.invoiceNumber}.pdf`,
                content: data.pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Invoice email sent successfully to ${data.to}`);
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send invoice email');
    }
}
