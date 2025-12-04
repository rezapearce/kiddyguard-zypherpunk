/**
 * Mock wallet data for hackathon demo
 */

export interface Transaction {
  id: string;
  type: "grant" | "transfer";
  amount: string;
  asset: "ZEC" | "NEAR";
  status: "shielded" | "pending";
  timestamp: number;
  source: string; // "Anonymous Source" for privacy emphasis
  description: string;
}

export interface WalletBalance {
  zec: number;
  near: number;
}

// Mock transaction history
export const mockTransactions: Transaction[] = [
  {
    id: "tx_001",
    type: "grant",
    amount: "2.5",
    asset: "ZEC",
    status: "shielded",
    timestamp: Date.now() - 86400000, // 1 day ago
    source: "Anonymous Source",
    description: "Medical Grant: Speech Therapy Aid",
  },
  {
    id: "tx_002",
    type: "grant",
    amount: "1.0",
    asset: "ZEC",
    status: "shielded",
    timestamp: Date.now() - 172800000, // 2 days ago
    source: "Anonymous Source",
    description: "Medical Grant: Early Intervention",
  },
  {
    id: "tx_003",
    type: "transfer",
    amount: "1.5",
    asset: "ZEC",
    status: "shielded",
    timestamp: Date.now() - 259200000, // 3 days ago
    source: "Anonymous Source",
    description: "Medical Grant: Developmental Support",
  },
];

// Mock balance
export const mockBalance: WalletBalance = {
  zec: 5.0,
  near: 15.2,
};

// Add a new transaction (for when grant is claimed)
export function addTransaction(tx: Omit<Transaction, "id" | "timestamp">): Transaction {
  const newTx: Transaction = {
    ...tx,
    id: `tx_${Date.now()}`,
    timestamp: Date.now(),
  };
  mockTransactions.unshift(newTx);
  return newTx;
}

// Update balance after grant claim
export function updateBalance(amount: number, asset: "ZEC" | "NEAR"): WalletBalance {
  if (asset === "ZEC") {
    mockBalance.zec += amount;
  } else {
    mockBalance.near += amount;
  }
  return { ...mockBalance };
}

