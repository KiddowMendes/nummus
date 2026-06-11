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
import { register } from "@/lib/api";
import { colors } from "@/constants/theme";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(24);
  const ringRotation = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withDelay(100, withTiming(1, { duration: 500 }));
    slideUp.value = withDelay(100, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 25000, easing: Easing.linear }),
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

  const handleSignUp = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!name.trim()) {
      setNameError("Please enter your full name");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) return;
    setIsLoading(true);
    try {
      await register(name, email, password);
      // TODO: store auth token and navigate to dashboard
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      if (message === "rate_limited") {
        setEmailError("Too many attempts. Try again later.");
      } else {
        setEmailError("Registration failed. Please try again.");
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
      <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 16 }}>
        <AnimatedView
          style={[
            {
              width: 80,
              height: 80,
              borderRadius: 40,
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
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 1,
              borderColor: "rgba(22,87,232,0.3)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(22,87,232,0.1)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(22,87,232,0.2)",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "700" }}>N</Text>
            </View>
          </View>
        </AnimatedView>
      </View>

      {/* Form content */}
      <AnimatedView
        style={[
          { flex: 1, paddingHorizontal: 24 },
          contentStyle,
        ]}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: colors.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          Create account
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginTop: 8,
            lineHeight: 24,
          }}
        >
          Start building your financial legacy
        </Text>

        <View style={{ marginTop: 32, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={(t) => {
                setName(t);
                setNameError("");
              }}
              placeholder="John Doe"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              style={{
                height: 48,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 16,
                fontSize: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: nameError ? colors.danger : colors.hover,
              }}
            />
            {nameError ? (
              <Text style={{ fontSize: 12, color: colors.danger }}>{nameError}</Text>
            ) : null}
          </View>

          <View style={{ gap: 8 }}>
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

          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setPasswordError("");
              }}
              placeholder="Create a strong password"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry
              style={{
                height: 48,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 16,
                fontSize: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: passwordError ? colors.danger : colors.hover,
              }}
            />
            {passwordError ? (
              <Text style={{ fontSize: 12, color: colors.danger }}>{passwordError}</Text>
            ) : null}
          </View>

          <Text style={{ fontSize: 12, color: colors.textMuted, lineHeight: 16 }}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </AnimatedView>

      {/* Bottom actions */}
      <AnimatedView
        style={[
          { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
          contentStyle,
        ]}
      >
        <NummusButton
          variant="primary"
          size="lg"
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </NummusButton>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 14, color: colors.textMuted }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={{ fontSize: 14, color: colors.primary, fontWeight: "600" }}>Log In</Text>
          </Pressable>
        </View>
      </AnimatedView>
    </SafeAreaView>
  );
}
