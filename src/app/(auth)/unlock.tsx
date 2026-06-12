import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { useOnboardingStore } from "@/stores/onboarding-store";
import CoinBreath from "@/components/coin-breath";

const PIN_LENGTH = 4;
const AnimatedView = Animated.createAnimatedComponent(View);

export default function UnlockScreen() {
  const { demoName, pin: storedPin, setHasCompletedOnboarding } = useOnboardingStore();
  const [enteredPin, setEnteredPin] = useState("");
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (enteredPin.length === PIN_LENGTH) {
      if (enteredPin === storedPin) {
        // Success - enter app
        const timer = setTimeout(() => {
          router.replace("/demo/(tabs)");
        }, 150);
        return () => clearTimeout(timer);
      } else {
        // Wrong PIN
        setEnteredPin("");
        setError("Incorrect PIN");
        shake();
        setShakeKey((k) => k + 1);
      }
    }
  }, [enteredPin, storedPin]);

  const handlePress = (digit: string) => {
    if (enteredPin.length < PIN_LENGTH) {
      setEnteredPin((p) => p + digit);
      setError("");
    }
  };

  const handleBackspace = () => {
    setEnteredPin((p) => p.slice(0, -1));
    setError("");
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleReset = () => {
    // Clear all data and restart onboarding
    setHasCompletedOnboarding(false);
    router.replace("/(onboarding)/breath");
  };

  return (
    <View className="flex-1 bg-background items-center px-6">
      <AnimatedView
        className="flex-1 items-center justify-center w-full"
        style={{ opacity: fadeIn }}
      >
        {/* Coin */}
        <CoinBreath size="medium" showLetter={true} animate={true} rotationDuration={20000} />

        {/* Greeting */}
        <Text className="text-text-primary text-2xl font-bold mt-8">
          Welcome back{demoName ? `, ${demoName}` : ""}
        </Text>
        <Text className="text-text-muted text-sm mt-2">
          Enter your PIN to unlock
        </Text>

        {/* PIN dots */}
        <AnimatedView
          key={shakeKey}
          className="flex-row justify-center gap-4 mt-10"
          style={{ transform: [{ translateX: shakeAnim }] }}
        >
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < enteredPin.length ? styles.dotFilled : styles.dotEmpty,
              ]}
            />
          ))}
        </AnimatedView>

        {error ? (
          <Text className="text-red-400 text-sm text-center mt-4">{error}</Text>
        ) : null}

        {/* Forgot PIN */}
        <Pressable className="mt-6" onPress={handleReset}>
          <Text className="text-primary text-sm">Forgot PIN? Start over</Text>
        </Pressable>
      </AnimatedView>

      {/* Numpad */}
      <View className="pb-10 w-full">
        <View className="flex-row flex-wrap justify-center gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <Pressable
              key={digit}
              style={styles.numpadButton}
              onPress={() => handlePress(digit.toString())}
              className="items-center justify-center"
            >
              <Text className="text-text-primary text-2xl font-semibold">
                {digit}
              </Text>
            </Pressable>
          ))}
          <View style={styles.numpadButton} />
          <Pressable
            style={styles.numpadButton}
            onPress={() => handlePress("0")}
            className="items-center justify-center"
          >
            <Text className="text-text-primary text-2xl font-semibold">0</Text>
          </Pressable>
          <Pressable
            style={styles.numpadButton}
            onPress={handleBackspace}
            className="items-center justify-center"
          >
            <Text className="text-text-secondary text-xl">⌫</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  dotEmpty: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "transparent",
  },
  dotFilled: {
    borderColor: "#D4AF37",
    backgroundColor: "#D4AF37",
  },
  numpadButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
});