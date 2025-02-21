import { TickMath } from "@uniswap/v3-sdk";
import { getCurrentPrice } from "./getCurrentPrice";

export async function calculateOutputAmount(
  fromIsToken0,
  priceCurrent, // human price: token1 per token0
  priceLow, // human lower bound price
  priceUp, // human upper bound price
  amount1Isneeded,
  amount,
  tick,
  decimals0, // e.g. 18 for token0
  decimals1 // e.g. 6 for token1
) {
  console.log("Original tick:", tick);

  // Convert human prices into on-chain prices that account for decimals.
  // On-chain, the price is expressed as (token1 amount in raw units)/(token0 amount in raw units).
  // Therefore, the conversion factor for token0/token1 prices is:
  //   onChainPrice = humanPrice * 10^(decimals1 - decimals0)
  if (fromIsToken0) {
    const conversionFactor = 10 ** (decimals1 - decimals0);
    priceCurrent = priceCurrent * conversionFactor;
    priceLow = priceLow * conversionFactor;
    priceUp = priceUp * conversionFactor;
  } else {
    // If the "from" token is not token0 then the human price is given as token0 per token1.
    // To get the on-chain price (still defined as token1/token0) we invert and adjust:
    const conversionFactor = 10 ** (decimals0 - decimals1);
    priceCurrent = (1 / priceCurrent) * conversionFactor;
    // When inverting a range, swap the lower and upper bounds:
    const priceLowCopy = priceLow;
    priceLow = (1 / priceUp) * conversionFactor;
    priceUp = (1 / priceLowCopy) * conversionFactor;
  }

  console.log(
    "Converted prices:",
    priceCurrent,
    priceLow,
    priceUp,
    amount1Isneeded,
    amount,
    tick
  );

  // Calculate tick boundaries (these functions assume on-chain prices).
  const { tickLower, tickUpper } = calculateTicks(priceLow, priceUp, tick);

  // Convert prices to square root form (as used in liquidity formulas)
  const sa = Math.sqrt(priceLow);
  const sb = Math.sqrt(priceUp);
  const sp = Math.sqrt(Number(priceCurrent));

  if (amount1Isneeded) {
    const [amount1, liquidity] = getAmount1FromAmount0(amount, sa, sp, sb);
    console.log("Liquidity:", liquidity, "Tick range:", tickLower, tickUpper);
    return [amount1, liquidity, tickLower, tickUpper];
  } else {
    const [amount0, liquidity] = getAmount0FromAmount1(amount, sa, sp, sb);
    console.log(
      "Amount0:",
      amount0,
      "Liquidity:",
      liquidity,
      "Tick range:",
      tickLower,
      tickUpper
    );
    return [amount0, liquidity, tickLower, tickUpper];
  }
}

function getAmount1FromAmount0(amount0, sa, sp, sb) {
  let liquidity = getLiquidity0(amount0, sp, sb);
  const amount1 = calculateY(liquidity, sp, sa, sb);
  return [amount1, (liquidity * 90) / 100];
}

function getAmount0FromAmount1(amount1, sa, sp, sb) {
  let liquidity = getLiquidity1(amount1, sa, sp);
  liquidity = (liquidity * 95) / 100;
  const amount0 = calculateX(liquidity, sp, sa, sb);
  return [amount0, (liquidity * 90) / 100];
}

function calculateTicks(priceLower, priceUpper, tickSpacing) {
  // Calculate raw ticks from on-chain price values
  let tickLower = Math.floor(Math.log(priceLower) / Math.log(1.0001));
  let tickUpper = Math.ceil(Math.log(priceUpper) / Math.log(1.0001));

  // Clamp ticks to valid ranges defined in Uniswap V3
  const MIN_TICK = TickMath.MIN_TICK;
  const MAX_TICK = TickMath.MAX_TICK;

  if (tickLower < MIN_TICK) tickLower = MIN_TICK;
  if (tickUpper > MAX_TICK) tickUpper = MAX_TICK;

  // Align ticks with the tick spacing
  tickLower = Math.floor(tickLower / tickSpacing) * tickSpacing;
  tickUpper = Math.ceil(tickUpper / tickSpacing) * tickSpacing;

  return { tickLower, tickUpper };
}

// Function to get liquidity from token0 amount (using the sqrt range)
function getLiquidity0(x, sa, sb) {
  return (x * sa * sb) / (sb - sa);
}

// Function to get liquidity from token1 amount
function getLiquidity1(y, sa, sb) {
  return y / (sb - sa);
}

// Function to calculate token0 amount for a given liquidity
function calculateX(L, sp, sa, sb) {
  sp = Math.max(Math.min(sp, sb), sa); // use endpoints if sp is out of range
  return (L * (sb - sp)) / (sp * sb);
}

// Function to calculate token1 amount for a given liquidity
function calculateY(L, sp, sa, sb) {
  sp = Math.max(Math.min(sp, sb), sa);
  return L * (sp - sa);
}
