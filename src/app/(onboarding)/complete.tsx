// app/(onboarding)/complete.tsx
import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Polygon } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { NummusButton } from "@/components/ui/nummusButton";
import { colors } from "@/constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ─── Confetti Particle ─────────────────────────────────────────────

function ConfettiPiece({
  delay,
  color,
  startX,
  startY,
  size = 8,
}: {
  delay: number;
  color: string;
  startX: number;
  startY: number;
  size?: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const style = useAnimatedStyle(() => {
    const t = progress.value;
    // Parabolic arc: x moves linear, y goes up then down with gravity
    const x = startX + (Math.random() - 0.5) * 200 * t;
    const y = startY - 150 * Math.sin(t * Math.PI) + 100 * t * t;
    const rotation = t * 720 * (Math.random() > 0.5 ? 1 : -1);
    const opacity = interpolate(t, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
    const scale = interpolate(t, [0, 0.2, 1], [0, 1, 0.3]);

    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { rotateZ: `${rotation}deg` },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: 1,
        },
        style,
      ]}
    />
  );
}

// ─── Celebration Coin ─────────────────────────────────────────────

function CelebrationCoin({ size = 160 }: { size?: number }) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const glowPulse = useSharedValue(0);
  const particles = useSharedValue(0);

  useEffect(() => {
    // Coin bursts in with bounce
    scale.value = withDelay(200, withSpring(1.2, { damping: 10, stiffness: 100 }));
    scale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 200 }));

    // Slow rotation
    rotation.value = withDelay(400, withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    ));

    // Glow
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Particle burst
    particles.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const coinStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0.4, 1], [0.15, 0.35]),
    transform: [{ scale: interpolate(glowPulse.value, [0.4, 1], [1, 1.2]) }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: particles.value,
    transform: [{ scale: interpolate(particles.value, [0, 1], [0.5, 1.5]) }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Multi-color glow */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 2,
            height: size * 2,
            borderRadius: size,
            backgroundColor: colors.gold,
          },
          glowStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: size * 0.8,
            backgroundColor: colors.primary,
            opacity: 0.1,
          },
          glowStyle,
        ]}
      />

      {/* Expanding ring burst */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size * 0.7,
            borderWidth: 2,
            borderColor: colors.gold,
          },
          ringStyle,
        ]}
      />

      {/* The coin */}
      <Animated.View style={coinStyle}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="celebrationFace" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="30%" stopColor="#FCD34D" />
              <Stop offset="70%" stopColor="#F59E0B" />
              <Stop offset="100%" stopColor="#D97706" />
            </LinearGradient>
            <LinearGradient id="celebrationEdge" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FEF3C7" />
              <Stop offset="100%" stopColor="#B45309" />
            </LinearGradient>
          </Defs>

          {/* Outer ring */}
          <Circle cx="100" cy="100" r="96" fill="url(#celebrationEdge)" />
          <Circle cx="100" cy="100" r="90" fill="url(#celebrationFace)" />

          {/* Star burst pattern */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 100 + 50 * Math.cos(angle);
            const y1 = 100 + 50 * Math.sin(angle);
            const x2 = 100 + 75 * Math.cos(angle);
            const y2 = 100 + 75 * Math.sin(angle);
            return (
              <Path
                key={i}
                d={`M${x1},${y1} L${x2},${y2}`}
                stroke="#B45309"
                strokeWidth="2"
                opacity={0.3}
              />
            );
          })}

          {/* Center star */}
          <Polygon
            points="100,55 108,80 135,80 113,95 121,120 100,105 79,120 87,95 65,80 92,80"
            fill="#92400E"
            opacity={0.5}
          />

          {/* "N" mark */}
          <Path
            d="M75 70 L75 130 L90 130 L90 100 L100 130 L115 130 L115 70 L100 70 L100 100 L90 70 Z"
            fill="#92400E"
            opacity={0.6}
          />

          {/* Decorative dots */}
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x = 100 + 84 * Math.cos(angle);
            const y = 100 + 84 * Math.sin(angle);
            return <Circle key={i} cx={x} cy={y} r="3" fill="#B45309" opacity={0.4} />;
          })}
        </Svg>
      </Animated.View>
    </View>
  );
}

// ─── XP Item ─────────────────────────────────────────────────────

function XpItem({
  icon,
  label,
  xp,
  delay,
}: {
  icon: string;
  label: string;
  xp: number;
  delay: number;
}) {
  const fadeIn = useSharedValue(0);
  const slideX = useSharedValue(-20);

  useEffect(() => {
    fadeIn.value = withDelay(delay, withTiming(1, { duration: 400 }));
    slideX.value = withDelay(delay, withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateX: slideX.value }],
  }));

  return (
    <AnimatedView
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.hover,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
        <Text style={{ fontSize: 15, color: colors.textSecondary }}>{label}</Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.gold,
          fontVariant: ["tabular-nums"],
        }}
      >
        +{xp} XP
      </Text>
    </AnimatedView>
  );
}

