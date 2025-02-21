"use client";
import { useState } from "react";

const FeeTierSelector = ({ onSelectFee }) => {
  const feeTiers = [0.01, 0.05, 0.3, 1]; // درصد‌های فی
  const [selectedFee, setSelectedFee] = useState(null);

  const handleFeeSelect = (fee) => {
    setSelectedFee(fee);
    onSelectFee(fee); // ارسال درصد انتخاب شده به والد
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Fee Tier</h3>
      <p className="text-blue-100 text-sm">
        The amount earned providing liquidity. Choose an amount that suits your risk tolerance and strategy.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {feeTiers.map((fee, index) => (
          <button
            key={index}
            onClick={() => handleFeeSelect(fee)}
            className={`p-3 rounded-lg transition-all duration-200 ${
              selectedFee === fee
                ? "bg-blue-700 text-white"
                : "bg-blue-800 text-blue-200 hover:bg-blue-700 hover:text-white"
            }`}
          >
            {fee}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeeTierSelector;