import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useMediaQuery } from "react-responsive";

import { ExternalLink } from "./external-link";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: "100%" }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="onboarding" href="/onboarding" asChild>
            <View style={{ display: "none" }} />
          </TabTrigger>
          <TabTrigger
            name="astrologer-profile"
            href="/astrologer-profile"
            asChild
          >
            <View style={{ display: "none" }} />
          </TabTrigger>
          <TabTrigger name="home" href="/" asChild>
            <TabButton name="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="store" href="/store" asChild>
            <TabButton name="store">Store</TabButton>
          </TabTrigger>
          <TabTrigger name="horoscope" href="/horoscope" asChild>
            <TabButton name="horoscope">Horoscope</TabButton>
          </TabTrigger>
          <TabTrigger name="astrology" href="/astrology" asChild>
            <TabButton name="astrology">Astrology</TabButton>
          </TabTrigger>
          <TabTrigger name="blog" href="/blog" asChild>
            <TabButton name="blog">Blog</TabButton>
          </TabTrigger>
          <TabTrigger name="occult" href="/occult" asChild>
            <TabButton name="occult">Occult</TabButton>
          </TabTrigger>
          <TabTrigger name="free-reports" href="/free-reports" asChild>
            <TabButton name="free-reports">Free Reports</TabButton>
          </TabTrigger>
          <TabTrigger name="healing" href="/healing" asChild>
            <TabButton name="healing">Healing</TabButton>
          </TabTrigger>
          <TabTrigger name="panchang" href="/panchang" asChild>
            <TabButton name="panchang">Panchang</TabButton>
          </TabTrigger>
          <TabTrigger name="lal-kitab" href="/lal-kitab" asChild>
            <TabButton name="lal-kitab">Lal Kitab</TabButton>
          </TabTrigger>
          <TabTrigger name="kp" href="/kp" asChild>
            <TabButton name="kp">KP</TabButton>
          </TabTrigger>
          <TabTrigger name="compatibility" href="/compatibility" asChild>
            <TabButton name="compatibility">Compatibility</TabButton>
          </TabTrigger>
          <TabTrigger name="calculators" href="/calculators" asChild>
            <TabButton name="calculators">Calculators</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  name,
  onPress,
  ...props
}: TabTriggerSlotProps & { name?: string }) {
  const buttonRef = useRef<View>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEnabled = name === "home" || name === "explore";

  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        if (buttonRef.current && typeof window !== "undefined") {
          const node = buttonRef.current as unknown as HTMLElement;
          node.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const handlePress = (e: any) => {
    if (!isEnabled) {
      return; // Prevent navigation for disabled tabs
    }
    onPress?.(e);
  };

  return (
    <View ref={buttonRef} style={styles.tabWrapper}>
      <Pressable
        {...props}
        onPress={handlePress}
        // @ts-ignore - React Native Web supports web mouse events
        onMouseEnter={() => setIsHovered(true)}
        // @ts-ignore - React Native Web supports web mouse events
        onMouseLeave={() => setIsHovered(false)}
        style={({ pressed }) => [
          pressed && isEnabled && styles.pressed,
          !isEnabled && styles.disabledTab,
        ]}
      >
        <ThemedView
          type={isFocused ? "backgroundSelected" : "backgroundElement"}
          style={styles.tabButtonView}
        >
          <ThemedText
            type="small"
            themeColor={isFocused ? "text" : "textSecondary"}
          >
            {children}
          </ThemedText>
        </ThemedView>
      </Pressable>

      {/* Tooltip positioned above the tab on hover */}
      {isHovered && !isEnabled && (
        <View style={styles.tooltip}>
          <ThemedText style={styles.tooltipText}>
            This is not part of the Demo.
          </ThemedText>
        </View>
      )}
    </View>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  // Check if screen width is 768px or greater using react-responsive
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Hide the tab list bar completely on screens smaller than 768px,
  // but leave the TabSlot layout intact so pages render.
  if (!isDesktop) {
    return null;
  }

  return (
    <ThemedView {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollableTabs}
          style={styles.scrollViewStyle}
        >
          {props.children}
        </ScrollView>

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: "arrow.up.right.square", web: "link" }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    backgroundColor: "none",
    position: "absolute",
    width: "100%",
    padding: Spacing.three,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.five,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    // @ts-ignore - React Native Web overflow visible to prevent clipping tooltips
    overflow: "visible",
  },
  scrollViewStyle: {
    flexShrink: 1,
    // @ts-ignore - React Native Web overflow visible override
    overflow: "visible",
  },
  scrollableTabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    // @ts-ignore - React Native Web overflow visible override
    overflow: "visible",
  },
  tabWrapper: {
    position: "relative",
    // @ts-ignore - React Native Web overflow visible override
    overflow: "visible",
  },
  pressed: {
    opacity: 0.7,
  },
  disabledTab: {
    opacity: 0.4,
    // @ts-ignore - React Native Web supports web CSS properties
    cursor: "not-allowed",
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  tooltip: {
    position: "absolute",
    bottom: "100%",
    marginBottom: 8,
    alignSelf: "center",
    backgroundColor: "#1C1917",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 6,
    zIndex: 99999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // @ts-ignore - React Native Web supports CSS whiteSpace
    whiteSpace: "nowrap",
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 11,
  },
  externalPressable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.one,
    marginLeft: Spacing.one,
  },
});
