// app/(onboarding)/index.tsx
import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCoin } from "@/components/animatedCoin";
import { NummusButton } from "@/components/ui/nummusButton";
import { OnboardingProgress } from "@/components/onboardingProgress";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function WelcomeScreen() {
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(30);
  const logoScale = useSharedValue(0.8);

  useEffect(() => {
    // Staggered entrance animation
    logoScale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) });
    fadeIn.value = withDelay(300, withTiming(1, { duration: 600 }));
    slideUp.value = withDelay(300, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const logoContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Ambient indigo glow */}
      <View
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          marginLeft: -150,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: colors.primary,
          opacity: 0.08,
          filter: "blur(80px)",
        }}
      />

      <OnboardingProgress currentStep={0} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        {/* Coin Illustration */}
        <AnimatedView style={[{ marginBottom: 32 }, logoContainerStyle]}>
          <AnimatedCoin size={180} glowColor={colors.primary} />
        </AnimatedView>

        {/* Text Content */}
        <AnimatedView style={[{ alignItems: "center" }, containerStyle]}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: colors.textPrimary,
              letterSpacing: -0.5,
              marginBottom: 12,
            }}
          >
            Welcome to Nummus
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: 280,
              marginBottom: 8,
            }}
          >
            Track your money. Own your future.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            South African finance, simplified.
          </Text>
        </AnimatedView>
      </View>

      {/* Bottom Actions */}
      <AnimatedView
        style={[
          {
            paddingHorizontal: 24,
            paddingBottom: 32,
            gap: 12,
          },
          containerStyle,
        ]}
      >
        <NummusButton
          variant="primary"
          size="lg"
          onPress={() => router.push("/name")}
        >
          Get Started
        </NummusButton>

        <Pressable
          onPress={() => router.push("/login")}
          style={{ alignItems: "center", paddingVertical: 12 }}
        >
          <Text style={{ fontSize: 14, color: colors.textMuted }}>
            Already have an account?{" "}
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Log In
            </Text>
          </Text>
        </Pressable>
      </AnimatedView>
    </SafeAreaView>
  );
}