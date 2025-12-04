"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";

interface WalletContextType {
  selector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  accountId: string | null;
  signOut: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  selector: null,
  modal: null,
  accountId: null,
  signOut: async () => {},
});

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const initWallet = async () => {
      try {
        const walletSelector = await setupWalletSelector({
          network: "testnet",
          modules: [setupMyNearWallet()],
        });

        const walletModal = setupModal(walletSelector, {
          contractId: "test.testnet", // Update with your contract ID
        });

        setSelector(walletSelector);
        setModal(walletModal);

        // Get initial account state
        const accounts = walletSelector.store.getState().accounts;
        if (accounts.length > 0) {
          setAccountId(accounts[0].accountId);
        }

        // Listen for account changes
        walletSelector.store.observable.subscribe((state) => {
          const accounts = state.accounts;
          if (accounts.length > 0) {
            setAccountId(accounts[0].accountId);
          } else {
            setAccountId(null);
          }
        });
      } catch (error) {
        console.error("Failed to initialize wallet selector:", error);
      }
    };

    initWallet();
  }, []);

  const signOut = useCallback(async () => {
    if (!selector) return;

    const wallet = await selector.wallet();
    await wallet.signOut();
    setAccountId(null);
  }, [selector]);

  return (
    <WalletContext.Provider value={{ selector, modal, accountId, signOut }}>
      {children}
    </WalletContext.Provider>
  );
};

