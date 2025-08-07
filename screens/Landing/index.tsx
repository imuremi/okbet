import { StyleSheet, View } from "react-native";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Landing() {
  return (
    <View style={styles.container}>
      <Header />
      <Content />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  }
});
