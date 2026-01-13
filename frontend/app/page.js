import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-gray-50 to-gray-100">
      
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        ZK-Sentinel
      </h1>

      <p className="text-base sm:text-lg text-gray-600 max-w-xl">
        Verifiable Financial Identity for the Next Billion.
        Prove creditworthiness without revealing your data.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a
          href="/upload"
          className="bg-black text-white px-6 py-3 rounded-xl w-full sm:w-auto"
        >
          Get Started
        </a>

        <span className="px-6 py-3 rounded-xl border text-gray-600 w-full sm:w-auto">
          Privacy-First • Zero-Knowledge
        </span>
      </div>
    </main>
  );
}
