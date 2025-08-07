import { ERC20_ABI, USDC_ADDRESS } from "@/utils";
import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { createContext, useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, encodeFunctionData, publicActions, PublicClient, WalletClient } from "viem";
import { monadTestnet } from "viem/chains";

interface WalletContextType {
  address: string | null;
  isWalletCreated: boolean;
  isWalletLoading: boolean;
  walletCreationTime: Date | null;
  getUSDCBalance: () => Promise<bigint | undefined>;
  getMONBalance: () => Promise<bigint | undefined>;
  sendUSDC: (to: `0x${string}`, amount: bigint) => Promise<any>;
  signMessage: (message: string) => Promise<string | undefined>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { wallets } = useEmbeddedEthereumWallet();
  const wallet = wallets?.[0] || null;
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [walletCreationTime, setWalletCreationTime] = useState<Date | null>(null);

  useEffect(() => {
    async function init() {
      setIsWalletLoading(true);
      if (wallet && wallet.address) {
        try {
          console.log("🎉 Wallet detected and created:", wallet.address);
          console.log("📅 Wallet creation time:", new Date().toISOString());
          setIsWalletCreated(true);
          setWalletCreationTime(new Date());
          
          const provider = await wallet.getProvider();
          const publicClient = createPublicClient({
            chain: monadTestnet,
            transport: custom(provider),
          });
          const walletClient = createWalletClient({
            account: wallet.address as `0x${string}`,
            chain: monadTestnet,
            transport: custom(provider),
          }).extend(publicActions);
          setWalletClient(walletClient);
          setPublicClient(publicClient);
          console.log("✅ Wallet clients initialized successfully");
        } catch (error) {
          console.error("❌ Error initializing wallet clients:", error);
          setWalletClient(null);
          setPublicClient(null);
        }
      } else {
        console.log("⏳ No wallet detected yet - waiting for wallet creation...");
        setIsWalletCreated(false);
        setWalletCreationTime(null);
        setWalletClient(null);
        setPublicClient(null);
      }
      setIsWalletLoading(false);
    }
    init();
    return () => {
      setWalletClient(null);
      setPublicClient(null);
    };
  }, [wallet]);

  async function getMONBalance() {
    if (publicClient && wallet?.address) {
      try {
        const balance = await publicClient.getBalance({
          address: wallet.address as `0x${string}`,
        });
        return balance;
      } catch (error) {
        console.error("Error getting MON balance:", error);
        return undefined;
      }
    }
    return undefined;
  }

  async function getUSDCBalance() {
    if (publicClient && wallet?.address) {
      try {
        const balance = await publicClient.readContract({
          address: USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [wallet.address as `0x${string}`],
        });
        return balance as bigint;
      } catch (error) {
        console.error("Error getting USDC balance:", error);
        return undefined;
      }
    }
    return undefined;
  }

  async function sendUSDC(to: `0x${string}`, amount: bigint) {
    if (walletClient && wallet?.address) {
      try {
        console.log("Sending USDC:", { to, amount: amount.toString(), from: wallet.address });
        
        // Encode the function data
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [to, amount]
        });
        
        console.log("Encoded function data:", data);
        
        // Use the walletClient to send the transaction
        const hash = await walletClient.sendTransaction({
          account: wallet.address as `0x${string}`,
          to: USDC_ADDRESS,
          data,
          chain: monadTestnet,
        });
        
        console.log("USDC transaction sent:", hash);
        return hash;
      } catch (error) {
        console.error("Error sending USDC:", error);
        throw error;
      }
    }
    throw new Error("Wallet not available");
  }

  async function signMessage(message: string) {
    if (walletClient && wallet?.address) {
      try {
        const signature = await walletClient.signMessage({
          account: wallet.address as `0x${string}`,
          message,
        });
        return signature;
      } catch (error) {
        console.error("Error signing message:", error);
        return undefined;
      }
    }
    return undefined;
  }

  return (
    <WalletContext.Provider
      value={{
        address: wallet?.address ?? null,
        isWalletCreated,
        isWalletLoading,
        walletCreationTime,
        getUSDCBalance,
        sendUSDC,
        signMessage,
        getMONBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx)
    throw new Error("useWalletContext must be used within a WalletProvider");
  return ctx;
}
