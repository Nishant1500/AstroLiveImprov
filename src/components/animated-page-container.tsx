import React from "react";
import { ViewStyle } from "react-native";
import Animated, {
    FadeInDown,
    FadeOutUp
} from "react-native-reanimated";

interface AnimatedPageContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: "fadeInDown" | "fadeIn" | "slideUp";
  delay?: number;
}

export default function AnimatedPageContainer({
  children,
  style,
  animationType = "fadeInDown",
  delay = 0,
}: AnimatedPageContainerProps) {
  const getAnimationConfig = () => {
    switch (animationType) {
      case "fadeInDown":
        return FadeInDown.delay(delay).duration(600).springify();
      case "fadeIn":
        return FadeInDown.delay(delay).duration(400);
      case "slideUp":
        return FadeInDown.delay(delay).duration(500).springify();
      default:
        return FadeInDown.delay(delay).duration(600).springify();
    }
  };

  return (
    <Animated.View
      entering={getAnimationConfig()}
      exiting={FadeOutUp.duration(300)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}
