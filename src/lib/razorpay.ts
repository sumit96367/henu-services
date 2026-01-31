// Utility to load and initialize Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}

export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        // Check if already loaded
        if (typeof window.Razorpay !== 'undefined') {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
            resolve(true);
        };

        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name: string;
        email: string;
    };
    notes: {
        domain: string;
        subDomain: string;
        plan: string;
        billingAddress: string;
    };
    theme: {
        color: string;
    };
    handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void;
    modal: {
        ondismiss: () => void;
    };
}

export const openRazorpayCheckout = (options: RazorpayOptions) => {
    const rzp = new window.Razorpay(options);
    rzp.open();
};

// Generate UPI QR Code
export const generateUPIQRCode = async (
    upiId: string,
    amount: number,
    name: string
): Promise<string> => {
    // UPI payment string format
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

    // Using QRCode library or API
    // For production, use: npm install qrcode
    // For now, return a placeholder or use an API

    try {
        const response = await fetch(
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`
        );
        return response.url;
    } catch (error) {
        console.error('QR Code generation failed:', error);
        return '';
    }
};
