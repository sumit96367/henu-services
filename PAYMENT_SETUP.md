# Razorpay Checkout Integration - Complete Guide

## Overview

This implementation uses **Razorpay Checkout**, which is a pre-built payment interface that handles:
- Card payments (Credit/Debit)
- UPI payments
- Net Banking
- Wallets
- EMI options

**Benefits**:
- PCI DSS compliant (no card data touches your server)
- Built-in fraud detection
- Mobile responsive
- Multi-payment method support
- Automatic receipt generation

---

## Architecture

### Frontend Flow
```
User clicks "Pay & Enroll"
  ↓
Validate form
  ↓
Call /api/payment/create-order
  ↓
Receive Razorpay order_id
  ↓
Open Razorpay Checkout modal (hosted by Razorpay)
  ↓
User completes payment
  ↓
Razorpay returns payment_id + signature
  ↓
Call /api/payment/verify
  ↓
Backend verifies signature
  ↓
Generate & email invoice
  ↓
Show success toast
```

### Backend Requirements

#### 1. Order Creation (`/api/payment/create-order`)
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const order = await razorpay.orders.create({
    amount: 299900, // amount in paise (₹2999)
    currency: 'INR',
    receipt: `order_${Date.now()}`,
    notes: {
        // Custom data for reference
        domain: 'AI/ML',
        plan: 'PREMIUM'
    }
});

return { order_id: order.id };
```

**Response**:
```json
{
  "order_id": "order_MNxYzABCDefgh",
  "amount": 299900,
  "currency": "INR"
}
```

#### 2. Payment Verification (`/api/payment/verify`)

**CRITICAL**: Always verify payment signature on backend

```javascript
const crypto = require('crypto');

const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

if (generatedSignature === razorpay_signature) {
    // Payment is genuine
    // Generate invoice
    // Send email
    // Mark order as paid in database
} else {
    // Fraudulent payment attempt
    throw new Error('Invalid signature');
}
```

#### 3. Webhook Handler (Optional but recommended)

For production, set up webhook to handle:
- payment.captured
- payment.failed
- order.paid

```javascript
// POST /api/webhooks/razorpay
const crypto = require('crypto');

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
const receivedSignature = req.headers['x-razorpay-signature'];

const generatedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

if (generatedSignature === receivedSignature) {
    const { event, payload } = req.body;
    
    switch(event) {
        case 'payment.captured':
            // Handle successful payment
            break;
        case 'payment.failed':
            // Handle failed payment
            break;
    }
}
```

---

## Installation

### 1. Install Dependencies
```bash
npm install razorpay pdf-lib nodemailer qrcode
npm install -D @types/nodemailer @types/qrcode
```

### 2. Environment Variables

Create `.env.local`:
```env
# Get from: https://dashboard.razorpay.com/app/keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# SMTP for emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Security Note**: 
- `NEXT_PUBLIC_*` variables are exposed to browser
- Never expose `RAZORPAY_KEY_SECRET` to frontend

---

## UPI QR Code

The modal automatically generates a UPI QR code when:
- User selects UPI payment method
- A pricing plan is selected

**UPI String Format**:
```
upi://pay?pa=merchant@upi&pn=MerchantName&am=2999&cu=INR
```

**Implementation**:
```typescript
const generateUPIQRCode = async (
    upiId: string,
    amount: number,
    name: string
): Promise<string> => {
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
    
    // Option 1: Use API
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
    
    // Option 2: Use qrcode library (recommended for production)
    // const QRCode = require('qrcode');
    // const qrDataUrl = await QRCode.toDataURL(upiString);
    
    return apiUrl;
};
```

---

## Testing

### Test Mode Credentials

**Test Cards**:
- Success Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Test UPI**:
- Success: `success@razorpay`
- Failure: `failure@razorpay`

### Test Flow

1. Fill enrollment form
2. Select payment method
3. Click "Pay & Enroll"
4. Razorpay modal opens
5. Use test credentials
6. Complete payment
7. Verify:
   - Success toast appears
   - Invoice email sent
   - Payment recorded in dashboard

---

## Production Checklist

### Before Going Live:

