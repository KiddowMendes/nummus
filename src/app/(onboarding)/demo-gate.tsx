import React, { useEffect, useRef } from "react";
import { View, Text } from "@/tw";
import { Animated } from "react-native";
import { router } from "expo-router";
import CoinBreath from "@/components/coin-breath";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DemoGateScreen() {
  const coinFade = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(coinFade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonsFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleStart = () => {
    router.push("/(onboarding)/name");
  };

  const handleDemo = () => {
    router.push("/demo/(tabs)");
  };

  return (
    <SafeAreaView scrollable={false}>
      <View className="flex-1 px-6">
        {/* Progress dots */}
        <View className="pt-8">
          <ProgressDots total={10} current={1} />
        </View>

        {/* Hero coin */}
        <AnimatedView
          className="items-center justify-center flex-1"
          style={{ opacity: coinFade }}
        >
          <CoinBreath
            size="hero"
            showLogo={true}
            animate={true}
            rotationDuration={15000}
          />
        </AnimatedView>

        {/* Text content */}
        <AnimatedView
          className="items-center"
          style={{
            opacity: textFade,
            transform: [{ translateY: textSlide }],
          }}
        >
          <Text className="text-text-primary text-[32px] font-bold leading-tight text-center">
            Welcome to Nummus
          </Text>
          <Text className="text-text-secondary text-base text-center mt-3 leading-5">
            Track your money. Own your future.
          </Text>
          <Text className="text-text-muted text-sm text-center mt-1">
            South African finance, simplified.
          </Text>
        </AnimatedView>

        {/* Action buttons */}
        <AnimatedView
          className="pt-8 pb-8 gap-4"
          style={{
            opacity: buttonsFade,
            transform: [{ translateY: buttonsSlide }],
          }}
        >
          <Button variant="primary" size="lg" onPress={handleStart}>
            Start My Vault
          </Button>

          <Button variant="secondary" size="lg" onPress={handleDemo}>
            👀 See Demo First
          </Button>

          <Text className="text-text-disabled text-xs text-center">
            No account needed. Your data stays on your device.
          </Text>
        </AnimatedView>
      </View>
    </SafeAreaView>
  );
}
