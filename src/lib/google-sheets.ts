/**
 * Utility for interacting with Google Sheets via a Google Apps Script Web App
 */

const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function saveToSheet(type: 'inquiry' | 'query' | 'update_inquiry' | 'update_query', data: any) {
    if (!WEBHOOK_URL) {
        console.warn('GOOGLE_SHEET_WEBHOOK_URL is not defined in environment variables');
        return null;
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({
                type,
                ...data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to save to sheet: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        throw error;
    }
}

export async function getFromSheet(type: 'inquiries' | 'queries') {
    if (!WEBHOOK_URL) {
        console.warn('GOOGLE_SHEET_WEBHOOK_URL is not defined in environment variables');
        return [];
    }

    try {
        const response = await fetch(`${WEBHOOK_URL}?type=${type}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from sheet: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        return [];
    }
}
