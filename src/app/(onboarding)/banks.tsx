// app/(onboarding)/banks.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { SEED_BANKS, type Bank } from "@/constants/banks";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function BankCardItem({
  bank,
  index,
  isSelected,
  onSelect,
  totalCards,
}: {
  bank: Bank;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  totalCards: number;
}) {
  const scale = useSharedValue(1);
  const entranceY = useSharedValue(40);
  const entranceOpacity = useSharedValue(0);

  useEffect(() => {
    // Staggered fan-out entrance
    entranceY.value = withDelay(
      index * 80,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.back(1.2)) })
    );
    entranceOpacity.value = withDelay(index * 80, withTiming(1, { duration: 400 }));
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: entranceY.value },
      { scale: scale.value },
    ],
    opacity: entranceOpacity.value,
  }));

  // Calculate fan rotation: center card = 0°, outer cards tilt outward
  const centerIndex = (totalCards - 1) / 2;
  const rotation = (index - centerIndex) * 4; // ±12° max rotation

  return (
    <AnimatedPressable
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        {
          width: 140,
          height: 90,
          borderRadius: 16,
          overflow: "hidden",
          marginHorizontal: -30, // Overlap cards
          borderWidth: 2,
          borderColor: isSelected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.08)",
          transform: [{ rotateZ: `${rotation}deg` }],
          zIndex: isSelected ? 10 : totalCards - Math.abs(index - centerIndex),
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={[bank.gradientFrom, bank.gradientTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, padding: 12, justifyContent: "space-between" }}
      >
        {/* Bank logo placeholder - circle with initial */}
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "white",
            }}
          >
            {bank.shortName.charAt(0)}
          </Text>
        </View>

        {/* Bank name */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: "white",
            textShadowColor: "rgba(0,0,0,0.3)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}
          numberOfLines={1}
        >
          {bank.shortName}
        </Text>

        {/* Selection indicator */}
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 12, color: bank.gradientFrom, fontWeight: "700" }}>
              ✓
            </Text>
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function BanksScreen() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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
  const selectedListStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 300 }),
    transform: [{ translateY: withTiming(0, { duration: 300 }) }],
  }));

  const toggleBank = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const hasSelection = selectedIds.length > 0;

  return (
    <OnboardingScreenWrapper
      step={3}
      glowColor={colors.primary}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton
            variant="primary"
            size="lg"
            disabled={!hasSelection}
            onPress={() => router.push("/income")}
          >
            {selectedIds.length > 0
              ? `Continue (${selectedIds.length} bank${selectedIds.length > 1 ? "s" : ""})`
              : "Select at least one bank"}
          </NummusButton>
          <Pressable
            onPress={() => router.push("/income")}
            style={{ alignItems: "center", paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>
              I\u2019ll do this later
            </Text>
          </Pressable>
        </AnimatedView>
      }
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <AnimatedView style={[{ alignItems: "center", marginTop: 24, marginBottom: 32 }, contentStyle]}>
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
            Link Your Accounts
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
            Connect up to 7 South African banks to track everything in one place.
          </Text>
        </AnimatedView>

        {/* Fanned Bank Cards */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 140,
            marginBottom: 32,
          }}
        >
          {SEED_BANKS.map((bank, index) => (
            <BankCardItem
              key={bank.id}
              bank={bank}
              index={index}
              isSelected={selectedIds.includes(bank.id)}
              onSelect={() => toggleBank(bank.id)}
              totalCards={SEED_BANKS.length}
            />
          ))}
        </View>

        {/* Selected banks list (appears when selected) */}
        {selectedIds.length > 0 && (
          <AnimatedView
            style={[
              {
                backgroundColor: colors.surface,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.hover,
              },
              selectedListStyle,
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              Selected Banks
            </Text>
            {selectedIds.map((id) => {
              const bank = SEED_BANKS.find((b) => b.id === id);
              if (!bank) return null;
              return (
                <View
                  key={id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: bank.gradientFrom,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                    {bank.name}
                  </Text>
                </View>
              );
            })}
          </AnimatedView>
        )}

        {/* Bank count indicator */}
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={{ fontSize: 13, color: colors.textMuted }}>
            {selectedIds.length} of {SEED_BANKS.length} selected
          </Text>
        </View>
      </View>
    </OnboardingScreenWrapper>
  );
}