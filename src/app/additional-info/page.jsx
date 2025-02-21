// import Header from "@/components/header";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="flex w-full text-white bg-base-100 min-h-screen flex-col">
      {nadswap.net}

      <MobileNav />

      <article className="flex flex-col px-3.5 py-20 max-w-md mx-auto w-full">
        <h1 className="font-bold text-5xl text-balance text-center">
          Additional Information
        </h1>

        <div className="flex flex-col mt-16">
          <h3 className="font-extrabold text-2xl">
            1. Our Commitment to Growth
          </h3>

          <p className="mt-6 text-[15px] text-pretty mb-10">
            At AISMART.Network, our primary goal is to facilitate growth and
            opportunity for our users. We strive to provide a platform that
            encourages development and innovation within the financial markets.
            By participating in our platform, either through registration or by
            inviting others, you are actively contributing to this mission.
            However, it is essential to understand and accept the inherent risks
            involved, particularly in markets such as forex. Global events,
            including but not limited to conflicts, natural disasters, and
            economic fluctuations, can have significant impacts on market
            conditions. By continuing to use our platform, you acknowledge and
            accept these risks.
          </p>

          <h3 className="font-extrabold text-2xl">2.Acceptance of Risk</h3>

          <p className="mt-6 text-[15px] text-pretty mb-10">
            By registering or inviting others to join AISMART.Network, you
            expressly agree to all our terms and conditions. You understand that
            participation in financial markets, especially forex, carries
            inherent risks due to various factors, including geopolitical events
            and natural disasters. You acknowledge that these risks can affect
            your investments and activities on our platform. Therefore, by
            engaging with our platform, you accept full responsibility for these
            risks.
          </p>

          <h3 className="font-extrabold text-2xl">3. Privacy and Security</h3>

          <p className="mt-6 text-[15px] text-pretty mb-10">
            We at AISMART.Network believe in the fundamental right to privacy.
            As such, we do not collect any personal information from our users,
            including passwords. All processes on our platform are conducted
            using your wallet address, ensuring a high level of privacy and
            security. However, it is crucial to safeguard your 12 security
            phrases. We are not liable if your upline, direct contact, or any
            other individual gains access to or misuses your security phrases.
          </p>

          <h3 className="font-extrabold text-2xl">
            4.Responsibility for Security Phrases
          </h3>

          <p className="mt-6 text-[15px] text-pretty mb-10">
            Your 12 recovery phrases are vital for accessing your wallet and
            securing your assets on our platform. AISMART.Network cannot be held
            responsible if you lose these phrases or if unauthorized individuals
            gain access to them. In the event that you lose access to your
            wallet, we strongly recommend applying for an account transfer to
            another wallet. Please note that the account transfer process may
            take up to 7 working days for our team to confirm and complete.
          </p>

          <h3 className="font-extrabold text-2xl">
            5. Beware of False Reviews
          </h3>

          <p className="mt-6 text-[15px] text-pretty mb-10">
            {`In today's digital age, it's important to be aware of the prevalence
            of false reviews and misleading information. Websites like
            ScamAdviser and ScamDoc, while widely known, are not official or
            accurate tools for determining a website's legitimacy. We encourage
            users to rely on verified and trusted sources of information when
            evaluating our platform.`}
          </p>
        </div>
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
          <Link
            href={"https://www.trustpilot.com/review/aismart.network"}
            className="w-full aspect-[2/1] relative"
          >
            <Image
              src={"/visuals/trustpilot.png"}
              fill
              unoptimized
              alt="trustpilot"
              className="object-contain"
            />
          </Link>
        </div>

        <footer className="h-[71px] z-10 relative  bg-base-100/75 backdrop-blur-md rounded-t-3xl outline-4 outline outline-primary flex items-center justify-center">
          <span className="text-[15px]">
            ALL RIGHTS RESERVED | AI SMART 2024
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
  );
};

export default Page;
