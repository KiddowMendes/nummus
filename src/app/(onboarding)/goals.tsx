import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
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
import Svg, { Path, Defs, LinearGradient, Stop, Polygon } from "react-native-svg";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

// ─── Mountain Peak Illustration — FIXED: No useAnimatedProps on SVG ──

function MountainPeak({ size = 180 }: { size?: number }) {
  const layer1Y = useSharedValue(30);
  const layer2Y = useSharedValue(20);
  const layer3Y = useSharedValue(10);
  const flagScale = useSharedValue(0);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    // Animate layers sliding up
    layer1Y.value = withDelay(300, withTiming(0, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));
    layer2Y.value = withDelay(500, withTiming(0, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));
    layer3Y.value = withDelay(700, withTiming(0, { duration: 600, easing: Easing.out(Easing.back(1.2)) }));
    flagScale.value = withDelay(1000, withSpring(1, { damping: 12, stiffness: 150 }));
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

  const layer1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: layer1Y.value }],
    opacity: interpolate(layer1Y.value, [30, 0], [0, 1]),
  }));

  const layer2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: layer2Y.value }],
    opacity: interpolate(layer2Y.value, [20, 0], [0, 1]),
  }));

  const layer3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: layer3Y.value }],
    opacity: interpolate(layer3Y.value, [10, 0], [0, 1]),
  }));

  const flagStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flagScale.value }, { rotateZ: `${interpolate(flagScale.value, [0, 1], [-10, 0])}deg` }],
    opacity: flagScale.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.06, 0.15]),
  }));

  const scale = size / 200;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Glow */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: (size * 1.3) / 2,
            backgroundColor: colors.gold,
          },
          glowStyle,
        ]}
      />

      {/* Layer 1 — Base mountain (wrapped in Animated.View, NOT animating SVG props) */}
      <Animated.View style={[{ position: "absolute", bottom: 0 }, layer1Style]}>
        <Svg width={size} height={size * 0.6} viewBox="0 0 200 120">
          <Defs>
            <LinearGradient id="layer1" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#111827" stopOpacity="0.95" />
            </LinearGradient>
          </Defs>
          <Path d="M0 120 L100 20 L200 120 Z" fill="url(#layer1)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </Svg>
      </Animated.View>

      {/* Layer 2 */}
      <Animated.View style={[{ position: "absolute", bottom: 0 }, layer2Style]}>
        <Svg width={size * 0.8} height={size * 0.65} viewBox="0 0 160 130">
          <Defs>
            <LinearGradient id="layer2" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
            </LinearGradient>
          </Defs>
          <Path d="M0 130 L80 10 L160 130 Z" fill="url(#layer2)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </Svg>
      </Animated.View>

      {/* Layer 3 — Peak */}
      <Animated.View style={[{ position: "absolute", bottom: 0 }, layer3Style]}>
        <Svg width={size * 0.6} height={size * 0.7} viewBox="0 0 120 140">
          <Defs>
            <LinearGradient id="layer3" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#475569" stopOpacity="0.7" />
              <Stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
            </LinearGradient>
            <LinearGradient id="flagGold" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="100%" stopColor="#F59E0B" />
            </LinearGradient>
          </Defs>
          <Path d="M0 140 L60 0 L120 140 Z" fill="url(#layer3)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Snow cap */}
          <Path d="M45 35 L60 0 L75 35 Q60 40 45 35 Z" fill="rgba(255,255,255,0.12)" />
        </Svg>
      </Animated.View>

      {/* Flag — separate animated view on top */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: size * 0.12,
            left: size * 0.46,
          },
          flagStyle,
        ]}
      >
        <Svg width={24} height={32} viewBox="0 0 24 32">
          <Defs>
            <LinearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="100%" stopColor="#F59E0B" />
            </LinearGradient>
          </Defs>
          <Path d="M12 32 L12 8" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
          <Polygon points="12,8 32,14 12,20" fill="url(#flagGrad)" />
        </Svg>
      </Animated.View>
    </View>
  );
}

// ─── Goal Templates & Main Screen (unchanged logic, fixed layout) ──

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
      <View style={{ paddingTop: 8 }}>
        {/* Illustration */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <MountainPeak size={160} />
        </View>

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
      </View>
    </OnboardingScreenWrapper>
  );
}