"use client"
import React from 'react';
import { useVotingContract } from '../hooks/useVotingContract'; // Adjust import path as needed

const TransactionSpinner: React.FC = () => {
  const { transactionStatus } = useVotingContract();
  
  if (transactionStatus !== 'pending') {
    return null;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
        <p className="text-gray-700 font-medium">Processing transaction...</p>
        <p className="text-sm text-gray-500 mt-1">Please wait and don't close this window</p>
      </div>
    </div>
  );
};

export default TransactionSpinner;