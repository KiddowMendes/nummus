import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "@/tw";
import { Animated, TextInput, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";

const AnimatedView = Animated.createAnimatedComponent(View);

const TEMPLATES = [
  { id: "emergency", name: "Emergency Fund", amount: "10000" },
  { id: "gadget", name: "New Gadget", amount: "15000" },
  { id: "holiday", name: "Holiday", amount: "20000" },
  { id: "education", name: "Education", amount: "25000" },
];

export default function SavingsGoalScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
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

  const handleTemplatePress = (t: (typeof TEMPLATES)[number]) => {
    setSelectedTemplate(t.id);
    if (!goalName) setGoalName(t.name);
    setTargetAmount(t.amount);
  };

  const handleContinue = () => {
    router.push("/(onboarding)/all-set");
  };

  const handleSkip = () => {
    router.push("/(onboarding)/all-set");
  };

  return (
    <SafeAreaView scrollable scrollableContentClassName="flex-grow px-6 pt-6 pb-8">
      <View className="mb-6">
        <ProgressDots total={10} current={9} />
      </View>

      {/* Flag mountain illustration */}
      <AnimatedView
        className="items-center pt-4"
        style={{
          opacity: iconFade,
          transform: [{ translateY: iconFloat }],
        }}
      >
        <View className="w-[140px] h-[110px] rounded-2xl overflow-hidden mb-8 bg-surface relative">
          {/* Mountains */}
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
              left: 40,
              width: 90,
              height: 90,
              backgroundColor: "#1657E8",
              transform: [{ rotate: "45deg" }, { translateY: 40 }],
              borderRadius: 8,
              opacity: 0.7,
            }}
          />
          {/* Flag */}
          <View style={{ position: "absolute", top: 22, right: 40 }}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                fill="#FCD34D"
              />
              <Path d="M12 7v10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <Circle cx="12" cy="7" r="2" fill="#FCD34D" />
            </Svg>
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
          Set a savings goal
        </Text>
        <Text className="text-text-secondary text-base leading-5 text-center mb-6">
          Choose a goal or create your own
        </Text>
      </AnimatedView>

      {/* Template cards */}
      <View className="flex-row flex-wrap gap-3 mb-5">
        {TEMPLATES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => handleTemplatePress(t)}
            style={[
              styles.templateCard,
              { width: "47%" },
              selectedTemplate === t.id && styles.templateCardSelected,
            ]}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedTemplate === t.id ? "text-text-primary" : "text-text-primary"
              }`}
            >
              {t.name}
            </Text>
            <Text className="text-text-muted text-xs mt-1">
              R {parseInt(t.amount).toLocaleString()}
            </Text>
            {selectedTemplate === t.id && (
              <View className="w-5 h-5 rounded-full bg-primary items-center justify-center absolute top-3 right-3">
                <Text className="text-background text-[10px] font-bold">✓</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Goal name input */}
      <TextInput
        value={goalName}
        onChangeText={setGoalName}
        placeholder="Goal name"
        placeholderTextColor="rgba(148,163,184,0.4)"
        className="w-full h-14 bg-surface rounded-xl px-4 text-base text-text-primary mb-4"
      />

      {/* Target amount input */}
      <View className="relative mb-4">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <Text className="text-text-primary text-lg font-semibold">R</Text>
        </View>
        <TextInput
          value={targetAmount}
          onChangeText={setTargetAmount}
          placeholder="Target amount"
          keyboardType="number-pad"
          placeholderTextColor="rgba(148,163,184,0.4)"
          className="w-full h-14 bg-surface rounded-xl pl-10 pr-4 text-base text-text-primary font-bold tabular-nums"
        />
      </View>

      {/* Target date input */}
      <View className="relative mb-6">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <Text className="text-base">📅</Text>
        </View>
        <TextInput
          value={targetDate}
          onChangeText={setTargetDate}
          placeholder="Target date"
          placeholderTextColor="rgba(148,163,184,0.4)"
          className="w-full h-14 bg-surface rounded-xl pl-12 pr-4 text-base text-text-primary"
        />
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
  templateCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  templateCardSelected: {
    borderColor: "rgba(22,87,232,0.4)",
    backgroundColor: "rgba(22,87,232,0.06)",
  },
});
