'use client'
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import Icon1 from '../../../public/icons/SVG.png'
import { useWeb3Modal } from "@web3modal/wagmi/react"
import Loading from "../Loading"
// import { useWeb3Modal } from "@web3modal/wagmi/react"


const ConnectWallet = () => {

    const router = useRouter()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { open, close } = useWeb3Modal()
    const { connect } = useConnect()
    // useEffect(() => {
    //     function navigate() {
    //         router.push('/dashboard')
    //     }
        // if (isConnecting) return <div>Connecting…</div>
        // if (isDisconnected) return <div>Disconnected</div>
        // if (isConnected) navigate()
    // }, [isConnected])
    return (
        <>
            <div className="w-full">
                {/* <w3m-button /> */}
                <button className="w-full bg-gradient flex items-center justify-center gap-2 bg-transparent cursor-pointer py-2 rounded-full text-white p-2" onClick={() => open({ view: 'Connect' })}>
                    <Image src={Icon1} alt='' />
                    Connect Wallet
                    {/* {isConnecting && <Suspense fallback={<Loading />}>
                    </Suspense>} */}
                </button>
            </div>
        </>
    )
}

export default ConnectWallet