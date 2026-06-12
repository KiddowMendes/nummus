import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "@/tw";
import { Animated, TextInput, Pressable, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";
import Svg, { Path, Circle } from "react-native-svg";

const PIN_LENGTH = 4;
const AnimatedView = Animated.createAnimatedComponent(View);

export default function PinConfirmScreen() {
  const { pin: originalPin } = useLocalSearchParams<{ pin: string }>();
  const { setPin } = useOnboardingStore();
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);
  const iconFade = useRef(new Animated.Value(0)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const dotsFade = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
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
      Animated.timing(dotsFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
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

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleChangeText = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, PIN_LENGTH);
    setConfirmPin(digits);
    setError("");
  };

  const handleContinue = () => {
    if (confirmPin.length !== PIN_LENGTH) return;

    if (confirmPin === originalPin) {
      setPin(confirmPin);
      router.push("/(onboarding)/add-account");
    } else {
      setConfirmPin("");
      setError("PINs don't match. Try again.");
      shake();
      inputRef.current?.focus();
    }
  };

  const handleSkip = () => {
    router.push("/(onboarding)/add-account");
  };

  const pinArray = [...Array(PIN_LENGTH)].map((_, i) => i < confirmPin.length);

  return (
    <SafeAreaView scrollable={false}>
      <View className="flex-1 px-6">
        {/* Progress dots — step 4 of 8 */}
        <View className="pt-8">
          <ProgressDots total={10} current={4} />
        </View>

        {/* Shield icon */}
        <AnimatedView
          className="items-center justify-center pt-10"
          style={{
            opacity: iconFade,
            transform: [{ translateY: iconFloat }],
          }}
        >
          <View className="w-[120px] h-[120px] rounded-[32px] items-center justify-center mb-10 overflow-hidden">
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: "rgba(22,87,232,0.15)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(22,87,232,0.35)",
              }}
            >
              <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 3L4 7v5c0 4.4 3.6 8 8 8s8-3.6 8-8V7l-8-4z"
                  stroke="#1657E8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="m9 12 2 2 4-4"
                  stroke="#1657E8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
          <Text className="text-text-primary text-[28px] font-bold leading-tight text-center">
            Confirm your PIN
          </Text>
          <Text className="text-text-secondary text-base text-center mt-3 leading-5 px-4">
            Enter it once more to be sure.
          </Text>
        </AnimatedView>

        {/* PIN dots with shake */}
        <AnimatedView
          className="items-center mt-10"
          style={{ opacity: dotsFade }}
        >
          <Animated.View
            className="flex-row gap-4"
            style={{ transform: [{ translateX: shakeAnim }] }}
          >
            {pinArray.map((filled, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  filled ? styles.dotFilled : styles.dotEmpty,
                ]}
              />
            ))}
          </Animated.View>
        </AnimatedView>

        {/* Error message */}
        {error ? (
          <Text className="text-red-400 text-xs text-center mt-4">{error}</Text>
        ) : null}

        {/* Hidden TextInput captures native number-pad input */}
        <TextInput
          ref={inputRef}
          value={confirmPin}
          onChangeText={handleChangeText}
          keyboardType="number-pad"
          maxLength={PIN_LENGTH}
          autoFocus
          style={styles.hiddenInput}
        />
      </View>

      {/* Bottom buttons */}
      <AnimatedView
        className="px-6 pb-8 pt-8 gap-4"
        style={{
          opacity: buttonsFade,
          transform: [{ translateY: buttonsSlide }],
        }}
      >
        <Button
          variant="primary"
          size="lg"
          disabled={confirmPin.length !== PIN_LENGTH}
          onPress={handleContinue}
        >
          Confirm
        </Button>

        <Pressable onPress={handleSkip} className="items-center py-2">
          <Text className="text-text-muted text-sm">Skip for now</Text>
        </Pressable>
      </AnimatedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  dotEmpty: {
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "transparent",
  },
  dotFilled: {
    borderColor: "#1657E8",
    backgroundColor: "#1657E8",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
