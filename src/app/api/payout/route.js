import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function POST(req) {
    const postData = await req.text();

    // Parse the JSON data
    let data = null;
    try {
        data = JSON.parse(postData);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }


    // const apiSecretKey = (data.type === 'payment') ? process.env.PAYMENT_API_KEY : process.env.PAYOUT_API_KEY;
    const hmacHeader = req.headers.get('hmac');
    const calculatedHmac = crypto
        .createHmac('sha512', process.env.PAYMENT_API_KEY)
        .update(postData)
        .digest('hex');

    if (calculatedHmac === hmacHeader) {
        // HMAC signature is valid
        if (data.type === 'payment') {
            console.log('Received payment callback:', data);
            try {
                await axios.put('/api/putTransaction', data)
            } catch (err) {
                console.log(err);
            }
            // Process payment data here
        }

        // else if (data.type === 'payout') {
        //     console.log('Received payout callback:', data);
        //     // Process payout data here
        //     try {
        //         await axios.put('/api/putTransaction', data)
        //     } catch (err) {
        //         console.log(err);
        //     }

        //     return NextResponse.json({ message: 'OK' }, { status: 200 });
        // } else {
        else {
            // HMAC signature is not valid
            return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 400 });
        }
    }
}