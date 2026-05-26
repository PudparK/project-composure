import { StyleSheet, Text, View } from "react-native";

type PlaceholderScreenProps = {
  title: string;
  detail: string;
};

export function PlaceholderScreen({ title, detail }: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f4ef",
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    padding: 24,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  title: {
    color: "#1f2926",
    fontSize: 28,
    fontWeight: "600",
  },
  detail: {
    marginTop: 8,
    color: "#59645f",
    fontSize: 16,
    lineHeight: 22,
  },
});
