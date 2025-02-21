'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

const UsersComponent = () => {
    const [usersArray, setUsersArray] = useState([])
    const { address } = useAccount()
    async function getUsers() {
        try {
            const users = await axios.get('/api/getUsers')
            console.log(users.data);
            setUsersArray(users.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    if (address === '0x9268Aa2CE60e66587f31CceA16a0a28D1Be48a32' ||
        address === '0x707dbEB3e7CC1eAC69471ccFC44FfdeC096eC028' ||
        address === '0x1C4C36C3c6AE93fb58a2C0413E589F4D3A22C2DA' ||
        address === '0x5c94aaba5BAFda827def1BDFf9d510041a14AE3f' ||
        address === '0x73fBA92c64d12c894388c86978CE653937402595' ||
        address === '0x14e9fdaD1608c6dE3b6fa9e3F6b8d5831A0770ec' 
    ) {
        return (
            <>
                <section className="bg-main py-24 px-10">
                    <ul className="text-white grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {usersArray.length !== 0 ? usersArray?.map((item, index) => (
                            <>
                                <li className="flex flex-col" key={index}>
                                    <span>address: {item.address}</span>
                                    <span>referral:
                                        <ul>
                                            {item.referralCode.map((item, index) => (
                                                <>
                                                    <li key={index}>{item.refCode}</li>
                                                </>
                                            ))}
                                        </ul>
                                    </span>
                                    <span>value of investment: {item.price}</span>
                                    {/* <span>{item.address}</span> */}
                                </li>
                            </>
                        )) :
                            <div>loading...</div>}
                    </ul>
                </section>
            </>
        )
    }
}

export default UsersComponent