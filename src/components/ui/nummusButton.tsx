// components/ui/NummusButton.tsx
import React from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

interface NummusButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  children: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function NummusButton({
  variant = "primary",
  size = "lg",
  children,
  disabled,
  ...props
}: NummusButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const bgStyles = {
    primary: {
      backgroundColor: disabled ? colors.surfaceRaised : colors.primary,
      opacity: disabled ? 0.38 : 1,
    },
    secondary: {
      backgroundColor: colors.surfaceRaised,
      borderWidth: 1,
      borderColor: colors.hover,
    },
    ghost: {
      backgroundColor: "transparent",
    },
  };

  const textStyles = {
    primary: { color: colors.primaryForeground },
    secondary: { color: colors.textSecondary },
    ghost: { color: colors.textMuted },
  };

  const height = size === "lg" ? 56 : 48;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        {
          height,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        },
        bgStyles[variant],
        animatedStyle,
      ]}
      {...props}
    >
      <Text
        style={[
          {
            fontSize: size === "lg" ? 18 : 16,
            fontWeight: "600",
          },
          textStyles[variant],
        ]}
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
}