"use client";
import { useAccount, useDisconnect } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import Link from "next/link";
import Image from "next/image";

const MobileNav = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#200052] p-2 flex justify-between items-center shadow-lg z-50 border-b border-[#A0055D]">
      <div className="flex items-center gap-x-8">
        <Link href="/" className="text-[#FBFAF9] text-lg font-bold">
          <Image src="/logo.png" height={80} width={80} />
        </Link>
        <Link href="/swap" className="text-[#FBFAF9] text-lg font-bold">
          Swap
        </Link>
      </div>
      <div>
        {!isConnected && <ConnectWallet />}
        {isConnected && (
          <div className="flex items-center space-x-4">
            <span className="text-[#FBFAF9] truncate max-w-[120px] sm:max-w-none">
              {address}
            </span>
            <button
              onClick={() => disconnect()}
              className="bg-[#A0055D] text-[#FBFAF9] px-4 py-2 rounded-lg hover:bg-[#A0055D]/80 transition-colors duration-200"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileNav;
