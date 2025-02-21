// import dbConnect from "@/lib/dbConnect";
// import UsersModel from "@/lib/models/UsersModel";
// import mongoose from "mongoose";
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//     try {
//         // const { address, referralCode } = req.json();
//         // console.log(req.json()); 
//         // await dbConnect();
//         // await UsersModel.create({ address, referralCode });
//         // await mongoose.connection.close();
//         // return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//         const payload = req.json()
//         const user = new UsersModel(payload)
//         const response = await user.save()
//         await dbConnect();
//         return NextResponse.json({result: response})

//     } catch (err) {
//         // console.log(err);
//         await mongoose.connection.close()
//         return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 });
//     }
// }

import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import mongoose from "mongoose";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const userBody = await req.json();
        // console.log(res);
        await dbConnect();
        const users = await UsersModel.findOne({ address: userBody.address }, {})
        if (users === null) {
            const user = new UsersModel({ address: userBody.address, referralCode: userBody.referralCode, price: userBody.price, investmentValue: userBody.investmentValue, depositValue: 0, totalInvestmentLvl1: userBody.totalInvestmentLvl1, dailyProfit: 0 });
            const response = await user.save();
            return NextResponse.json({ result: response });
        } else {
            console.log('the user exists in database');
            return NextResponse.json({ result: users })
        }


    } catch (err) {
        console.error(err);
        // await mongoose.connection.close();
        return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 });
    }
}