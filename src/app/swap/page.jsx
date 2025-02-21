"use client";
import { swapTokens } from "../../web3/actions";
import Image from "next/image";
import styles from "../../app/Home.module.css";
import bg from "../../../public/bg/opacity.png";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import MobileNav from "@/components/MobileNav";
import SelectModal from "@/components/selectModal/selectModal";
import FeeTierSelector from "@/components/FeeTierSelector";
import PriceRangeSelector from "@/components/PriceRangeSelector";
import {
  getPairContract,
  createPool,
  addLiquidity,
  approve,
  initialize,
  getSlot0,
  swap,
} from "@/web3/actions";
import { zeroAddress } from "viem";
import { ethers } from "ethers";
import { calculateOutputAmount } from "@/web3/calculateOutputAmount";
import { getCurrentPrice } from "@/web3/getCurrentPrice";
import { toast } from "react-toastify";
import { encodeSqrtRatioX96 } from "@uniswap/v3-sdk";
import TransactionStepsModal from "@/components/TransactionStepsModal/TransactionStepsModal";

const Login = () => {
  const { isConnected, address } = useAccount();
  const [isLoad, setLoad] = useState(false);
  const [value, setValue] = useState(1);
  const [isLiquidity, setIsLiquidity] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromDisable, setFromDisable] = useState(false);
  const [toDisable, setToDisable] = useState(false);
  const [performDisable, setPerformDisable] = useState(false);
  const [isFrom, setIsFrom] = useState(true);
  const [selectedFee, setSelectedFee] = useState(0.3);
  const [pairContract, setPairContract] = useState(zeroAddress);
  const [slot0, setSlot0] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentRatio, setCurrentRatio] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [pairContractExists, setPairContractExists] = useState(false);
  const [poolIsEmpty, setPoolIsEmpty] = useState(true);
  const [tickLower, setTickLower] = useState(null);
  const [tickUpper, setTickUpper] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [fromIsToken0, setFromIsToken0] = useState(false);
  const [tickSpacing, setTickSpacing] = useState(60);
  const [error, setError] = useState(""); // For displaying errors

  // Transaction Modal State
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [txSteps, setTxSteps] = useState([]);

  const TICK_SPACING = { 0.01: 1, 0.05: 10, 0.3: 60, 1: 200 };

  // Reset pool-dependent states when tokens change
  const resetPoolState = () => {
    setPairContract(zeroAddress);
    setPairContractExists(false);
    setSlot0(null);
    setLiquidity(null);
    setPoolIsEmpty(true);
    setTickLower(null);
    setTickUpper(null);
    setCurrentPrice(null);
  };

  useEffect(() => {
    setLoad(true);
  }, []);

  useEffect(() => {
    if (
      Number(minPrice) > Number(currentPrice) ||
      Number(maxPrice) < Number(currentPrice)
    ) {
      setPerformDisable(true);
      setFromDisable(true);
      setToDisable(true);
      setFromAmount(0);
      setToAmount(0);
      toast.info("Please Set A Valid Price Range");
      return;
    }
    async function changeAmountBasedOnRange() {
      setToDisable(false);
      setFromDisable(false);
      if (
        minPrice === undefined ||
        maxPrice === undefined ||
        fromAmount === undefined ||
        toAmount === undefined
      ) {
        return;
      }
      let result;
      if (fromIsToken0) {
        result = await calculateOutputAmount(
          fromIsToken0,
          currentPrice,
          minPrice,
          maxPrice,
          true,
          fromAmount * 10 ** fromToken.decimals,
          tickSpacing,
          fromToken.decimals,
          toToken.decimals
        );
        setToAmount(result[0] / 10 ** toToken.decimals);
      } else {
        result = await calculateOutputAmount(
          fromIsToken0,
          currentPrice,
          minPrice,
          maxPrice,
          false,
          fromAmount * 10 ** fromToken.decimals,
          tickSpacing,
          toToken.decimals,
          fromToken.decimals
        );
        setToAmount(result[0] / 10 ** toToken.decimals);
      }
    }
    changeAmountBasedOnRange();
  }, [minPrice, maxPrice]);

  useEffect(() => {
    function setDefaultRanges() {
      setMinPrice((currentPrice * 0.9).toFixed(6));
      setMaxPrice((currentPrice * 1.1).toFixed(6));
    }
    setDefaultRanges();
  }, [currentPrice]);

  useEffect(() => {
    if (fromToken && toToken) {
      const getPoolContract = async () => {
        const poolAddress = await getPairContract(
          fromToken.address,
          toToken.address,
          selectedFee * 10000
        );
        console.log(poolAddress);

        if (poolAddress !== zeroAddress) {
          setPairContractExists(true);
          setPairContract(poolAddress);
          const slot0 = await getSlot0(poolAddress);
          setSlot0(slot0);
          const fromIsToken0Value = getFromTokenIsToken0();
          setFromIsToken0(fromIsToken0Value);
          setTickSpacing(TICK_SPACING[selectedFee.toString()]);
          if (slot0[0] != 0) {
            console.log(getCurrentPrice(slot0[0]));
            setPoolIsEmpty(false);
            const currentRatioValue = getCurrentPrice(slot0[0]);
            let currentPriceValue;
            if (fromIsToken0Value) {
              currentPriceValue =
                currentRatioValue *
                10 ** (fromToken.decimals - toToken.decimals);
              setCurrentPrice(currentPriceValue);
            } else {
              currentPriceValue =
                currentRatioValue *
                10 ** (toToken.decimals - fromToken.decimals);
              setCurrentPrice(1 / currentPriceValue);
            }
          } else {
            setCurrentPrice(0);
          }
        } else {
          setCurrentPrice(0);
        }
      };
      getPoolContract();
    }
  }, [fromToken, toToken, selectedFee]);

  function getFromTokenIsToken0() {
    const tokenAAddress = ethers.utils.getAddress(fromToken.address);
    const tokenBAddress = ethers.utils.getAddress(toToken.address);
    return tokenAAddress.toLowerCase() < tokenBAddress.toLowerCase();
  }

  const convertCurrency = async (amount, isFrom) => {
    console.log(poolIsEmpty);
    if (!pairContractExists) {
      return;
    }
    if (poolIsEmpty) {
      return;
    }
    const fromIsToken0 = getFromTokenIsToken0();
    if (isLiquidity) {
      let result;
      if (isFrom) {
        if (fromIsToken0) {
          result = await calculateOutputAmount(
            fromIsToken0,
            currentPrice,
            minPrice,
            maxPrice,
            true,
            amount * 10 ** fromToken.decimals,
            tickSpacing,
            fromToken.decimals,
            toToken.decimals
          );
          setToAmount(result[0] / 10 ** toToken.decimals);
        } else {
          result = await calculateOutputAmount(
            fromIsToken0,
            currentPrice,
            minPrice,
            maxPrice,
            false,
            amount * 10 ** fromToken.decimals,
            tickSpacing,
            toToken.decimals,
            fromToken.decimals
          );
          setToAmount(result[0] / 10 ** toToken.decimals);
        }
      } else {
        if (fromIsToken0) {
          result = await calculateOutputAmount(
            fromIsToken0,
            currentPrice,
            minPrice,
            maxPrice,
            false,
            amount * 10 ** toToken.decimals,
            tickSpacing,
            fromToken.decimals,
            toToken.decimals
          );
          setFromAmount(result[0] / 10 ** fromToken.decimals);
        } else {
          result = await calculateOutputAmount(
            fromIsToken0,
            currentPrice,
            minPrice,
            maxPrice,
            true,
            amount * 10 ** toToken.decimals,
            tickSpacing,
            toToken.decimals,
            fromToken.decimals
          );
          setFromAmount(result[0] / 10 ** fromToken.decimals);
        }
      }
      if (Number(minPrice) > Number(currentPrice)) {
        setToDisable(true);
        setToAmount(0);
        return;
      }
      if (Number(maxPrice) < Number(currentPrice)) {
        setFromDisable(true);
        setFromAmount(0);
        return;
      }
      setLiquidity(result[1]);
      setTickLower(result[2]);
      setTickUpper(result[3]);
    } else {
      if (fromIsToken0) {
        isFrom
          ? setToAmount(amount * currentPrice)
          : setFromAmount(amount * currentPrice);
      } else {
        isFrom
          ? setToAmount(amount / currentPrice)
          : setFromAmount(amount / currentPrice);
      }
    }
  };

  const handleSelectToken = (token, isFromField) => {
    if (isFromField) {
      if (toToken && token.address === toToken.address) {
        setError("Cannot select the same token for both fields.");
        return;
      }
      setFromToken(token);
    } else {
      if (fromToken && token.address === fromToken.address) {
        setError("Cannot select the same token for both fields.");
        return;
      }
      setToToken(token);
    }
    setError("");
    // Reset pool-related state when tokens change
    resetPoolState();
  };

  const handleSwapTokens = () => {
    if (!fromToken || !toToken) {
      setError("Please select both tokens before swapping.");
      return;
    }
    if (fromToken.address === toToken.address) {
      setError("Cannot swap the same token.");
      return;
    }
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
    setError("");
    resetPoolState();
  };

  const handleInitilize = async () => {
    try {
      const poolAddress = await getPairContract(
        fromToken.address,
        toToken.address,
        selectedFee * 10000
      );
      const fromIsToken0Value = getFromTokenIsToken0();
      const sqrtPriceX96 = fromIsToken0Value
        ? encodeSqrtRatioX96(
            toAmount * 10 ** toToken.decimals,
            fromAmount * 10 ** fromToken.decimals
          )
        : encodeSqrtRatioX96(
            fromAmount * 10 ** fromToken.decimals,
            toAmount * 10 ** toToken.decimals
          );
      await initialize(sqrtPriceX96, poolAddress);
    } catch (e) {
      console.log(e);
    }
  };

  // Updated handleAddLiquidity to handle three scenarios (create, init, and ready)
  const handleAddLiquidity = async () => {
    try {
      // Scenario 1: Pool not created
      if (!pairContractExists) {
        setTxSteps([
          { name: "Create Pool", status: "current" },
          { name: "Initialize Pool", status: "pending" },
          { name: "Submit", status: "pending" },
        ]);
        setTxModalOpen(true);
        await createPool(
          fromToken.address,
          toToken.address,
          selectedFee * 10000
        );
        setTxSteps((prev) => {
          const newSteps = [...prev];
          newSteps[0].status = "completed";
          newSteps[1].status = "current";
          return newSteps;
        });
        const poolAddress = await getPairContract(
          fromToken.address,
          toToken.address,
          selectedFee * 10000
        );
        setPairContractExists(true);
        setPairContract(poolAddress);
        const slot0 = await getSlot0(poolAddress);
        setSlot0(slot0);
        if (poolIsEmpty) {
          await handleInitilize();
        }
        setTxSteps((prev) => {
          const newSteps = [...prev];
          newSteps[1].status = "completed";
          newSteps[2].status = "current";
          return newSteps;
        });

        return;
      }
      // Scenario 2: Pool created but not initialized
      else if (pairContractExists && poolIsEmpty) {
        setTxSteps([
          { name: "Initialize Pool", status: "current" },
          { name: "Submit", status: "pending" },
        ]);
        setTxModalOpen(true);
        await handleInitilize();
        setTxSteps((prev) => {
          const newSteps = [...prev];
          newSteps[0].status = "completed";
          newSteps[1].status = "current";
          return newSteps;
        });

        return;
      }
      // Scenario 3: Pool exists and is initialized
      else {
        setTxSteps([
          { name: `Approve ${fromToken.name}`, status: "current" },
          { name: `Approve ${toToken.name}`, status: "pending" },
          { name: "Add Liquidity", status: "pending" },
          { name: "Submit", status: "pending" },
        ]);
        setTxModalOpen(true);
      }

      // Approve Token for pool (Scenario 3)
      if (fromAmount) {
        await approve(fromToken.address, pairContract, (fromAmount * 11) / 10);
        setTxSteps((prev) => {
          const newSteps = [...prev];
          const index = newSteps.findIndex((step) =>
            step.name.includes(fromToken.name)
          );
          if (index !== -1) {
            newSteps[index].status = "completed";
            const nextIndex = newSteps.findIndex((step) =>
              step.name.includes(toToken.name)
            );
            if (nextIndex !== -1) {
              newSteps[nextIndex].status = "current";
            }
          }
          return newSteps;
        });
      }

      if (toAmount) {
        await approve(toToken.address, pairContract, (toAmount * 11) / 10);
        setTxSteps((prev) => {
          const newSteps = [...prev];
          const index = newSteps.findIndex((step) =>
            step.name.includes(toToken.name)
          );
          if (index !== -1) {
            newSteps[index].status = "completed";
            const nextIndex = newSteps.findIndex(
              (step) => step.name === "Add Liquidity"
            );
            if (nextIndex !== -1) {
              newSteps[nextIndex].status = "current";
            }
          }
          return newSteps;
        });
      }
      // Add Liquidity
      await addLiquidity(
        pairContract,
        address,
        liquidity,
        tickLower,
        tickUpper
      );
      setTxSteps((prev) => {
        const newSteps = [...prev];
        const index = newSteps.findIndex(
          (step) => step.name === "Add Liquidity"
        );
        if (index !== -1) {
          newSteps[index].status = "completed";
          const nextIndex = newSteps.findIndex(
            (step) => step.name === "Submit"
          );
          if (nextIndex !== -1) {
            newSteps[nextIndex].status = "current";
          }
        }
        return newSteps;
      });

      // Finalize submission
      setTxSteps((prev) => {
        const newSteps = [...prev];
        const index = newSteps.findIndex((step) => step.name === "Submit");
        if (index !== -1) {
          newSteps[index].status = "completed";
        }
        return newSteps;
      });
      toast.success("Liquidity added successfully");
    } catch (error) {
      console.error(error);
      setTxSteps((prev) => {
        const newSteps = [...prev];
        const currentIndex = newSteps.findIndex(
          (step) => step.status === "current"
        );
        if (currentIndex !== -1) {
          newSteps[currentIndex].status = "failed";
        }
        return newSteps;
      });
      toast.error("Transaction failed");
    }
  };

  // Updated handleSwap to include approval and modal steps for swap
  const handleSwap = async () => {
    if (!pairContractExists || poolIsEmpty) return;
    setTxSteps([
      { name: `Approve ${fromToken.name}`, status: "current" },
      { name: "Swap", status: "pending" },
      { name: "Submit", status: "pending" },
    ]);
    setTxModalOpen(true);
    try {
      await approve(fromToken.address, pairContract, (fromAmount * 11) / 10);
      setTxSteps((prev) => {
        const newSteps = [...prev];
        newSteps[0].status = "completed";
        newSteps[1].status = "current";
        return newSteps;
      });
      const fromIsToken0Value = getFromTokenIsToken0();
      await swap(
        pairContract,
        address,
        fromIsToken0Value,
        fromAmount * 10 ** fromToken.decimals
      );
      setTxSteps((prev) => {
        const newSteps = [...prev];
        newSteps[1].status = "completed";
        newSteps[2].status = "current";
        return newSteps;
      });
      setTxSteps((prev) => {
        const newSteps = [...prev];
        newSteps[2].status = "completed";
        return newSteps;
      });
      toast.success("Swap completed successfully");
    } catch (error) {
      setTxSteps((prev) => {
        const newSteps = [...prev];
        const currentIndex = newSteps.findIndex(
          (step) => step.status === "current"
        );
        if (currentIndex !== -1) {
          newSteps[currentIndex].status = "failed";
        }
        return newSteps;
      });
      toast.error("Swap transaction failed");
    }
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
        {true && (
          <div className="flex justify-center items-center min-h-screen swap-bg p-4 mt-7">
            <div className="bg-[#200052] text-[#FBFAF9] w-[38%] mx-auto rounded-2xl shadow-lg border border-[#A0055D] p-4">
              <div className="flex justify-around mb-6">
                {isLiquidity ? (
                  <div className="flex justify-between items-center w-full gap-x-4">
                    <div className="w-full">
                      <FeeTierSelector
                        onSelectFee={(fee) => {
                          setSelectedFee(fee);
                        }}
                      />
                    </div>
                    <div>
                      {fromToken && toToken && (
                        <div className="mt-6 w-full">
                          <PriceRangeSelector
                            fromToken={fromToken.symbol}
                            toToken={toToken.symbol}
                            currentPrice={currentPrice}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                          />
                        </div>
                      )}
                      {selectedFee && (
                        <p className="text-center text-[#FBFAF9]/70 ">
                          Selected Fee Tier:
                          <span className="font-semibold">{selectedFee}%</span>
                        </p>
                      )}
                    </div>
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
                    {/* Add FeeTierSelector for Swap */}
                    {!isLiquidity && (
                      <div className="mb-6">
                        <FeeTierSelector
                          onSelectFee={(fee) => {
                            setSelectedFee(fee);
                          }}
                        />
                        {selectedFee && (
                          <p className="text-center text-[#FBFAF9]/70 mt-2">
                            Selected Fee Tier:
                            <span className="font-semibold">
                              {selectedFee}%
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between mb-6">
                      <div className="space-y-4 w-full sm:w-1/2">
                        <fieldset className="flex flex-col">
                          <label className="text-sm text-[#FBFAF9]/70">
                            From
                          </label>
                          <input
                            type="number"
                            className="rounded-lg p-2 bg-[#200052] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D] w-full"
                            placeholder="0.0"
                            value={fromAmount}
                            disabled={fromDisable}
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
                      <div className="flex justify-center items-center">
                        <div className="circle">
                          <span
                            className="arrow-left"
                            onClick={handleSwapTokens}
                          >
                            &larr;
                          </span>
                          <span
                            className="arrow-right"
                            onClick={handleSwapTokens}
                          >
                            &rarr;
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center flex-col space-y-4 mt-4 sm:mt-0 sm:w-1/2 sm:pl-4">
                        <fieldset className="flex flex-col">
                          <label className="text-sm text-[#FBFAF9]/70">
                            To
                          </label>
                          <input
                            type="number"
                            className="rounded-lg p-2 bg-[#200052] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D] w-full"
                            placeholder="0.0"
                            value={toAmount}
                            disabled={toDisable}
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
                    {error && (
                      <div className="text-center text-red-500 bg-red-100 p-2 rounded-lg mb-4">
                        {error}
                      </div>
                    )}
                    <div className="text-center mt-6">
                      <button
                        className={`w-full bg-gradient rounded-lg p-3 text-[#FBFAF9] font-semibold hover:bg-[#A0055D]/80 transition-colors ${
                          isConnected ? "cursor-default" : ""
                        }`}
                        onClick={handlePerformOperations}
                        disabled={performDisable}
                      >
                        {isConnected ? "Perform operations" : "Connect Wallet"}
                      </button>
                    </div>
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
      {txModalOpen && (
        <TransactionStepsModal
          isOpen={txModalOpen}
          steps={txSteps}
          onClose={() => setTxModalOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
