import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface HeroBannerProps {
  onChatPress?: () => void;
  onCallPress?: () => void;
}

// Individual Falling Blossom Component with Fade In/Out
const FallingBlossom = ({
  delay,
  duration,
  startX,
  size,
}: {
  delay: number;
  duration: number;
  startX: number;
  size: number;
}) => {
  const progress = useSharedValue(0);
  const sway = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear, delay }),
      -1,
      false,
    );
    sway.value = withRepeat(
      withTiming(1, {
        duration: duration / 2,
        easing: Easing.inOut(Easing.sin),
        delay,
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-40, 320]);
    const translateX = interpolate(sway.value, [0, 1], [startX, startX + 35]);
    const rotate = interpolate(progress.value, [0, 1], [0, 360]);

    // Smooth fade in at start (0 to 10%) and fade out near the end (85% to 100%)
    const opacity = interpolate(
      progress.value,
      [0, 0.1, 0.85, 1],
      [0, 0.22, 0.22, 0],
    );

    return {
      opacity,
      transform: [{ translateY }, { translateX }, { rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.fallingPetal,
        { width: size, height: size * 0.6 },
        animatedStyle,
      ]}
    />
  );
};

export default function HeroBanner({
  onChatPress,
  onCallPress,
}: HeroBannerProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isLargeScreen = width >= 768;

  // Default handlers if none are passed from props
  const handleChatPress =
    onChatPress ||
    (() => {
      router.push({
        pathname: "/astrologer-profile",
        params: { communication: "chat" },
      });
    });

  const handleCallPress =
    onCallPress ||
    (() => {
      router.push({
        pathname: "/astrologer-profile",
        params: { communication: "call" },
      });
    });

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      {/* Falling Flowers & Petals Animation Container */}
      <View style={styles.flowerContainer} pointerEvents="none">
        {/* Rendered Pastel Red Flower in Background */}
        <View style={styles.flower}>
          <View style={[styles.flowerPetal, styles.petalTop]} />
          <View style={[styles.flowerPetal, styles.petalBottom]} />
          <View style={[styles.flowerPetal, styles.petalLeft]} />
          <View style={[styles.flowerPetal, styles.petalRight]} />
          <View style={styles.flowerCenter} />
        </View>

        {/* Falling Animated Petals */}
        <FallingBlossom delay={0} duration={6000} startX={20} size={24} />
        <FallingBlossom delay={1500} duration={7500} startX={120} size={18} />
        <FallingBlossom delay={800} duration={5500} startX={220} size={28} />
        <FallingBlossom delay={2500} duration={6800} startX={310} size={20} />
        <FallingBlossom delay={1200} duration={8200} startX={80} size={22} />
      </View>

      {/* Main Content */}
      <View style={[styles.content, !isLargeScreen && styles.centerContent]}>
        {/* Trust / Highlight Badge */}
        <View style={styles.badge}>
          <ThemedText type="smallBold" style={styles.badgeText}>
            🌸 Live Guidance • 100% Verified
          </ThemedText>
        </View>

        <ThemedText
          type="title"
          style={[styles.heading, !isLargeScreen && styles.centerText]}
        >
          Are you worried about your{" "}
          <ThemedText type="title" style={styles.highlightText}>
            future?
          </ThemedText>
        </ThemedText>

        <ThemedText
          type="default"
          themeColor="textSecondary"
          style={[styles.subtitle, !isLargeScreen && styles.centerText]}
        >
          Where celestial guidance meets digital convenience. Explore your
          destiny, connect with authentic Astrologers Live.
        </ThemedText>

        <View
          style={[styles.buttonGroup, !isLargeScreen && styles.centerButtons]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.actionButton, styles.chatButton]}
            onPress={handleChatPress}
          >
            <View style={styles.buttonInner}>
              <ThemedText type="smallBold" style={styles.buttonText}>
                💬 Chat With Astrologer
              </ThemedText>
              <ThemedText type="small" style={styles.priceTag}>
                Starting at ₹10/min
              </ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.actionButton, styles.callButton]}
            onPress={handleCallPress}
          >
            <View style={styles.buttonInner}>
              <ThemedText type="smallBold" style={styles.callButtonText}>
                📞 Talk to Astrologer
              </ThemedText>
              <ThemedText type="small" style={styles.callPriceTag}>
                Starting at ₹15/min
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    borderRadius: Spacing.four,
    backgroundColor: "#FAF5F5",
    borderWidth: 1,
    borderColor: "#F3E8E8",
    overflow: "hidden",
    position: "relative",
  },
  flowerContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  flower: {
    position: "absolute",
    right: -20,
    top: "20%",
    width: 140,
    height: 140,
    opacity: 0.35,
    transform: [{ rotate: "15deg" }],
  },
  flowerPetal: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#F87171",
    borderRadius: 25,
  },
  petalTop: {
    top: 10,
    left: 45,
  },
  petalBottom: {
    bottom: 10,
    left: 45,
  },
  petalLeft: {
    top: 45,
    left: 10,
  },
  petalRight: {
    top: 45,
    right: 10,
  },
  flowerCenter: {
    position: "absolute",
    top: 52,
    left: 52,
    width: 36,
    height: 36,
    backgroundColor: "#FCA5A5",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FEF2F2",
  },
  fallingPetal: {
    position: "absolute",
    backgroundColor: "#F87171",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    gap: Spacing.three,
    zIndex: 1,
  },
  centerContent: {
    alignItems: "center",
  },
  badge: {
    backgroundColor: "rgba(248, 113, 113, 0.12)",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.five,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.25)",
    marginBottom: Spacing.one,
  },
  badgeText: {
    color: "#EF4444",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heading: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.7,
    lineHeight: 42,
    color: "#1C1917",
  },
  highlightText: {
    color: "#EF4444",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 500,
    color: "#57534E",
  },
  centerText: {
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  centerButtons: {
    justifyContent: "center",
  },
  actionButton: {
    borderRadius: Spacing.three,
    minWidth: 175,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonInner: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacing.three,
  },
  chatButton: {
    backgroundColor: "#EF4444",
  },
  callButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
  },
  buttonText: {
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  priceTag: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "500",
  },
  callButtonText: {
    color: "#EF4444",
    letterSpacing: 0.2,
  },
  callPriceTag: {
    color: "#78716C",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "500",
  },
});
