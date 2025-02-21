import dbConnect from "@/lib/dbConnect"
import TargetsModel from "@/lib/models/TargetsModel"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const { address, isReceived, bonus } = await req.json()
        await dbConnect()
        console.log('bonus ', bonus);
        const user = await TargetsModel.findOne({ address })
        if (!user) {
            const data = [
                { bonus: 200, isReceived: false, hasTarget: false },
                { bonus: 500, isReceived: false, hasTarget: false },
                { bonus: 1500, isReceived: false, hasTarget: false },
                { bonus: 3000, isReceived: false, hasTarget: false },
                { bonus: 6000, isReceived: false, hasTarget: false },
                { bonus: 20000, isReceived: false, hasTarget: false },
                { bonus: 50000, isReceived: false, hasTarget: false },
            ]
            const dataArray = data.map(item => {
                item.bonus === bonus ? item.hasTarget = true : item.hasTarget = false
            })
            console.log('dataArray: ', data);
            const target = new TargetsModel({ address, targets: data })
            const response = await target.save()

            console.log(response);
        } 
        // else {
        //     const target = await TargetsModel.findOne({ address }).select('targets');  

        //     const targets = target.targets.map(item => {  
        //         if (item.bonus <= bonus) {  
        //             return { bonus: item.bonus, isReceived: true };  
        //         }  
        //         return item; 
        //     });  
        //     console.log('targets: ', targets);
        //     target.targets = targets;  
        //     await target.save();  

        //     console.log('Updated targets: ', target.targets);  
        // }


        return NextResponse.json({ message: 'successful post target', user })
    } catch (error) {
        return NextResponse.json({ error })
    }
}