import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import MobileDrawer from "@/components/hamburgeMobileMenu"; // Import drawer
import Header from "@/components/header";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : DefaultTheme;

  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      const bgColor = isDark ? "#000000" : "#ffffff";
      document.body.style.backgroundColor = bgColor;
      document.documentElement.style.backgroundColor = bgColor;
    }
  }, [isDark]);

  return (
    <ThemeProvider value={theme}>
      <AnimatedSplashOverlay />
      <Header
        logoSource="https://media.chingari.io/apipublic/chingari-web-assets/images/astro/astro-icon.png"
        onMenuPress={() => setDrawerVisible(true)}
      />
      <AppTabs />
      <MobileDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </ThemeProvider>
  );
}
