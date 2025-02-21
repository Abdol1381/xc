import DashboardIcon from "../../../public/icons/dashboard.png";
import DepositIcon from "../../../public/icons/deposit.png";
import Withdraw from "../../../public/icons/withdraw.png";
import Referral from "../../../public/icons/referral.png";
import Support from "../../../public/icons/support.png";
import Logout from "../../../public/icons/logout.png";
import about from "../../../public/icons/about.png";
import guide from "../../../public/icons/guide.png";
import swap from "../../../public/icons/swap.png";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

import { FcAbout } from "react-icons/fc";

const MobileMenu = ({ close, isOpen }) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const router = useRouter();

  function handleLogout() {
    router.push("/");
    disconnect();
  }

  return (
    <>
      <ul
        className={`${
          isOpen ? `opacity-100 z-50 p-20 w-screen` : `opacity-0 z-10 w-0 p-0`
        } bg-[#000000b6] fixed flex flex-col items-start justify-start gap-5  h-screen top-0 left-0 transition-all ease-in duration-300`}
      >
        <IoMdClose
          size={28}
          fill="red"
          onClick={close}
          className="cursor-pointer"
        />
        {!!address && (
          <li
            className={`${
              isOpen ? `translate-x-0` : ` translate-x-[-300%]`
            } flex gap-3 transition-all ease-in duration-300`}
          >
            <Image width={25} src={Logout} alt="" />
            <button onClick={() => handleLogout()}>Logout</button>
          </li>
        )}
      </ul>
    </>
  );
};

export default MobileMenu;
