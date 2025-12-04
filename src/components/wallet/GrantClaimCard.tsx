"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBalance, addTransaction } from "@/lib/mock-wallet";

interface GrantClaimCardProps {
  onClaimComplete: () => void;
}

const intentSteps = [
  { id: 1, label: "Signing Intent...", icon: Loader2 },
  { id: 2, label: "Broadcasting to Solvers...", icon: Loader2 },
  { id: 3, label: "Solver Found! Swapping NEAR -> ZEC...", icon: ArrowRight },
  { id: 4, label: "Success! Assets Shielded.", icon: CheckCircle2 },
];

export const GrantClaimCard: React.FC<GrantClaimCardProps> = ({ onClaimComplete }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    setCurrentStep(0);

    // Simulate intent flow
    for (let i = 0; i < intentSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
    }

    // Update mock data
    updateBalance(2.5, "ZEC");
    addTransaction({
      type: "grant",
      amount: "2.5",
      asset: "ZEC",
      status: "shielded",
      source: "Anonymous Source",
      description: "Medical Grant: Speech Therapy Aid",
    });

    // Mark as claimed in localStorage
    const lastScan = localStorage.getItem("kiddyguard_last_scan");
    if (lastScan) {
      const scanData = JSON.parse(lastScan);
      localStorage.setItem("kiddyguard_last_scan", JSON.stringify({
        ...scanData,
        claimed: true,
      }));
    }

    setIsComplete(true);
    setIsClaiming(false);

    // Notify parent component
    setTimeout(() => {
      onClaimComplete();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-xl p-6 border-4 border-emerald-500"
    >
      {!isClaiming && !isComplete && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-dark">
                Medical Grant Approved
              </h3>
              <p className="text-sm text-gray-600">Speech Therapy Aid</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Grant Amount:</span>
              <span className="text-2xl font-bold text-emerald-600">2.5 ZEC</span>
            </div>
          </div>

          <Button
            onClick={handleClaim}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 text-lg"
          >
            Claim 2.5 ZEC via NEAR Intents
          </Button>
        </div>
      )}

      {isClaiming && (
        <div className="space-y-6">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-emerald-500 mx-auto flex items-center justify-center"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-brand-dark mt-4">
              Processing Intent...
            </h3>
          </div>

          <div className="space-y-3">
            {intentSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index < currentStep;
              const isCurrent = index === currentStep - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isActive || isCurrent ? 1 : 0.5,
                    x: 0,
                  }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-emerald-500/50 text-emerald-700"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCurrent && step.icon === Loader2 ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isActive ? "text-brand-dark" : isCurrent ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-500 mx-auto flex items-center justify-center"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-emerald-600">Grant Claimed!</h3>
          <p className="text-gray-600">
            2.5 ZEC has been added to your shielded balance
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

