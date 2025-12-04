"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, FileVideo } from "lucide-react";

const steps = [
  { id: 1, label: "Encrypting...", icon: Lock },
  { id: 2, label: "Uploading to Enclave...", icon: FileVideo },
  { id: 3, label: "Verifying Remote Attestation...", icon: ShieldCheck },
];

export const EncryptionAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000); // Change step every second

    return () => clearInterval(interval);
  }, []);

  const [glitchText, setGlitchText] = useState(steps[0]?.label || "");

  useEffect(() => {
    // Update glitch text when step changes
    const originalText = steps[currentStep]?.label || "";
    setGlitchText(originalText);
  }, [currentStep]);

  useEffect(() => {
    // Animate glitch effect for current step
    if (currentStep < steps.length) {
      const interval = setInterval(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const originalText = steps[currentStep]?.label || "";
        const glitched = originalText
          .split("")
          .map((char) => {
            if (char === " " || char === ".") return char;
            if (Math.random() > 0.85) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join("");
        setGlitchText(glitched);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ShieldCheck className="h-12 w-12 text-emerald-500" />
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold text-white">Secure Processing</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                x: 0,
              }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {isCurrent ? (
                    <motion.p
                      key="glitch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white font-medium text-lg font-mono"
                    >
                      {glitchText}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="normal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`font-medium text-lg ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </motion.p>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="h-1 bg-emerald-500 mt-2 rounded-full"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-center text-emerald-400 text-sm"
      >
        Your data is being processed inside a secure hardware enclave
      </motion.div>
    </div>
  );
};

