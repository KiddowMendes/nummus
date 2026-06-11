// app/(onboarding)/budget.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedProps,
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
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Budget Ring Illustration ─────────────────────────────────────

function BudgetRing({
  size = 200,
  targetProgress = 0.7,
}: {
  size?: number;
  targetProgress?: number;
}) {
  const progress = useSharedValue(0);
  const glowPulse = useSharedValue(0);
  const centerScale = useSharedValue(0.8);

  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    progress.value = withDelay(400, withTiming(targetProgress, { duration: 1500, easing: Easing.out(Easing.cubic) }));

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

  const ringAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [circumference, 0]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.08, 0.2]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.9, 1.1]) }],
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: centerScale.value }],
    opacity: interpolate(centerScale.value, [0.8, 1], [0, 1]),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Indigo-violet glow */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: (size * 1.4) / 2,
            backgroundColor: colors.primary,
          },
          glowStyle,
        ]}
      />

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
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#trackGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress ring */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={ringAnimatedProps}
          transform={`rotate(-90, ${center}, ${center})`}
        />

        {/* Decorative ticks around ring */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = center + (radius - 20) * Math.cos(angle);
          const y1 = center + (radius - 20) * Math.sin(angle);
          const x2 = center + (radius - 12) * Math.cos(angle);
          const y2 = center + (radius - 12) * Math.sin(angle);
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

      {/* Center badge */}
      <AnimatedView
        style={[
          {
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: "rgba(124,58,237,0.3)",
            alignItems: "center",
            justifyContent: "center",
          },
          centerStyle,
        ]}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", color: colors.textPrimary }}>
          🎯
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: colors.secondary,
            marginTop: 2,
          }}
        >
          BUDGET
        </Text>
      </AnimatedView>
    </View>
  );
}

// ─── Category Chips ────────────────────────────────────────────────

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

function CategoryChip({
  label,
  color,
  isSelected,
  onPress,
}: {
  label: string;
  color: string;
  isSelected: boolean;
  onPress: () => void;
}) {
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
      <Text
        style={{
          fontSize: 13,
          fontWeight: isSelected ? "600" : "400",
          color: isSelected ? color : colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

export default function BudgetScreen() {
  const [category, setCategory] = useState<string>("");
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
          <NummusButton
            variant="primary"
            size="lg"
            disabled={!isValid}
            onPress={() => router.push("/goals")}
          >
            Continue
          </NummusButton>
          <Pressable
            onPress={() => router.push("/goals")}
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
            { alignItems: "center", marginTop: 8, marginBottom: 28 },
            useAnimatedStyle(() => ({
              opacity: withDelay(100, withTiming(1, { duration: 600 })),
              transform: [{ scale: withDelay(100, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) })) }],
            })),
          ]}
        >
          <BudgetRing size={180} targetProgress={0.7} />
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
            Set a Budget
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
            Pick a category and set a monthly limit. We\u2019ll warn you before you overspend.
          </Text>
        </AnimatedView>

        {/* Form */}
        <AnimatedView style={[{ gap: 20 }, contentStyle]}>
          {/* Category Selection */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 10,
              }}
            >
              Pick a Category
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((cat) => (
                <CategoryChip
                  key={cat.id}
                  label={cat.label}
                  color={cat.color}
                  isSelected={category === cat.id}
                  onPress={() => setCategory(cat.id)}
                />
              ))}
            </View>
          </View>

          {/* Budget Name */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Budget Name
            </Text>
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

          {/* Amount */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Monthly Limit (ZAR)
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
                borderColor: amount.length > 0 ? (selectedCategory?.color || colors.secondary) : colors.hover,
                fontVariant: ["tabular-nums"],
              }}
            />
          </View>

          {/* Period Toggle */}
          <View>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                marginBottom: 8,
              }}
            >
              Budget Period
            </Text>
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
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: period === p ? "600" : "400",
                      color: period === p ? colors.secondary : colors.textSecondary,
                      textTransform: "capitalize",
                    }}
                  >
                    {p}
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
