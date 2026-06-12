import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "@/tw";
import { demoTransactions } from "@/components/demo-data";

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

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-14 pb-4">
        <Text className="text-text-primary text-2xl font-bold">
          Transaction History
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          {demoTransactions.length} transactions this period
        </Text>
      </View>

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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  txCard: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
});
