"use client";

import React from "react";
import { Shield, Clock } from "lucide-react";
import { mockTransactions, Transaction } from "@/lib/mock-wallet";
import { format } from "date-fns";

export const TransactionHistory: React.FC = () => {
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMM d, yyyy");
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "shielded") {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Shielded
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-brand-dark mb-4">Transaction History</h2>
      
      <div className="space-y-3">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-brand-dark">{tx.description}</span>
                <span className="text-lg font-bold text-brand-blue">
                  +{tx.amount} {tx.asset}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{tx.source}</span>
                <span>{formatDate(tx.timestamp)}</span>
              </div>
            </div>
            <div className="ml-4">
              {getStatusBadge(tx.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

