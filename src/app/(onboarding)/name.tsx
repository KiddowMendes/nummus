// app/(onboarding)/name.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function NameScreen() {
  const [name, setName] = useState("");
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(20);

  useEffect(() => {
    fadeIn.value = withDelay(100, withTiming(1, { duration: 500 }));
    slideUp.value = withDelay(100, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const isValid = name.trim().length >= 2;

  return (
    <OnboardingScreenWrapper
      step={1}
      glowColor={colors.secondary}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton
            variant="primary"
            size="lg"
            disabled={!isValid}
            onPress={() => router.push("/currency")}
          >
            Continue
          </NummusButton>
          <Pressable
            onPress={() => router.push("/currency")}
            style={{ alignItems: "center", paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>
              Skip for now
            </Text>
          </Pressable>
        </AnimatedView>
      }
    >
      {/* Fixed layout: illustration → title → form. No overlap possible. */}
      <View style={{ alignItems: "center", paddingTop: 16 }}>
        {/* Glass ID Card Illustration */}
        <View style={{ marginBottom: 32 }}>
          <View
            style={{
              width: 140,
              height: 180,
              borderRadius: 20,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              shadowColor: colors.secondary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            <LinearGradient
              colors={["rgba(124,58,237,0.25)", "rgba(17,24,39,0.9)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(124,58,237,0.3)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    marginBottom: 3,
                  }}
                />
                <View
                  style={{
                    width: 28,
                    height: 12,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                />
              </View>
              <View
                style={{
                  width: 64,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  marginBottom: 8,
                }}
              />
              <View
                style={{
                  width: 44,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Title — ALWAYS below illustration */}
        <AnimatedView style={[{ alignItems: "center", width: "100%" }, contentStyle]}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: colors.textPrimary,
              textAlign: "center",
              marginBottom: 8,
              letterSpacing: -0.5,
            }}
          >
            What should we call you?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: 32,
              lineHeight: 24,
            }}
          >
            Personalize your Nummus experience.
          </Text>

          {/* Input — scrolls with keyboard */}
          <View style={{ width: "100%", maxWidth: 320 }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Your first name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Thabo"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              autoFocus
              style={{
                height: 56,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 20,
                fontSize: 18,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: name.length > 0 ? colors.secondary : colors.hover,
              }}
            />
          </View>
        </AnimatedView>
      </View>
    </OnboardingScreenWrapper>
  );
}