// ─── Level Badge ──────────────────────────────────────────────────

function LevelBadge() {
  const scale = useSharedValue(0);
  const glow = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(800, withSpring(1, { damping: 12, stiffness: 150 }));
    glow.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.5, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    ));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glow.value, [0.5, 1], [0.2, 0.4]),
    transform: [{ scale: interpolate(glow.value, [0.5, 1], [1, 1.1]) }],
  }));

  return (
    <View style={{ alignItems: "center", marginBottom: 8 }}>
      {/* Glow behind badge */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 200,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.gold,
          },
          glowStyle,
        ]}
      />

      <AnimatedView
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: colors.surface,
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "rgba(252,211,77,0.3)",
          },
          style,
        ]}
      >
        <Text style={{ fontSize: 20 }}>🏛️</Text>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: colors.gold,
              letterSpacing: 1,
            }}
          >
            LEVEL 1
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.textPrimary,
            }}
          >
            Denarius
          </Text>
        </View>
      </AnimatedView>
    </View>
  );
}

// ─── XP Bar ───────────────────────────────────────────────────────

function XpBar() {
  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withDelay(1200, withTiming(0.3, { duration: 1000, easing: Easing.out(Easing.cubic) }));
  }, []);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value * 100}%`,
  }));

  return (
    <View style={{ width: "100%", maxWidth: 280, marginTop: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text style={{ fontSize: 12, color: colors.textMuted }}>0 XP</Text>
        <Text style={{ fontSize: 12, color: colors.gold, fontWeight: "600" }}>
          300 / 500 XP
        </Text>
      </View>
      <View
        style={{
          height: 8,
          backgroundColor: colors.surfaceRaised,
          borderRadius: 4,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.hover,
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: colors.gold,
              borderRadius: 4,
            },
            fillStyle,
          ]}
        />
      </View>
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────

const CONFETTI_COLORS = [colors.gold, colors.primary, colors.secondary, colors.success, "#EC4899", "#3B82F6"];

export default function CompleteScreen() {
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(30);

  useEffect(() => {
    fadeIn.value = withDelay(200, withTiming(1, { duration: 600 }));
    slideUp.value = withDelay(200, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  // Generate confetti particles
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 800,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    startX: (Math.random() - 0.5) * 100,
    startY: (Math.random() - 0.5) * 50,
    size: 6 + Math.random() * 8,
  }));

  const handleFinish = () => {
    // TODO: Mark onboarding as complete in storage
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Confetti layer */}
      <View style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {confetti.map((c) => (
          <ConfettiPiece
            key={c.id}
            delay={c.delay}
            color={c.color}
            startX={c.startX}
            startY={c.startY}
            size={c.size}
          />
        ))}
      </View>

      {/* Multi-color ambient glow */}
      <View
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          marginLeft: -150,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: colors.gold,
          opacity: 0.1,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: colors.primary,
          opacity: 0.06,
        }}
      />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        {/* Celebration Coin */}
        <AnimatedView
          style={[
            { marginBottom: 32 },
            useAnimatedStyle(() => ({
              opacity: withDelay(100, withTiming(1, { duration: 500 })),
            })),
          ]}
        >
          <CelebrationCoin size={160} />
        </AnimatedView>

        {/* Level Badge */}
        <LevelBadge />

        {/* Title */}
        <AnimatedView style={[{ alignItems: "center", marginBottom: 24 }, contentStyle]}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: colors.textPrimary,
              textAlign: "center",
              marginBottom: 8,
              letterSpacing: -0.5,
            }}
          >
            You\u2019re All Set!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 24,
              maxWidth: 280,
            }}
          >
            Welcome to Level 1: Denarius. Start tracking and watch your wealth grow.
          </Text>
        </AnimatedView>

        {/* XP Bar */}
        <AnimatedView style={[{ alignItems: "center", marginBottom: 24 }, contentStyle]}>
          <XpBar />
        </AnimatedView>

        {/* XP Summary */}
        <AnimatedView style={[{ width: "100%", maxWidth: 320, gap: 8, marginBottom: 32 }, contentStyle]}>
          <XpItem icon="🏆" label="First Steps" xp={50} delay={1400} />
          <XpItem icon="🏦" label="Bank Linked" xp={100} delay={1600} />
          <XpItem icon="💰" label="Income Added" xp={75} delay={1800} />
          <XpItem icon="📊" label="Budget Created" xp={75} delay={2000} />
        </AnimatedView>
      </View>

      {/* Bottom CTA */}
      <AnimatedView
        style={[
          {
            paddingHorizontal: 24,
            paddingBottom: 32,
          },
          contentStyle,
        ]}
      >
        <NummusButton variant="primary" size="lg" onPress={handleFinish}>
          Go to Dashboard
        </NummusButton>
      </AnimatedView>
    </SafeAreaView>
  );
}