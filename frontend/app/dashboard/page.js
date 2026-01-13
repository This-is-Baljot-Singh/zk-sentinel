"use client";

import { useEffect, useState } from "react";
import ZKAnimation from "../components/ZKAnimation";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3Provider from "../components/Web3Provider";

export default function DashboardPage() {
  const [score, setScore] = useState(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem("riskScore");
    setScore(savedScore);
  }, []);

  const handleVerify = () => {
  setVerifying(true);

  setTimeout(() => {
    alert(
      "Zero-Knowledge Proof Generated ✔\nCreditworthiness Verified without revealing data."
    );
    setVerifying(false);
  }, 2500);
};


  return (
    <Web3Provider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
  Dashboard
</h1>

          <p className="text-sm text-gray-500 mb-6">
            Your financial data remains private at all times
          </p>

          {/* Wallet */}
          <div className="mb-6 flex justify-center scale-90 sm:scale-100">
  <ConnectButton />
</div>


          {/* Privacy-Friendly Status */}
          {score && (
            <>
              <p className="text-sm text-gray-500 mb-1">
                Creditworthiness Status
              </p>
              <p className="text-3xl font-bold text-green-600 mb-6">
                Eligible ✅
              </p>
            </>
          )}

          {/* ZK Animation */}
          {verifying && (
            <div className="text-4xl mb-4 animate-pulse">
              🔒 → 🛡️
            </div>
          )}
            <ZKAnimation active={verifying} />

            {verifying && (
              <p className="text-sm text-gray-500 mb-4">
                Generating Zero-Knowledge Proof…
              </p>
            )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={verifying}
            className={`w-full px-6 py-3 rounded-xl text-white transition ${
              verifying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {verifying
              ? "Generating Zero-Knowledge Proof…"
              : "Verify Without Revealing Data"}
          </button>

          {/* Footer Note */}
          <p className="text-xs text-gray-400 mt-4">
            No balances, transactions, or identity are shared.
          </p>
        </div>
      </div>
    </Web3Provider>
  );
}
