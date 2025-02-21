import { Token } from "@uniswap/sdk-core";

export function convertToTokenClass(token) {
  return new Token(1, token.address, token.decimals, token.symbol, token.name);
}
