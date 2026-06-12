import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ScrollView as RNScrollView } from "react-native";
import { View, Text } from "@/tw";
import { demoTransactions } from "@/components/demo-data";

const AnimatedView = Animated.createAnimatedComponent(View);

function groupByDate(transactions: typeof demoTransactions) {
  const groups: Record<string, typeof demoTransactions> = {};
  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = date.toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
}

export default function DemoTransactions() {
  const groups = groupByDate(demoTransactions);
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(20)).current;
  const listFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    Animated.timing(listFade, { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }).start();
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
          Transaction History
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          {demoTransactions.length} transactions this period
        </Text>
      </AnimatedView>

      <AnimatedView style={{ flex: 1, opacity: listFade }}>
        {Object.entries(groups).map(([date, transactions]) => (
          <View key={date} className="px-6 mb-4">
            <Text className="text-text-muted text-xs uppercase tracking-wider mb-2">
              {date}
            </Text>
            {transactions.map((tx) => (
              <View
                key={tx.id}
                style={styles.txCard}
                className="rounded-2xl p-4 mb-2 flex-row items-center"
              >
                <View className="w-11 h-11 rounded-xl bg-surface/50 items-center justify-center mr-3">
                  <Text className="text-xl">{tx.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary text-sm font-medium">
                    {tx.title}
                  </Text>
                  <Text className="text-text-muted text-xs mt-0.5">
                    {tx.category} • {tx.account}
                  </Text>
                </View>
                <Text
                  className={`text-sm font-bold tabular-nums ${
                    tx.type === "income" ? "text-finance-positive" : "text-text-primary"
                  }`}
                >
                  {tx.type === "income" ? "+" : ""}
                  R {Math.abs(tx.amount).toLocaleString("en-ZA", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </AnimatedView>
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  txCard: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
});
