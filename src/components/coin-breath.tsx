import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { BlurView } from "expo-blur";
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";

interface CoinBreathProps {
  size?: "small" | "medium" | "xl" | "hero" | number;
  showLetter?: boolean;
  showLogo?: boolean;
  animate?: boolean;
  rotationDuration?: number;
}

const SIZE_MAP: Record<string, number> = {
  small: 60,
  medium: 80,
  xl: 120,
  hero: 180,
};

export default function CoinBreath({
  size = "medium",
  showLetter = true,
  showLogo = false,
  animate = true,
  rotationDuration = 20000,
}: CoinBreathProps) {
  const coinSize = typeof size === "number" ? size : SIZE_MAP[size] ?? 80;
  const rotation = useRef(new Animated.Value(0)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;

    const rotateAnim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: rotationDuration,
        useNativeDriver: true,
      })
    );

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: -6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatY, {
          toValue: 6,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnim.start();
    floatAnim.start();
    glowAnim.start();

    return () => {
      rotateAnim.stop();
      floatAnim.stop();
      glowAnim.stop();
    };
  }, [animate, rotationDuration]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = coinSize / 200;

  const glowOpacity = glowPulse.interpolate({
    inputRange: [0.3, 1],
    outputRange: [0.08, 0.18],
  });

  const glowScale = glowPulse.interpolate({
    inputRange: [0.3, 1],
    outputRange: [0.9, 1.1],
  });

  return (
    <View
      style={{
        width: coinSize,
        height: coinSize,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow behind coin */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: coinSize * 1.4,
          height: coinSize * 1.4,
          borderRadius: coinSize * 0.7,
          opacity: glowOpacity,
          transform: [{ scale: glowScale }],
          overflow: "hidden",
        }}
      >
        <BlurView
          intensity={40}
          tint="light"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FCD34D",
            borderRadius: coinSize * 0.7,
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: floatY }, { rotateY: spin }],
        }}
      >
        <Svg
          width={coinSize}
          height={coinSize}
          viewBox="0 0 200 200"
        >
          <Defs>
            <SvgLinearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FCD34D" />
              <Stop offset="50%" stopColor="#F59E0B" />
              <Stop offset="100%" stopColor="#D97706" />
            </SvgLinearGradient>
            <SvgLinearGradient id="coinEdge" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="100%" stopColor="#B45309" />
            </SvgLinearGradient>
          </Defs>

          <Circle cx="100" cy="100" r="95" fill="url(#coinEdge)" />
          <Circle cx="100" cy="100" r="88" fill="url(#coinFace)" />

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

          {showLogo && (
            <G transform={`translate(${40 * scale}, ${35 * scale}) scale(${0.5 * scale})`} opacity={0.5}>
              <Path d="M50 293L130 50H214L134 293H50Z" fill="#1657E8" />
              <Path d="M130 50L250 293H334L214 50H130Z" fill="#00AEEF" />
              <Path d="M250 293L294 50H210L166 293H250Z" fill="#0F1729" />
            </G>
          )}
          {!showLogo && showLetter && (
            <G transform={`translate(${60 * scale}, ${60 * scale}) scale(${0.25 * scale})`}>
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
          )}

          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 82 * Math.cos(angle);
            const y = 100 + 82 * Math.sin(angle);
            return (
              <Circle key={i} cx={x} cy={y} r="3" fill="#92400E" opacity={0.4} />
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
}
