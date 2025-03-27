"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SUPPORTED_NETWORKS, WALLET_CONNECT_PROJECT_ID } from "../utils/constants";

const config = getDefaultConfig({
  appName: "Votify",
  projectId: WALLET_CONNECT_PROJECT_ID, 
  chains:  [
    ...SUPPORTED_NETWORKS,
    {
      id: 11155111, // Sepolia network ID
      rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/2aUvl36AwoIdzsS64jsHiO9QE5t8Ftyh"], // Replace with your Sepolia RPC URL
      nativeCurrency: {
        name: "Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      chainName: "Sepolia",
      blockExplorerUrls: ["https://sepolia.etherscan.io"], // Optional: link to a block explorer for Sepolia
    },
  ] as any,
  ssr: true,
});

const queryClient = new QueryClient();

type RainbowKitContextProviderProps = {
  children: React.ReactNode;
};
const RainbowKitContextProvider = ({
  children,
}: RainbowKitContextProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitContextProvider;