import { ThemedText } from "@/components/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { useLoginWithEmail } from "@privy-io/expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

export default function Email() {
  const { email, setEmail } = useAuth();
  const { sendCode } = useLoginWithEmail();
  const [isLoading, setIsLoading] = useState(false);

  // Basic email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function onSendCode() {
    console.log("Email screen: onSendCode called with email:", email);
    
    if (!email) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Email screen: Calling sendCode with email:", email);
      await sendCode({ email });
      console.log("Email screen: sendCode successful, navigating to code screen");
      router.push("/demo/sign-in/code");
    } catch (error) {
      console.error("Email screen: Error sending code:", error);
      Alert.alert(
        "Error", 
        `Failed to send code: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your email address and try again.`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>Enter your email</ThemedText>
        <ThemedText type="subtitle">We will use this to create a wallet</ThemedText>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!isLoading}
      />
      <ThemedButton
        title={isLoading ? "Sending..." : "Send Code"}
        onPress={onSendCode}
        disabled={!email || isLoading || !isValidEmail(email)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Semibold',
    height: 50,
    marginTop: 20,
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    paddingBottom: 0,
    paddingTop: 0
  },
}); 