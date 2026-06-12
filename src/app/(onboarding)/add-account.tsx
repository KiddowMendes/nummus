import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "@/tw";
import { Animated, StyleSheet } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";
import { SEED_BANKS, type Bank } from "@/constants/banks";

const AnimatedView = Animated.createAnimatedComponent(View);

function BankCard({
  bank,
  isSelected,
  onPress,
  index,
}: {
  bank: Bank;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 300 + index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: 300 + index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <AnimatedView
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Pressable
        onPress={onPress}
        className="rounded-2xl overflow-hidden"
        style={styles.cardPressable}
      >
        <View className="h-28 p-4 relative">
          <LinearGradient
            colors={[bank.gradientFrom, bank.gradientTo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={StyleSheet.absoluteFill}
            className="bg-black/10"
          />

          <View className="flex-row justify-between items-start relative z-10">
            <View className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center">
              <Text className="text-white text-sm font-bold drop-shadow-sm">
                {bank.shortName.charAt(0)}
              </Text>
            </View>
            {isSelected && (
              <View className="w-6 h-6 rounded-full bg-white items-center justify-center">
                <Text className="text-black text-[11px] font-bold">✓</Text>
              </View>
            )}
          </View>

          <Text className="text-white text-sm font-bold drop-shadow-md absolute bottom-4 left-4">
            {bank.shortName}
          </Text>
        </View>

        {isSelected && (
          <View className="h-0.5 bg-white/40" />
        )}
      </Pressable>
    </AnimatedView>
  );
}

export default function AddAccountScreen() {
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(textFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonsFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const toggleBank = (id: string) => {
    setSelectedBanks((prev) =>
      prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.push("/(onboarding)/goal");
  };

  const handleSkip = () => {
    router.push("/(onboarding)/goal");
  };

  return (
    <SafeAreaView scrollable scrollableContentClassName="flex-grow px-6 pt-6 pb-8">
      <View className="pt-8 mb-6">
        <ProgressDots total={10} current={5} />
      </View>

      <AnimatedView
        style={{
          opacity: textFade,
          transform: [{ translateY: textSlide }],
        }}
      >
        <Text className="text-text-primary text-[28px] font-bold leading-tight mb-2">
          Link Your Accounts
        </Text>
        <Text className="text-text-secondary text-base leading-5 mb-6">
          Tap to select your South African banks
        </Text>
      </AnimatedView>

      <View className="pb-6 gap-3">
        {SEED_BANKS.reduce<Bank[][]>((rows, bank, i) => {
          if (i % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(bank);
          return rows;
        }, []).map((row, rowIdx) => (
          <View key={rowIdx} className="flex-row gap-3">
            {row.map((bank) => {
              const idx = SEED_BANKS.indexOf(bank);
              return (
                <View key={bank.id} className="flex-1">
                  <BankCard
                    bank={bank}
                    isSelected={selectedBanks.includes(bank.id)}
                    onPress={() => toggleBank(bank.id)}
                    index={idx}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <AnimatedView
        className="pt-4 gap-4"
        style={{
          opacity: buttonsFade,
          transform: [{ translateY: buttonsSlide }],
        }}
      >
        <Button variant="primary" size="lg" onPress={handleContinue}>
          {selectedBanks.length > 0
            ? `Continue (${selectedBanks.length} bank${selectedBanks.length > 1 ? "s" : ""})`
            : "Continue"}
        </Button>

        <Pressable onPress={handleSkip} className="items-center py-2">
          <Text className="text-text-muted text-sm">{"I'll do this later"}</Text>
        </Pressable>
      </AnimatedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardPressable: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
