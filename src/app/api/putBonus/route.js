import LineModel from '@/lib/models/LinesModel';
import TargetsModel from '@/lib/models/TargetsModel';
import UsersModel from '@/lib/models/UsersModel';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { address } = await request.json();

        const user = await UsersModel.findOne({ address });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const referrals = user.referralCode || [];
        const friendsArray = user.friends || [];
        let totalInvests = {};
        let bonus = 0;

        for (const referral of referrals) {
            const friendsInLine = friendsArray.filter(item => item.line === referral.line);

            if (friendsInLine.length === 0) continue;

            let lineTotal = 0;

            for (const friend of friendsInLine) {
                const friendUser = await UsersModel.findOne({ address: friend.address });

                if (friendUser) {
                    lineTotal += friendUser.investmentValue;
                }
            }
            // console.log(lineTotal);


            totalInvests[referral.line] = (totalInvests[referral.line] || 0) + lineTotal;
            console.log('39', totalInvests);

        }
        const userInvestmentTotal = await UsersModel.aggregate([
            { $match: { address } },
            { $group: { _id: null, totalInvestment: { $sum: "$investmentValue" } } }
        ]);

        const totalInvestmentValue = userInvestmentTotal[0]?.totalInvestment || 0;
        let conditionMet = false;
        for (const line in totalInvests) {
            const existingLine = await LineModel.findOne({ address, "lines.line": line });
            const total = totalInvests[line];
            console.log('existing line: ', existingLine);
            if (existingLine) {
                existingLine.lines.forEach(async item => {
                    console.log(item.total, bonus, item.bonus);
                    if (item.total >= 10000 && item.total < 20000) bonus = 200;
                    else if (item.total >= 20000 && item.total < 50000) bonus = 500;
                    else if (item.total >= 50000 && item.total < 100000) bonus = 1500;
                    else if (item.total >= 100000 && item.total < 200000) bonus = 3000;
                    else if (item.total >= 200000 && item.total < 500000) bonus = 6000;
                    else if (item.total >= 500000 && item.total < 1000000) bonus = 20000;
                    else if (item.total >= 1000000) bonus = 50000;
                    else bonus = 0

                    await LineModel.findOneAndUpdate({ address, "lines.line": item.line }, { $set: { "lines.$.bonus": bonus } });
                    // !! condition for 30 % in another line
                    conditionMet = totalInvestmentValue > 0 && (item.total / totalInvestmentValue) >= 0.3;
                    if (conditionMet) {
                        console.log('condation!', conditionMet);
                        if (item.total >= 10000 && item.total < 20000) {
                            console.log(item.total, '10000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 200 } } }, { $set: { "targets.$.hasTarget": true } })
                        } else if (item.total >= 20000 && item.total < 50000) {
                            console.log('object');
                            console.log(item.total, '20000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 500 } } }, { $set: { "targets.$.hasTarget": true } })
                        } else if (item.total >= 50000 && item.total < 100000) {
                            console.log(item.total, '50000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 1500 } } }, { $set: { "targets.$.hasTarget": true } })
                        } else if (item.total >= 100000 && item.total < 200000) {
                            console.log(item.total, '100000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 3000 } } }, { $set: { "targets.$.hasTarget": true } }) 
                        } else if (item.total >= 200000 && item.total < 500000) {
                            console.log(item.total, '200000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 6000 } } }, { $set: { "targets.$.hasTarget": true } })
                        } else if (item.total >= 500000 && item.total < 1000000) {
                            console.log(item.total, '500000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 20000 } } }, { $set: { "targets.$.hasTarget": true } })
                        } else if (item.total >= 1000000) {
                            console.log(item.total, '1000000');
                            await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus: 50000 } } }, { $set: { "targets.$.hasTarget": true } })
                        }
                    }
                });
            }


            if (existingLine) {
                await LineModel.updateOne(
                    { address, "lines.line": line },
                    { $set: { "lines.$.total": total } }
                );
            } else {
                await LineModel.findOneAndUpdate(
                    { address },
                    { $push: { lines: { line, total } } },
                    { new: true, upsert: true }
                );
            }
        }
        // !! if there is condition then save and increment the bonus into the price 
        let hasReceivedBonus
        if (conditionMet) {
            hasReceivedBonus = false
            // if (!hasReceivedBonus) { 
            //     const inc = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: bonus } });
            //     hasReceivedBonus = true
            //     console.log('inc: ', inc);
            // } 

        }
        const lvlInvestsArray = await Promise.all(friendsArray.map(async (item) => {
            const friendUser = await UsersModel.findOne({ address: item.address });
            return friendUser ? friendUser : 0;
        }));

        const res = await LineModel.findOne({ address })

        console.log('101=> ', lvlInvestsArray, bonus, res.lines.filter(item => item.bonus > 0));
        bonus = res.lines.filter(item => item.bonus > 0)
        return NextResponse.json({ success: true, totalInvests, bonus, lvlInvestsArray, hasReceivedBonus });
    } catch (error) {
        console.error('Update status failed: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}