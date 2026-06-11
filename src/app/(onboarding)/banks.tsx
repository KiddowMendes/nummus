import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
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

function BankGridItem({
  bank,
  isSelected,
  onSelect,
  index,
}: {
  bank: Bank;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const scale = useSharedValue(1);
  const entrance = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    entrance.value = withDelay(index * 60, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(index * 60, withTiming(0, { duration: 300 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        {
          flex: 1,
          minWidth: "30%",
          aspectRatio: 1.2,
          borderRadius: 16,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: isSelected ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.06)",
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={[bank.gradientFrom, bank.gradientTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          padding: 14,
          justifyContent: "space-between",
        }}
      >
        {/* Top row: Initial + checkmark */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
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
            <Text style={{ fontSize: 12, fontWeight: "700", color: "white" }}>
              {bank.shortName.charAt(0)}
            </Text>
          </View>

          {isSelected && (
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: bank.gradientFrom, fontWeight: "800" }}>
                ✓
              </Text>
            </View>
          )}
        </View>

        {/* Bank name at bottom */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "white",
            textShadowColor: "rgba(0,0,0,0.4)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
          numberOfLines={1}
        >
          {bank.shortName}
        </Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function BanksScreen() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withDelay(200, withTiming(1, { duration: 500 }));
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
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
            {hasSelection
              ? `Continue (${selectedIds.length} bank${selectedIds.length > 1 ? "s" : ""})`
              : "Select at least one bank"}
          </NummusButton>
          <Pressable
            onPress={() => router.push("/income")}
            style={{ alignItems: "center", paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>
              I&apos;ll do this later
            </Text>
          </Pressable>
        </AnimatedView>
      }
    >
      <View style={{ paddingTop: 8 }}>
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
            Tap to select your South African banks
          </Text>
        </AnimatedView>

        {/* Bank Grid — 2 columns, clean, tappable */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {SEED_BANKS.map((bank, index) => (
            <BankGridItem
              key={bank.id}
              bank={bank}
              index={index}
              isSelected={selectedIds.includes(bank.id)}
              onSelect={() => toggleBank(bank.id)}
            />
          ))}
        </View>

        {/* Selected summary */}
        {selectedIds.length > 0 && (
          <AnimatedView
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.hover,
              marginBottom: 16,
            }}
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
              Selected ({selectedIds.length})
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
      </View>
    </OnboardingScreenWrapper>
  );
}