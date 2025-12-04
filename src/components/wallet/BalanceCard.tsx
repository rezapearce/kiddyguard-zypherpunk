"use client";

import React from "react";
import { Wallet } from "lucide-react";
import { mockBalance } from "@/lib/mock-wallet";

export const BalanceCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-brand-blue/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-brand-dark">Total Aid Received</h2>
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <Wallet className="h-6 w-6 text-yellow-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-brand-dark">
              {mockBalance.zec.toFixed(2)}
            </span>
            <span className="text-xl font-semibold text-yellow-600">ZEC</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Zcash (Shielded)</p>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">NEAR Balance</span>
            <span className="text-lg font-semibold text-brand-dark">
              {mockBalance.near.toFixed(1)} NEAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

