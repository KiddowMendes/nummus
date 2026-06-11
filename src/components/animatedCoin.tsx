// components/AnimatedCoin.tsx
import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
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

          {/* Center Nummus logo — engraved */}
          <G transform="translate(50, 50) scale(0.29)">
            <Path
              d="M.59,168.49l-.03-88.11C5.18,5.62,97.42-28,147.4,28.34c19.79,22.31,18.54,37.81,21.53,65.37,4.79,44.26,41.98,80.31,86.9,81.03v130.36s1.28,1.85,1.28,1.85l5.76.11v-132.31h80.64v89.63c-5.5,77.03-104.13,107.35-150.97,45.29-18.55-24.57-13.92-39.41-18.37-66.97-6.53-40.52-44.71-74.03-85.89-74.21V44.4l-1.14-.98-5.91.59v124.48H.59Z"
              fill="#78350F"
              opacity={0.5}
            />
            <Path
              d="M81.23,174.75v124.48h7.05v-123.7c39.6.12,75.18,33.49,79.76,72.51,8.39,71.43-69.99,121.07-130.11,80.78C-15.02,293.35,4.16,231.61.55,177.45l1.21-2.7h79.46Z"
              fill="#78350F"
              opacity={0.5}
            />
            <Path
              d="M262.86,168.49V36.18c-2.36.22-5.38-.87-7.05,1.17v130.35c-36.95-.3-69.8-28.51-78.06-64.04C160.53,29.6,242.9-27.99,306.16,14.41c52.86,35.42,33.82,97.29,37.38,151.38l-.38,1.97c-1.27,1.83-6.19.2-8.01.25-24.1.55-48.22.22-72.29.49Z"
              fill="#78350F"
              opacity={0.5}
            />
          </G>

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