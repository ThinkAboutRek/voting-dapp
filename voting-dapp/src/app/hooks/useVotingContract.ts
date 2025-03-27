"use client"
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import votingABI from "../utils/votingABI.json";
import { SEPOLIA_CONTRACT_ADDRESS } from "../utils/constants";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type VotingState = 0 | 1 | 2;
type Candidate = {
  candidateId: number;
  candidateName: string;
  voteCount: number;
};

export const useVotingContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [winners, setWinners] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contractOwner, setContractOwner] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');


  const showToast = (message: string, type: "success" | "error", id: string) => {
    if (type === "success") {
      toast.success(message, { id });
    } else {
      toast.error(message, { id });
    }
  };

  const { data: owner, refetch: refetchOwner } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "owner"
  });


  const { data: candidates, refetch: refetchCandidates } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "getAllCandidatesData",
  });

  const { data: hasVoted, refetch: refetchHasVoted } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "hasVoted",
    args: address ? [address] : undefined,
  });

  const { data: isVerified, refetch: refetchIsVerified } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "isVerifiedVoter",
    args: address ? [address] : undefined,
  });

  const { data: currentState, refetch: refetchCurrentState } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "currentState",
  });

  const { data: votingStartTime, refetch: refetchStartTime } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "votingStartTime",
  });


  const { data: votingEndTime, refetch: refetchEndTime } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "votingEndTime",
  });

  const { data: winnersRaw, refetch: refetchWinners } = useReadContract({
    address: SEPOLIA_CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "getWinner",
  });

  const refetchAllData = useCallback(() => {
    refetchCurrentState();
    refetchCandidates();
    if (address) {
      refetchHasVoted();
      refetchIsVerified();
    }
    refetchStartTime();
    refetchEndTime();
    refetchWinners();
  }, [
    address,
    refetchCurrentState,
    refetchCandidates,
    refetchHasVoted,
    refetchOwner,
    refetchIsVerified,
    refetchStartTime,
    refetchEndTime,
    refetchWinners
  ]);

  useEffect(() => {
    if (votingEndTime) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = Number(votingEndTime) - now;
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [votingEndTime]);

  useEffect(() => {
    if (owner) {
      setContractOwner(owner as string);
    } else {
      setContractOwner(null);
    }
  }, [owner]);


  useEffect(() => {
    if (winnersRaw && Array.isArray(winnersRaw)) {

      const rawWinnerArray = winnersRaw[0];
      if (!Array.isArray(rawWinnerArray)) {
        return;
      }

      const formattedWinners = rawWinnerArray.map((winnerObj: any) => {
        return {
          candidateId: Number(winnerObj.candidateId),
          candidateName: String(winnerObj.candidateName),
          voteCount: Number(winnerObj.voteCount),
        };
      });

      setWinners(formattedWinners);
    }
  }, [winnersRaw]);

  const executeTransaction = async (
    action: string,
    statePrecondition: { check: boolean; errorMessage: string },
    args: any[] = [],
    successMessage?: string
  ) => {
    if (!isConnected) {
      showToast("Please connect your wallet first!", "error", "wallet-toast");
      return;
    }

    if (!statePrecondition.check) {
      showToast(statePrecondition.errorMessage, "error", `${action}-precondition-toast`);
      return;
    }

    try {
      setTransactionStatus('pending');
      showToast("Transaction processing...", "success", `${action}-pending-toast`);

      writeContract({
        address: SEPOLIA_CONTRACT_ADDRESS,
        abi: votingABI,
        functionName: action,
        args: args.length > 0 ? args : undefined,
      }, {
        onSuccess(data) {
          setTransactionStatus('success');
          showToast(successMessage || "Transaction successful!", "success", `${action}-success-toast`);
          refetchAllData();
        },
        onError(error) {
          setTransactionStatus('error');
          showToast(`Transaction failed: ${error.message}`, "error", `${action}-error-toast`);
        }
      });
    } catch (error: any) {
      setTransactionStatus('error');
      showToast(`Transaction error: ${error.message}`, "error", `${action}-error-toast`);
    }
  };

  const verifyVoter = async () => {
    if (isVerified) {
      showToast("You are already a verified voter!", "error", "verify-toast");
      return;
    }

    await executeTransaction(
      "verifyVoter",
      {
        check: currentState === 0 || currentState === 1,
        errorMessage: "Voter verification is only allowed during Setup or Active phase!"
      },
      [],
      "You have been successfully verified as a voter!"
    );
  };

  const castVote = async (candidateId: number) => {
    await executeTransaction(
      "castVote",
      {
        check: (currentState === 1 && isVerified === true),
        errorMessage: "Cannot vote. Either voting is not active or you are not verified!"
      },
      [candidateId]
    );
  };

  const startVoting = async () => {
    await executeTransaction(
      "startVoting",
      {
        check: currentState === 0,
        errorMessage: "Cannot start voting. Not in Setup phase!"
      },
      [],
      "Voting period has started!"
    );
  };

  const endVoting = async () => {
    await executeTransaction(
      "endVoting",
      {
        check: currentState === 1,
        errorMessage: "Cannot end voting. Not in Active phase!"
      }
    );
  };

  const finalizeVoting = async () => {
    await executeTransaction(
      "finalizeVoting",
      {
        check: currentState === 2,
        errorMessage: "Cannot finalize. Voting is not Ended yet!"
      }
    );
  };

  const addCandidates = async (candidateIds: number[], names: string[]) => {
    await executeTransaction(
      "addMultipleCandidates",
      {
        check: currentState === 0,
        errorMessage: "Cannot add candidates. Voting is already active!"
      },
      [candidateIds, names],
      `Added ${candidateIds.length} candidate(s) successfully!`
    );
  };

  const removeCandidates = async (candidateIds: number[]) => {
    await executeTransaction(
      "removeMultipleCandidates",
      {
        check: currentState === 0,
        errorMessage: "Cannot remove candidates. Voting is already active!"
      },
      [candidateIds]
    );
  };

  const setVotingPeriod = async (durationInSeconds: number) => {
    await executeTransaction(
      "setVotingPeriod",
      {
        check: currentState === 0,
        errorMessage: "Voting period can only be set in the Setup phase!"
      },
      [durationInSeconds],
      `Voting duration set to ${durationInSeconds} seconds!`
    );
  };

  return {
    candidates: candidates as Candidate[] | undefined,
    hasVoted: hasVoted as boolean | undefined,
    isVerified: isVerified as boolean | undefined,
    currentState: currentState as VotingState | undefined,
    votingStartTime: votingStartTime as bigint | undefined,
    votingEndTime: votingEndTime as bigint | undefined,
    winners: winners as Candidate[] | undefined,
    remainingTime,
    verifyVoter,
    castVote,
    startVoting,
    endVoting,
    finalizeVoting,
    addCandidates,
    removeCandidates,
    setVotingPeriod,
    refetchCandidates,
    refetchAllData,
    isLoading,
    contractOwner,
    transactionStatus
  };
};
