import Avatar from "@/components/ui/Avatar";
import { useWalletContext } from "@/context/WalletContext";
import { getAddressForUser } from "@/utils";
import { usePrivy } from "@privy-io/expo";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { formatUnits } from "viem/utils";

export default function WalletHeader() {
  const { user } = usePrivy();
  const [address, setAddress] = useState<string | null>(null);
  const { getUSDCBalance, getMONBalance, isWalletCreated, isWalletLoading, walletCreationTime } = useWalletContext();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [monBalance, setMonBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (user) {
      try {
        const userAddress = getAddressForUser(user);
        setAddress(userAddress);
      } catch (error) {
        console.error("Error getting user address:", error);
        setAddress(null);
      }
    } else {
      setAddress(null);
    }
  }, [user]);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const [balance, monBalance] = await Promise.all([
          getUSDCBalance(),
          getMONBalance(),
        ]);
        setBalance(balance);
        setMonBalance(monBalance ? Number(formatUnits(monBalance, 18)) : 0);
      } catch (error) {
        console.error("Error getting balances:", error);
        setBalance(undefined);
        setMonBalance(undefined);
      }
    };
    getBalance();
  }, [getUSDCBalance, getMONBalance]);

  const formatWalletCreationTime = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleString();
  };

  return (
    <>
      <Avatar seed={address || "user"} size={96} style={{ marginBottom: 24 }} />
      
      {/* Wallet Creation Status */}
      {isWalletLoading && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Creating wallet...</Text>
        </View>
      )}
      
      {isWalletCreated && walletCreationTime && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>✅ Wallet Created</Text>
          <Text style={styles.creationTime}>
            Created: {formatWalletCreationTime(walletCreationTime)}
          </Text>
        </View>
      )}
      
      {!isWalletLoading && !isWalletCreated && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>⏳ Waiting for wallet creation...</Text>
        </View>
      )}
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>$</Text>
        <Text style={styles.balance}>
          {balance ? Number(formatUnits(balance, 6)).toFixed(2) : "0.00"}
        </Text>
      </View>
      <View style={{ height: 24, marginTop: 10 }}>
        <Text style={styles.gasBalance}>
          Gas: {monBalance ? monBalance.toFixed(2) : "0.00"} MON
        </Text>
      </View>
      
      {/* Wallet Address Display */}
      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Wallet Address:</Text>
          <Text style={styles.addressText} selectable>
            {address}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  gasBalance: {
    fontSize: 16,
    color: "#777",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  balance: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  creationTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Regular",
      android: "Inter_400Regular",
    }),
  },
  addressContainer: {
    alignItems: "center",
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginHorizontal: 20,
  },
  addressLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  addressText: {
    fontSize: 12,
    color: "#333",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Regular",
      android: "Inter_400Regular",
    }),
    textAlign: "center",
  },
});
