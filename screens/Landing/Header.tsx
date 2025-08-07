import { Image, StyleSheet, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerImageContainer}>
      <Image
        source={require("@/assets/images/monad-logo-inverted.png")}
        style={styles.headerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    display: "flex",
    width: "100%",
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  headerImage: {
    width: 200,
    height: 200,
    marginTop: 50,
    resizeMode: "contain",
  },
});
