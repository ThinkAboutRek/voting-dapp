import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { KYCModalProvider } from "@/app/context/KYCModalContext";
import KYCModal from "@/app/ui/KYCModal";
import RainbowKitContextProvider from "./context/Rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentralized Voting DApp",
  description: "Vote securely on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitContextProvider>
        <KYCModalProvider>
            <KYCModal />
            {children}
          </KYCModalProvider>
          </RainbowKitContextProvider>
      </body>
    </html>
  );
}
