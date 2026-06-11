// app/(onboarding)/income.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

// ─── Income Jar Illustration ───────────────────────────────────────

function IncomeJar({ size = 180 }: { size?: number }) {
  const coinDrop1 = useSharedValue(-60);
  const coinDrop2 = useSharedValue(-80);
  const coinDrop3 = useSharedValue(-100);
  const jarFill = useSharedValue(0);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    // Staggered coin drops
    coinDrop1.value = withDelay(
      400,
      withSequence(
        withTiming(40, { duration: 800, easing: Easing.in(Easing.cubic) }),
        withTiming(-60, { duration: 0 })
      )
    );

    coinDrop2.value = withDelay(
      700,
      withSequence(
        withTiming(20, { duration: 800, easing: Easing.in(Easing.cubic) }),
        withTiming(-80, { duration: 0 })
      )
    );

    coinDrop3.value = withDelay(
      1000,
      withSequence(
        withTiming(0, { duration: 800, easing: Easing.in(Easing.cubic) }),
        withTiming(-100, { duration: 0 })
      )
    );

    // Jar fill level rises
    jarFill.value = withDelay(600, withTiming(0.6, { duration: 1200, easing: Easing.out(Easing.cubic) }));

    // Glow pulse
    glowPulse.value = withDelay(
      1500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, []);

  const coin1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: coinDrop1.value }],
    opacity: interpolate(coinDrop1.value, [-60, 0, 40], [0, 1, 0.8]),
  }));

  const coin2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: coinDrop2.value }],
    opacity: interpolate(coinDrop2.value, [-80, 0, 20], [0, 1, 0.8]),
  }));

  const coin3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: coinDrop3.value }],
    opacity: interpolate(coinDrop3.value, [-100, -20, 0], [0, 1, 0.8]),
  }));

  const fillStyle = useAnimatedStyle(() => ({
    height: interpolate(jarFill.value, [0, 1], [0, 70]),
    opacity: interpolate(jarFill.value, [0, 0.1], [0, 0.6]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.08, 0.18]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.95, 1.05]) }],
  }));

  const scale = size / 200;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Emerald glow */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: (size * 1.4) / 2,
            backgroundColor: colors.success,
          },
          glowStyle,
        ]}
      />

      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="jarBody" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="rgba(17,24,39,0.4)" />
            <Stop offset="100%" stopColor="rgba(17,24,39,0.7)" />
          </LinearGradient>
          <LinearGradient id="jarFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </LinearGradient>
          <LinearGradient id="coinGold" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FCD34D" />
            <Stop offset="100%" stopColor="#D97706" />
          </LinearGradient>
        </Defs>

        {/* Jar body - glass outline */}
        <Path
          d="M50 60 L50 160 Q50 180 70 180 L130 180 Q150 180 150 160 L150 60 Q150 50 140 45 L130 40 L70 40 L60 45 Q50 50 50 60 Z"
          fill="url(#jarBody)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* Jar rim */}
        <Rect x="45" y="35" width="110" height="12" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Animated fill level */}
        <Animated.View style={[{ position: "absolute", bottom: 20 * scale, left: 55 * scale, width: 90 * scale }, fillStyle]}>
          <Svg width={90 * scale} height={70 * scale} viewBox="0 0 90 70">
            <Path
              d="M0 10 Q45 0 90 10 L90 70 L0 70 Z"
              fill="url(#jarFill)"
            />
            {/* Bubbles in liquid */}
            <Circle cx="20" cy="50" r="3" fill="#34D399" opacity={0.4} />
            <Circle cx="45" cy="40" r="2" fill="#34D399" opacity={0.3} />
            <Circle cx="70" cy="55" r="2.5" fill="#34D399" opacity={0.35} />
          </Svg>
        </Animated.View>

        {/* Falling coins (positioned absolutely over the jar) */}
        <Animated.View style={[{ position: "absolute", left: 70 * scale, top: 0 }, coin1Style]}>
          <Svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="11" fill="url(#coinGold)" />
            <Path d="M8 8 L8 16 L12 16 L12 12 L14 12 L14 16 L16 16 L16 8 L12 8 L12 12 L10 12 L10 8 Z" fill="#92400E" opacity={0.6} />
          </Svg>
        </Animated.View>

        <Animated.View style={[{ position: "absolute", left: 100 * scale, top: 0 }, coin2Style]}>
          <Svg width={20 * scale} height={20 * scale} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="11" fill="url(#coinGold)" />
            <Path d="M8 8 L8 16 L12 16 L12 12 L14 12 L14 16 L16 16 L16 8 L12 8 L12 12 L10 12 L10 8 Z" fill="#92400E" opacity={0.6} />
          </Svg>
        </Animated.View>

        <Animated.View style={[{ position: "absolute", left: 85 * scale, top: 0 }, coin3Style]}>
          <Svg width={22 * scale} height={22 * scale} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="11" fill="url(#coinGold)" />
            <Path d="M8 8 L8 16 L12 16 L12 12 L14 12 L14 16 L16 16 L16 8 L12 8 L12 12 L10 12 L10 8 Z" fill="#92400E" opacity={0.6} />
          </Svg>
        </Animated.View>
      </Svg>
    </View>
  );
}

