import React, { useEffect, useRef } from "react";
import { View } from "@/tw";
import { Animated } from "react-native";

interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View className="flex-row justify-center items-center gap-2 mb-8">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-1.5 rounded-full ${
              i === current
                ? "w-6 bg-primary"
                : "w-1.5 bg-text-disabled"
            }`}
          />
        ))}
      </View>
    </Animated.View>
  );
}
