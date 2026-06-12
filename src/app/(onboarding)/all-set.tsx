import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Vibration } from "react-native";
import { View, Text } from "@/tw";
import Svg, { Path, Circle } from "react-native-svg";
import { router } from "expo-router";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { Button } from "@/components/ui/button";
import CoinBreath from "@/components/coin-breath";

const AnimatedView = Animated.createAnimatedComponent(View);

const XP_ITEMS = [
  { name: "First Steps", xp: "+50" },
  { name: "Bank Linked", xp: "+100" },
  { name: "Budget Created", xp: "+75" },
  { name: "Goal Set", xp: "+75" },
];

export default function AllSetScreen() {
  const { setHasCompletedOnboarding } = useOnboardingStore();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const glowPing1 = useRef(new Animated.Value(0)).current;
  const glowPing2 = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const itemsFade = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Vibration.vibrate([0, 50, 100, 50]);

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPing1, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowPing1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(glowPing2, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowPing2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(itemsFade, {
      toValue: 1,
      duration: 500,
      delay: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(barWidth, {
      toValue: 1,
      duration: 800,
      delay: 1400,
      useNativeDriver: false,
    }).start();

    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 400,
      delay: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleEnterVault = () => {
    setHasCompletedOnboarding(true);
    router.replace("/demo/(tabs)");
  };

  const progressWidth = barWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "60%"],
  });

  return (
    <SafeAreaView scrollable={false}>
      <View className="flex-1 px-6">
        {/* All dots filled */}
        <View className="flex-row justify-center gap-2 pt-8 mb-8">
          {[...Array(10)].map((_, i) => (
            <View key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
          ))}
        </View>

        {/* Coin with glow rings */}
        <View className="items-center pt-2">
          <View className="items-center justify-center w-[180px] h-[180px]">
            <AnimatedView
              style={[
                styles.pingRing,
                {
                  opacity: glowPing1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 0],
                  }),
                  transform: [
                    {
                      scale: glowPing1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <AnimatedView
              style={[
                styles.pingRing,
                {
                  opacity: glowPing2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 0],
                  }),
                  transform: [
                    {
                      scale: glowPing2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <AnimatedView style={{ transform: [{ scale: scaleAnim }] }}>
              <CoinBreath
                size="xl"
                showLetter={true}
                animate={true}
                rotationDuration={15000}
              />
            </AnimatedView>
          </View>
        </View>

        {/* Level badge + title */}
        <AnimatedView
          className="items-center mt-8"
          style={{ opacity: fadeIn }}
        >
          <View className="px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 mb-4">
            <Text className="text-gold text-xs font-bold tracking-widest uppercase">
              Level 1: Denarius
            </Text>
          </View>
          <Text className="text-text-primary text-[28px] font-bold leading-tight text-center">
            {"You're all set!"}
          </Text>
        </AnimatedView>

        {/* XP items */}
        <AnimatedView
          className="w-full mt-8 gap-3"
          style={{ opacity: itemsFade }}
        >
          {XP_ITEMS.map((item, i) => (
            <AnimatedView
              key={item.name}
              className="flex-row items-center justify-between bg-surface/50 px-4 py-3.5 rounded-xl border border-white/5"
            >
              <View className="flex-row items-center gap-3">
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Circle cx="12" cy="12" r="10" stroke="#34D399" strokeWidth="1.5" />
                  <Path
                    d="m8 12 3 3 5-5"
                    stroke="#34D399"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text className="text-text-primary text-sm font-medium">
                  {item.name}
                </Text>
              </View>
              <Text className="text-gold text-sm font-bold">{item.xp} XP</Text>
            </AnimatedView>
          ))}
        </AnimatedView>

        {/* XP progress bar */}
        <AnimatedView className="w-full mt-6" style={{ opacity: itemsFade }}>
          <View className="flex-row justify-between mb-2">
            <Text className="text-text-muted text-xs font-semibold">Total XP</Text>
            <Text className="text-text-muted text-xs font-semibold">300 / 500</Text>
          </View>
          <View className="h-2 rounded-full overflow-hidden">
            <Animated.View
              style={[
                styles.xpBar,
                { width: progressWidth },
              ]}
            />
          </View>
        </AnimatedView>
      </View>

      {/* Bottom button */}
      <AnimatedView
        className="px-6 pb-8 pt-4"
        style={{ opacity: buttonFade }}
      >
        <Button variant="primary" size="lg" onPress={handleEnterVault}>
          Go to Dashboard
        </Button>
      </AnimatedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pingRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  xpBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FCD34D",
    shadowColor: "#FCD34D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
