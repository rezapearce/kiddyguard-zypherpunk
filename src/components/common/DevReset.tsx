"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DevReset = () => {
  const handleReset = () => {
    // Clear all app state
    localStorage.removeItem("kiddyguard_last_scan");
    localStorage.removeItem("kiddyguard_grants_claimed");
    localStorage.removeItem("kiddyguard_wallet_balance");
    localStorage.removeItem("kiddyguard_transactions");

    // Reload to fresh state
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
      <Button variant="destructive" size="sm" onClick={handleReset}>
        <Trash2 className="w-4 h-4 mr-2" /> Reset Demo
      </Button>
    </div>
  );
};

