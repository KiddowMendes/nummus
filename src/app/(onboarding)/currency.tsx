import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { OnboardingScreenWrapper } from "@/components/onboardingScreenWrapper";
import { NummusButton } from "@/components/ui/nummusButton";
import { EntranceView } from "@/components/entrance-view";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

function ZARCoin({ size = 160 }: { size?: number }) {
  const flipProgress = useSharedValue(0);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    flipProgress.value = withDelay(
      300,
      withSequence(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0, { duration: 0 })
      )
    );

    glowPulse.value = withDelay(
      900,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, []);

  const coinStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 0.5, 1], [0, 90, 0]);
    const scaleX = interpolate(flipProgress.value, [0, 0.5, 1], [1, 0.1, 1]);

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scaleX },
      ],
    };
  });

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.1, 0.25]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.9, 1.1]) }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: (size * 1.5) / 2,
            backgroundColor: colors.gold,
          },
          glowStyle,
        ]}
      />

      <AnimatedView style={coinStyle}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="zarFace" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="40%" stopColor="#FCD34D" />
              <Stop offset="100%" stopColor="#D97706" />
            </LinearGradient>
            <LinearGradient id="zarEdge" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FEF3C7" />
              <Stop offset="100%" stopColor="#B45309" />
            </LinearGradient>
            <LinearGradient id="zarInner" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#92400E" stopOpacity="0.1" />
            </LinearGradient>
          </Defs>

          <Circle cx="100" cy="100" r="96" fill="url(#zarEdge)" />
          <Circle cx="100" cy="100" r="90" fill="url(#zarFace)" />
          <Circle cx="100" cy="100" r="82" fill="none" stroke="#B45309" strokeWidth="1" opacity={0.3} />
          <Circle cx="100" cy="100" r="78" fill="url(#zarInner)" />

          <Path
            d="M55 55 L55 145 L75 145 L75 110 L85 110 L105 145 L128 145 L103 105 C118 98 125 85 125 70 C125 55 115 45 95 45 L75 45 L55 55 Z"
            fill="none"
            stroke="#92400E"
            strokeWidth="4"
            opacity={0.7}
          />
          <Path
            d="M75 65 L90 65 C100 65 105 70 105 78 C105 86 100 90 90 90 L75 90 Z"
            fill="none"
            stroke="#92400E"
            strokeWidth="3"
            opacity={0.6}
          />
          <Path d="M50 75 L130 75" stroke="#92400E" strokeWidth="2" opacity={0.4} />
          <Path d="M50 85 L130 85" stroke="#92400E" strokeWidth="2" opacity={0.4} />

          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x = 100 + 84 * Math.cos(angle);
            const y = 100 + 84 * Math.sin(angle);
            return <Circle key={i} cx={x} cy={y} r="3" fill="#92400E" opacity={0.4} />;
          })}
        </Svg>
      </AnimatedView>
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

export default function CurrencyScreen() {
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(20);

  useEffect(() => {
    fadeIn.value = withDelay(200, withTiming(1, { duration: 500 }));
    slideUp.value = withDelay(200, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  return (
    <OnboardingScreenWrapper
      step={2}
      glowColor={colors.gold}
      bottomContent={
        <AnimatedView style={contentStyle}>
          <NummusButton
            variant="primary"
            size="lg"
            onPress={() => router.push("/banks")}
          >
            Continue
          </NummusButton>
        </AnimatedView>
      }
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* ZAR Coin Animation */}
        <EntranceView delay={100} style={{ marginBottom: 32 }}>
          <ZARCoin size={160} />
        </EntranceView>

        <AnimatedView style={[{ alignItems: "center" }, contentStyle]}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: colors.textPrimary,
              textAlign: "center",
              marginBottom: 8,
              letterSpacing: -0.5,
            }}
          >
            Your Currency is ZAR
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: 300,
              marginBottom: 8,
            }}
          >
            All amounts are in South African Rand.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textMuted,
              textAlign: "center",
              maxWidth: 280,
            }}
          >
            ZAR is locked for now. Future versions may support multi-currency.
          </Text>
        </AnimatedView>
      </View>
    </OnboardingScreenWrapper>
  );
}
