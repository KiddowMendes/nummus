import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, Pressable } from "@/tw";
import { demoUser, demoAccounts, demoTransactions, demoGoals, demoInsights } from "@/components/demo-data";

export default function DemoDashboard() {
  const recentTransactions = demoTransactions.slice(0, 5);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header greeting */}
      <View className="px-6 pt-14 pb-6">
        <Text className="text-text-muted text-sm">Good afternoon,</Text>
        <Text className="text-text-primary text-2xl font-bold mt-1">
          {demoUser.name}
        </Text>
      </View>

      {/* Total balance card */}
      <View className="mx-6 mb-6">
        <View style={styles.balanceCard} className="rounded-3xl p-6 overflow-hidden">
          <View style={styles.cardGlow} />
          <Text className="text-text-muted text-xs uppercase tracking-widest mb-2">
            Total Balance
          </Text>
          <Text className="text-text-primary text-4xl font-bold tracking-tight">
            R {demoUser.totalBalance.toLocaleString("en-ZA", {
              minimumFractionDigits: 2,
            })}
          </Text>
          <View className="flex-row items-center mt-3 gap-2">
            <View className="w-2 h-2 rounded-full bg-emerald-400" />
            <Text className="text-emerald-400 text-xs font-medium">
              +R 1,904.50 this month
            </Text>
          </View>
        </View>
      </View>

      {/* Accounts row */}
      <View className="px-6 mb-6">
        <Text className="text-text-primary text-sm font-semibold mb-3">
          Your Accounts
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {demoAccounts.map((account) => (
            <View
              key={account.id}
              style={[
                styles.accountCard,
                { borderLeftColor: account.color },
              ]}
              className="rounded-2xl p-4 w-44"
            >
              <Text className="text-text-muted text-xs mb-1">
                {account.bank}
              </Text>
              <Text className="text-text-primary text-sm font-semibold mb-3">
                {account.name}
              </Text>
              <Text className="text-text-primary text-lg font-bold">
                R {account.balance.toLocaleString("en-ZA", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text className="text-text-muted text-xs mt-1">
                •••• {account.lastFour}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Quick stats */}
      <View className="px-6 mb-6">
        <View className="flex-row gap-3">
          <View style={styles.statCard} className="flex-1 rounded-2xl p-4">
            <Text className="text-text-muted text-xs mb-1">Income</Text>
            <Text className="text-emerald-400 text-base font-bold">
              R {demoInsights.monthlyIncome.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard} className="flex-1 rounded-2xl p-4">
            <Text className="text-text-muted text-xs mb-1">Expenses</Text>
            <Text className="text-rose-400 text-base font-bold">
              R {demoInsights.monthlyExpenses.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Recent transactions */}
      <View className="px-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-text-primary text-sm font-semibold">
            Recent Activity
          </Text>
          <Pressable>
            <Text className="text-primary text-xs font-medium">See all</Text>
          </Pressable>
        </View>

        {recentTransactions.map((tx) => (
          <View
            key={tx.id}
            style={styles.txRow}
            className="flex-row items-center py-3.5 border-b border-border/20"
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
              className={`text-sm font-bold ${
                tx.type === "income" ? "text-emerald-400" : "text-text-primary"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.12)",
  },
  cardGlow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(212, 175, 55, 0.06)",
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
  txRow: {
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
});