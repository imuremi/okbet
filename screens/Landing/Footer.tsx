import ThemedButton from "@/components/ui/ThemedButton";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Footer() {

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 20,
          backgroundColor: "transparent",
          alignItems: "center",
        },
      ]}
    >
      <ThemedButton
        title="Check out the demo"
        style={{ width: "100%" }}
        onPress={() => router.push("/demo/app")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 16,
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
});
