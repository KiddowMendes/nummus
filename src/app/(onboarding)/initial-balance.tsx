import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable } from "@/tw";
import { Animated, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";

const AnimatedView = Animated.createAnimatedComponent(View);

const QUICK_AMOUNTS = ["500", "1000", "2500", "5000", "10000", "25000"];

export default function InitialBalanceScreen() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const iconFade = useRef(new Animated.Value(0)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const fillAnim = useRef(new Animated.Value(0)).current;
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

    // Animate jar fill when amount changes
    if (amount) {
      const parsed = Math.min(parseInt(amount) / 25000, 1);
      Animated.timing(fillAnim, {
        toValue: parsed,
        duration: 600,
        useNativeDriver: false,
      }).start();
    } else {
      fillAnim.setValue(0);
    }
  }, [amount]);

  const handleAmountPress = (val: string) => {
    setAmount(val);
  };

  const handleContinue = () => {
    router.push("/(onboarding)/budget");
  };

  const handleSkip = () => {
    router.push("/(onboarding)/budget");
  };

  const numericAmount = amount.replace(/[^0-9]/g, "");
  const displayAmount = numericAmount
    ? `R ${parseInt(numericAmount).toLocaleString()}`
    : "";

  return (
    <SafeAreaView scrollable scrollableContentClassName="flex-grow px-6 pt-6 pb-8">
      <View className="mb-6">
        <ProgressDots total={10} current={7} />
      </View>

      {/* Jar illustration */}
      <AnimatedView
        className="items-center pt-4"
        style={{
          opacity: iconFade,
          transform: [{ translateY: iconFloat }],
        }}
      >
        <View className="w-[120px] h-[140px] mb-8 items-center">
          {/* Jar body */}
          <View className="w-[100px] h-[120px] rounded-3xl border-2 border-white/10 overflow-hidden relative bg-white/5">
            {/* Liquid fill */}
            <Animated.View
              style={[
                styles.jarFill,
                {
                  height: fillAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "70%"],
                  }),
                },
              ]}
            />
            {/* Coin sparkles */}
            <View className="absolute top-4 left-[30%] w-5 h-5 rounded-full bg-gold opacity-80 shadow-sm" />
            <View
              className="absolute top-10 left-[60%] w-4 h-4 rounded-full bg-gold opacity-60 shadow-sm"
            />
          </View>
          {/* Jar lip */}
          <View className="w-[80px] h-5 rounded-t-full border-2 border-white/20 bg-white/5 -mt-1" />
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
          Add starting balance
        </Text>
        <Text className="text-text-secondary text-base leading-5 text-center mb-6">
          How much is in your account right now?
        </Text>
      </AnimatedView>

      {/* Amount display */}
      {displayAmount ? (
        <Text className="text-text-primary text-4xl font-bold text-center tabular-nums mb-6">
          {displayAmount}
        </Text>
      ) : null}

      {/* Amount input */}
      <View className="relative mb-4">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <Text className="text-text-primary text-lg font-semibold">R</Text>
        </View>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0"
          keyboardType="number-pad"
          placeholderTextColor="rgba(148,163,184,0.4)"
          className="w-full h-14 bg-surface rounded-xl pl-10 pr-4 text-base text-text-primary font-bold tabular-nums"
        />
      </View>

      {/* Quick amount chips */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {QUICK_AMOUNTS.map((val) => (
          <Pressable
            key={val}
            onPress={() => handleAmountPress(val)}
            style={[
              styles.chip,
              amount === val && styles.chipSelected,
            ]}
          >
            <Text
              className={`text-sm font-semibold ${
                amount === val ? "text-primary" : "text-text-secondary"
              }`}
            >
              R {parseInt(val).toLocaleString()}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Bottom buttons */}
      <AnimatedView
        className="pt-4 gap-4 mt-auto"
        style={{
          opacity: buttonsFade,
          transform: [{ translateY: buttonsSlide }],
        }}
      >
        <Button variant="primary" size="lg" onPress={handleContinue}>
          {amount ? "Add balance" : "Skip"}
        </Button>

        {amount ? (
          <Pressable onPress={handleSkip} className="items-center py-2">
            <Text className="text-text-muted text-sm">Skip for now</Text>
          </Pressable>
        ) : null}
      </AnimatedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  jarFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(52,211,153,0.6)",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
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
});
