import { useAccount, useReadContract, useWriteContract } from "wagmi";
import votingABI from "../utils/votingABI.json"; 
import { CONTRACT_ADDRESS } from "../utils/constants"; 
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type VotingState = 0 | 1 | 2; // 0: Setup, 1: Active, 2: Ended
type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

export const useVotingContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  const [isLoading, setIsLoading] = useState(false);
  const [contractOwner, setContractOwner] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  // Prevent duplicate toasts
  const showToast = (message: string, type: "success" | "error", id: string) => {
    if (type === "success") {
      toast.success(message, { id });
    } else {
      toast.error(message, { id });
    }
  };

  // Contract read hooks
  const { data: owner, refetch: refetchOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "owner",
  });

  const { data: candidates, refetch: refetchCandidates } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "getAllCandidatesData",
  });

  const { data: hasVoted, refetch: refetchHasVoted } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "hasVoted",
    args: address ? [address] : undefined,
  });

  const { data: isVerified, refetch: refetchIsVerified } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "isVerifiedVoter",
    args: address ? [address] : undefined,
  });

  const { data: currentState, refetch: refetchCurrentState } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "currentState",
  });

  const { data: votingStartTime, refetch: refetchStartTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "votingStartTime",
  });

  const { data: votingEndTime, refetch: refetchEndTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: votingABI,
    functionName: "votingEndTime",
  });

  const { data: winners, refetch: refetchWinners } = useReadContract({
    address: CONTRACT_ADDRESS,
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
    refetchIsVerified, 
    refetchStartTime, 
    refetchEndTime, 
    refetchWinners
  ]);
  
  

  useEffect(() => {
    if (owner) {
      setContractOwner(owner as string);
    }
  }, [owner]);

  // Prevent transactions if wallet is not connected
  const executeTransaction = async (
    action: string, 
    statePrecondition: { 
      check: boolean; 
      errorMessage: string; 
    }, 
    args: any[] = [],
    successMessage?: string
  ) => {
    if (!isConnected) {
      showToast("Please connect your wallet first!", "error", "wallet-toast");
      return;
    }

    if (!statePrecondition.check) {
      showToast(statePrecondition.errorMessage, "error", "state-toast");
      return;
    }

    setIsLoading(true);
    try {
      toast.loading(`Processing ${action}...`, { id: "tx-toast" });

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: votingABI,
        functionName: action,
        args: args.length > 0 ? args : undefined,
      });

      showToast(successMessage || `${action} executed successfully!`, "success", "tx-toast");
      refetchAllData();
    } catch (error) {
      showToast(`Failed to ${action}. Try again.`, "error", "tx-toast");
      console.error(`❌ Error in ${action}:`, error);
    } finally {
      setIsLoading(false);
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
        check: currentState === 1 && !!isVerified, 
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
