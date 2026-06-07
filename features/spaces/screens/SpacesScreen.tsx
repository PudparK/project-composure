import { Pressable, StyleSheet, Text, View } from "react-native";

import { PlaceholderScreen } from "../../../components/PlaceholderScreen";
import { useAuth } from "../../auth/AuthProvider";

export function SpacesScreen() {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <PlaceholderScreen
        title="Spaces"
        detail="Initial route for personal, work, and family spaces."
      />
      <View style={styles.accountBar}>
        <Text numberOfLines={1} style={styles.email}>
          {user?.email}
        </Text>
        <Pressable accessibilityRole="button" onPress={signOut}>
          <Text style={styles.signOut}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountBar: {
    position: "absolute",
    right: 16,
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  email: {
    flex: 1,
    color: "#59645f",
    fontSize: 14,
  },
  signOut: {
    color: "#2f6f5e",
    fontSize: 14,
    fontWeight: "700",
  },
});
