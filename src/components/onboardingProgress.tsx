import React, { useEffect } from "react";
import { View } from "@/tw";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

interface OnboardingProgressProps {
  currentStep: number;
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
        paddingTop: 12,
        paddingBottom: 8,
        height: 36,
      }}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <Dot
          key={i}
          isActive={i === currentStep}
          isCompleted={i < currentStep}
        />
      ))}
    </View>
  );
}

function Dot({
  isActive,
  isCompleted,
}: {
  isActive: boolean;
  isCompleted: boolean;
}) {
  const size = useSharedValue(8);
  const scale = useSharedValue(1);
  const activeSV = useSharedValue(isActive);
  const completedSV = useSharedValue(isCompleted);

  // Sync shared values from props
  useEffect(() => {
    activeSV.value = isActive;
    completedSV.value = isCompleted;
    if (isActive) {
      size.value = withSpring(10, { damping: 15, stiffness: 300 });
      scale.value = withSpring(1.2, { damping: 15, stiffness: 300 });
    } else {
      size.value = withSpring(8, { damping: 15, stiffness: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    backgroundColor: activeSV.value
      ? colors.primary
      : completedSV.value
      ? `${colors.primary}66`
      : colors.hover,
    transform: [{ scale: scale.value }],
  }));

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