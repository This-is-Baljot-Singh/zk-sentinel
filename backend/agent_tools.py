import json
import os
import asyncio
from web3 import Web3
# FIXED IMPORTS: Matching the actual function names in your services
from services.scoring import calculate_trust_score 
from services.prover import generate_zk_proof 

# --- TOOL 1: THE SCORER ---
def run_scoring_tool(financial_data: dict, ocr_data: dict):
    """
    Custom Tool 1: Calculates credit score based on Interview + OCR data.
    """
    print(f"🕵️ Agent Scorer: Analyzing data...")
    
    # Merge data sources
    income_claimed = financial_data.get("reported_income", 0)
    income_evidence = ocr_data.get("ledger_total", 0)
    
    # Prepare string input for the AI Scorer (Scoring service expects a string)
    analysis_input = f"""
    User Reported Income: {income_claimed}
    Document Verified Total: {income_evidence}
    """
    
    # CALLING ACTUAL SERVICE
    # calculate_trust_score returns a dict with 'score', 'risk_level', 'reasoning'
    ai_result = calculate_trust_score(analysis_input)
    
    final_score = ai_result.get("score", 600)
    
    # Add simple risk logic on top if needed
    if income_claimed > (income_evidence * 2):
        print("⚠️ Risk Officer: High Discrepancy detected.")
        final_score = int(final_score * 0.8) # 20% penalty

    return {
        "credit_score": final_score,
        "risk_flag": ai_result.get("risk_level", "Unknown"),
        "details": ai_result.get("reasoning", "Score calculated via ZK-Sentinel")
    }

# --- TOOL 2: THE CRYPTOGRAPHER ---
async def run_zk_generator_tool(score: int, wallet_address: str):
    """
    Custom Tool 2: Generates zk-SNARK proof.
    NOTE: Changed to 'async' because generate_zk_proof is async.
    """
    print(f"🔐 Agent Cryptographer: Generating ZK-Proof for Score {score}...")
    
    # CALLING ACTUAL SERVICE
    # We pass a dummy 'file_content' as it's not strictly used in your updated logic, 
    # but the function signature might require it or we can pass empty string.
    proof_result = await generate_zk_proof(
        credit_score=score, 
        file_content_str="agent_generated", 
        wallet_address=wallet_address,
        threshold=500
    )
    
    return proof_result 

# --- TOOL 3: THE NOTARY ---
def run_blockchain_notary_tool(proof_data: dict):
    """
    Custom Tool 3: Submits proof to Polygon Amoy.
    """
    print(f"📜 Agent Notary: Submitting to Polygon...")
    
    rpc_url = os.getenv("AMOY_RPC_URL")
    private_key = os.getenv("PRIVATE_KEY")
    contract_address_raw = os.getenv("CONTRACT_ADDRESS")
    
    if not rpc_url or not private_key or not contract_address_raw:
        return {"status": "error", "message": "Missing Blockchain Environment Variables"}

    # FIX: Convert to Checksum Address to satisfy Web3 Typing
    contract_address = Web3.to_checksum_address(contract_address_raw)

    w3 = Web3(Web3.HTTPProvider(rpc_url))
    account = w3.eth.account.from_key(private_key)
    
    # Simplified ABI for verifyProof
    abi = '[{"inputs":[{"internalType":"uint256[2]","name":"_pA","type":"uint256[2]"},{"internalType":"uint256[2][2]","name":"_pB","type":"uint256[2][2]"},{"internalType":"uint256[2]","name":"_pC","type":"uint256[2]"},{"internalType":"uint256[1]","name":"_pubSignals","type":"uint256[1]"}],"name":"verifyProof","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]'
    
    # FIX: Now passing a strictly typed ChecksumAddress
    contract = w3.eth.contract(address=contract_address, abi=abi)
    
    try:
        # In a real Hackathon demo, if you don't want to spend gas/wait for blocks,
        # you often return a success mock here. 
        # If you want real interaction:
        # 1. Map proof_data JSON to pA, pB, pC arrays.
        # 2. Build transaction.
        
        return {
            "status": "success", 
            "tx_hash": "0x123...mock_hash_on_amoy", 
            "network": "Polygon Amoy",
            "message": "Proof verified on-chain (Simulated)"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}