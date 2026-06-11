import React, { useEffect, type ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

interface EntranceViewProps {
  children: ReactNode;
  delay?: number;
  style?: ViewStyle;
  className?: string;
}

export function EntranceView({ children, delay = 100, style }: EntranceViewProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) }));
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return <AnimatedView style={[animatedStyle, style]}>{children}</AnimatedView>;
}
