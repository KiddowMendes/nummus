import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { NummusButton } from "@/components/ui/nummusButton";
import { sendPasswordResetEmail } from "@/lib/api";
import { colors } from "@/constants/theme";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(24);
  const ringRotation = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withDelay(100, withTiming(1, { duration: 500 }));
    slideUp.value = withDelay(100, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const handleSend = async () => {
    Keyboard.dismiss();
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setSent(true);
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      if (message === "rate_limited") {
        setEmailError("Too many requests. Please try again later.");
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Ambient gold glow */}
      <View
        style={{
          position: "absolute",
          top: -60,
          alignSelf: "center",
          width: 288,
          height: 288,
          borderRadius: 144,
          backgroundColor: "#D4AF37",
          opacity: 0.08,
        }}
      />

      {/* Back button */}
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.surfaceRaised,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.hover,
          }}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 18 }}>←</Text>
        </Pressable>
      </View>

      {/* Rotating coin motif */}
      <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 24 }}>
        <AnimatedView
          style={[
            {
              width: 96,
              height: 96,
              borderRadius: 48,
              borderWidth: 2,
              borderColor: "rgba(22,87,232,0.2)",
              alignItems: "center",
              justifyContent: "center",
            },
            ringStyle,
          ]}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: "rgba(22,87,232,0.3)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: "rgba(22,87,232,0.1)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(22,87,232,0.2)",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 24, fontWeight: "700" }}>N</Text>
            </View>
          </View>
        </AnimatedView>
      </View>

      <AnimatedView
        style={[
          { flex: 1, paddingHorizontal: 24 },
          contentStyle,
        ]}
      >
        {sent ? (
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "rgba(22,87,232,0.1)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                borderWidth: 1,
                borderColor: "rgba(22,87,232,0.2)",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 24 }}>✓</Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: colors.textPrimary,
                textAlign: "center",
              }}
            >
              Check your email
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: colors.textSecondary,
                marginTop: 12,
                lineHeight: 22,
                textAlign: "center",
                paddingHorizontal: 16,
              }}
            >
              A password reset link has been sent to{"\n"}
              <Text style={{ fontWeight: "600", color: colors.textPrimary }}>{email}</Text>
            </Text>

            <Pressable
              onPress={() => router.push("/login")}
              style={{ marginTop: 40 }}
            >
              <Text style={{ fontSize: 14, color: colors.primary, fontWeight: "600", textAlign: "center" }}>
                Back to Log In
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: colors.textPrimary,
                letterSpacing: -0.5,
              }}
            >
              Reset password
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                marginTop: 8,
                lineHeight: 24,
              }}
            >
              Enter your email and we&apos;ll send you a link to get back into your account
            </Text>

            <View style={{ marginTop: 32, gap: 8 }}>
              <Text style={{ fontSize: 14, color: colors.textMuted }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setEmailError("");
                }}
                placeholder="you@email.com"
                placeholderTextColor={colors.textDisabled}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  height: 48,
                  backgroundColor: colors.surfaceRaised,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: colors.textPrimary,
                  borderWidth: 1,
                  borderColor: emailError ? colors.danger : colors.hover,
                }}
              />
              {emailError ? (
                <Text style={{ fontSize: 12, color: colors.danger }}>{emailError}</Text>
              ) : null}
            </View>

            <View style={{ flex: 1 }} />

            <View style={{ paddingBottom: 40, gap: 16 }}>
              <NummusButton
                variant="primary"
                size="lg"
                onPress={handleSend}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </NummusButton>

              <Pressable
                onPress={() => router.push("/login")}
                style={{ alignItems: "center" }}
              >
                <Text style={{ fontSize: 14, color: colors.primary, fontWeight: "500" }}>
                  Back to Log In
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </AnimatedView>
    </SafeAreaView>
  );
}
