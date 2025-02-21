import Globe from "@/components/globe";
import MobileNav from "@/components/MobileNav";
import Wallets from "@/components/wallets";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MobileNav />
      <main className="flex w-full text-white bg-base-100 pt-12 min-h-screen flex-col">
        <h1 className="text-xl whitespace-nowrap title-animation opacity-0 font-black text-center mt-16">
        nadswap.net
          <br /> 
        </h1>

        <div className="pt-4 max-w-md mx-auto w-full flex-col gap-3 flex items-center justify-center">
          <Globe />

          <Link
            href="/login"
            className="bg-base-200 flex items-center justify-center w-full max-w-64 border border-primary shadow-[0px_0px_3px_3px] shadow-primary/50 h-10 rounded-full"
          >
            Go to ConnectWallet
          </Link>
        </div>

        <div className="w-full relative mx-auto max-w-md flex py-16 flex-col gap-6">
          <h2 className="text-4xl w-full font-bold text-center">
            Supported by
          </h2>

          <Wallets />
        </div>

        <div className="w-full flex py-16 items-center justify-center px-3.5 relative">
          <div className="w-full floating max-w-md relative aspect-[364/351]">
            <Image
              className="object-cover"
              alt="floating-server"
              src={"/visuals/floating-server.png"}
              fill
              unoptimized
            />
          </div>
        </div>

        <div className="flex w-full relative px-5">
          <div className="flex w-full flex-col justify-center items-center mx-auto max-w-md shadow-[0px_0px_4px_1px] shadow-primary border border-primary rounded-3xl">
          </div>
        </div>

        <div className="w-full flex items-center justify-center px-3.5 relative">
          <div className="w-full max-w-md relative aspect-[364/351]">
            <Image
              className="object-cover"
              alt="cubes"
              src={"/visuals/cubes.png"}
              fill
              unoptimized
            />
          </div>
        </div>
        <article className="flex flex-col px-3.5 py-b max-w-md mx-auto w-full">
          <h2 className="font-bold text-5xl leading-normal text-balance text-center">
            Consent
          </h2>

          <h3 className="font-bold text-center text-lg mt-16">
            By using nadswap.net you consent to the collection and use of
            your wallet address as described in this Privacy Policy.
          </h3>

          <h3 className="font-bold text-center text-lg mt-8">
            Thank you for trusting nadswap.net We are committed to
            providing you with a secure and reliable trading experience.
          </h3>
        </article>

        <div className="w-full flex flex-col justify-end z-0 relative h-[600px] mt-10">
          <div className="max-w-md z-10 mb-3 relative px-3 mx-auto grid grid-cols-2 gap-3 items-center w-full justify-between">
            <div className="w-full aspect-[2/1] relative">
              <Image
                src={"/visuals/godaddy.png"}
                fill
                unoptimized
                alt="trustpilot"
                className="object-contain"
              />
            </div>
          </div>

          <footer className="h-[71px] z-10 relative  bg-base-100/75 backdrop-blur-md rounded-t-3xl outline-4 outline outline-primary flex items-center justify-center">
            <span className="text-[15px]">
              ALL RIGHTS RESERVED | nadswap.net 2024
            </span>
          </footer>
          <Image
            fill
            unoptimized
            src={"/visuals/background.png"}
            alt="background"
            className="object-cover absolute bottom-0 inset-x-0"
          />
        </div>
      </main>
    </>
  );
}
