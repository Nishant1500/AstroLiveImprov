import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { ThemedText } from "./themed-text";

interface HeaderProps {
  logoSource?: any;
  appName?: string;
  onLoginPress?: () => void;
  onMenuPress?: () => void; // Triggered when hamburger is tapped on mobile
}

export default function Header({
  logoSource,
  appName = "ASTROLIVE",
  onLoginPress,
  onMenuPress,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // Desktop breakpoint

  return (
    <ThemedView type="backgroundElement" style={styles.outerContainer}>
      <ThemedView
        style={[
          styles.headerContainer,
          isLargeScreen && styles.desktopHeaderContainer,
        ]}
      >
        <ThemedView style={styles.leftSection}>
          {!isLargeScreen && (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={onMenuPress}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.menuIcon}>☰</ThemedText>
            </TouchableOpacity>
          )}

          <Pressable
            onPress={() => {
              router.push("/");
            }}
            style={{ flexDirection: "row", alignItems: "center", gap: Spacing.two }}
          >
            {logoSource && (
              <Image
                source={logoSource}
                style={[
                  styles.logoImage,
                  isLargeScreen && styles.desktopLogoImage,
                ]}
                resizeMode="contain"
              />
            )}

            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.brandName,
                isLargeScreen && styles.desktopBrandName,
              ]}
            >
              {appName}
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isLargeScreen && styles.desktopLoginButton,
          ]}
          activeOpacity={0.8}
          onPress={onLoginPress}
        >
          <ThemedText type="smallBold" style={styles.loginButtonText}>
            Login
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  headerContainer: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: "transparent",
  },
  desktopHeaderContainer: {
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.four,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    backgroundColor: "transparent",
  },
  menuButton: {
    paddingRight: Spacing.one,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 22,
    fontWeight: "bold",
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: Spacing.one,
  },
  desktopLogoImage: {
    width: 44,
    height: 44,
    borderRadius: Spacing.two,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  desktopBrandName: {
    fontSize: 22,
  },
  loginButton: {
    backgroundColor: "#9b46e5",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    shadowColor: "#9b46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  desktopLoginButton: {
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  loginButtonText: {
    color: "#ffffff",
  },
});
