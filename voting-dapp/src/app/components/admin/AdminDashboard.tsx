"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useVotingContract } from "@/app/hooks/useVotingContract";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    contractOwner,
    startVoting,
    endVoting,
    setVotingPeriod,
    finalizeVoting,
    addCandidates,
    removeCandidates,
    candidates,
    votingStartTime,
    votingEndTime,
    currentState,
    winners,
    isLoading,
  } = useVotingContract();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showRemoveCandidateForm, setShowRemoveCandidateForm] = useState(false);
  const [showDurationForm, setShowDurationForm] = useState(false);

  const [candidates1, setCandidates1] = useState<{ id: string; name: string }[]>([
    { id: "", name: "" }, // Default empty candidate entry
  ]);
  const [candidateIdForRemove, setCandidateIdForRemove] = useState("");
  const [votingDuration, setVotingDuration] = useState("");
  const router = useRouter();

  // ✅ Only check admin status after wallet is connected
  useEffect(() => {
    if (!isConnected) {
      setIsAdmin(null);
      return;
    }

    if (contractOwner && address) {
      if (contractOwner.toLowerCase() === address.toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setTimeout(() => {
          router.push("/"); // Redirect to home after 3 seconds
        }, 3000);
      }
    }
  }, [contractOwner, address, isConnected,router]);

  // 🚫 If Wallet is Not Connected → Show "Connect Wallet" Instead of Access Denied
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white p-6">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🔐 Admin Dashboard
          </h1>
          <p className="text-gray-300 mb-6 text-center">
            Please connect your wallet to access the admin features.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  // 🚫 If Wallet is Connected but NOT Admin → Show "Access Denied"
  if (isAdmin === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-red-950 text-white p-6">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-red-500">
            🚫 Access Denied
          </h1>
          <p className="text-gray-300 text-center">
            You don't have admin privileges. Redirecting to home...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Add Candidate Field
  const addCandidateField = () => {
    setCandidates1([...candidates1, { id: "", name: "" }]);
  };

  // ✅ Handle Input Change
  const handleCandidateChange = (index: number, field: "id" | "name", value: string) => {
    const newCandidates = [...candidates1];
    newCandidates[index][field] = value;
    setCandidates1(newCandidates);
  };

  // ✅ Submit Candidates
  const submitCandidates = () => {
    const ids = candidates1.map((c) => Number(c.id)).filter((id) => !isNaN(id));
    const names = candidates1.map((c) => c.name.trim()).filter((name) => name !== "");

    if (ids.length !== names.length || ids.length === 0) {
      alert("Please enter valid candidate IDs and names.");
      return;
    }

    addCandidates(ids, names);
    setCandidates1([]); // Clear after submission
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-indigo-950 text-white p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent py-4">
          Admin Dashboard
        </h1>

        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl mb-8">
          <p className="mb-4 text-green-400 flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown"}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => disconnect()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              Disconnect
            </button>
          </div>
        </div>

        <p className="text-gray-300 mb-8 text-center text-lg">
          Manage voting system settings and candidate information.
        </p>

        {isAdmin && (

          <div className="space-y-6">
            {/* 🔹 Contract State */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">📜 Contract State</h2>
              <p className="text-center text-yellow-400">
                {currentState === 0 ? "Setup Phase" : currentState === 1 ? "Voting Active" : "Voting Ended"}
              </p>  
            </div>

            {/* 🔹 Candidate List */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">👤 Candidates</h2>
              {candidates && candidates.length > 0 ? (
                <ul className="text-center">
                  {candidates.map((candidate, index) => (
                    <li key={index} className="text-gray-300">
                      🗳 {candidate.id} - {candidate.name} ({candidate.voteCount} votes)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center">No candidates added yet.</p>
              )}
            </div>

            {/* 🔹 Voting Period */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">🕒 Voting Period</h2>
              <p className="text-center text-yellow-400">
                Start: {votingStartTime ? new Date(Number(votingStartTime) * 1000).toLocaleString() : "Not Set"}
              </p>
              <p className="text-center text-yellow-400">
                End: {votingEndTime ? new Date(Number(votingEndTime) * 1000).toLocaleString() : "Not Set"}
              </p>
            </div>

            {/* 🔹 Election Winner */}
            {winners && winners.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">🏆 Election Winner</h2>
                {winners.map((winner, index) => (
                  <p key={index} className="text-center text-green-400">
                    {winner.name} with {winner.voteCount} votes!
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                  Voting Controls
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={startVoting}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? "Starting..." : "Start Voting"}
                  </button>
                  <button
                    onClick={endVoting}
                    disabled={isLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? "Ending..." : "End Voting"}
                  </button>
                  <button
                    onClick={finalizeVoting}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isLoading ? "Finalizing..." : "Finalize Voting"}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                  Candidate Management
                </h2>

                <div className="mb-6">
                  <button
                    onClick={() => setShowCandidateForm(!showCandidateForm)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
                  >
                    {showCandidateForm ? "Cancel" : "Add Candidates"}
                  </button>

                  {showCandidateForm && (
                    <div className="mt-4 space-y-3 p-4 bg-gray-700 rounded-lg">
                      {candidates1.map((candidate, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="number"
                            placeholder="Candidate ID"
                            value={candidate.id}
                            onChange={(e) => handleCandidateChange(index, "id", e.target.value)}
                            className="w-1/3 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Candidate Name"
                            value={candidate.name}
                            onChange={(e) => handleCandidateChange(index, "name", e.target.value)}
                            className="w-2/3 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                          />
                        </div>
                      ))}
                      <button onClick={addCandidateField} className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                        ➕ Add Another Candidate
                      </button>
                      <button onClick={submitCandidates} disabled={isLoading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        {isLoading ? "Adding..." : "Confirm Add"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => setShowRemoveCandidateForm(!showRemoveCandidateForm)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium"
                  >
                    {showRemoveCandidateForm ? "Cancel" : "Remove Candidate"}
                  </button>
                  {showRemoveCandidateForm && (
                    <div className="mt-4 space-y-3 p-4 bg-gray-700 rounded-lg">
                      <input
                        type="number"
                        placeholder="Candidate ID to Remove"
                        value={candidateIdForRemove}
                        onChange={(e) => setCandidateIdForRemove(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() => removeCandidates([parseInt(candidateIdForRemove)])}
                        disabled={isLoading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {isLoading ? "Removing..." : "Confirm Remove"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                  Voting Settings
                </h2>
                <button
                  onClick={() => setShowDurationForm(!showDurationForm)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium"
                >
                  {showDurationForm ? "Cancel" : "Set Voting Duration"}
                </button>
                {showDurationForm && (
                  <div className="mt-4 space-y-3 p-4 bg-gray-700 rounded-lg">
                    <input
                      type="number"
                      placeholder="Voting Duration (in seconds)"
                      value={votingDuration}
                      onChange={(e) => setVotingDuration(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      onClick={() => setVotingPeriod(parseInt(votingDuration))}
                      disabled={isLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isLoading ? "Setting..." : "Confirm Duration"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
          </div>
    </main>
  );
};

export default AdminDashboard;