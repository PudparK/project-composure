import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatReviewTime } from "../../../lib/dates";
import { ThoughtListItem } from "../types";

type ThoughtListProps = {
  emptyDetail: string;
  emptyTitle: string;
  isProcessingId: string | null;
  onMarkProcessed: (thoughtId: string) => void;
  thoughts: ThoughtListItem[];
};

export function ThoughtList({
  emptyDetail,
  emptyTitle,
  isProcessingId,
  onMarkProcessed,
  thoughts,
}: ThoughtListProps) {
  if (thoughts.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptyDetail}>{emptyDetail}</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {thoughts.map((thought) => (
        <View key={thought.id} style={styles.item}>
          <Text style={styles.body}>{thought.body}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.space}>{thought.spaces?.name ?? "Space"}</Text>
            <Text style={styles.review}>{formatReviewTime(thought.review_at)}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            disabled={isProcessingId === thought.id}
            onPress={() => onMarkProcessed(thought.id)}
            style={({ pressed }) => [
              styles.processButton,
              pressed || isProcessingId === thought.id ? styles.pressedButton : null,
            ]}
          >
            <Text style={styles.processButtonText}>
              {isProcessingId === thought.id ? "Processing..." : "Mark processed"}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  item: {
    gap: 10,
    padding: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  body: {
    color: "#1f2926",
    fontSize: 17,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  space: {
    color: "#2f6f5e",
    fontSize: 14,
    fontWeight: "700",
  },
  review: {
    color: "#59645f",
    fontSize: 14,
  },
  processButton: {
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#2f6f5e",
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
  },
  pressedButton: {
    opacity: 0.7,
  },
  processButtonText: {
    color: "#2f6f5e",
    fontSize: 14,
    fontWeight: "700",
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
});
