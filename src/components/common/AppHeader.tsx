"use client";

import React from "react";
import { useWallet } from "./WalletProvider";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import Link from "next/link";

export const AppHeader: React.FC = () => {
  const { accountId, signOut } = useWallet();

  const truncateAddress = (address: string | null) => {
    if (!address) return "";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-brand-dark">
              KiddyGuard Zypherpunk
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/scanner"
                className="text-brand-dark hover:text-brand-blue transition-colors"
              >
                Scanner
              </Link>
              <Link
                href="/wallet"
                className="text-brand-dark hover:text-brand-blue transition-colors"
              >
                My Vault
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {accountId && (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <Wallet className="h-4 w-4 text-brand-blue" />
                  <span className="text-sm font-medium text-brand-dark">
                    {truncateAddress(accountId)}
                  </span>
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

