"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useKYCModal } from "@/app/context/KYCModalContext";
import { useEffect, useState } from "react";
import { useVotingContract } from "@/app/hooks/useVotingContract";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { kycStatus, openModal } = useKYCModal();
  const [loading, setLoading] = useState(false);

  // Import voting contract functions
  const { 
    verifyVoter, 
    castVote, 
    candidates, 
    hasVoted, 
    isVerified, 
    currentState, 
    winners, 
    refetchCandidates 
  } = useVotingContract();

  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    if (kycStatus === "completed") {
      setLoading(true);
      refetchCandidates();  // Fetch candidates when KYC is completed
    } else if (kycStatus !== "") {
      openModal();
    }
  }, [isConnected, kycStatus, refetchCandidates]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-indigo-950 text-white p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent py-4">
          Decentralized Voting DApp
        </h1>

        {/* Wallet Connection Section */}
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl mb-8">
          {!isConnected ? (
            <>
              <p className="text-gray-300 mb-6 text-center">
                Please connect your wallet to access the voting platform.
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-green-400 flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown"}
              </p>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Voting Section - Now Shows Proposals First */}
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Ongoing Voting Session</h2>
          
          {/* Show Candidates First (Before Verification) */}
          {candidates && candidates.length > 0 ? (
            <>
              <p className="text-gray-300 text-center mb-4">
                Select a candidate to cast your vote.
              </p>
              <ul className="bg-gray-700 p-4 rounded-lg shadow-inner space-y-2">
                {candidates.map((candidate) => (
                  <li key={candidate.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                    <span className="text-white font-medium">{candidate.name}</span>
                    <button
                      onClick={() => {
                        if (!isVerified) {
                          toast.error("You must verify as a voter before casting your vote.");
                          verifyVoter();  // Auto-trigger verification process
                          return;
                        }
                        castVote(candidate.id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      Vote
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-400 text-center">No active voting sessions available.</p>
          )}
        </div>

        {/* Verify as Voter - Only Visible When Needed */}
        {!isVerified && (
          <div className="mt-6 bg-yellow-900 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-yellow-300 mb-3 text-center">Become a Verified Voter</h2>
            <p className="text-yellow-200 text-center mb-3">
              To participate in voting, you must first verify as a voter.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => verifyVoter()}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
              >
                Verify Now
              </button>
            </div>
          </div>
        )}

        {/* Election Winner (if applicable) */}
        {currentState === 2 && winners && winners.length > 0 && (
          <div className="bg-blue-900 p-4 rounded-lg shadow-inner mt-6">
            <h3 className="text-white text-lg font-bold mb-2">🎉 Election Winner</h3>
            <p className="text-gray-300">{winners[0].name} won the election!</p>
          </div>
        )}
      </div>
    </main>
  );
}
