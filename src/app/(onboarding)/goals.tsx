// app/(onboarding)/goals.tsx
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
import Svg, { Path, Defs, LinearGradient, Stop, Polygon } from "react-native-svg";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// ─── Mountain Peak Illustration ───────────────────────────────────

function MountainPeak({ size = 200 }: { size?: number }) {
  const layer1 = useSharedValue(0);
  const layer2 = useSharedValue(0);
  const layer3 = useSharedValue(0);
  const flagWave = useSharedValue(0);
  const glowPulse = useSharedValue(0);
  const scale = size / 200;

  useEffect(() => {
    layer1.value = withDelay(300, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));
    layer2.value = withDelay(500, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));
    layer3.value = withDelay(700, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));

    flagWave.value = withDelay(1000, withSpring(1, { damping: 12, stiffness: 150 }));

    glowPulse.value = withDelay(
      1400,
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

  const layer1Props = useAnimatedProps(() => ({
    opacity: layer1.value,
    transform: `translate(0, ${interpolate(layer1.value, [0, 1], [30, 0])})` as const,
  }));

  const layer2Props = useAnimatedProps(() => ({
    opacity: layer2.value,
    transform: `translate(0, ${interpolate(layer2.value, [0, 1], [20, 0])})` as const,
  }));

  const layer3Props = useAnimatedProps(() => ({
    opacity: layer3.value,
    transform: `translate(0, ${interpolate(layer3.value, [0, 1], [10, 0])})` as const,
  }));

  const flagProps = useAnimatedProps(() => ({
    opacity: flagWave.value,
    transform: `translate(0, 0) scale(${interpolate(flagWave.value, [0, 1], [0.5, 1])}) rotate(${interpolate(flagWave.value, [0, 1], [-10, 0])} 0 0)` as const,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.08, 0.2]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.9, 1.1]) }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Gold glow */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: (size * 1.4) / 2,
            backgroundColor: colors.gold,
          },
          glowStyle,
        ]}
      />

      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="layer1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#111827" stopOpacity="0.95" />
          </LinearGradient>
          <LinearGradient id="layer2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
          </LinearGradient>
          <LinearGradient id="layer3" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#475569" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
          </LinearGradient>
          <LinearGradient id="flagGold" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FDE68A" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </LinearGradient>
        </Defs>

        {/* Layer 1 - Base mountain */}
        <AnimatedPath
          d="M20 180 L100 80 L180 180 Z"
          fill="url(#layer1)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          animatedProps={layer1Props}
        />

        {/* Layer 2 - Mid mountain */}
        <AnimatedPath
          d="M40 180 L100 50 L160 180 Z"
          fill="url(#layer2)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          animatedProps={layer2Props}
        />

        {/* Layer 3 - Peak */}
        <AnimatedPath
          d="M60 180 L100 20 L140 180 Z"
          fill="url(#layer3)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          animatedProps={layer3Props}
        />

        {/* Snow cap on peak */}
        <AnimatedPath
          d="M85 55 L100 20 L115 55 Q100 60 85 55 Z"
          fill="rgba(255,255,255,0.15)"
          animatedProps={layer3Props}
        />

        {/* Flag pole */}
        <AnimatedPath
          d="M100 20 L100 5"
          stroke="#FCD34D"
          strokeWidth="2"
          strokeLinecap="round"
          animatedProps={flagProps}
        />

        {/* Flag */}
        <AnimatedView style={[{ position: "absolute", left: 100 * scale - 2, top: 5 * scale }, useAnimatedStyle(() => ({
          opacity: flagWave.value,
          transform: [
            { scale: interpolate(flagWave.value, [0, 1], [0.5, 1]) },
            { rotateZ: `${interpolate(flagWave.value, [0, 1], [-10, 0])}deg` },
          ],
        }))]}>
          <Svg width={24 * scale} height={16 * scale} viewBox="0 0 24 16">
            <Polygon points="0,0 20,6 0,12" fill="url(#flagGold)" />
          </Svg>
        </AnimatedView>

        {/* Summit glow dot */}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 96 * scale,
              top: 16 * scale,
              width: 8 * scale,
              height: 8 * scale,
              borderRadius: 4 * scale,
              backgroundColor: colors.gold,
            },
            glowStyle,
          ]}
        />
      </Svg>
    </View>
  );
}

