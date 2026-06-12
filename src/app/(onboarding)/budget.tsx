import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "@/tw";
import { Animated, TextInput, StyleSheet } from "react-native";
import Svg, { Circle, Line, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";

const AnimatedView = Animated.createAnimatedComponent(View);

const CATEGORIES = ["Food", "Transport", "Data & Airtime", "Entertainment", "Shopping", "Health", "Education", "Other"];
const PERIODS = ["Monthly", "Weekly"];

export default function BudgetScreen() {
  const [selectedCat, setSelectedCat] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("Monthly");
  const ringFade = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(ringFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
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

  const handleContinue = () => {
    router.push("/(onboarding)/savings-goal");
  };

  const handleSkip = () => {
    router.push("/(onboarding)/savings-goal");
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference * 0.3;

  const tickMarks = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    x1: 50 + 43 * Math.cos(((i * 30 - 90) * Math.PI) / 180),
    y1: 50 + 43 * Math.sin(((i * 30 - 90) * Math.PI) / 180),
    x2: 50 + 38 * Math.cos(((i * 30 - 90) * Math.PI) / 180),
    y2: 50 + 38 * Math.sin(((i * 30 - 90) * Math.PI) / 180),
  }));

  return (
    <SafeAreaView scrollable scrollableContentClassName="flex-grow px-6 pt-6 pb-8">
      <View className="mb-6">
        <ProgressDots total={10} current={8} />
      </View>

      {/* Budget ring */}
      <AnimatedView
        className="items-center pt-4"
        style={{ opacity: ringFade }}
      >
        <View className="w-[140px] h-[140px] items-center justify-center mb-8">
          <Svg width={140} height={140} viewBox="0 0 100 100" style={{ position: "absolute" }}>
            <Defs>
              <SvgGradient id="budgetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#1657E8" />
                <Stop offset="100%" stopColor="#7C3AED" />
              </SvgGradient>
            </Defs>
            {/* Background ring */}
            <Circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            {/* Progress ring */}
            <Circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#budgetGrad)"
              strokeWidth="7"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            {/* Tick marks */}
            {tickMarks.map((t, i) => (
              <Line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.8"
              />
            ))}
          </Svg>
          <View className="items-center">
            <Text className="text-text-primary text-2xl font-bold">70%</Text>
            <Text className="text-text-muted text-[10px] uppercase tracking-wider">Used</Text>
          </View>
        </View>
      </AnimatedView>

      {/* Title & subtitle */}
      <AnimatedView
        className="items-center"
        style={{
          opacity: textFade,
          transform: [{ translateY: textSlide }],
        }}
      >
        <Text className="text-text-primary text-[28px] font-bold leading-tight text-center mb-2">
          Create your first budget
        </Text>
        <Text className="text-text-secondary text-base leading-5 text-center mb-6">
          Pick a category and set a monthly limit
        </Text>
      </AnimatedView>

      {/* Category chips */}
      <View className="flex-row flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => {
              setSelectedCat(cat);
              if (!budgetName) setBudgetName(cat);
            }}
            style={[
              styles.chip,
              selectedCat === cat && styles.chipSelected,
            ]}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCat === cat ? "text-primary" : "text-text-secondary"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Budget name input */}
      <TextInput
        value={budgetName}
        onChangeText={setBudgetName}
        placeholder="Budget name (e.g. Groceries)"
        placeholderTextColor="rgba(148,163,184,0.4)"
        className="w-full h-14 bg-surface rounded-xl px-4 text-base text-text-primary mb-4"
      />

      {/* Amount + period */}
      <View className="flex-row gap-3 mb-6">
        <View className="relative flex-1">
          <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
            <Text className="text-text-primary text-lg font-semibold">R</Text>
          </View>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor="rgba(148,163,184,0.4)"
            className="w-full h-14 bg-surface rounded-xl pl-10 pr-4 text-base text-text-primary font-bold tabular-nums"
          />
        </View>
        <View className="bg-surface rounded-xl p-1 flex-row">
          {PERIODS.map((p) => (
            <Pressable
              key={p}
              onPress={() => setPeriod(p)}
              style={[
                styles.periodBtn,
                period === p && styles.periodBtnActive,
              ]}
            >
              <Text
                className={`text-sm font-medium ${
                  period === p ? "text-text-primary" : "text-text-muted"
                }`}
              >
                {p}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Bottom buttons */}
      <AnimatedView
        className="pt-4 gap-4"
        style={{
          opacity: buttonsFade,
          transform: [{ translateY: buttonsSlide }],
        }}
      >
        <Button variant="primary" size="lg" onPress={handleContinue}>
          Continue
        </Button>

        <Pressable onPress={handleSkip} className="items-center py-2">
          <Text className="text-text-muted text-sm">Skip</Text>
        </Pressable>
      </AnimatedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  chipSelected: {
    borderColor: "rgba(22,87,232,0.4)",
    backgroundColor: "rgba(22,87,232,0.06)",
  },
  periodBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  periodBtnActive: {
    backgroundColor: "#0D0D14",
  },
});
