import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StyleSheet } from "react-native";
import EnvironmentVariables from "./EnvironmentVariables";
import ResetProject from "./ResetProject";
import UIComponents from "./UIComponents";
import WalletCreation from "./WalletCreation";

export default function Content() {
    return (
        <ScrollView
          contentContainerStyle={[
            styles.contentContainer,
            {
              alignItems: "flex-start",
              padding: 20,
              gap: 10,
              paddingBottom: 120,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Monad React Native Wallet Demo</ThemedText>
          </ThemedView>
          <EnvironmentVariables />
          <WalletCreation />
          <UIComponents />
          <ResetProject />
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    contentContainer: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      gap: 10,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    
  });