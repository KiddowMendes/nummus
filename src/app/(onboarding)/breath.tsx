import {
  View,
  Text,
  Pressable,
} from "@/tw";
import {
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useOnboardingStore } from "@/stores/onboarding-store";
import CoinBreath from "@/components/coin-breath";

const AnimatedView = Animated.createAnimatedComponent(View);
const { width, height } = Dimensions.get("window");

export default function BreathScreen() {
  const { setHasSeenBreath } = useOnboardingStore();
  const [canContinue, setCanContinue] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const tapOpacity = useRef(new Animated.Value(0)).current;
  const tapPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.sequence([
      // Coin fades in
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      // Text slides up
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Wait 1.5s before showing tap prompt
      Animated.delay(1500),
      // Show tap prompt
      Animated.timing(tapOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCanContinue(true);
      // Start tap pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(tapPulse, {
            toValue: 1.1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(tapPulse, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const handleContinue = () => {
    if (!canContinue) return;
    setHasSeenBreath(true);
    router.push("/(onboarding)/demo-gate");
  };

  return (
    <Pressable
      className="flex-1 bg-background items-center justify-center"
      onPress={handleContinue}
    >
      {/* Subtle radial gradient background */}
      <View style={styles.ambientBg} />

      {/* Coin with breathing animation */}
      <AnimatedView
        style={{
          opacity: fadeIn,
          transform: [{ scale: fadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }) }],
        }}
      >
        <CoinBreath size="xl" showLetter={true} animate={true} rotationDuration={25000} />
      </AnimatedView>

      {/* Brand text */}
      <AnimatedView
        style={{
          opacity: fadeIn,
          transform: [{ translateY: slideUp }],
          marginTop: 40,
        }}
      >
        <Text
          style={styles.brandName}
          className="text-primary text-4xl font-bold tracking-tight text-center"
        >
          Nummus
        </Text>
        <Text
          style={styles.tagline}
          className="text-text-muted text-sm text-center mt-3 tracking-wide"
        >
          Your personal treasury
        </Text>
      </AnimatedView>

      {/* Tap to continue prompt */}
      <AnimatedView
        style={{
          opacity: tapOpacity,
          transform: [{ scale: tapPulse }],
          position: "absolute",
          bottom: height * 0.12,
        }}
      >
        <Text
          style={styles.tapPrompt}
          className="text-text-secondary text-xs tracking-widest uppercase"
        >
          Tap anywhere to enter
        </Text>
      </AnimatedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ambientBg: {
    position: "absolute",
    width: width * 1.5,
    height: height * 1.5,
    borderRadius: 999,
    backgroundColor: "rgba(212, 175, 55, 0.03)",
    top: -height * 0.3,
    left: -width * 0.25,
  },
  brandName: {
    textShadowColor: "rgba(212, 175, 55, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
  tagline: {
    opacity: 0.7,
  },
  tapPrompt: {
    opacity: 0.5,
  },
});
