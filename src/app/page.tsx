"use client";

import { LoginButton } from "@/components/common/LoginButton";
import { Shield, Lock, Eye, Scan, Wallet } from "lucide-react";
import { useWallet } from "@/components/common/WalletProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { accountId } = useWallet();
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to scanner if wallet is connected
    if (accountId) {
      router.push("/scanner");
    }
  }, [accountId, router]);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-brand-dark">
              KiddyGuard Zypherpunk
            </h1>
            <p className="text-2xl text-gray-700">
              Privacy-first pediatric AI agent
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your child's health data stays private. Powered by Trusted Execution Environments (TEE) and zero-knowledge cryptography.
            </p>
          </div>

          <div className="py-8">
            {accountId ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-700 font-medium">
                  Welcome! Wallet connected: {accountId.slice(0, 8)}...{accountId.slice(-4)}
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/scanner">
                    <Button className="btn-blue flex items-center gap-2">
                      <Scan className="h-5 w-5" />
                      Go to Scanner
                    </Button>
                  </Link>
                  <Link href="/wallet">
                    <Button variant="outline" className="btn-outline-blue flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      My Vault
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <LoginButton />
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold text-brand-dark">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Your data never leaves the secure enclave. Zero-knowledge proofs ensure privacy.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold text-brand-dark">TEE Protected</h3>
              <p className="text-sm text-gray-600">
                Trusted Execution Environment ensures your child's health data is encrypted and secure.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Eye className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold text-brand-dark">Transparent</h3>
              <p className="text-sm text-gray-600">
                Open-source and auditable. You control your data with wallet-based authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
