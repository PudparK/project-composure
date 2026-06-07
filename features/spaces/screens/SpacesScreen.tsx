import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "../../auth/AuthProvider";
import { Space, listSpaces } from "../services/spacesService";

export function SpacesScreen() {
  const { signOut, user } = useAuth();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSpaces = useCallback(async (showInitialLoading = false) => {
    if (showInitialLoading) {
      setIsLoading(true);
    }

    setErrorMessage(null);

    try {
      setSpaces(await listSpaces());
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not load spaces.",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadSpaces(true);
  }, [loadSpaces]);

  async function handleRefresh() {
    setIsRefreshing(true);
    await loadSpaces();
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Spaces</Text>
        <Text style={styles.detail}>The places your thoughts can wait.</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator color="#2f6f5e" />
          <Text style={styles.mutedText}>Loading spaces</Text>
        </View>
      ) : spaces.length > 0 ? (
        <View style={styles.list}>
          {spaces.map((space) => (
            <View key={space.id} style={styles.spaceItem}>
              <Text style={styles.spaceName}>{space.name}</Text>
              <Text style={styles.spaceKind}>{space.kind}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No spaces found</Text>
          <Text style={styles.emptyDetail}>
            New accounts should receive Personal, Work, and Family automatically.
          </Text>
        </View>
      )}

      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
          <Pressable accessibilityRole="button" onPress={() => loadSpaces(true)}>
            <Text style={styles.retry}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.accountBar}>
        <Text numberOfLines={1} style={styles.email}>
          {user?.email}
        </Text>
        <Pressable accessibilityRole="button" onPress={signOut}>
          <Text style={styles.signOut}>Sign out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 18,
    padding: 24,
    paddingBottom: 92,
    backgroundColor: "#f7f4ef",
  },
  header: {
    gap: 6,
  },
  title: {
    color: "#1f2926",
    fontSize: 28,
    fontWeight: "600",
  },
  detail: {
    color: "#59645f",
    fontSize: 16,
    lineHeight: 22,
  },
  loadingState: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 18,
  },
  mutedText: {
    color: "#59645f",
    fontSize: 15,
  },
  list: {
    gap: 12,
  },
  spaceItem: {
    gap: 4,
    padding: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  spaceName: {
    color: "#1f2926",
    fontSize: 18,
    fontWeight: "700",
  },
  spaceKind: {
    color: "#59645f",
    fontSize: 14,
    textTransform: "capitalize",
  },
  emptyState: {
    gap: 6,
    padding: 18,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  emptyTitle: {
    color: "#1f2926",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyDetail: {
    color: "#59645f",
    fontSize: 15,
    lineHeight: 21,
  },
  errorBox: {
    gap: 8,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff2ef",
  },
  error: {
    color: "#9f352f",
    fontSize: 14,
    lineHeight: 20,
  },
  retry: {
    color: "#2f6f5e",
    fontSize: 14,
    fontWeight: "700",
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
