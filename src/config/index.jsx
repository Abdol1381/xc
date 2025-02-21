// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { defaultWagmiConfig } from "@web3modal/wagmi";
import { cookieStorage, createStorage, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { defineChain } from "viem/chains/utils";

const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Monad Testnet Token",
    symbol: "MON",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz"],
    },
    public: {
      http: ["https://testnet-rpc.monad.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://explorer.monad-testnet.category.xyz",
    },
  },
});

// Get projectId from https://cloud.walletconnect.com
export const projectId = "1c298743c524cf3db324df9bb0dc848a";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "crypto",
  description: "",
  // url: 'https://aismart.liara.run', // origin must match your domain & subdomain
  url: "https://nadswap.net", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [monadTestnet];
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// export const wagmiConfig = createConfig(
//   getDefaultConfig({
//     // Your dApps chains
//     chains: [monadTestnet],
//     transports: {
//       // RPC URL for each chain
//       [monadTestnet.id]: http("https://monad-testnet.drpc.org"),
//     },

//     // Required API Keys
//     walletConnectProjectId: "1c298743c524cf3db324df9bb0dc848a",

//     // Required App Info
//     appName: "Your App Name",

//     // Optional App Info
//     appDescription: "Your App Description",
//     appUrl: "https://family.co", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   })
// );
