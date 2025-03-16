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

        {!loading && isConnected && (
          <div className="bg-yellow-900 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl mb-8 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="mr-4 flex-shrink-0">
                <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-lg text-yellow-300">KYC Required</p>
                <p className="text-yellow-200">
                  Please complete KYC verification to access voting features.
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl ${
            loading ? "border-l-4 border-green-500" : "opacity-50 pointer-events-none border-l-4 border-gray-600"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
            Voting Section
          </h2>
          
          {loading ? (
            <div className="space-y-4">
              {isVerified ? (
                <>
                  {!hasVoted ? (
                    <>
                      <p className="text-gray-300 text-center">
                        Select a candidate and cast your vote.
                      </p>
                      <ul className="bg-gray-700 p-4 rounded-lg shadow-inner space-y-2">
                        {candidates && candidates.length > 0 ? (
                          candidates.map((candidate) => (
                            <li key={candidate.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                              <span className="text-white font-medium">{candidate.name}</span>
                              <button
                                onClick={() => castVote(candidate.id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                              >
                                Vote
                              </button>
                            </li>
                          ))
                        ) : (
                          <p className="text-center text-gray-400">No candidates available.</p>
                        )}
                      </ul>
                    </>
                  ) : (
                    <p className="text-green-400 text-center">You have already voted. Thank you for participating!</p>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-yellow-400 mb-3">You are not a verified voter.</p>
                  <button
                    onClick={() => verifyVoter()}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Verify as Voter
                  </button>
                </div>
              )}

              {currentState === 2 && winners && winners.length > 0 && (
                <div className="bg-blue-900 p-4 rounded-lg shadow-inner mt-6">
                  <h3 className="text-white text-lg font-bold mb-2">Election Winner</h3>
                  <p className="text-gray-300">🎉 {winners[0].name} won the election!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 text-center">
                Complete KYC verification to access voting features.
              </p>
              <div className="bg-gray-700 p-4 rounded-lg shadow-inner flex justify-center">
                <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
