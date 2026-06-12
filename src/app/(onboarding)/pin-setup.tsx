import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "@/tw";
import { Animated, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { ProgressDots } from "@/components/ui/progress-dots";
import { Button } from "@/components/ui/button";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const PIN_LENGTH = 4;
const AnimatedView = Animated.createAnimatedComponent(View);

export default function PinSetupScreen() {
  const [pin, setPin] = useState("");
  const inputRef = useRef<TextInput>(null);
  const iconFade = useRef(new Animated.Value(0)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(24)).current;
  const dotsFade = useRef(new Animated.Value(0)).current;
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

  const handleChangeText = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, PIN_LENGTH);
    setPin(digits);
  };

  const handleContinue = () => {
    if (pin.length !== PIN_LENGTH) return;
    router.push({
      pathname: "/(onboarding)/pin-confirm",
      params: { pin },
    });
  };

  const handleSkip = () => {
    router.push("/(onboarding)/add-account");
  };

  const handleDotLayout = () => {
    inputRef.current?.focus();
  };

  const pinArray = [...Array(PIN_LENGTH)].map((_, i) => i < pin.length);

  return (
    <SafeAreaView scrollable={false}>
      <View className="flex-1 px-6">
        {/* Progress dots — step 3 of 8 */}
        <View className="pt-8">
          <ProgressDots total={10} current={3} />
        </View>

        {/* Lock icon */}
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
                <Rect
                  x="5"
                  y="11"
                  width="14"
                  height="11"
                  rx="2"
                  stroke="#1657E8"
                  strokeWidth="1.5"
                />
                <Path
                  d="M8 11V7a4 4 0 0 1 8 0v4"
                  stroke="#1657E8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <Circle cx="12" cy="16" r="1.5" fill="#1657E8" />
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
            Lock your vault
          </Text>
          <Text className="text-text-secondary text-base text-center mt-3 leading-5 px-4">
            Create a 4-digit PIN to secure your data on this device.
          </Text>
        </AnimatedView>

        {/* PIN dots */}
        <AnimatedView
          className="items-center mt-10"
          style={{ opacity: dotsFade }}
          onLayout={handleDotLayout}
        >
          <View className="flex-row gap-4">
            {pinArray.map((filled, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  filled ? styles.dotFilled : styles.dotEmpty,
                ]}
              />
            ))}
          </View>
        </AnimatedView>

        {/* Hidden TextInput captures native number-pad input */}
        <TextInput
          ref={inputRef}
          value={pin}
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
          disabled={pin.length !== PIN_LENGTH}
          onPress={handleContinue}
        >
          Continue
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
