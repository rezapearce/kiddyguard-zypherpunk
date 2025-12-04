"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BalanceCard } from "@/components/wallet/BalanceCard";
import { GrantClaimCard } from "@/components/wallet/GrantClaimCard";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";

interface ScanResult {
  status: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  confidence: number;
  signature: string;
  timestamp: number;
  claimed?: boolean;
}

export default function WalletPage() {
  const [hasPendingGrant, setHasPendingGrant] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [grantClaimed, setGrantClaimed] = useState(false);

  useEffect(() => {
    // Check localStorage for pending grant
    const lastScan = localStorage.getItem("kiddyguard_last_scan");
    if (lastScan) {
      try {
        const scanData: ScanResult = JSON.parse(lastScan);
        if (scanData.riskLevel === "HIGH" && !scanData.claimed) {
          setHasPendingGrant(true);
          setScanResult(scanData);
        }
      } catch (error) {
        console.error("Failed to parse scan data:", error);
      }
    }
  }, []);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleClaimComplete = () => {
    setHasPendingGrant(false);
    setGrantClaimed(true);
    setRefreshKey((prev) => prev + 1); // Force refresh of balance card
    // Refresh the page data
    const lastScan = localStorage.getItem("kiddyguard_last_scan");
    if (lastScan) {
      const scanData: ScanResult = JSON.parse(lastScan);
      setScanResult(scanData);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-dark">My Vault</h1>

      {/* Grant Claim Card - High Priority */}
      <AnimatePresence>
        {hasPendingGrant && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GrantClaimCard onClaimComplete={handleClaimComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {grantClaimed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <p className="text-green-700 font-medium">
              ✓ Grant successfully claimed! Check your balance below.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balance Card */}
      <BalanceCard key={refreshKey} />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
}
