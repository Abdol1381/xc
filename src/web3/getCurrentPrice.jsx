export function getCurrentPrice(sqrtPriceX96) {
  return (Number(sqrtPriceX96) / 2 ** 96) ** 2;
}
