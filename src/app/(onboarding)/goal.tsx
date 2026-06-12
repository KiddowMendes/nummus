import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "@/tw";
import { Animated, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";
import Svg, { Path, Circle } from "react-native-svg";

const AnimatedView = Animated.createAnimatedComponent(View);

const GOALS = [
  { id: "save", title: "Build Savings", emoji: "🏦", desc: "Emergency fund & safety net" },
  { id: "budget", title: "Control Spending", emoji: "🎯", desc: "Stay within your budget" },
  { id: "stokvel", title: "Join a Stokvel", emoji: "🤝", desc: "Community savings power" },
  { id: "invest", title: "Start Investing", emoji: "📈", desc: "Build long-term wealth" },
  { id: "hustle", title: "Grow Side Hustle", emoji: "💼", desc: "Track business income" },
  { id: "goal", title: "Save for a Goal", emoji: "🎯", desc: "Home, car, holiday & more" },
];

function GoalCard({
  goal,
  isSelected,
  onPress,
  index,
}: {
  goal: (typeof GOALS)[number];
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
      className="flex-1"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.card,
          isSelected && styles.cardSelected,
        ]}
      >
        <Text className="text-3xl mb-3">{goal.emoji}</Text>
        <Text
          className={`text-sm font-semibold ${isSelected ? "text-text-primary" : "text-text-primary"}`}
        >
          {goal.title}
        </Text>
        <Text className="text-text-muted text-xs mt-1 leading-4">
          {goal.desc}
        </Text>
        {isSelected && (
          <View className="w-5 h-5 rounded-full bg-primary items-center justify-center absolute top-3 right-3">
            <Text className="text-background text-[10px] font-bold">✓</Text>
          </View>
        )}
      </Pressable>
    </AnimatedView>
  );
}

export default function GoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const iconFade = useRef(new Animated.Value(0)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(iconFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(iconFloat, {
              toValue: -6,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(iconFloat, {
              toValue: 6,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
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
    router.push("/(onboarding)/initial-balance");
  };

  const handleSkip = () => {
    router.push("/(onboarding)/initial-balance");
  };

  return (
    <SafeAreaView scrollable scrollableContentClassName="flex-grow px-6 pt-6 pb-8">
      <View className="mb-6">
        <ProgressDots total={10} current={6} />
      </View>

      {/* Mountain flag illustration */}
      <AnimatedView
        className="items-center pt-4"
        style={{
          opacity: iconFade,
          transform: [{ translateY: iconFloat }],
        }}
      >
        <View className="w-[140px] h-[110px] rounded-2xl overflow-hidden mb-8">
          <View className="flex-1 bg-surface relative">
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: -20,
                width: 100,
                height: 100,
                backgroundColor: "#334155",
                transform: [{ rotate: "45deg" }, { translateY: 40 }],
                borderRadius: 8,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: -30,
                width: 120,
                height: 120,
                backgroundColor: "#475569",
                transform: [{ rotate: "45deg" }, { translateY: 40 }],
                borderRadius: 8,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 30,
                width: 100,
                height: 100,
                backgroundColor: "#1657E8",
                transform: [{ rotate: "45deg" }, { translateY: 40 }],
                borderRadius: 8,
                opacity: 0.7,
              }}
            />
            <Svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: "absolute", top: 20, right: 36 }}
            >
              <Path
                d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                fill="#FCD34D"
              />
              <Path
                d="M12 7v10"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <Circle cx="12" cy="7" r="2" fill="#FCD34D" />
            </Svg>
          </View>
        </View>
      </AnimatedView>

      {/* Title & subtitle */}
      <AnimatedView
        style={{
          opacity: textFade,
          transform: [{ translateY: textSlide }],
        }}
      >
        <Text className="text-text-primary text-[28px] font-bold leading-tight mb-2 text-center">
          What are you building?
        </Text>
        <Text className="text-text-secondary text-base leading-5 mb-6 text-center">
          Pick your main focus. You can always add more later.
        </Text>
      </AnimatedView>

      {/* Goal cards grid */}
      <View className="gap-3 pb-6">
        {[0, 2, 4].map((rowStart) => (
          <View key={rowStart} className="flex-row gap-3">
            {GOALS.slice(rowStart, rowStart + 2).map((goal, i) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                isSelected={selectedGoal === goal.id}
                onPress={() =>
                  setSelectedGoal((prev) =>
                    prev === goal.id ? null : goal.id
                  )
                }
                index={rowStart + i}
              />
            ))}
          </View>
        ))}
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
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  cardSelected: {
    borderColor: "rgba(22,87,232,0.4)",
    backgroundColor: "rgba(22,87,232,0.06)",
  },
});