// ─── Goal Templates ────────────────────────────────────────────────

const GOAL_TEMPLATES = [
  { id: "emergency", icon: "🚨", name: "Emergency Fund", target: 5000, color: "#EF4444" },
  { id: "gadget", icon: "💻", name: "Gadget Fund", target: 15000, color: "#3B82F6" },
  { id: "holiday", icon: "✈️", name: "Holiday Fund", target: 10000, color: "#10B981" },
  { id: "education", icon: "🎓", name: "Education", target: 20000, color: "#8B5CF6" },
];

function GoalTemplateCard({
  template,
  isSelected,
  onPress,
}: {
  template: (typeof GOAL_TEMPLATES)[0];
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        minWidth: "48%",
        backgroundColor: isSelected ? template.color + "15" : colors.surfaceRaised,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: isSelected ? template.color + "50" : colors.hover,
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 28 }}>{template.icon}</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: isSelected ? "600" : "500",
          color: isSelected ? template.color : colors.textSecondary,
          textAlign: "center",
        }}
      >
        {template.name}
      </Text>
      <Text style={{ fontSize: 12, color: colors.textMuted }}>
        R {template.target.toLocaleString("en-ZA")}
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

export default function GoalsScreen() {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

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
    setTargetAmount(num > 0 ? num.toLocaleString("en-ZA") : "");
  }, []);

  const handleTemplateSelect = (template: (typeof GOAL_TEMPLATES)[0]) => {
    setSelectedTemplate(template.id);
    setGoalName(template.name);
    setTargetAmount(template.target.toLocaleString("en-ZA"));
  };

  const isValid = goalName.trim().length >= 2 && targetAmount.length > 0;

  return (
    <OnboardingScreenWrapper
      step={6}
      glowColor={colors.gold}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton
            variant="primary"
            size="lg"
            disabled={!isValid}
            onPress={() => router.push("/complete")}
          >
            Continue
          </NummusButton>
          <Pressable
            onPress={() => router.push("/complete")}
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
          <MountainPeak size={180} />
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
            Set Your First Goal
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
            Emergency fund? New laptop? Holiday? Name it, set the target, and watch it grow.
          </Text>
        </AnimatedView>

        {/* Quick Templates */}
        <AnimatedView style={[{ marginBottom: 24 }, contentStyle]}>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 10 }}>
            Quick Start
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {GOAL_TEMPLATES.map((template) => (
              <GoalTemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onPress={() => handleTemplateSelect(template)}
              />
            ))}
          </View>
        </AnimatedView>

        {/* Form */}
        <AnimatedView style={[{ gap: 20 }, contentStyle]}>
          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>
              Goal Name
            </Text>
            <TextInput
              value={goalName}
              onChangeText={setGoalName}
              placeholder="e.g. Emergency Fund"
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
                borderColor: goalName.length > 0 ? colors.gold : colors.hover,
              }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>
              Target Amount (ZAR)
            </Text>
            <TextInput
              value={targetAmount ? `R ${targetAmount}` : ""}
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
                borderColor: targetAmount.length > 0 ? colors.gold : colors.hover,
                fontVariant: ["tabular-nums"],
              }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 8 }}>
              Target Date (Optional)
            </Text>
            <TextInput
              value={targetDate}
              onChangeText={setTargetDate}
              placeholder="DD / MM / YYYY"
              placeholderTextColor={colors.textDisabled}
              keyboardType="numeric"
              style={{
                height: 56,
                backgroundColor: colors.surfaceRaised,
                borderRadius: 16,
                paddingHorizontal: 20,
                fontSize: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: targetDate.length > 0 ? colors.gold : colors.hover,
              }}
            />
          </View>
        </AnimatedView>
      </ScrollView>
    </OnboardingScreenWrapper>
  );
}
