"use client";

import cn from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import autoPlay from "embla-carousel-autoplay";
import Image from "next/image";

const Wallets = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      skipSnaps: true,
      loop: true,
    },
    [
      autoPlay({
        stopOnInteraction: false,
        stopOnLastSnap: false,
        delay: 2000,
      }),
    ]
  );

  return (
    <div ref={emblaRef} className="embla select-none overflow-hidden px-5 mt-5">
      <div className=".embla__container gap-5 px-2 py-2 flex">
        {[
          "/wallets/trust.svg",
          "/wallets/metamask.svg",
          "/wallets/fc0e5c7b-2172-4cfa-bc8f-152290d2a431.webp",
          "/wallets/2e9f951e-7aa9-49dc-9c08-95d5a47eb269.webp",
          "/wallets/e07e857b-e03e-4470-a6e4-efe7bf7acbb7.webp",
          "/wallets/d9281874-5334-43ba-9633-267fbd3f0465.webp",
          "/wallets/0940b254-5d2a-4927-aa6b-31f9b8340a58.webp",
          "/wallets/72f146bc-a575-4ee6-b545-d6fb094c204c.webp",
          "/wallets/7c74b09d-10fc-4685-8d3a-87f907aa42d2.webp",
          "/wallets/41adf438-fc4d-422f-9406-8cb41d7bfa15.webp",
          "/wallets/4c6e554c-bd01-4ba6-bd81-9fce85245f37.webp",
          "/wallets/5f57a8c2-82ec-4515-90c6-4259a3c50605.webp",
        ].map((image, idx) => (
          <div
            className={cn(
              "embla__slide overflow-hidden shadow-[0_0_4px_2px] shadow-primary/75 min-w-[88px] size-[88px] relative flex items-center justify-center border-2 border-[#00FFFF] rounded-2xl",
              image.endsWith(".svg") && "p-5"
            )}
            key={idx}
          >
            <div className="relative w-full h-full">
              <Image
                unoptimized
                src={image}
                alt="wallet"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallets;
