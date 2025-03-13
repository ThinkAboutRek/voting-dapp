"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia, mainnet, localhost } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SUPPORTED_NETWORKS, WALLET_CONNECT_PROJECT_ID } from "../utils/constants";

const config = getDefaultConfig({
  appName: "Votify",
  projectId: WALLET_CONNECT_PROJECT_ID, 
  chains: SUPPORTED_NETWORKS,
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
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitContextProvider;