"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileVideo, Upload, ShieldCheck, AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import { analyzeHealthData, TEEResponse } from "@/lib/agent-client";
import { EncryptionAnimation } from "@/components/scanner/EncryptionAnimation";
import { Button } from "@/components/ui/button";

type ScannerState = "IDLE" | "PROCESSING" | "RESULT";

export default function ScannerPage() {
  const [state, setState] = useState<ScannerState>("IDLE");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TEEResponse | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }

    setFile(selectedFile);
    setState("PROCESSING");

    try {
      const analysisResult = await analyzeHealthData(selectedFile);
      setResult(analysisResult);
      setState("RESULT");

      // Save to localStorage for Wallet page
      localStorage.setItem("kiddyguard_last_scan", JSON.stringify({
        ...analysisResult,
        claimed: false,
      }));
    } catch (error) {
      console.error("Analysis failed:", error);
      setState("IDLE");
      alert("Analysis failed. Please try again.");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelect(selectedFile);
      }
    },
    [handleFileSelect]
  );

  const handleReset = useCallback(() => {
    setState("IDLE");
    setFile(null);
    setResult(null);
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen -m-8 p-8 space-y-6">
      {/* Header with Secure Mode Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-white">Private TEE Scanner</h1>
        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 rounded-lg flex items-center gap-2">
          <Lock className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400 font-medium text-sm">🔒 Secure Mode</span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-300 text-lg"
      >
        You are now entering the TEE. Your data is safe.
      </motion.p>

      {/* Main Content Area */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          {state === "IDLE" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex items-center justify-center"
            >
              <div
                className={`w-full max-w-2xl border-2 border-dashed rounded-lg p-12 transition-colors ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-600 bg-slate-800/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <FileVideo className="h-10 w-10 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Upload for Private TEE Analysis
                    </h2>
                    <p className="text-slate-400">
                      Drag and drop a video file, or click to browse
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        asChild
                        className="btn-blue cursor-pointer"
                        variant="default"
                      >
                        <span className="flex items-center gap-2">
                          <Upload className="h-5 w-5" />
                          Choose Video File
                        </span>
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-slate-500">
                    Your video will be encrypted and analyzed inside a secure hardware enclave
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {state === "PROCESSING" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex items-center justify-center"
            >
              <EncryptionAnimation />
            </motion.div>
          )}

          {state === "RESULT" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Medical Grade Certificate */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-4 border-slate-700">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    {result.riskLevel === "HIGH" ? (
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      Medical Grade Certificate
                    </h2>
                    <div className="flex justify-center gap-2">
                      {result.riskLevel === "HIGH" ? (
                        <span className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold text-lg">
                          RISK DETECTED
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-lg">
                          HEALTHY
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 space-y-3 text-left max-w-md mx-auto">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-slate-600 font-medium">Confidence:</span>
                      <span className="text-slate-900 font-bold">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-slate-600 font-medium">Risk Level:</span>
                      <span className="text-slate-900 font-bold">{result.riskLevel}</span>
                    </div>
                    <div className="pt-4">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1">TEE Signature Proof:</p>
                        <p className="text-xs font-mono text-slate-700 break-all">
                          Signed by Phala TEE: {result.signature}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                {result.riskLevel === "HIGH" && (
                  <Button
                    onClick={() => {
                      // Navigate to wallet page for grant claim
                      window.location.href = "/wallet";
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3"
                  >
                    Claim ZEC Grant
                  </Button>
                )}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  Scan Another File
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
