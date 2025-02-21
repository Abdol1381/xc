import { lazy } from "react";

export const factoryContractAddress =
  "0xDC35d8Fdad51a28A6FBe6503FEDcFEd2b67f9f25";

export const factoryContractAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "createPool",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "fee", type: "uint24", internalType: "uint24" },
    ],
    outputs: [{ name: "pool", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "enableFeeAmount",
    inputs: [
      { name: "fee", type: "uint24", internalType: "uint24" },
      { name: "tickSpacing", type: "int24", internalType: "int24" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "feeAmountTickSpacing",
    inputs: [{ name: "", type: "uint24", internalType: "uint24" }],
    outputs: [{ name: "", type: "int24", internalType: "int24" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPool",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint24", internalType: "uint24" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parameters",
    inputs: [],
    outputs: [
      { name: "factory", type: "address", internalType: "address" },
      { name: "token0", type: "address", internalType: "address" },
      { name: "token1", type: "address", internalType: "address" },
      { name: "fee", type: "uint24", internalType: "uint24" },
      { name: "tickSpacing", type: "int24", internalType: "int24" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FeeAmountEnabled",
    inputs: [
      {
        name: "fee",
        type: "uint24",
        indexed: true,
        internalType: "uint24",
      },
      {
        name: "tickSpacing",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnerChanged",
    inputs: [
      {
        name: "oldOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      {
        name: "token0",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token1",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fee",
        type: "uint24",
        indexed: true,
        internalType: "uint24",
      },
      {
        name: "tickSpacing",
        type: "int24",
        indexed: false,
        internalType: "int24",
      },
      {
        name: "pool",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
];

export const pairContractAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "burn",
    inputs: [
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" },
      { name: "amount", type: "uint128", internalType: "uint128" },
    ],
    outputs: [
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "collect",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" },
      {
        name: "amount0Requested",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "amount1Requested",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    outputs: [
      { name: "amount0", type: "uint128", internalType: "uint128" },
      { name: "amount1", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "collectProtocol",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      {
        name: "amount0Requested",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "amount1Requested",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    outputs: [
      { name: "amount0", type: "uint128", internalType: "uint128" },
      { name: "amount1", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fee",
    inputs: [],
    outputs: [{ name: "", type: "uint24", internalType: "uint24" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeGrowthGlobal0X128",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeGrowthGlobal1X128",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "flash",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseObservationCardinalityNext",
    inputs: [
      {
        name: "observationCardinalityNext",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "sqrtPriceX96", type: "uint160", internalType: "uint160" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "liquidity",
    inputs: [],
    outputs: [{ name: "", type: "uint128", internalType: "uint128" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxLiquidityPerTick",
    inputs: [],
    outputs: [{ name: "", type: "uint128", internalType: "uint128" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" },
      { name: "amount", type: "uint128", internalType: "uint128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "observations",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "blockTimestamp",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "tickCumulative", type: "int56", internalType: "int56" },
      {
        name: "secondsPerLiquidityCumulativeX128",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "initialized", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "observe",
    inputs: [
      {
        name: "secondsAgos",
        type: "uint32[]",
        internalType: "uint32[]",
      },
    ],
    outputs: [
      {
        name: "tickCumulatives",
        type: "int56[]",
        internalType: "int56[]",
      },
      {
        name: "secondsPerLiquidityCumulativeX128s",
        type: "uint160[]",
        internalType: "uint160[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "positions",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "liquidity", type: "uint128", internalType: "uint128" },
      {
        name: "feeGrowthInside0LastX128",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "feeGrowthInside1LastX128",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "tokensOwed0", type: "uint128", internalType: "uint128" },
      { name: "tokensOwed1", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "protocolFees",
    inputs: [],
    outputs: [
      { name: "token0", type: "uint128", internalType: "uint128" },
      { name: "token1", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setFeeProtocol",
    inputs: [
      { name: "feeProtocol0", type: "uint8", internalType: "uint8" },
      { name: "feeProtocol1", type: "uint8", internalType: "uint8" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "slot0",
    inputs: [],
    outputs: [
      {
        name: "sqrtPriceX96",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "tick", type: "int24", internalType: "int24" },
      {
        name: "observationIndex",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "observationCardinality",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "observationCardinalityNext",
        type: "uint16",
        internalType: "uint16",
      },
      { name: "feeProtocol", type: "uint8", internalType: "uint8" },
      { name: "unlocked", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "snapshotCumulativesInside",
    inputs: [
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" },
    ],
    outputs: [
      {
        name: "tickCumulativeInside",
        type: "int56",
        internalType: "int56",
      },
      {
        name: "secondsPerLiquidityInsideX128",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "secondsInside", type: "uint32", internalType: "uint32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "swap",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      {
        name: "amountSpecified",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "sqrtPriceLimitX96",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      { name: "amount0", type: "int256", internalType: "int256" },
      { name: "amount1", type: "int256", internalType: "int256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tickBitmap",
    inputs: [{ name: "", type: "int16", internalType: "int16" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tickSpacing",
    inputs: [],
    outputs: [{ name: "", type: "int24", internalType: "int24" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ticks",
    inputs: [{ name: "", type: "int24", internalType: "int24" }],
    outputs: [
      {
        name: "liquidityGross",
        type: "uint128",
        internalType: "uint128",
      },
      { name: "liquidityNet", type: "int128", internalType: "int128" },
      {
        name: "feeGrowthOutside0X128",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "feeGrowthOutside1X128",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tickCumulativeOutside",
        type: "int56",
        internalType: "int56",
      },
      {
        name: "secondsPerLiquidityOutsideX128",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "secondsOutside",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "initialized", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token0",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token1",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tickLower",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "tickUpper",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "amount",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Collect",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tickLower",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "tickUpper",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "amount0",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "amount1",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollectProtocol",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "amount1",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Flash",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "paid0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "paid1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IncreaseObservationCardinalityNext",
    inputs: [
      {
        name: "observationCardinalityNextOld",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "observationCardinalityNextNew",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialize",
    inputs: [
      {
        name: "sqrtPriceX96",
        type: "uint160",
        indexed: false,
        internalType: "uint160",
      },
      {
        name: "tick",
        type: "int24",
        indexed: false,
        internalType: "int24",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tickLower",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "tickUpper",
        type: "int24",
        indexed: true,
        internalType: "int24",
      },
      {
        name: "amount",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetFeeProtocol",
    inputs: [
      {
        name: "feeProtocol0Old",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "feeProtocol1Old",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "feeProtocol0New",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "feeProtocol1New",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "amount1",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "sqrtPriceX96",
        type: "uint160",
        indexed: false,
        internalType: "uint160",
      },
      {
        name: "liquidity",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "tick",
        type: "int24",
        indexed: false,
        internalType: "int24",
      },
    ],
    anonymous: false,
  },
];

export const tokenAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC20InsufficientAllowance",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "allowance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ERC20InsufficientBalance",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ERC20InvalidApprover",
    inputs: [{ name: "approver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC20InvalidReceiver",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC20InvalidSender",
    inputs: [{ name: "sender", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC20InvalidSpender",
    inputs: [{ name: "spender", type: "address", internalType: "address" }],
  },
];


export const calculatorAbi = [
  {
    type: "function",
    name: "getAmount0FromAmount1",
    inputs: [
      {
        name: "sqrtRatioX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioAX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioBX96",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "amount1", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAmount1FromAmount0",
    inputs: [
      {
        name: "sqrtRatioX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioAX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioBX96",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "amount0", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amount1", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAmountsFromLiquidity",
    inputs: [
      {
        name: "sqrtRatioX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioAX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "sqrtRatioBX96",
        type: "uint160",
        internalType: "uint160",
      },
      { name: "liquidity", type: "uint128", internalType: "uint128" },
    ],
    outputs: [
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "pure",
  },
];