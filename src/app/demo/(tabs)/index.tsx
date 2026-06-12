import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ScrollView as RNScrollView } from "react-native";
import { View, Text, Pressable, ScrollView } from "@/tw";
import { demoUser, demoAccounts, demoTransactions, demoInsights } from "@/components/demo-data";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DemoDashboard() {
  const recentTransactions = demoTransactions.slice(0, 5);

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(20)).current;
  const balanceFade = useRef(new Animated.Value(0)).current;
  const balanceSlide = useRef(new Animated.Value(20)).current;
  const accountsFade = useRef(new Animated.Value(0)).current;
  const statsFade = useRef(new Animated.Value(0)).current;
  const txFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(balanceFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(balanceSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(accountsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(statsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(txFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <RNScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header greeting */}
      <AnimatedView
        className="px-6 pt-14 pb-6"
        style={{
          opacity: headerFade,
          transform: [{ translateY: headerSlide }],
        }}
      >
        <Text className="text-text-muted text-sm">Good afternoon,</Text>
        <Text className="text-text-primary text-2xl font-bold mt-1">
          {demoUser.name}
        </Text>
      </AnimatedView>

      {/* Total balance card */}
      <AnimatedView
        className="mx-6 mb-6"
        style={{
          opacity: balanceFade,
          transform: [{ translateY: balanceSlide }],
        }}
      >
        <View style={styles.balanceCard} className="rounded-3xl p-6 overflow-hidden">
          <View style={styles.balanceGlow} />
          <View style={styles.balanceAccent} />
          <Text className="text-text-muted text-xs uppercase tracking-widest mb-2">
            Total Balance
          </Text>
          <Text className="text-text-primary text-4xl font-bold tracking-tight tabular-nums">
            R {demoUser.totalBalance.toLocaleString("en-ZA", {
              minimumFractionDigits: 2,
            })}
          </Text>
          <View className="flex-row items-center mt-3 gap-2">
            <View className="w-2 h-2 rounded-full bg-finance-positive" />
            <Text className="text-finance-positive text-xs font-medium">
              +R 1,904.50 this month
            </Text>
          </View>
        </View>
      </AnimatedView>

      {/* Accounts row */}
      <AnimatedView className="px-6 mb-6" style={{ opacity: accountsFade }}>
        <Text className="text-text-primary text-sm font-semibold mb-3">
          Your Accounts
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {demoAccounts.map((account) => (
            <Pressable
              key={account.id}
              style={[
                styles.accountCard,
                { borderLeftColor: account.color },
              ]}
              className="rounded-2xl p-4 w-44 active:opacity-80"
            >
              <View className="flex-row items-center gap-2 mb-3">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: account.color }}
                />
                <Text className="text-text-muted text-xs">{account.bank}</Text>
              </View>
              <Text className="text-text-primary text-sm font-semibold mb-3">
                {account.name}
              </Text>
              <Text className="text-text-primary text-lg font-bold tabular-nums">
                R {account.balance.toLocaleString("en-ZA", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text className="text-text-muted text-xs mt-1">
                •••• {account.lastFour}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </AnimatedView>

      {/* Quick stats */}
      <AnimatedView className="px-6 mb-6" style={{ opacity: statsFade }}>
        <View className="flex-row gap-3">
          <View style={styles.statCard} className="flex-1 rounded-2xl p-4">
            <Text className="text-text-muted text-xs mb-1">Income</Text>
            <Text className="text-finance-positive text-base font-bold tabular-nums">
              R {demoInsights.monthlyIncome.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard} className="flex-1 rounded-2xl p-4">
            <Text className="text-text-muted text-xs mb-1">Expenses</Text>
            <Text className="text-finance-negative text-base font-bold tabular-nums">
              R {demoInsights.monthlyExpenses.toLocaleString()}
            </Text>
          </View>
        </View>
      </AnimatedView>

      {/* Recent transactions */}
      <AnimatedView className="px-6" style={{ opacity: txFade }}>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-text-primary text-sm font-semibold">
            Recent Activity
          </Text>
          <Pressable>
            <Text className="text-primary text-xs font-medium">See all</Text>
          </Pressable>
        </View>

        {recentTransactions.map((tx, i) => (
          <AnimatedView
            key={tx.id}
            className="flex-row items-center py-3.5 border-b border-border/20"
            style={{
              opacity: txFade,
              transform: [{
                translateX: txFade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              }],
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-surface/50 items-center justify-center mr-3">
              <Text className="text-lg">{tx.icon}</Text>
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
          </AnimatedView>
        ))}
      </AnimatedView>
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(22, 87, 232, 0.15)",
  },
  balanceGlow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(22, 87, 232, 0.08)",
  },
  balanceAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#1657E8",
    opacity: 0.3,
  },
  accountCard: {
    backgroundColor: "#12121A",
    borderLeftWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  statCard: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
});
