// components/OnboardingProgress.tsx
import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

interface OnboardingProgressProps {
  currentStep: number; // 0-indexed (0-7)
  totalSteps?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function OnboardingProgress({
  currentStep,
  totalSteps = 8,
}: OnboardingProgressProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingTop: 16,
        paddingBottom: 8,
      }}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <Dot
            key={i}
            isActive={isActive}
            isCompleted={isCompleted}
            step={i}
          />
        );
      })}
    </View>
  );
}

function Dot({
  isActive,
  isCompleted,
  step,
}: {
  isActive: boolean;
  isCompleted: boolean;
  step: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const size = isActive ? 10 : 8;
    const backgroundColor = isActive
      ? colors.primary
      : isCompleted
      ? `${colors.primary}66` // 40% opacity
      : colors.hover;

    return {
      width: withSpring(size, { damping: 15, stiffness: 300 }),
      height: withSpring(size, { damping: 15, stiffness: 300 }),
      backgroundColor,
      transform: [{ scale: isActive ? withSpring(1.2) : 1 }],
    };
  });

  return (
    <AnimatedView
      style={[
        {
          borderRadius: 9999,
        },
        animatedStyle,
      ]}
    />
  );
}