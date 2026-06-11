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
import { login as apiLogin } from "@/lib/api";
import { colors } from "@/constants/theme";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) return;
    setIsLoading(true);
    try {
      await apiLogin(email, password);
      // TODO: store auth token and navigate to dashboard
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      if (message === "rate_limited") {
        setEmailError("Too many attempts. Try again later.");
      } else {
        setEmailError("Invalid email or password.");
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
          Welcome back
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginTop: 8,
            lineHeight: 24,
          }}
        >
          Sign in to access your Nummus vault
        </Text>

        <View style={{ marginTop: 32, gap: 20 }}>
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
              placeholder="Enter your password"
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

          <Pressable
            onPress={() => router.push("/forgot-password")}
            style={{ alignSelf: "flex-end" }}
          >
            <Text style={{ fontSize: 14, color: colors.primary, fontWeight: "500" }}>
              Forgot password?
            </Text>
          </Pressable>
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
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Log In"}
        </NummusButton>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 14, color: colors.textMuted }}>No account yet?</Text>
          <Pressable onPress={() => router.push("/sign-up")}>
            <Text style={{ fontSize: 14, color: colors.primary, fontWeight: "600" }}>Sign Up</Text>
          </Pressable>
        </View>
      </AnimatedView>
    </SafeAreaView>
  );
}
