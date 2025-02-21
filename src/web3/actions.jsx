import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "wagmi/actions";
import {
  factoryContractAddress,
  factoryContractAbi,
  pairContractAbi,
  tokenAbi,
} from "./utils/helperContract";
import { config } from "@/config";
import { ethers } from "ethers";

/**
 * دریافت اطلاعات توکن شامل نام، نماد و تعداد اعشار
 */
export async function getTokenMetadata(tokenAddress) {
  console.log("Fetching metadata for:", tokenAddress);

  const [name, symbol, decimals] = await Promise.all([
    readContract(config, {
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "name",
      args: [],
    }),
    readContract(config, {
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "symbol",
      args: [],
    }),
    readContract(config, {
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "decimals",
      args: [],
    }),
  ]);

  return { name, symbol, decimals };
}

/**
 * دریافت آدرس قرارداد جفت‌ارزی در یونی‌سواپ
 */
export async function getPairContract(tokenA, tokenB, fee) {
  return await readContract(config, {
    address: factoryContractAddress,
    abi: factoryContractAbi,
    functionName: "getPool",
    args: [tokenA, tokenB, fee],
  });
}

/**
 * دریافت اطلاعات slot0 از قرارداد جفت‌ارزی
 */
export async function getSlot0(pairContractAddress) {
  return await readContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "slot0",
    args: [],
  });
}

/**
 * دریافت نقدینگی موجود در استخر یونی‌سواپ
 */
export async function getLiquidity(pairContractAddress) {
  return await readContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "liquidity",
    args: [],
  });
}

/**
 * انجام سواپ از طریق قرارداد جفت‌ارزی
 */
export async function swap(pairContractAddress, recipient, zeroForOne, amount) {
  console.log("Swapping tokens:", { pairContractAddress, recipient, zeroForOne, amount });

  const sqrtLimit = zeroForOne
    ? "4295128740"
    : "1461446703485210103287273052203988822378723970341";

  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "swap",
    args: [recipient, zeroForOne, amount, sqrtLimit, "0x"],
  });

  return await waitForTransactionReceipt(config, { hash: tx });
}

/**
 * افزودن نقدینگی به استخر یونی‌سواپ
 */
export async function addLiquidity(
  pairContractAddress,
  recipient,
  amount,
  tickLower,
  tickUpper
) {
  console.log("Adding liquidity:", { pairContractAddress, recipient, amount, tickLower, tickUpper });

  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "mint",
    args: [recipient, tickLower, tickUpper, amount, "0x"],
  });

  return await waitForTransactionReceipt(config, { hash: tx });
}

/**
 * مقداردهی اولیه به استخر یونی‌سواپ
 */
export async function initialize(sqrtPriceX96, pairContractAddress) {
  console.log("Initializing pool:", { sqrtPriceX96, pairContractAddress });

  const tx = await writeContract(config, {
    address: pairContractAddress,
    abi: pairContractAbi,
    functionName: "initialize",
    args: [sqrtPriceX96],
  });

  return await waitForTransactionReceipt(config, { hash: tx });
}

/**
 * ایجاد استخر جدید در یونی‌سواپ
 */
export async function createPool(token0, token1, fee) {
  console.log("Creating pool for tokens:", { token0, token1, fee });

  const tx = await writeContract(config, {
    address: factoryContractAddress,
    abi: factoryContractAbi,
    functionName: "createPool",
    args: [token0, token1, fee],
  });

  return await waitForTransactionReceipt(config, { hash: tx });
}

/**
 * تأیید مجوز خرج‌کردن توکن برای قرارداد یونی‌سواپ
 */
export async function approve(tokenAddress, spender, amount) {
  const decimals = await readContract(config, {
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "decimals",
    args: [],
  });

  const formattedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

  console.log("Approving:", { tokenAddress, spender, amount: formattedAmount });

  const tx = await writeContract(config, {
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "approve",
    args: [spender, formattedAmount],
  });

  return await waitForTransactionReceipt(config, { hash: tx });
}
