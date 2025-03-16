import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { KYCModalProvider } from "@/app/context/KYCModalContext";
import KYCModal from "@/app/ui/KYCModal";
import RainbowKitContextProvider from "./context/Rainbowkit";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Votify",
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
            <Toaster position="top-right" />
            {children}
          </KYCModalProvider>
          </RainbowKitContextProvider>
      </body>
    </html>
  );
}
