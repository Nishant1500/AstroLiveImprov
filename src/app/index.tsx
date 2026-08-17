import AnimatedPageContainer from "@/components/animated-page-container";
import { ThemedView } from "@/components/themed-view";
import OnboardingButton from "@/components/ui/crystalBallOnBoarding";
import MagicBall from "@/components/ui/magic-ball";
import HeroBanner from "@/components/ui/mainBanner";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMediaQuery } from "react-responsive";

export default function HomeScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();
  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 767 });

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: isPhone ? Spacing.three : Spacing.six,
      paddingBottom: isPhone ? Spacing.one : Spacing.four,
    },
  });

  return (
    <AnimatedPageContainer style={{ flex: 1 }} animationType="fadeInDown">
      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentInset={insets}
        contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
      >
        <ThemedView
          style={{
            ...styles.container,
            flexGrow: 1,
            width: "100%",
            flexDirection: isPhone ? "column-reverse" : "row",
            // Changed to space-between / space-around to evenly distribute vertical space
            justifyContent: isPhone ? "space-evenly" : "space-between",
            // Centered items vertically on desktop/tablet so HeroBanner is aligned with the MagicBall
            alignItems: "center",
          }}
        >
          <HeroBanner />

          <ThemedView
            style={{
              ...styles.container,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative",
              backgroundColor: "transparent",
            }}
          >
            <MagicBall />
            <OnboardingButton onStart={() => router.push("/onboarding")} />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </AnimatedPageContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Spacing.two,
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    width: "100%",
  },
  centerText: {
    textAlign: "center",
    flexShrink: 1,
  },
  mobileText: {
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  desktopOverlayText: {
    position: "absolute",
    top: "75%",
    fontWeight: "600",
    maxWidth: 340,
    paddingHorizontal: Spacing.three,
    textAlign: "center",
    zIndex: 10,
    pointerEvents: "none",
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: "center",
    gap: Spacing.one,
    alignItems: "center",
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: "center",
  },
  imageTutorial: {
    width: "100%",
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
