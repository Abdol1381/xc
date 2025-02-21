import dbConnect from "@/lib/dbConnect"
import TransactionModel from "@/lib/models/TransactionsModel"
import { NextResponse } from "next/server"


export async function PUT(req) {
    try {
        const { trackId, status, date, address, amount, _id } = await req.json()
        await dbConnect()
        console.log('s', status);
        console.log('s', _id);
        const updatedStatus = await TransactionModel.updateOne({
            _id: _id
        }, {
            $set: {
                'status': status
            }
        })
        console.log('update: ', updatedStatus);
        return NextResponse.json({ updatedStatus })
    } catch (error) {
        console.log('update status failed: ', error);
        return NextResponse.json({ error })
    }



}