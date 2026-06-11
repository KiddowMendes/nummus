import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgress } from "./onboardingProgress";
import { colors } from "@/constants/theme";

interface OnboardingScreenWrapperProps {
  step: number;
  glowColor?: string;
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
}

export function OnboardingScreenWrapper({
  step,
  glowColor = colors.primary,
  children,
  bottomContent,
  style,
  scrollable = true,
}: OnboardingScreenWrapperProps) {
  const content = (
    <View style={[{ flex: 1 }, style]}>
      {/* Ambient glow — contained within layout, not absolute to viewport */}
      <View
        style={{
          position: "absolute",
          top: 60,
          alignSelf: "center",
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: glowColor,
          opacity: 0.06,
          zIndex: 0,
        }}
        pointerEvents="none"
      />

      <OnboardingProgress currentStep={step} />

      <View style={{ flex: 1, zIndex: 1 }}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: 24 }}>{children}</View>
        )}
      </View>

      {bottomContent && (
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 32,
            paddingTop: 12,
            zIndex: 2,
            backgroundColor: colors.background,
          }}
        >
          {bottomContent}
        </View>
      )}
    </View>
  );

  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <SafeAreaView style={{ flex: 1 }}>{content}</SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {content}
    </SafeAreaView>
  );
}