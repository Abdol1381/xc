"use client";
import Image from "next/image";
import styles from "../../app/Home.module.css";
import bg from "../../../public/bg/opacity.png";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import MobileNav from "@/components/MobileNav";
import SelectModal from "@/components/selectModal/selectModal";
import FeeTierSelector from "@/components/FeeTierSelector";
import PriceRangeSelector from "@/components/PriceRangeSelector"; // اضافه کردن کامپوننت PriceRangeSelector
import {
  getPairContract,
  createPool,
  addLiquidity,
  approve,
  initialize,
  getLiquidity,
  getSlot0,
  swap,
} from "@/web3/actions";
import { zeroAddress } from "viem";
import { ethers } from "ethers";
import { computePoolAddress, Pool, encodeSqrtRatioX96 } from "@uniswap/v3-sdk";
import { factoryContractAddress } from "@/web3/utils/helperContract";
import { calculateOutputAmount } from "@/web3/calculateOutputAmount";
import { getCurrentPrice } from "@/web3/getCurrentPrice";

const Login = () => {
  const { isConnected, address } = useAccount();
  const [isLoad, setLoad] = useState(false);
  const [value, setValue] = useState(1);
  const [isLiquidity, setIsLiquidity] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fromToken, setFromToken] = useState(null); // ارز مبدأ
  const [toToken, setToToken] = useState(null); // ارز مقصد
  const [fromAmount, setFromAmount] = useState(""); // مقدار ارز مبدأ
  const [toAmount, setToAmount] = useState(""); // مقدار ارز مقصد
  const [isFrom, setIsFrom] = useState(true); // تشخیص اینکه آیا Modal برای ارز مبدأ است یا ارز مقصد
  const [selectedFee, setSelectedFee] = useState(0.3); // درصد فی انتخاب‌شده
  const [pairContract, setPairContract] = useState(zeroAddress);
  const [slot0, setSlot0] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [pairContractExists, setPairContractExists] = useState(false);
  const [fromInTorate, setFromInTorate] = useState(null);
  const [toInFromrate, setToInfromrate] = useState(null);
  const [poolIsEmpty, setPoolIsEmpty] = useState(true);
  const [tickLower, setTickLower] = useState(null);
  const [tickUpper, setTickUpper] = useState(null);

  useEffect(() => {
    function loadHandler() {
      setLoad(true);
    }
    loadHandler();
  }, []);

  useEffect(() => {
    if (fromToken && toToken) {
      const getPoolContract = async () => {
        const poolAddress = await getPairContract(
          fromToken.address,
          toToken.address,
          selectedFee * 10000
        );
        if (poolAddress !== zeroAddress) {
          setPairContractExists(true);
          setPairContract(poolAddress);
          const slot0 = await getSlot0(poolAddress);
          setSlot0(slot0);
          if (slot0[0] !== 0) {
            setPoolIsEmpty(false);
            setCurrentPrice(getCurrentPrice(slot0[0]));
            console.log(currentPrice);
          }
          console.log("slot0: ", slot0);
        }
      };
      getPoolContract();
    }
  }, [fromToken, toToken]);

  function getFromTokenIsToken0() {
    // Ensure both token addresses are checksummed
    const tokenAAddress = ethers.utils.getAddress(fromToken.address);
    const tokenBAddress = ethers.utils.getAddress(toToken.address);

    // Compare addresses lexicographically
    if (tokenAAddress.toLowerCase() < tokenBAddress.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

  const convertCurrency = async (amount, isFrom) => {
    if (!pairContractExists) {
      return;
    }
    const fromIsToken0 = getFromTokenIsToken0();

    if (isLiquidity) {
      let result;
      if (isFrom) {
        if (fromIsToken0) {
          result = await calculateOutputAmount(
            slot0[0],
            0.9,
            1.1,
            true,
            amount * 1e18
          );

          setToAmount(result[0] / 1e18);
        } else {
          result = await calculateOutputAmount(
            slot0[0],
            0.9,
            1.1,
            false,
            amount * 1e18
          );

          setToAmount(result[0] / 1e18);
        }
      } else {
        if (fromIsToken0) {
          result = await calculateOutputAmount(
            slot0[0],
            0.9,
            1.1,
            false,
            amount * 1e18
          );

          setFromAmount(result[0] / 1e18);
        } else {
          console.log();
          result = await calculateOutputAmount(
            slot0[0],
            0.9,
            1.1,
            true,
            amount * 1e18
          );
          console.log(result);

          setFromAmount(result[0] / 1e18);
        }
      }
      setLiquidity(result[1]);
      setTickLower(result[2]);
      setTickUpper(result[3]);
    } else {
      if (fromIsToken0) {
        if (isFrom) {
          setToAmount(amount * currentPrice);
        } else {
          setFromAmount(amount * currentPrice);
        }
      } else {
        if (isFrom) {
          setToAmount(amount / currentPrice);
        } else {
          setFromAmount(amount / currentPrice);
        }
      }
    }
  };

  // تابع انتخاب توکن
  const handleSelectToken = (token, isFrom) => {
    if (isFrom) {
      setFromToken(token); // ذخیره ارز مبدأ
      setToAmount(convertCurrency(fromAmount, true)); // محاسبه مقدار ارز مقصد
    } else {
      setToToken(token); // ذخیره ارز مقصد
      setFromAmount(convertCurrency(toAmount, false)); // محاسبه مقدار ارز مقصد
    }
  };

  const handleInitilize = async () => {
    const pairContract = await getPairContract(
      fromToken.address,
      toToken.address,
      selectedFee * 10000
    );
    const fromIsToken0 = getFromTokenIsToken0();
    const sqrtPriceX96 = fromIsToken0
      ? encodeSqrtRatioX96(toAmount, fromAmount)
      : encodeSqrtRatioX96(fromAmount, toAmount);

    await initialize(sqrtPriceX96, pairContract);
  };

  const handleAddLiquidity = async () => {
    if (!pairContractExists) {
      await createPool(fromToken.address, toToken.address, selectedFee * 10000);
      const poolAddress = await getPairContract(
        fromToken.address,
        toToken.address,
        selectedFee * 10000
      );
      setPairContractExists(true);
      setPairContract(poolAddress);
      const slot0 = await getSlot0(poolAddress);
      setSlot0(slot0);
    }

    if (poolIsEmpty) {
      await handleInitilize();
    }

    await approve(fromToken.address, pairContract, (fromAmount * 11) / 10);
    await approve(toToken.address, pairContract, (toAmount * 11) / 10);

    await addLiquidity(pairContract, address, liquidity, tickLower, tickUpper);
  };

  const handleSwap = async () => {
    if (!pairContractExists) {
      return;
    }

    if (poolIsEmpty) {
      return;
    }

    // await approve(fromToken.address, pairContract, (fromAmount * 11) / 10);

    const fromIsToken0 = getFromTokenIsToken0();

    await swap(pairContract, address, fromIsToken0, fromAmount * 1e18);
  };

  const handlePerformOperations = async () => {
    isLiquidity ? await handleAddLiquidity() : await handleSwap();
  };

  return (
    <>
      <MobileNav />
      <section className={styles.container}>
        <Image src={bg} alt="bg" className={styles.showImage} />
        <div className={!isLoad ? styles.loginContainer : styles.fade}>
          {!isConnected && (
            <div className="text-center text-[#FBFAF9]">
              <p>Please connect your wallet to continue.</p>
            </div>
          )}
        </div>
        {isConnected && (
          <div className="flex justify-center items-center min-h-screen bg-[#200052] p-4">
            <div className="bg-[#200052] text-[#FBFAF9] w-full max-w-md mx-auto rounded-2xl shadow-lg border border-[#A0055D] p-6">
              <div className="flex justify-around mb-6">
                {isLiquidity ? (
                  <div className="flex flex-col justify-between items-center w-full">
                    {/* اضافه کردن FeeTierSelector */}
                    <div className="mt-6 w-full">
                      <FeeTierSelector
                        onSelectFee={(fee) => {
                          setSelectedFee(fee);
                          console.log("Selected Fee:", fee);
                        }}
                      />
                    </div>
                    {fromToken && toToken && (
                      <div className="mt-6 w-full">
                        <PriceRangeSelector />
                      </div>
                    )}

                    {/* نمایش درصد انتخاب‌شده */}
                    {selectedFee && (
                      <p className="text-center text-[#FBFAF9]/70 mt-4">
                        Selected Fee Tier:{" "}
                        <span className="font-semibold">{selectedFee}%</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      className={`text-base sm:text-lg font-semibold ${
                        value === 1
                          ? "text-[#FBFAF9] underline"
                          : "text-[#FBFAF9]/50"
                      } hover:text-[#FBFAF9] transition-colors`}
                      onClick={() => setValue(1)}
                    >
                      Swap
                    </button>
                    <button
                      className={`text-base sm:text-lg font-semibold ${
                        value === 2
                          ? "text-[#FBFAF9] underline"
                          : "text-[#FBFAF9]/50"
                      } hover:text-[#FBFAF9] transition-colors`}
                      onClick={() => setValue(2)}
                    >
                      Pool
                    </button>
                  </>
                )}
              </div>
              <div>
                {value === 1 || isLiquidity ? (
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between mb-6">
                      <div className="space-y-4 w-full sm:w-1/2">
                        <fieldset className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-sm text-[#FBFAF9]/70"
                          >
                            From
                          </label>
                          <input
                            type="number"
                            className="rounded-lg p-2 bg-[#200052] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D] w-full"
                            placeholder="0.0"
                            value={fromAmount}
                            onChange={async (e) => {
                              setFromAmount(e.target.value);
                              await convertCurrency(e.target.value, true);
                            }}
                          />
                        </fieldset>
                        <button
                          onClick={() => {
                            setIsFrom(true);
                            setIsOpen(true);
                          }}
                          className="flex items-center justify-center bg-[#A0055D] p-2 rounded-lg w-full hover:bg-[#A0055D]/80 transition-colors"
                        >
                          <span className="text-sm">
                            {fromToken ? fromToken.symbol : "Select a token"}
                          </span>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2"
                          >
                            <path
                              d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                              fill="#FBFAF9"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-center flex-col space-y-4 mt-4 sm:mt-0 sm:w-1/2 sm:pl-4">
                        <fieldset className="flex flex-col">
                          <label
                            htmlFor=""
                            className="text-sm text-[#FBFAF9]/70"
                          >
                            To
                          </label>
                          <input
                            type="number"
                            className="rounded-lg p-2 bg-[#200052] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D] w-full"
                            placeholder="0.0"
                            value={toAmount}
                            onChange={async (e) => {
                              setToAmount(e.target.value);
                              await convertCurrency(e.target.value, false);
                            }}
                          />
                        </fieldset>
                        <button
                          onClick={() => {
                            setIsFrom(false);
                            setIsOpen(true);
                          }}
                          className="flex items-center justify-center bg-[#A0055D] p-2 rounded-lg w-full hover:bg-[#A0055D]/80 transition-colors"
                        >
                          <span className="text-sm">
                            {toToken ? toToken.symbol : "Select a token"}
                          </span>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2"
                          >
                            <path
                              d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                              fill="#FBFAF9"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className={`w-full bg-[#A0055D] rounded-lg p-3 text-[#FBFAF9] font-semibold hover:bg-[#A0055D]/80 transition-colors ${
                          isConnected ? "cursor-default" : ""
                        }`}
                        onClick={handlePerformOperations}
                      >
                        {isConnected ? "Perform operations" : "Connect Wallet"}
                      </button>
                    </div>
                    {/* انتقال بخش دکمه‌ها و عنوان به پایین (زیر دکمه Perform operations) */}
                    {isLiquidity && (
                      <div className="flex justify-between items-center w-full mt-6">
                        <button
                          onClick={() => setIsLiquidity(false)}
                          className="p-2 bg-[#A0055D] rounded-full hover:bg-[#A0055D]/80 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                          </svg>
                        </button>
                        <p className="text-lg font-semibold">Add Liquidity</p>
                        <button className="p-2 bg-[#A0055D] rounded-full hover:bg-[#A0055D]/80 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div
                      onClick={() => setIsLiquidity(true)}
                      className="text-center bg-[#A0055D] rounded-lg p-3 text-[#FBFAF9] font-semibold hover:bg-[#A0055D]/80 transition-colors"
                    >
                      <button>Add Liquidity</button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-[#FBFAF9]/70">
                        Your Liquidity
                      </p>
                      <button className="p-2 bg-[#A0055D] rounded-full hover:bg-[#A0055D]/80 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                    <p className="mt-4 text-center text-sm text-[#FBFAF9]/50">
                      Connect to a wallet to view your liquidity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      {isOpen && (
        <SelectModal
          setIsOpen={setIsOpen}
          onSelectToken={(token) => handleSelectToken(token, isFrom)}
        />
      )}
    </>
  );
};

export default Login;
