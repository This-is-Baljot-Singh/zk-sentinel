from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# Import the fixed tools
from agent_tools import run_scoring_tool, run_zk_generator_tool, run_blockchain_notary_tool
import os

app = FastAPI(title="ZK-Sentinel Agent Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class ScoringInput(BaseModel):
    interview_summary: dict
    document_data: dict

class ProofInput(BaseModel):
    score: int
    wallet_address: str # Added this because ZK Proof needs to bind to a user

class NotaryInput(BaseModel):
    proof_data: dict

# --- Agent Endpoints ---

@app.post("/agent/1-analyze-risk")
async def agent_score(data: ScoringInput):
    """Called by The Risk Officer Agent"""
    try:
        # This is synchronous, so no await needed
        result = run_scoring_tool(data.interview_summary, data.document_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent/2-generate-proof")
async def agent_proof(data: ProofInput):
    """Called by The Cryptographer Agent"""
    try:
        # This is now ASYNC, so we MUST await it
        result = await run_zk_generator_tool(data.score, data.wallet_address)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent/3-submit-chain")
async def agent_submit(data: NotaryInput):
    """Called by The Notary Agent"""
    try:
        # This is synchronous
        result = run_blockchain_notary_tool(data.proof_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "ZK-Sentinel Agent System Online"}