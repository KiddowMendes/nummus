// components/OnboardingScreenWrapper.tsx
import React from "react";
import { View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "./onboardingProgress";
import { colors } from "@/constants/theme";

interface OnboardingScreenWrapperProps {
  step: number; // 0-indexed (0-7)
  glowColor?: string;
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
  style?: ViewStyle;
}

export function OnboardingScreenWrapper({
  step,
  glowColor = colors.primary,
  children,
  bottomContent,
  style,
}: OnboardingScreenWrapperProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Ambient glow */}
      <View
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          marginLeft: -150,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: glowColor,
          opacity: 0.08,
        }}
        pointerEvents="none"
      />

      <OnboardingProgress currentStep={step} />

      <View style={[{ flex: 1, paddingHorizontal: 24 }, style]}>
        {children}
      </View>

      {bottomContent && (
        <View style={{ paddingHorizontal: 24, paddingBottom: 32, gap: 12 }}>
          {bottomContent}
        </View>
      )}
    </SafeAreaView>
  );
}