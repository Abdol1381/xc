"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getTokenMetadata } from "@/web3/actions";

const tokens = [
  {
    name: "Monad",
    symbol: "MON",
    address: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
    decimals: 18,
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
    decimals: 6,
  },
  {
    name: "Tether",
    symbol: "USDT",
    address: "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D",
    decimals: 6,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xB5a30b0FDc5EA94A52fDc42e3E9760Cb8449Fb37",
    decimals: 18,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0xcf5a6076cfa32686c0Df13aBaDa2b40dec133F1d",
    decimals: 8,
  },
  {
    name: "Solana",
    symbol: "Sol",
    address: "0x369CD1E20Fa7ea1F8e6dc0759709bA0bD978abE7",
    decimals: 9,
  },
];

const SelectModal = ({ setIsOpen, onSelectToken }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedToken, setFetchedToken] = useState(null);

  // When the searchQuery is a valid address, fetch token data from the blockchain.
  useEffect(() => {
    if (ethers.utils.isAddress(searchQuery)) {
      async function fetchTokenData() {
        try {
          const [name, symbol, decimals] = await getTokenMetadata(searchQuery);
          const tokenData = { name, symbol, address: searchQuery, decimals };
          setFetchedToken(tokenData);
        } catch (err) {
          console.error("Error fetching token data:", err);
          setFetchedToken(null);
        }
      }
      fetchTokenData();
    } else {
      setFetchedToken(null);
    }
  }, [searchQuery]);

  // Filter tokens by name, symbol, or address.
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a token was fetched and it's not already in the tokens list, show it at the top.
  const isFetchedTokenInList =
    fetchedToken &&
    tokens.some(
      (token) =>
        token.address.toLowerCase() === fetchedToken.address.toLowerCase()
    );
  let displayTokens = filteredTokens;
  if (fetchedToken && !isFetchedTokenInList) {
    displayTokens = [fetchedToken, ...filteredTokens];
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="bg-[#0E100F] text-[#FBFAF9] w-full max-w-md rounded-2xl shadow-lg border border-[#A0055D] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select a Token</h2>
          <button
            onClick={() => setIsOpen(false)}
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {/* Search field */}
        <input
          type="text"
          placeholder="Enter contract address or search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-[#0E100F] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D]"
        />
        {/* Filtered token list */}
        <div className="max-h-64 overflow-y-auto">
          {displayTokens.map((token, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectToken(token);
                setIsOpen(false);
              }}
              className="flex items-center p-2 hover:bg-[#A0055D]/20 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-[#A0055D] rounded-full flex items-center justify-center text-[#FBFAF9]">
                {token.symbol[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold">{token.name}</p>
                <p className="text-xs text-[#FBFAF9]/70">{token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
