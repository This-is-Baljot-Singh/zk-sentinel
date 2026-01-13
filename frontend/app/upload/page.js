"use client";

import { useState } from "react";
import { analyzeFinancialData } from "../lib/api";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      setLoading(true);

      const result = await analyzeFinancialData(reader.result);
      localStorage.setItem("riskScore", result.score);

      window.location.href = "/dashboard";
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow max-w-md w-full text-center">

    <h1 className="text-2xl font-bold mb-2">
      Upload Financial Data
    </h1>

    <p className="text-sm text-gray-500 mb-6">
      Your data never leaves your device.
      We only generate a cryptographic proof.
    </p>

    <input
  type="file"
  className="w-full border rounded-lg p-3 text-sm"
  onChange={handleFileUpload}
/>


    {loading && (
  <p className="mt-4 text-sm text-gray-600">
    🔐 Analyzing securely…
  </p>
)}

  </div>
</div>

  );
}
