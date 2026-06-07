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

import { ThoughtList } from "../../thoughts/components/ThoughtList";
import {
  listInboxThoughts,
  markThoughtProcessed,
} from "../../thoughts/services/thoughtsService";
import { ThoughtListItem } from "../../thoughts/types";

export function InboxScreen() {
  const [thoughts, setThoughts] = useState<ThoughtListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isProcessingId, setIsProcessingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadThoughts = useCallback(async (showInitialLoading = false) => {
    if (showInitialLoading) {
      setIsLoading(true);
    }

    setErrorMessage(null);

    try {
      setThoughts(await listInboxThoughts());
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not load inbox.",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadThoughts(true);
  }, [loadThoughts]);

  async function handleRefresh() {
    setIsRefreshing(true);
    await loadThoughts();
  }

  async function handleMarkProcessed(thoughtId: string) {
    setIsProcessingId(thoughtId);
    setErrorMessage(null);

    try {
      await markThoughtProcessed(thoughtId);
      setThoughts((currentThoughts) =>
        currentThoughts.filter((thought) => thought.id !== thoughtId),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not process thought.",
      );
    } finally {
      setIsProcessingId(null);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <Text style={styles.detail}>Unprocessed thoughts, newest first.</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator color="#2f6f5e" />
          <Text style={styles.mutedText}>Loading inbox</Text>
        </View>
      ) : (
        <ThoughtList
          emptyDetail="Captured thoughts will wait here until you process them."
          emptyTitle="Nothing waiting"
          isProcessingId={isProcessingId}
          onMarkProcessed={handleMarkProcessed}
          thoughts={thoughts}
        />
      )}

      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
          <Pressable accessibilityRole="button" onPress={() => loadThoughts(true)}>
            <Text style={styles.retry}>Retry</Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 18,
    padding: 24,
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
});
