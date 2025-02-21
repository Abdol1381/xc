"use client";

import { useEffect } from "react";

const PriceRangeSelector = ({
  fromToken,
  toToken,
  currentPrice,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const handleIncrement = (type) => {
    if (type === "min") {
      setMinPrice((prev) => Number((Number(prev) + 10).toFixed(2)));
    } else {
      setMaxPrice((prev) => Number((Number(prev) + 10).toFixed(2)));
    }
  };

  const handleDecrement = (type) => {
    if (type === "min") {
      setMinPrice((prev) => Number((Number(prev) - 10).toFixed(2)));
    } else {
      setMaxPrice((prev) => Number((Number(prev) - 10).toFixed(2)));
    }
  };

  return (
    <div className="bg-[#200052] p-4 rounded-xl border border-[#A0055D] mt-4">
      <h2 className="text-[#FBFAF9] text-base font-semibold mb-3">
        Current Price({toToken} per {fromToken}): {currentPrice}
      </h2>
      <h3 className="text-[#FBFAF9] text-base font-semibold mb-3">
        Set Price Range
      </h3>

      {/* Min Price */}
      <div className="mb-3">
        <label className="text-[#FBFAF9]/70 text-xs mb-1">Min Price</label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDecrement("min")}
            className="p-1.5 bg-[#A0055D] rounded-md hover:bg-[#A0055D]/80 transition-colors"
          >
            <span className="text-[#FBFAF9] text-sm">-</span>
          </button>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
            className="flex-1 bg-[#200052] border border-[#A0055D] rounded-md p-1.5 text-[#FBFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#A0055D]"
          />
          <button
            onClick={() => handleIncrement("min")}
            className="p-1.5 bg-[#A0055D] rounded-md hover:bg-[#A0055D]/80 transition-colors"
          >
            <span className="text-[#FBFAF9] text-sm">+</span>
          </button>
        </div>
        <span className="text-[#FBFAF9]/50 text-[10px] mt-1 block">
          {toToken} per {fromToken}
        </span>
      </div>

      {/* Max Price */}
      <div>
        <label className="text-[#FBFAF9]/70 text-xs mb-1">Max Price</label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDecrement("max")}
            className="p-1.5 bg-[#A0055D] rounded-md hover:bg-[#A0055D]/80 transition-colors"
          >
            <span className="text-[#FBFAF9] text-sm">-</span>
          </button>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-1 bg-[#200052] border border-[#A0055D] rounded-md p-1.5 text-[#FBFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#A0055D]"
          />
          <button
            onClick={() => handleIncrement("max")}
            className="p-1.5 bg-[#A0055D] rounded-md hover:bg-[#A0055D]/80 transition-colors"
          >
            <span className="text-[#FBFAF9] text-sm">+</span>
          </button>
        </div>
        <span className="text-[#FBFAF9]/50 text-[10px] mt-1 block">
          {toToken} per {fromToken}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
