import { useWalletContext } from "@/context/WalletContext";
import { usePrivy } from "@privy-io/expo";
import { useEffect, useState } from "react";

export function useWalletStatus() {
  const { user } = usePrivy();
  const { isWalletCreated, isWalletLoading, walletCreationTime, address } = useWalletContext();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      try {
        // Try to get address from user object
        const { linked_accounts } = user as any;
        if (linked_accounts && Array.isArray(linked_accounts)) {
          const accounts = linked_accounts.filter(
            (account: any) => account.type === "wallet"
          );
          if (accounts.length > 0) {
            setWalletAddress(accounts[0].address || null);
          }
        }
      } catch (error) {
        console.error("Error getting wallet address:", error);
        setWalletAddress(null);
      }
    } else {
      setWalletAddress(null);
    }
  }, [user]);

  return {
    // Wallet creation status
    isWalletCreated,
    isWalletLoading,
    walletCreationTime,
    
    // Wallet information
    walletAddress: walletAddress || address,
    hasWallet: isWalletCreated && (walletAddress || address),
    
    // Helper functions
    getWalletCreationTime: () => {
      if (!walletCreationTime) return null;
      return walletCreationTime.toLocaleString();
    },
    
    getWalletAge: () => {
      if (!walletCreationTime) return null;
      const now = new Date();
      const diff = now.getTime() - walletCreationTime.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
      return 'Just created';
    }
  };
} 