import Link from "next/link"
import Container from "../Container"
import { useRouter } from "next/navigation"


const WalletInfoBox = ({ priceValue, investValue, deposit, totalProfit }) => {
    const router = useRouter()
    const walletBalance = parseFloat(priceValue) + parseFloat(totalProfit || 0);

    return (
        <>
            <Container>
                <h3>Wallet Balance</h3>
                <p className="text-gray-300">
                    {walletBalance <= 0 || isNaN(walletBalance) ? '0' : walletBalance.toFixed(2)} USDT
                </p>
                <h3>Investment Balance</h3>
                <p className="text-gray-300">{investValue <= 0 || isNaN(investValue) ? '0' : investValue} USDT</p>
                <h3>Deposit Balance</h3>
                <p className="text-gray-300">{deposit <= 0 || isNaN(deposit) ? '0' : deposit} USDT</p>
                <div className="flex gap-3">
                    <button onClick={() => router.push('/deposit')} className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]">Deposit</button>
                    <Link href={'#withdraw'} className="py-1 px-6 border rounded-full shadow-red border-[#FF2020]">Withdraw</Link>
                </div>
            </Container>
        </>
    )
}




export default WalletInfoBox