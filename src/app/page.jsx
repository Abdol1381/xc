import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <MobileNav />
      <main className="flex w-full text-white bg-base-100 pt-12 min-h-screen flex-col py-20">
        <div className="flex justify-evenly items-center px-10 h-[100vh]">
          <div className="w-2/4">
            <p className="text-blue-700 font-bold uppercase text-4xl">
              Fast DEX with enhanced liquidity
            </p>
            <div className="flex items-center justify-between mt-8">
              <p className="text-xl">Powered by Monad</p>
              <Link 
                href="/swap" 
                className="bg-purple-500/20 backdrop-blur-md border border-purple-300/40 text-[#FBFAF9] text-lg font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300 hover:bg-purple-500/40 flex items-center gap-2"
              >
                Launch app <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          <div className="w-1/3">
            <div className="pt-4 max-w-md mx-auto w-full flex-col gap-3 flex items-center justify-center">
              <Image src="/logo.png" height={1000} width={1000} alt="Logo" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
