import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getThisWeekendReviewTime,
  getTonightReviewTime,
  getTomorrowMorningReviewTime,
} from "../../../lib/dates";
import { useAuth } from "../../auth/AuthProvider";
import { Space, listSpaces } from "../../spaces/services/spacesService";
import { createThought } from "../../thoughts/services/thoughtsService";

type ReviewOption = "later" | "tonight" | "tomorrow" | "weekend";

const reviewOptions: { label: string; value: ReviewOption }[] = [
  { label: "Tonight", value: "tonight" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Weekend", value: "weekend" },
  { label: "Later (Default)", value: "later" },
];

export function CaptureScreen() {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [reviewOption, setReviewOption] = useState<ReviewOption>("later");
  const [isReviewSheetVisible, setIsReviewSheetVisible] = useState(false);
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

  const reviewLabel = useMemo(
    () => reviewOptions.find((option) => option.value === reviewOption)?.label ?? "Later",
    [reviewOption],
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
        error instanceof Error
          ? error.message
          : "Something went wrong. Let's try again.",
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
      setReviewOption("later");
      setNotice(selectedSpace ? `Saved to ${selectedSpace.name}.` : "Saved.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Let's try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleSelectReview(nextReviewOption: ReviewOption) {
    setReviewOption(nextReviewOption);
    setIsReviewSheetVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.captureArea}>
        <TextInput
          allowFontScaling
          multiline
          onChangeText={(nextBody) => {
            setBody(nextBody);
            setNotice(null);
          }}
          placeholder="What's on your mind?"
          placeholderTextColor="#5f6879"
          selectionColor="#dae2fd"
          style={styles.bodyInput}
          textAlignVertical="top"
          value={body}
        />

        <View style={styles.inputRule} />

        <View style={styles.spaceSection}>
          <Text allowFontScaling style={styles.sectionLabel}>
            SPACE
          </Text>
          {isLoadingSpaces ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#b8c8da" />
              <Text allowFontScaling style={styles.mutedText}>
                Loading spaces
              </Text>
            </View>
          ) : spaces.length > 0 ? (
            <View style={styles.spaceRow}>
              {spaces.map((space) => {
                const isSelected = selectedSpaceId === space.id;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    key={space.id}
                    onPress={() => setSelectedSpaceId(space.id)}
                    style={({ pressed }) => [
                      styles.spacePill,
                      isSelected ? styles.selectedSpacePill : null,
                      pressed ? styles.pressedQuiet : null,
                    ]}
                  >
                    <Text
                      allowFontScaling
                      style={[
                        styles.spacePillText,
                        isSelected ? styles.selectedSpacePillText : null,
                      ]}
                    >
                      {space.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <Text allowFontScaling style={styles.mutedText}>
              No spaces found.
            </Text>
          )}
        </View>

        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsReviewSheetVisible(true)}
            style={({ pressed }) => [
              styles.reviewControl,
              pressed ? styles.pressedQuiet : null,
            ]}
          >
            <View style={styles.reviewIcon}>
              <View style={styles.clockFace}>
                <View style={styles.clockHourHand} />
                <View style={styles.clockMinuteHand} />
              </View>
            </View>
            <View>
              <Text allowFontScaling style={styles.reviewLabel}>
                Review
              </Text>
              <Text allowFontScaling style={styles.reviewValue}>
                {reviewLabel.replace(" (Default)", "")}
              </Text>
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={!canSave}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              !canSave ? styles.disabledButton : null,
              pressed ? styles.pressedPrimary : null,
            ]}
          >
            <Text allowFontScaling style={styles.saveButtonText}>
              {isSaving ? "Saving" : "Save  ->"}
            </Text>
          </Pressable>
        </View>

        {errorMessage ? (
          <Text allowFontScaling style={styles.error}>
            {errorMessage}
          </Text>
        ) : null}
        {notice ? (
          <Text allowFontScaling style={styles.notice}>
            {notice}
          </Text>
        ) : null}
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setIsReviewSheetVisible(false)}
        transparent
        visible={isReviewSheetVisible}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsReviewSheetVisible(false)}
          style={styles.sheetBackdrop}
        />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text allowFontScaling style={styles.sheetTitle}>
              Review time
            </Text>
            <Pressable
              accessibilityLabel="Close review time"
              accessibilityRole="button"
              onPress={() => setIsReviewSheetVisible(false)}
              style={styles.closeButton}
            >
              <Text allowFontScaling={false} style={styles.closeButtonText}>
                x
              </Text>
            </Pressable>
          </View>

          <View style={styles.reviewOptionList}>
            {reviewOptions.map((option) => {
              const isSelected = reviewOption === option.value;

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  key={option.value}
                  onPress={() => handleSelectReview(option.value)}
                  style={({ pressed }) => [
                    styles.reviewOption,
                    isSelected ? styles.selectedReviewOption : null,
                    pressed ? styles.pressedQuiet : null,
                  ]}
                >
                  <Text
                    allowFontScaling
                    style={[
                      styles.reviewOptionText,
                      isSelected ? styles.selectedReviewOptionText : null,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getReviewAt(reviewOption: ReviewOption) {
  if (reviewOption === "tonight") {
    return getTonightReviewTime();
  }

  if (reviewOption === "tomorrow") {
    return getTomorrowMorningReviewTime();
  }

  if (reviewOption === "weekend") {
    return getThisWeekendReviewTime();
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1326",
  },
  captureArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 96,
    backgroundColor: "#0b1326",
  },
  bodyInput: {
    minHeight: 132,
    paddingVertical: 0,
    color: "#dae2fd",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
  },
  inputRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#dae2fd",
  },
  spaceSection: {
    gap: 12,
    marginTop: 40,
  },
  sectionLabel: {
    color: "#8e9196",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 50,
  },
  mutedText: {
    color: "#c4c7cc",
    fontSize: 15,
    lineHeight: 22,
  },
  spaceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  spacePill: {
    minHeight: 50,
    justifyContent: "center",
    borderRadius: 9999,
    paddingHorizontal: 30,
    backgroundColor: "#131b2e",
  },
  selectedSpacePill: {
    backgroundColor: "#222a3d",
  },
  spacePillText: {
    color: "#dae2fd",
    fontSize: 20,
    lineHeight: 28,
  },
  selectedSpacePillText: {
    color: "#dae2fd",
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 70,
  },
  reviewControl: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  reviewIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#131b2e",
  },
  clockFace: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#dae2fd",
  },
  clockHourHand: {
    position: "absolute",
    top: 4,
    left: 8,
    width: 2,
    height: 7,
    borderRadius: 9999,
    backgroundColor: "#dae2fd",
  },
  clockMinuteHand: {
    position: "absolute",
    top: 9,
    left: 9,
    width: 6,
    height: 2,
    borderRadius: 9999,
    backgroundColor: "#dae2fd",
  },
  reviewLabel: {
    color: "#8e9196",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  reviewValue: {
    color: "#dae2fd",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
  },
  saveButton: {
    minWidth: 162,
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#b8c8da",
  },
  disabledButton: {
    opacity: 0.42,
  },
  saveButtonText: {
    color: "#223240",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
  },
  pressedQuiet: {
    opacity: 0.76,
  },
  pressedPrimary: {
    backgroundColor: "#d4e4f6",
  },
  error: {
    marginTop: 24,
    color: "#ffb4ab",
    fontSize: 13,
    lineHeight: 18,
  },
  notice: {
    marginTop: 24,
    color: "#b8c8da",
    fontSize: 13,
    lineHeight: 18,
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(6, 14, 32, 0.34)",
  },
  sheet: {
    gap: 28,
    paddingTop: 28,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#222a3d",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitle: {
    color: "#dae2fd",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  closeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#dae2fd",
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  reviewOptionList: {
    gap: 22,
  },
  reviewOption: {
    minHeight: 56,
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  selectedReviewOption: {
    backgroundColor: "#8292a3",
  },
  reviewOptionText: {
    color: "#dae2fd",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
  },
  selectedReviewOptionText: {
    color: "#1c2b39",
  },
});
