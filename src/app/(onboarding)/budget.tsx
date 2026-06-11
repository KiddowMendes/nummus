import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import Svg, { Circle, Line, Defs, LinearGradient, Stop } from "react-native-svg";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

// ─── Budget Ring — FIXED: No useAnimatedProps on Circle ─────────────

function BudgetRing({ size = 160 }: { size?: number }) {
  const progress = useSharedValue(0);
  const glowPulse = useSharedValue(0);
  const centerScale = useSharedValue(0);

  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withDelay(400, withTiming(0.7, { duration: 1500, easing: Easing.out(Easing.cubic) }));
    centerScale.value = withDelay(800, withSpring(1, { damping: 12, stiffness: 200 }));
    glowPulse.value = withDelay(
      1200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.3, { duration: 2000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, []);

  // Animate the strokeDashoffset via a wrapper View's width/opacity instead
  const ringContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.1], [0, 1]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.06, 0.15]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.9, 1.1]) }],
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: centerScale.value }],
    opacity: centerScale.value,
  }));

  // Calculate current dashoffset based on progress
  const currentOffset = circumference * (1 - 0.7); // 70% filled

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: (size * 1.3) / 2,
            backgroundColor: colors.primary,
          },
          glowStyle,
        ]}
      />

      <Animated.View style={ringContainerStyle}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <LinearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#4F46E5" />
              <Stop offset="50%" stopColor="#7C3AED" />
              <Stop offset="100%" stopColor="#A855F7" />
            </LinearGradient>
            <LinearGradient id="trackGradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="rgba(79,70,229,0.1)" />
              <Stop offset="100%" stopColor="rgba(124,58,237,0.05)" />
            </LinearGradient>
          </Defs>

          {/* Background track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress ring — static offset, animated via parent opacity */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={currentOffset}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />

          {/* Ticks */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = size / 2;
            const cy = size / 2;
            const x1 = cx + (radius - 18) * Math.cos(angle);
            const y1 = cy + (radius - 18) * Math.sin(angle);
            const x2 = cx + (radius - 10) * Math.cos(angle);
            const y2 = cy + (radius - 10) * Math.sin(angle);
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
        </Svg>
      </Animated.View>

      {/* Center badge */}
      <AnimatedView
        style={[
          {
            position: "absolute",
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: "rgba(124,58,237,0.3)",
            alignItems: "center",
            justifyContent: "center",
          },
          centerStyle,
        ]}
      >
        <Text style={{ fontSize: 22 }}>🎯</Text>
        <Text style={{ fontSize: 10, fontWeight: "600", color: colors.secondary, marginTop: 2 }}>
          BUDGET
        </Text>
      </AnimatedView>
    </View>
  );
}

// ─── Category Chips (unchanged) ──────────────────────────────────────

const CATEGORIES = [
  { id: "food", label: "🍔 Food", color: "#F59E0B" },
  { id: "transport", label: "🚗 Transport", color: "#3B82F6" },
  { id: "data", label: "📱 Data", color: "#8B5CF6" },
  { id: "entertainment", label: "🎬 Fun", color: "#EC4899" },
  { id: "shopping", label: "👕 Shopping", color: "#F97316" },
  { id: "health", label: "💊 Health", color: "#EF4444" },
  { id: "education", label: "📚 Education", color: "#10B981" },
  { id: "other", label: "✏️ Other", color: "#6B7280" },
];

function CategoryChip({ label, color, isSelected, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: isSelected ? color + "20" : colors.surfaceRaised,
        borderWidth: 1,
        borderColor: isSelected ? color : colors.hover,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: isSelected ? "600" : "400", color: isSelected ? color : colors.textSecondary }}>
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

export default function BudgetScreen() {
  const [category, setCategory] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<"monthly" | "weekly">("monthly");

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

  const isValid = category.length > 0 && budgetName.trim().length >= 2 && amount.length > 0;
  const selectedCategory = CATEGORIES.find((c) => c.id === category);

  return (
    <OnboardingScreenWrapper
      step={5}
      glowColor={colors.secondary}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton variant="primary" size="lg" disabled={!isValid} onPress={() => router.push("/goals")}>
            Continue
          </NummusButton>
          <Pressable onPress={() => router.push("/goals")} style={{ alignItems: "center", paddingVertical: 12 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Skip for now</Text>
          </Pressable>
        </AnimatedView>
      }
    >
      <View style={{ paddingTop: 8 }}>
        {/* Illustration */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <BudgetRing size={160} />
        </View>

        {/* Header */}
        <AnimatedView style={[{ alignItems: "center", marginBottom: 24 }, contentStyle]}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.textPrimary, textAlign: "center", marginBottom: 8, letterSpacing: -0.5 }}>
            Set a Budget
          </Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: "center", lineHeight: 24, maxWidth: 300 }}>
            Pick a category and set a monthly limit. We&apos;ll warn you before you overspend.
          </Text>
        </AnimatedView>

        {/* Form */}
        <AnimatedView style={[{ gap: 20 }, contentStyle]}>
          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 10 }}>Pick a Category</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((cat) => (
                <CategoryChip key={cat.id} label={cat.label} color={cat.color} isSelected={category === cat.id} onPress={() => setCategory(cat.id)} />
              ))}
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>Budget Name</Text>
            <TextInput
              value={budgetName}
              onChangeText={setBudgetName}
              placeholder="e.g. Groceries"
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
                borderColor: budgetName.length > 0 ? (selectedCategory?.color || colors.secondary) : colors.hover,
              }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>Monthly Limit (ZAR)</Text>
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
                borderColor: amount.length > 0 ? (selectedCategory?.color || colors.secondary) : colors.hover,
                fontVariant: ["tabular-nums"],
              }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>Budget Period</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {(["monthly", "weekly"] as const).map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: period === p ? colors.secondary + "20" : colors.surfaceRaised,
                    borderWidth: 1,
                    borderColor: period === p ? colors.secondary : colors.hover,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: period === p ? "600" : "400", color: period === p ? colors.secondary : colors.textSecondary, textTransform: "capitalize" }}>
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </AnimatedView>
      </View>
    </OnboardingScreenWrapper>
  );
}