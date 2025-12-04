/**
 * This client handles communication with the Phala Shade Agent.
 * For the Hackathon Demo, it supports a "Mock Mode" to test UI flows 
 * without needing the live Docker container immediately.
 */

const MOCK_DELAY = 3000; // 3 seconds to simulate TEE processing

export interface TEEResponse {
  status: 'success' | 'error';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  signature: string; // The "Proof" signed by the TEE's private key
  timestamp: number;
}

export async function analyzeHealthData(file: File): Promise<TEEResponse> {
  // 1. Hackathon Mock Mode
  if (process.env.NEXT_PUBLIC_USE_MOCK_AGENT === 'true' || !process.env.NEXT_PUBLIC_AGENT_URL) {
    console.log("🔒 [TEE Client] Starting Mock Encryption...");
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          riskLevel: 'HIGH', // Force "High" to demo the Grant flow
          confidence: 0.94,
          signature: "0x7f23...mock_signature_generated_inside_enclave",
          timestamp: Date.now()
        });
      }, MOCK_DELAY);
    });
  }

  // 2. Real Phala Agent Mode (For later)
  const formData = new FormData();
  formData.append('file', file);
  
  // The Agent URL will be provided by Phala Cloud after deployment
  const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL; 
  
  if (!AGENT_URL) throw new Error("Agent URL not configured");
  
  const res = await fetch(`${AGENT_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });
  
  return res.json();
}

