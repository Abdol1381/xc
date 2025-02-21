import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import { NextResponse } from "next/server";



export async function PUT(req) {
    try {
        const { address } = await req.json()
        console.log(address);
        await dbConnect()

        await TransactionModel.updateMany({ address, status: 'approve' }, { status: 'ignore' })

        return NextResponse.json({ message: 'transactions ignored successfully' })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}