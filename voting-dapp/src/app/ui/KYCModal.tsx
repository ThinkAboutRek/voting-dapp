"use client";
import { useKYCModal } from "../context/KYCModalContext";
import SumsubWebSdk from "@sumsub/websdk-react";

const KYCModal = () => {
  const { showModal, kycAccessToken } = useKYCModal();
  
  console.log("🛠 KYC Modal Opened - Access Token:", kycAccessToken); // Debugging

  if (!showModal) return null;
  if (!kycAccessToken) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl"
        style={{
          width: "80%",
          height: "80%",
          overflowY: "auto", // To make the content scrollable
        }}
      >
        {/* <h2 className="text-lg font-bold mb-4">Your account is not verified</h2> */}
        <p className="mb-6 text-black">Update your KYC details to keep using Votify.</p>
        <div className="flex justify-end">
          <SumsubWebSdk
            style={{ width: "100%" }}
            accessToken={kycAccessToken}
            expirationHandler={() => Promise.resolve(kycAccessToken)}
            config={{
              lang: "en-En",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default KYCModal;
