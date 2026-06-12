import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "@/tw";
import { demoGoals, demoInsights } from "@/components/demo-data";

export default function DemoInsights() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-14 pb-4">
        <Text className="text-text-primary text-2xl font-bold">
          Insights
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          Your financial health at a glance
        </Text>
      </View>

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
            <Text className="text-text-primary text-3xl font-bold">
              {demoInsights.savingsRate}%
            </Text>
            <Text className="text-emerald-400 text-sm font-medium mb-1">
              ↑ 2.3% from last month
            </Text>
          </View>
          {/* Progress bar */}
          <View className="mt-3 h-2 bg-surface rounded-full overflow-hidden">
            <View
              style={[
                styles.progressFill,
                { width: `${demoInsights.savingsRate * 2.5}%` },
              ]}
            />
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
                    progress >= 100 ? "text-emerald-400" : "text-primary"
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
              <Text className="text-text-muted text-xs mt-2">
                R {goal.current.toLocaleString()} of R {goal.target.toLocaleString()}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
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