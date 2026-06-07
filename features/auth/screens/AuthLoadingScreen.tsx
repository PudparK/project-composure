import { ActivityIndicator, StyleSheet, View } from "react-native";

export function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#2f6f5e" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f4ef",
  },
});
