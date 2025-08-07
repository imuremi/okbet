import { useWalletStatus } from "@/hooks/useWalletStatus";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

interface WalletStatusIndicatorProps {
  showAddress?: boolean;
  showCreationTime?: boolean;
  showAge?: boolean;
}

export default function WalletStatusIndicator({ 
  showAddress = true, 
  showCreationTime = true, 
  showAge = true 
}: WalletStatusIndicatorProps) {
  const { 
    isWalletCreated, 
    isWalletLoading, 
    walletAddress, 
    getWalletCreationTime, 
    getWalletAge 
  } = useWalletStatus();

  if (isWalletLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>⏳ Creating wallet...</Text>
      </View>
    );
  }

  if (!isWalletCreated) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>⏳ Waiting for wallet creation...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>✅ Wallet Created</Text>
      </View>
      
      {showCreationTime && getWalletCreationTime() && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Created:</Text>
          <Text style={styles.infoValue}>{getWalletCreationTime()}</Text>
        </View>
      )}
      
      {showAge && getWalletAge() && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoValue}>{getWalletAge()}</Text>
        </View>
      )}
      
      {showAddress && walletAddress && (
        <View style={styles.addressContainer}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.addressText} selectable>
            {walletAddress}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  statusRow: {
    alignItems: "center",
    marginBottom: 8,
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Regular",
      android: "Inter_400Regular",
    }),
  },
  addressContainer: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 12,
    color: "#333",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Regular",
      android: "Inter_400Regular",
    }),
    marginTop: 4,
  },
}); 