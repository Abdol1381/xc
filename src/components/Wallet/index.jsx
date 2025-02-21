"use client";
import { useRouter } from "next/navigation";
import Container from "../Container";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import WalletInfoBox from "../WalletInfoBox";

const Wallet = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { address, isConnected } = useAccount();
  const [priceValue, setPriceValue] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [profitlvl1, setProfitLvl1] = useState(0);
  const [profitlvl2, setProfitLvl2] = useState(0);
  const [profitlvl3, setProfitLvl3] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [investValue, setInvestValue] = useState(0);
  const [triplePrice, setTriplePrice] = useState(false);
  const [totalDecuplePrice, settotalDecuplePrice] = useState(false);
  const [deposit, setDeposit] = useState(0);

  function handleChange(e) {
    setAmount(e.target.value);
  }
  const today = new Date();
  const formattedDate = today.toDateString();

  // get investment value
  async function getInvest() {
    const response = await axios.get(`/api/getInvest?address=${address}`);
    let fixedRes = response.data.invest.toFixed(2);
    let fixed = response.data.deposit.toFixed(2);
    setDeposit(fixed);
    setInvestValue(fixedRes);
    let triple = response.data * 3;
    let fixedTriple = triple.toFixed(2);
  }
  // !! topup function
  async function doTopup(e) {
    e.preventDefault();

    if (!user) {
      setStatus({
        message: "please wait for data to load!",
        messageColor: "text-red-500",
      });
      setTimeout(() => {
        setStatus("");
      }, 3000);

      return;
    }

    const topopBalance =
      (user?.price ?? 0) + (user?.total_referral_profit ?? 0);

    if (amount === "") {
      setStatus({
        message: "please input the topup value",
        messageColor: "text-red-500",
      });
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } else {
      // ?? topup from user profits
      try {
        if (Number(topopBalance) <= 0) {
          setStatus({
            message: `please do deposit.`,
            messageColor: "text-yellow-500",
          });
          setTimeout(() => {
            setStatus("");
          }, 5000);
          setAmount("");
          router.push("/deposit");
        } else if (Number(amount) > Number(topopBalance)) {
          setStatus({
            message: `the limit of topup is ${topopBalance}.`,
            messageColor: "text-red-500",
          });
          setTimeout(() => {
            setStatus("");
          }, 5000);
          setAmount("");
        } else {
          await axios.put("/api/putTopup", { address: address, price: amount });
          console.log("Topup successful!");
          setStatus({
            message: "Topup successful!",
            messageColor: "text-green-500",
          });
          setTimeout(() => {
            setStatus("");
          }, 5000);
          setAmount("");
          window.location.reload();
        }
      } catch (err) {
        setStatus({
          message: `Error occurred during the transaction. ${
            err?.message || error
          }`,
          messageColor: "text-red-500",
        });
        setTimeout(() => {
          setStatus("");
        }, 6000);
        console.error("Error occurred during the topup. ", err);
        setAmount("");
      }
    }
  }

  const topupAll = async () => {
    const balance = (user?.price ?? 0) + (user?.total_referral_profit ?? 0);

    if (balance > 0) {
      setAmount(String(balance));
    } else {
      setStatus({
        message: `there is nothing to topup`,
        messageColor: "text-red-500",
      });
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  useEffect(() => {
    // calculate profits
    async function getProfits() {
      try {
        const profits = await axios.get(
          `/api/getProfits?address=${encodeURIComponent(address)}`
        );
        const profitLvl1 = await axios.get(
          `/api/getLvl1Profit?address=${encodeURIComponent(address)}`
        );
        const profitLvl2 = await axios.get(
          `/api/getLvl2Profit?address=${encodeURIComponent(address)}`
        );
        const profitLvl3 = await axios.get(
          `/api/getLvl3Profit?address=${encodeURIComponent(address)}`
        );
        console.log(profits.data);
        if (profits.data.profitValue && profitLvl1.data && profitLvl2.data) {
          let total =
            profits?.data.profitValue +
            profitLvl1?.data.lvl1Profit +
            profitLvl3?.data.lvl3Profit +
            profitLvl2?.data.lvl2Profit;
          let fixed = profits?.data.profitValue?.toFixed(2);
          setDailyProfit(fixed);
          let fixed1 = profitLvl1?.data.lvl1Profit.toFixed(2);
          setProfitLvl1(fixed1);
          let fixed2 = profitLvl2?.data.lvl2Profit.toFixed(2);
          setProfitLvl2(fixed2);
          let fixed3 = profitLvl3?.data.lvl3Profit.toFixed(2);
          setProfitLvl3(fixed3);
          let fixed4 = total.toFixed(2);
          setTotalProfit(fixed4);
        } else {
          console.log("error");
        }

        if (triplePrice > totalDecuplePrice) {
          setDepositStatus({
            message: "please do deposit!",
            messageColor: "text-red-500",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    // get daily profit and wallet balance
    async function getUser() {
      try {
        const response = await axios.get(
          `/api/getUser?address=${encodeURIComponent(address)}`
        );
        console.log(response.data?.foundUser);

        const price = response.data?.foundUser?.price;
        const dailyProfit = response.data?.foundUser?.dailyProfit;

        const decuple = dailyProfit * 10;

        let fixedDecuple = decuple.toFixed(2);
        settotalDecuplePrice(fixedDecuple);

        if (price) {
          let finalPrice = price.toFixed(2);
          setPriceValue(finalPrice);
          setTriplePrice(finalPrice);
        } else {
          console.warn(`No price found: ${price}`);
        }

        if (response?.data?.isExist) {
          setUser(response.data.foundUser);
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    getProfits();
    getInvest();
  }, [address]);

  return (
    <>
      <section className="py-20 bg-main bg-fixed">
        {/* <WalletInfoBox
          deposit={deposit}
          investValue={investValue}
          priceValue={priceValue}
          totalProfit={totalProfit}
        /> */}
        <Container>
          <h3 className="text-lg font-bold">Profits</h3>

          <table className="text-white w-full">
            <thead>
              <tr className="">
                <th className="text-gray-400 py-5">Daily Profit</th>
                <th className="text-gray-400 py-5">Total Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-y border-y-gray-700">
                <th className="text-white py-5">
                  {dailyProfit ? dailyProfit : 0}
                </th>
                <th className="text-white py-5">
                  {totalProfit ? totalProfit : 0}
                </th>
              </tr>
            </tbody>
          </table>

          <table className="text-white w-full">
            <thead>
              <tr className="">
                <th className="text-gray-400 py-5">lvl.1 Profit</th>
                <th className="text-gray-400 py-5">lvl.2 Profit</th>
                <th className="text-gray-400 py-5">lvl.3 Profit</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-y border-y-gray-700">
                <th className="text-white py-5">
                  {profitlvl1 != 0 ? profitlvl1 : 0}
                </th>
                <th className="text-white py-5">
                  {profitlvl2 != 0 ? profitlvl2 : 0}
                </th>
                <th className="text-white py-5">
                  {profitlvl3 != 0 ? profitlvl3 : 0}
                </th>
              </tr>
            </tbody>
          </table>
        </Container>
        <Container>
          <p className="text-gray-400">your wallet balance: </p>
          <p className="text-white">
            {user
              ? (
                  (user?.price ?? 0) + (user?.total_referral_profit ?? 0)
                ).toFixed(2)
              : "loading..."}
          </p>
          <form className="flex flex-col gap-5">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => handleChange(e)}
              name="amount"
              className="p-2 rounded text-gray-800 outline-none"
              placeholder="Enter Amount"
            />

            <button
              type="submit"
              onClick={(e) => doTopup(e)}
              className="py-1 px-6 border rounded-full shadow-main border-[#00F0FF]"
            >
              Topup
            </button>

            <button
              type="button"
              onClick={() => {
                topupAll();
              }}
              className="py-1 px-6 border rounded-full shadow-red-500/75 shadow-main border-red-500"
            >
              Max
            </button>
          </form>
          {status && renderAlert(status)}
        </Container>
      </section>
    </>
  );
};

const renderAlert = ({ message, messageColor }) => (
  <div
    className={`px-4 py-3 leading-normal ${messageColor} rounded-xl backdrop-blur-sm border border-[#00F0FF] shadow-main mb-5 text-center`}
  >
    <p>{message}</p>
  </div>
);

export default Wallet;
