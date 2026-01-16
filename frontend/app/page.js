'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [status, setStatus] = useState('idle'); // idle, recording, analyzing, minting, done
  const [logs, setLogs] = useState([]);
  
  const addLog = (msg) => setLogs(prev => [...prev, msg]);

  // Mocking the Agent Interaction (Since we can't embed the OnDemand Chatbot directly in this code block)
  // In the real hackathon, you'd embed the OnDemand Chat Widget here.
  const startAgentSwarm = async () => {
    setStatus('recording');
    addLog("🤖 Agent 1 (Interviewer): Connected to ElevenLabs Voice...");
    addLog("🎙️ System: 'Namaste! Please tell me about your daily earnings.'");
    
    // Simulate Voice Interaction Delay
    setTimeout(() => {
        addLog("✅ User Voice Input Received.");
        setStatus('analyzing');
        processAgentWorkflow();
    }, 3000);
  };

  const processAgentWorkflow = async () => {
    try {
        // Step 1: Upload "Physical" Document (Mocked for flow)
        addLog("📸 Agent 2 (Auditor): Scanning physical ledger image...");
        
        // Step 2: Call Risk Tool (Backend)
        addLog("⚖️ Agent 3 (Risk Officer): Comparing Voice vs Documents...");
        const scoreRes = await fetch('http://localhost:8000/agent/1-analyze-risk', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                interview_summary: { reported_income: 50000 },
                document_data: { ledger_total: 48000 }
            })
        });
        const scoreData = await scoreRes.json();
        addLog(`📊 Risk Score Calculated: ${scoreData.credit_score}`);

        // Step 3: Generate ZK Proof
        addLog("🔐 Agent 4 (Cryptographer): Generating Zero-Knowledge Proof...");
        const proofRes = await fetch('http://localhost:8000/agent/2-generate-proof', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ score: scoreData.credit_score })
        });
        const proofData = await proofRes.json();
        addLog("✅ ZK-SNARK Generated successfully.");

        // Step 4: Submit to Polygon
        setStatus('minting');
        addLog("🔗 Agent 5 (Notary): Submitting Proof to Polygon Amoy...");
        const chainRes = await fetch('http://localhost:8000/agent/3-submit-chain', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ proof_data: proofData })
        });
        const chainData = await chainRes.json();
        
        addLog(`🎉 SUCCESS: Identity Minted! Tx: ${chainData.tx_hash}`);
        setStatus('done');
        
    } catch (e) {
        addLog(`❌ Error: ${e.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-green-400">ZK-Sentinel <span className="text-sm text-gray-400">Agentic Edition</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: The "Physical" World */}
            <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
                <h2 className="text-xl mb-4">User Interface</h2>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-3xl">🎤</span>
                    </div>
                    <p className="text-center text-gray-400">
                        {status === 'idle' ? "Click Start to speak with the Banker Agent" : "Agent is listening..."}
                    </p>
                    <button 
                        onClick={startAgentSwarm}
                        disabled={status !== 'idle'}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
                    >
                        {status === 'idle' ? "Start Voice Interview" : "Processing..."}
                    </button>
                    
                    {/* Mock File Upload for "Auditor" Agent */}
                    <div className="w-full mt-4 border-t border-gray-700 pt-4">
                        <label className="text-sm text-gray-400">Upload Kacha Bill (Ledger)</label>
                        <input type="file" className="block w-full text-sm text-gray-500 mt-2"/>
                    </div>
                </div>
            </div>

            {/* Right: The "Agent" World */}
            <div className="border border-green-900/50 p-6 rounded-lg bg-black">
                <h2 className="text-xl mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Agent Swarm Logs
                </h2>
                <div className="h-96 overflow-y-auto font-mono text-sm space-y-2">
                    {logs.map((log, i) => (
                        <div key={i} className="border-l-2 border-green-800 pl-2">
                            <span className="text-gray-500">{new Date().toLocaleTimeString()}</span> {log}
                        </div>
                    ))}
                    {status === 'done' && (
                        <div className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded text-center">
                            <h3 className="text-lg font-bold">Credit Certificate Issued</h3>
                            <p className="text-xs break-all text-green-300">Target: Polygon Amoy</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}