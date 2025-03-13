"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKYCModal } from "@/app/context/KYCModalContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { kycStatus, openModal,kycAccessToken } = useKYCModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    if (kycStatus === "completed") {
      setLoading(true);
    } else if (kycStatus !== "") {
      openModal();
    }
  }, [isConnected, kycStatus]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Decentralized Voting DApp</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
  {!isConnected ? (
    <>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </>
  ) : (
    <div>
      <p className="mb-4 text-green-400">
        ✅ Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown"}
      </p>
      <button
        onClick={() => disconnect()}
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition"
      >
        Disconnect
      </button>
    </div>
  )}
</div>

      {!loading && isConnected && (
        <div className="mt-5 text-yellow-400">
          ⏳ Please complete KYC to access voting.
        </div>
      )}

      <div
        className={`mt-10 p-6 bg-gray-800 rounded-lg shadow-lg w-80 text-center ${
          loading ? "" : "opacity-50 pointer-events-none"
        }`}
      >
        <h2 className="text-xl font-semibold">Voting Section</h2>
        <p className="text-gray-400">This will show active proposals soon.</p>
      </div>
    </main>
  );
}
