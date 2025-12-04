"use client";

import React from "react";
import { useWallet } from "@/components/common/WalletProvider";
import { AppHeader } from "@/components/common/AppHeader";
import { LoginButton } from "@/components/common/LoginButton";
import { Scan, Wallet as WalletIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accountId } = useWallet();
  const pathname = usePathname();

  // Guard clause: redirect if no wallet connected
  if (!accountId) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-3xl font-bold text-brand-dark">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600">
            Please connect your wallet to access the dashboard.
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <AppHeader />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-2">
            <Link
              href="/scanner"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/scanner"
                  ? "bg-brand-blue text-white"
                  : "text-brand-dark hover:bg-gray-100"
              }`}
            >
              <Scan className="h-5 w-5" />
              <span className="font-medium">Scanner</span>
            </Link>
            <Link
              href="/wallet"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/wallet"
                  ? "bg-brand-blue text-white"
                  : "text-brand-dark hover:bg-gray-100"
              }`}
            >
              <WalletIcon className="h-5 w-5" />
              <span className="font-medium">My Vault</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

