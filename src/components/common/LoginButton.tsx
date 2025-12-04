"use client";

import React from "react";
import { useWallet } from "./WalletProvider";
import { Button } from "@/components/ui/button";

export const LoginButton: React.FC = () => {
  const { modal, accountId } = useWallet();

  const handleLogin = () => {
    if (modal) {
      modal.show();
    }
  };

  if (accountId) {
    return null; // Don't show login button if already connected
  }

  return (
    <Button onClick={handleLogin} className="btn-blue">
      Connect Wallet
    </Button>
  );
};

