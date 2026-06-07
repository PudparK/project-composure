import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getLaterTodayReviewTime,
  getTomorrowMorningReviewTime,
} from "../../../lib/dates";
import { useAuth } from "../../auth/AuthProvider";
import { Space, listSpaces } from "../../spaces/services/spacesService";
import { createThought } from "../../thoughts/services/thoughtsService";

type ReviewOption = "none" | "later-today" | "tomorrow-morning";

const reviewOptions: { label: string; value: ReviewOption }[] = [
  { label: "No time", value: "none" },
  { label: "Later today", value: "later-today" },
  { label: "Tomorrow", value: "tomorrow-morning" },
];

export function CaptureScreen() {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [reviewOption, setReviewOption] = useState<ReviewOption>("none");
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const trimmedBody = body.trim();
  const canSave = Boolean(trimmedBody && selectedSpaceId && user && !isSaving);

  const selectedSpace = useMemo(
    () => spaces.find((space) => space.id === selectedSpaceId) ?? null,
    [selectedSpaceId, spaces],
  );

  const loadSpaces = useCallback(async () => {
    setIsLoadingSpaces(true);
    setErrorMessage(null);

    try {
      const nextSpaces = await listSpaces();
      setSpaces(nextSpaces);
      setSelectedSpaceId((currentSpaceId) => currentSpaceId ?? nextSpaces[0]?.id ?? null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not load spaces.",
      );
    } finally {
      setIsLoadingSpaces(false);
    }
  }, []);

  useEffect(() => {
    loadSpaces();
  }, [loadSpaces]);

  async function handleSave() {
    if (!canSave || !selectedSpaceId || !user) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setNotice(null);

    try {
      await createThought({
        body: trimmedBody,
        reviewAt: getReviewAt(reviewOption),
        spaceId: selectedSpaceId,
        userId: user.id,
      });

      setBody("");
      setReviewOption("none");
      setNotice(
        selectedSpace
          ? `Saved to ${selectedSpace.name}.`
          : "Thought saved.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not save thought.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>Capture</Text>
        <Text style={styles.detail}>Keep the thought. Come back later.</Text>

        <TextInput
          multiline
          onChangeText={(nextBody) => {
            setBody(nextBody);
            setNotice(null);
          }}
          placeholder="What needs somewhere to land?"
          placeholderTextColor="#7b847f"
          style={styles.bodyInput}
          textAlignVertical="top"
          value={body}
        />

        <View style={styles.section}>
          <Text style={styles.label}>Space</Text>
          {isLoadingSpaces ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#2f6f5e" />
              <Text style={styles.mutedText}>Loading spaces</Text>
            </View>
          ) : spaces.length > 0 ? (
            <View style={styles.optionRow}>
              {spaces.map((space) => (
                <Pressable
                  accessibilityRole="button"
                  key={space.id}
                  onPress={() => setSelectedSpaceId(space.id)}
                  style={[
                    styles.option,
                    selectedSpaceId === space.id ? styles.selectedOption : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedSpaceId === space.id ? styles.selectedOptionText : null,
                    ]}
                  >
                    {space.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.mutedText}>No spaces found.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Review</Text>
          <View style={styles.optionRow}>
            {reviewOptions.map((option) => (
              <Pressable
                accessibilityRole="button"
                key={option.value}
                onPress={() => setReviewOption(option.value)}
                style={[
                  styles.option,
                  reviewOption === option.value ? styles.selectedOption : null,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    reviewOption === option.value ? styles.selectedOptionText : null,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {notice ? <Text style={styles.notice}>{notice}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={!canSave}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            !canSave ? styles.disabledButton : null,
            pressed ? styles.pressedButton : null,
          ]}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Saving..." : "Save thought"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function getReviewAt(reviewOption: ReviewOption) {
  if (reviewOption === "later-today") {
    return getLaterTodayReviewTime();
  }

  if (reviewOption === "tomorrow-morning") {
    return getTomorrowMorningReviewTime();
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f4ef",
  },
  panel: {
    gap: 18,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
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
    marginTop: -10,
    color: "#59645f",
    fontSize: 16,
    lineHeight: 22,
  },
  bodyInput: {
    minHeight: 128,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c8bfb3",
    padding: 14,
    color: "#1f2926",
    backgroundColor: "#ffffff",
    fontSize: 17,
    lineHeight: 24,
  },
  section: {
    gap: 8,
  },
  label: {
    color: "#1f2926",
    fontSize: 14,
    fontWeight: "700",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    minHeight: 40,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c8bfb3",
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
  },
  selectedOption: {
    borderColor: "#2f6f5e",
    backgroundColor: "#e8f1ed",
  },
  optionText: {
    color: "#59645f",
    fontSize: 15,
    fontWeight: "600",
  },
  selectedOptionText: {
    color: "#1f2926",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 40,
  },
  mutedText: {
    color: "#59645f",
    fontSize: 15,
  },
  error: {
    color: "#9f352f",
    fontSize: 14,
    lineHeight: 20,
  },
  notice: {
    color: "#2f6f5e",
    fontSize: 14,
    lineHeight: 20,
  },
  saveButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2f6f5e",
  },
  disabledButton: {
    opacity: 0.42,
  },
  pressedButton: {
    opacity: 0.76,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
