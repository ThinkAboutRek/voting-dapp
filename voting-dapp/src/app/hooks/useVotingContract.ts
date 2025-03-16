import { useAccount, useReadContract, useWriteContract } from "wagmi";
import votingABI from "../utils/votingABI.json"; 
import { CONTRACT_ADDRESS } from "../utils/constants"; 
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type VotingState = 0 | 1 | 2  // 0: Setup, 1: Active, 2: Ended
type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

export const useVotingContract = () => {
  const { address, isConnected } = useAccount(); 
  const { writeContract, data: txHash, isPending, isSuccess, isError } = useWriteContract(); 

  const [isLoading, setIsLoading] = useState(false);
  const [contractOwner, setContractOwner] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Contract read hooks with better typing
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

  // Refetch all contract data
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
  }, [address]);

  // Set contract owner
  useEffect(() => {
    if (owner) {
      setContractOwner(owner as string);
    }
  }, [owner]);

  // Track transaction status
 // Track transaction status with better user feedback
useEffect(() => {
  if (isPending) {
    setTransactionStatus('pending');
    setIsLoading(true);
    toast.loading("Transaction submitted to blockchain...", { id: "tx-toast" });
  } else if (isSuccess) {
    setTransactionStatus('success');
    setIsLoading(false);
    toast.success("Transaction confirmed!", { id: "tx-toast" });
    refetchAllData();
  } else if (isError) {
    setTransactionStatus('error');
    setIsLoading(false);
    toast.error("Transaction failed. Please try again.", { id: "tx-toast" });
  }
}, [isPending, isSuccess, isError]);

// Enhanced executeTransaction helper with better toast messages
const executeTransaction = async (
  action: string, 
  statePrecondition: { 
    check: boolean; 
    errorMessage: string 
  }, 
  args: any[] = [],
  successMessage?: string
) => {
  if (!statePrecondition.check) {
    toast.error(statePrecondition.errorMessage);
    return;
  }

  const actionFormatted = action.replace(/([A-Z])/g, ' $1').toLowerCase();
  
  setIsLoading(true);
  try {
    toast.loading(`Preparing to ${actionFormatted}...`, { id: "prep-toast" });
    
    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: votingABI,
      functionName: action,
      args: args.length > 0 ? args : undefined,
    });
    
    toast.success(successMessage || `${actionFormatted} transaction submitted!`, { id: "prep-toast" });
  } catch (error) {
    toast.error(`Error: Could not ${actionFormatted}`, { id: "prep-toast" });
    console.error(`❌ Error in ${action}:`, error);
    setIsLoading(false);
  }
};

const verifyVoter = async () => {
  await executeTransaction(
    "verifyVoter",
    { 
      check: currentState === 0 || currentState === 1,  // Setup or Active phase
      errorMessage: "Voter verification is only allowed during Setup or Active phase!" 
    },
    [],
    "You have been successfully verified as a voter!"
  );
};


  // Refactored contract functions using the executeTransaction helper
  const castVote = async (candidateId: number) => {
    await executeTransaction(
      "castVote",
      { 
        check: currentState === 1 && !!isVerified, 
        errorMessage: "Cannot cast vote. Voting is not active or you are not a verified voter!" 
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