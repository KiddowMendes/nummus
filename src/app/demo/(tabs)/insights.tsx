import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ScrollView as RNScrollView } from "react-native";
import { View, Text } from "@/tw";
import Svg, { Circle } from "react-native-svg";
import { demoGoals, demoInsights } from "@/components/demo-data";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DemoInsights() {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(20)).current;
  const itemsFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    Animated.timing(itemsFade, { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }).start();
  }, []);

  return (
    <RNScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <AnimatedView
        className="px-6 pt-14 pb-4"
        style={{
          opacity: headerFade,
          transform: [{ translateY: headerSlide }],
        }}
      >
        <Text className="text-text-primary text-2xl font-bold">
          Insights
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          Your financial health at a glance
        </Text>
      </AnimatedView>

      <AnimatedView style={{ opacity: itemsFade }}>
        {/* Streak card */}
        <View className="px-6 mb-4">
          <View style={styles.card} className="rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-text-muted text-xs uppercase tracking-wider">
                  Tracking Streak
                </Text>
                <Text className="text-text-primary text-3xl font-bold mt-1">
                  {demoInsights.streakDays}{" "}
                  <Text className="text-text-muted text-base font-normal">days</Text>
                </Text>
              </View>
              <View className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center border border-primary/20">
                <Text className="text-2xl">🔥</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Savings rate */}
        <View className="px-6 mb-4">
          <View style={styles.card} className="rounded-2xl p-5">
            <Text className="text-text-muted text-xs uppercase tracking-wider mb-2">
              Savings Rate
            </Text>
            <View className="flex-row items-end gap-2">
              <Text className="text-text-primary text-3xl font-bold tabular-nums">
                {demoInsights.savingsRate}%
              </Text>
              <Text className="text-finance-positive text-sm font-medium mb-1">
                ↑ 2.3% from last month
              </Text>
            </View>
            <View className="mt-3 h-2 bg-surface rounded-full overflow-hidden">
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(demoInsights.savingsRate * 2.5, 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Spending breakdown ring */}
        <View className="px-6 mb-4">
          <View style={styles.card} className="rounded-2xl p-5">
            <Text className="text-text-muted text-xs uppercase tracking-wider mb-4">
              Spending Breakdown
            </Text>
            <View className="flex-row items-center">
              <View className="w-[100px] h-[100px] items-center justify-center mr-6">
                <Svg width={100} height={100} viewBox="0 0 100 100">
                  <Circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <Circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="#1657E8" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={2 * Math.PI * 42 * 0.4}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <Circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="#34D399" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={2 * Math.PI * 42 * 0.85}
                    strokeLinecap="round"
                    transform="rotate(36 50 50)"
                  />
                  <Circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="#FB7185" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={2 * Math.PI * 42 * 0.92}
                    strokeLinecap="round"
                    transform="rotate(144 50 50)"
                  />
                </Svg>
                <View className="absolute items-center">
                  <Text className="text-text-primary text-sm font-bold">R 7.2k</Text>
                  <Text className="text-text-muted text-[8px] uppercase">Total</Text>
                </View>
              </View>
              <View className="flex-1 gap-2">
                {[
                  { label: "Housing", color: "#1657E8", amount: 5200 },
                  { label: "Living", color: "#34D399", amount: 1530 },
                  { label: "Other", color: "#FB7185", amount: 458 },
                ].map((item) => (
                  <View key={item.label} className="flex-row items-center">
                    <View className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <Text className="text-text-secondary text-xs flex-1">{item.label}</Text>
                    <Text className="text-text-muted text-xs tabular-nums">
                      R {item.amount.toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Top category */}
        <View className="px-6 mb-4">
          <View style={styles.card} className="rounded-2xl p-5">
            <Text className="text-text-muted text-xs uppercase tracking-wider mb-2">
              Biggest Expense
            </Text>
            <Text className="text-text-primary text-xl font-bold">
              {demoInsights.topCategory}
            </Text>
            <Text className="text-text-muted text-sm mt-1">
              R {demoInsights.topCategoryAmount.toLocaleString()} this month
            </Text>
          </View>
        </View>

        {/* Goals */}
        <View className="px-6 mb-4">
          <Text className="text-text-primary text-sm font-semibold mb-3">
            Your Goals
          </Text>
          {demoGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <View
                key={goal.id}
                style={styles.card}
                className="rounded-2xl p-4 mb-3"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="text-text-primary text-sm font-medium">
                      {goal.title}
                    </Text>
                    <Text className="text-text-muted text-xs mt-0.5">
                      {goal.category}
                    </Text>
                  </View>
                  <Text
                    className={`text-xs font-bold ${
                      progress >= 100 ? "text-finance-positive" : "text-primary"
                    }`}
                  >
                    {progress >= 100 ? "COMPLETE" : `${Math.round(progress)}%`}
                  </Text>
                </View>
                <View className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <View
                    style={[
                      styles.goalFill,
                      {
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: progress >= 100 ? "#34D399" : "#D4AF37",
                      },
                    ]}
                  />
                </View>
                <Text className="text-text-muted text-xs mt-2 tabular-nums">
                  R {goal.current.toLocaleString()} of R {goal.target.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
      </AnimatedView>
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#D4AF37",
    borderRadius: 999,
  },
  goalFill: {
    height: "100%",
    borderRadius: 999,
  },
});