// ─── Quick Amount Chips ─────────────────────────────────────────────

const QUICK_AMOUNTS = ["R 2,500", "R 5,000", "R 10,000", "R 15,000"];

function AmountChip({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: isSelected ? colors.success + "20" : colors.surfaceRaised,
        borderWidth: 1,
        borderColor: isSelected ? colors.success : colors.hover,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: isSelected ? "600" : "400",
          color: isSelected ? colors.success : colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

export default function IncomeScreen() {
  const [incomeName, setIncomeName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"monthly" | "weekly" | "biweekly">("monthly");
  const [showForm, setShowForm] = useState(false);

  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(20);

  useEffect(() => {
    fadeIn.value = withDelay(200, withTiming(1, { duration: 500 }));
    slideUp.value = withDelay(200, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const handleAmountChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    const num = parseInt(cleaned) || 0;
    setAmount(num > 0 ? num.toLocaleString("en-ZA") : "");
  }, []);

  const handleQuickAmount = (label: string) => {
    const num = label.replace(/[^0-9]/g, "");
    setAmount(parseInt(num).toLocaleString("en-ZA"));
  };

  const isValid = incomeName.trim().length >= 2 && amount.length > 0;

  return (
    <OnboardingScreenWrapper
      step={4}
      glowColor={colors.success}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton
            variant="primary"
            size="lg"
            disabled={!isValid}
            onPress={() => router.push("/budget")}
          >
            Continue
          </NummusButton>
          <Pressable
            onPress={() => router.push("/budget")}
            style={{ alignItems: "center", paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>
              Skip for now
            </Text>
          </Pressable>
        </AnimatedView>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Illustration */}
        <AnimatedView
          style={[
            { alignItems: "center", marginTop: 16, marginBottom: 32 },
            useAnimatedStyle(() => ({
              opacity: withDelay(100, withTiming(1, { duration: 600 })),
              transform: [{ scale: withDelay(100, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) })) }],
            })),
          ]}
        >
          <IncomeJar size={180} />
        </AnimatedView>

        {/* Header */}
        <AnimatedView style={[{ alignItems: "center", marginBottom: 24 }, contentStyle]}>
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
            Your Income
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: 300,
            }}
          >
            Add your salary, side hustles, or allowances. This helps us build your budget.
          </Text>
        </AnimatedView>

        {/* Form */}
        <AnimatedView style={[{ gap: 20 }, contentStyle]}>
          {/* Income Name */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Income Source
            </Text>
            <TextInput
              value={incomeName}
              onChangeText={setIncomeName}
              placeholder="e.g. Monthly Salary"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              style={{
                height: 56,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 20,
                fontSize: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: incomeName.length > 0 ? colors.success : colors.hover,
              }}
            />
          </View>

          {/* Amount */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Monthly Amount (ZAR)
            </Text>
            <TextInput
              value={amount ? `R ${amount}` : ""}
              onChangeText={handleAmountChange}
              placeholder="R 0.00"
              placeholderTextColor={colors.textDisabled}
              keyboardType="numeric"
              style={{
                height: 56,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 20,
                fontSize: 18,
                fontWeight: "600",
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: amount.length > 0 ? colors.success : colors.hover,
                fontVariant: ["tabular-nums"],
              }}
            />
          </View>

          {/* Quick Amount Chips */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {QUICK_AMOUNTS.map((label) => (
              <AmountChip
                key={label}
                label={label}
                isSelected={amount === label.replace(/[^0-9]/g, "")}
                onPress={() => handleQuickAmount(label)}
              />
            ))}
          </View>

          {/* Frequency */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              How often?
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {(["monthly", "biweekly", "weekly"] as const).map((freq) => (
                <Pressable
                  key={freq}
                  onPress={() => setFrequency(freq)}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: frequency === freq ? colors.success + "20" : colors.surfaceRaised,
                    borderWidth: 1,
                    borderColor: frequency === freq ? colors.success : colors.hover,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: frequency === freq ? "600" : "400",
                      color: frequency === freq ? colors.success : colors.textSecondary,
                      textTransform: "capitalize",
                    }}
                  >
                    {freq}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </AnimatedView>
      </ScrollView>
    </OnboardingScreenWrapper>
  );
}