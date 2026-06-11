// components/AnimatedCoin.tsx
import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";

interface AnimatedCoinProps {
  size?: number;
  glowColor?: string;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function AnimatedCoin({ size = 200, glowColor = colors.primary }: AnimatedCoinProps) {
  const rotation = useSharedValue(0);
  const floatY = useSharedValue(0);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    // Continuous slow rotation
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    // Floating up and down
    floatY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(8, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Glow pulse
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const coinStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.3, 1], [0.1, 0.25]),
    transform: [{ scale: interpolate(glowPulse.value, [0.3, 1], [0.9, 1.1]) }],
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow behind coin */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size * 0.7,
            backgroundColor: glowColor,
          },
          glowStyle,
        ]}
      />

      {/* The coin */}
      <Animated.View style={coinStyle}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FCD34D" />
              <Stop offset="50%" stopColor="#F59E0B" />
              <Stop offset="100%" stopColor="#D97706" />
            </LinearGradient>
            <LinearGradient id="coinEdge" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="100%" stopColor="#B45309" />
            </LinearGradient>
          </Defs>

          {/* Outer ring */}
          <Circle cx="100" cy="100" r="95" fill="url(#coinEdge)" />
          <Circle cx="100" cy="100" r="88" fill="url(#coinFace)" />

          {/* Inner geometric pattern — Roman-inspired */}
          <Circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="#B45309"
            strokeWidth="1"
            opacity={0.3}
          />
          <Circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#B45309"
            strokeWidth="1"
            opacity={0.2}
          />

          {/* Center Nummus "N" mark */}
          <Path
            d="M75 70 L75 130 L95 130 L95 95 L105 130 L125 130 L125 70 L105 70 L105 105 L95 70 Z"
            fill="#92400E"
            opacity={0.6}
          />

          {/* Decorative dots around edge */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 82 * Math.cos(angle);
            const y = 100 + 82 * Math.sin(angle);
            return <Circle key={i} cx={x} cy={y} r="3" fill="#92400E" opacity={0.4} />;
          })}
        </Svg>
      </Animated.View>
    </View>
  );
}