import { ThemedText } from "@/components/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { useLoginWithEmail } from "@privy-io/expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

function OTPInput({ onTextChange }: { onTextChange: (code: string) => void }) {
  return (
    <OtpInput
      numberOfDigits={6}
      autoFocus={true}
      type="numeric"
      onTextChange={onTextChange}
      theme={{
        containerStyle: styles.otpContainer,
        pinCodeContainerStyle: styles.pinCodeContainer,
        focusStickStyle: styles.focusStick,
        focusedPinCodeContainerStyle: styles.activePinCodeContainer,
      }}
    />
  );
}

export default function OTP() {
  const { email, code, setCode } = useAuth();
  const { loginWithCode } = useLoginWithEmail();
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin() {
    if (!code || code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email not found. Please go back and enter your email again.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("OTP screen: Attempting to login with code:", code, "email:", email);
      await loginWithCode({ code, email });
      console.log("OTP screen: Login successful, navigating to app");
      router.push("/demo/app");
    } catch (error) {
      console.error("OTP screen: Error logging in:", error);
      Alert.alert(
        "Error", 
        `Failed to login: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your code and try again.`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 8, alignItems: "center" }}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>
          Enter the code
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }} type="subtitle">
          A code was sent to {email || "your email"}
        </ThemedText>
      </View>

      {/* OTP Input for the code in email */}
      <OTPInput onTextChange={setCode} />

      <ThemedButton
        title={isLoading ? "Logging in..." : "Login"}
        onPress={onLogin}
        disabled={code.length !== 6 || isLoading}
      />

      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  otpContainer: {
    marginVertical: 20,
  },
  pinCodeContainer: {
    backgroundColor: "#f0f0f0",
  },
  focusStick: {
    backgroundColor: "#7C3AED",
  },
  activePinCodeContainer: {
    borderColor: "#7C3AED",
  },
});
