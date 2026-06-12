import React from "react";
import { View, ScrollView } from "@/tw";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, type ViewStyle } from "react-native";
import { colors } from "@/constants/theme";

interface SafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "indigo" | "gold" | "violet" | "emerald";
  glowPosition?: "top" | "center";
  scrollable?: boolean;
  scrollableContentClassName?: string;
  bottomContent?: React.ReactNode;
}

const GLOW_MAP: Record<string, string> = {
  indigo: "#1657E8",
  gold: "#FCD34D",
  violet: "#7C3AED",
  emerald: "#34D399",
};

export function SafeAreaView({
  children,
  className,
  glowColor,
  glowPosition = "center",
  scrollable = true,
  scrollableContentClassName,
  bottomContent,
}: SafeAreaViewProps) {
  const content = (
    <View className="flex-1">
      {glowColor && (
        <View
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: 140,
            backgroundColor: GLOW_MAP[glowColor] ?? colors.primary,
            opacity: 0.06,
            zIndex: 0,
            ...(glowPosition === "center"
              ? { top: "50%", left: "50%" }
              : { top: -80, left: "50%" }),
          }}
          pointerEvents="none"
        />
      )}

      <View className="relative z-10 flex-1">
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName={scrollableContentClassName ?? "flex-grow px-6 pb-8 pt-12"}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View className="flex-1 px-6 pb-8 pt-12">{children}</View>
        )}
      </View>

      {bottomContent && (
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 32,
            paddingTop: 12,
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
        style={{ flex: 1, backgroundColor: colors.background } as ViewStyle}
        behavior="padding"
      >
        <RNSafeAreaView style={{ flex: 1 }}>
          <View className={`flex-1 ${className ?? ""}`}>{content}</View>
        </RNSafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <RNSafeAreaView style={{ flex: 1, backgroundColor: colors.background } as ViewStyle}>
      <View className={`flex-1 ${className ?? ""}`}>{content}</View>
    </RNSafeAreaView>
  );
}
