// components/ui/GlassCard.tsx
import React from "react";
import { View, type ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/theme";

interface GlassCardProps extends ViewProps {
  intensity?: number; // 0-1, default 0.6
  borderOpacity?: number; // 0-1, default 0.08
  glowColor?: string;
  children: React.ReactNode;
}

export function GlassCard({
  intensity = 0.6,
  borderOpacity = 0.08,
  glowColor,
  children,
  style,
  ...props
}: GlassCardProps) {
  return (
    <View
      style={[
        {
          borderRadius: 24,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: `rgba(255,255,255,${borderOpacity})`,
          shadowColor: glowColor || colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 8,
        },
        style,
      ]}
      {...props}
    >
      <LinearGradient
        colors={[
          `rgba(17,24,39,${intensity})`,
          `rgba(17,24,39,${intensity * 0.8})`,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 24,
        }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}