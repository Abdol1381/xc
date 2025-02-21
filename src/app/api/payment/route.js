import dbConnect from "@/lib/dbConnect";
import axios from "axios";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        await dbConnect()
        const amount = await req.json()

        // return NextResponse.json({ amount: amount })
        const url = 'https://api.oxapay.com/merchants/request';
        const data = JSON.stringify({
            merchant: 'N1CGY7-7963BT-MCCLX7-V3F74B',
            // merchant: process.env.PAYMENT_API_KEY,
            // merchant: 'sandbox',
            amount: amount,
            callbackUrl: 'https://aismart.liara.run/api/payout',
            // callbackUrl: 'http://localhost:3000/api/payout',
            returnUrl: 'https://aismart.liara.run/payStatus'
            // returnUrl: 'http://localhost:3000/payStatus'
        })
        const response = await axios.post(url, data);



        return NextResponse.json({ response: response.data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }); 
    }

}