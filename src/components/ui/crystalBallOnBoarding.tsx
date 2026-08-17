import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function OnboardingButton() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.initialWrapper}>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={styles.bannerText}
        >
          Ready to explore the mystical world of astrology? Ask your questions
          and let the magic unfold!
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.triggerBtn,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/onboarding")}
        >
          <ThemedText type="smallBold" style={styles.triggerText}>
            ✨ Begin Onboarding
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    padding: Spacing.two,
    overflow: "hidden",
    borderRadius: Spacing.four,
    position: "relative",
    backgroundColor: "transparent",
  },
  initialWrapper: {
    width: "100%",
    alignItems: "center",
    gap: Spacing.three,
    zIndex: 1,
  },
  bannerText: {
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: Spacing.two,
    backgroundColor: "transparent",
  },
  triggerBtn: {
    width: "100%",
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    backgroundColor: "#9333ea",
    alignItems: "center",
    justifyContent: "center",
  },
  triggerText: { color: "#ffffff" },
  pressed: { opacity: 0.8 },
});