- [ ] Switch to production Razorpay keys
- [ ] Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` with live key
- [ ] Configure production SMTP
- [ ] Set up Razorpay webhooks
- [ ] Test live payment with ₹1
- [ ] Verify invoice generation
- [ ] Check email delivery
- [ ] Set up error monitoring (Sentry/LogRocket)
- [ ] Configure database for order storage
- [ ] Add payment reconciliation system
- [ ] Set up refund handling
- [ ] Test payment failures
- [ ] Enable 2FA on Razorpay dashboard

### Security Best Practices:

1. **Never** expose `RAZORPAY_KEY_SECRET` to frontend
2. **Always** verify signatures on backend
3. **Never** trust amount from frontend (use order_id)
4. Use HTTPS in production
5. Implement rate limiting on APIs
6. Log all payment attempts
7. Set up fraud detection rules in Razorpay dashboard

---

## Backend Implementation Template

### Node.js/Express Example

```javascript
// routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, enrollment_data } = req.body;
        
        const options = {
            amount: amount * 100, // convert to paise
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                enrollment_id: enrollment_data.id,
                domain: enrollment_data.domain,
                email: enrollment_data.email
            }
        };
        
        const order = await razorpay.orders.create(options);
        
        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Payment
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            enrollment_data
        } = req.body;
        
        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');
        
        if (razorpay_signature === expectedSign) {
            // Payment is verified
            
            // 1. Save to database
            await saveEnrollment({
                ...enrollment_data,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                status: 'paid'
            });
            
            // 2. Generate invoice
            const invoicePDF = await generateInvoice(enrollment_data);
            
            // 3. Send email
            await sendEmail({
                to: enrollment_data.email,
                subject: 'Enrollment Confirmation',
                attachments: [invoicePDF]
            });
            
            res.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook Handler
router.post('/webhook', async (req, res) => {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    if (webhookSignature === expectedSignature) {
        const { event, payload } = req.body;
        
        // Handle different events
        switch(event) {
            case 'payment.captured':
                // Update order status
                break;
            case 'payment.failed':
                // Handle failure
                break;
            case 'refund.created':
                // Handle refund
                break;
        }
        
        res.json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'Invalid webhook signature' });
    }
});

module.exports = router;
```

---

## Razorpay Settlement

### How Money Reaches Your Bank:

1. **Customer pays** → Money held by Razorpay
2. **T+0 to T+7 days** → Settlement period (configurable)
3. **Auto-sweep** → Money transferred to linked bank account

### Settlement Configuration:

1. Go to Razorpay Dashboard → Settings → Settlements
2. Choose settlement schedule:
   - Daily
   - Weekly
   - Monthly
   - On-demand (for verified accounts)
3. Link your bank account
4. Complete KYC verification

### Transaction Fees:

- UPI: 0% - 2%
- Cards: 2% - 2.5%
- Net Banking: 2%
- Wallets: 2%

(Check latest pricing on Razorpay website)

---

## Support & Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **Dashboard**: https://dashboard.razorpay.com/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
- **Webhook Docs**: https://razorpay.com/docs/webhooks/
- **Support**: https://razorpay.com/support/

---

## Files in This Implementation

1. **Frontend**:
   - `src/components/EnrollmentModal.tsx` - Payment modal UI
   - `src/lib/razorpay.ts` - Razorpay utility functions

2. **Backend**:
   - `src/app/api/payment/create-order/route.ts` - Order creation
   - `src/app/api/payment/verify/route.ts` - Payment verification
   - `src/lib/invoice-generator.ts` - PDF invoice
   - `src/lib/email-service.ts` - Email automation

3. **Configuration**:
   - `.env.example` - Environment template
   - `PAYMENT_SETUP.md` - This guide

---

## Troubleshooting

### Common Issues:

**1. Razorpay modal doesn't open**
- Check if SDK script loaded: `console.log(window.Razorpay)`
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors

**2. Payment verification fails**
- Ensure signature verification logic is correct
- Check if `RAZORPAY_KEY_SECRET` is correct
- Verify order_id matches

**3. Invoice not sent**
- Check SMTP credentials
- Verify email service logs
- Test email configuration separately

**4. UPI QR not showing**
- Check if QR generation API is accessible
- Verify UPI ID format
- Check network requests in browser

---

**Ready to go live!** 🚀
