import dbConnect from "@/lib/dbConnect";
import WithdrawLimitModel from "@/lib/models/WithdrawLimitModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect()

        const { address, currentTime, currentDate, hasLimit } = await req.json()

        const item = await WithdrawLimitModel.findOne({ address })
        console.log('12', item, currentDate);
        if (item === null) {
            console.log('does not exist');

            const withdrawLimit = new WithdrawLimitModel({ 
                address, 
                currentTime: currentTime, 
                currentDate: currentDate, 
                hasLimit })

            const limit = await withdrawLimit.save()
            console.log('23', limit);
            return NextResponse.json({ result: limit });
        } else {
            if (item.hasLimit === true) {
                const limit = await WithdrawLimitModel.findOneAndUpdate({ address }, { hasLimit })
                return NextResponse.json({ result: limit });
            } else {
                const limit = await WithdrawLimitModel.findOneAndUpdate({ address }, { hasLimit, currentTime: currentTime, currentDate: currentDate })
                return NextResponse.json({ result: limit });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while creating the WithdrawLimit" }, { status: 500 });
    }
}