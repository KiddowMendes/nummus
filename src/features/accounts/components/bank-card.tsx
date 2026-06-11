import React, { useMemo } from "react";
import { View, Text } from "@/tw";
import { LinearGradient } from "expo-linear-gradient";
import type { Bank } from "@/constants/banks";
import type { AccountType } from "@/features/accounts/types";
import { ACCOUNT_TYPE_LABELS } from "@/features/accounts/types";
import { formatZAR } from "@/lib/format";

interface BankCardProps {
  bank: Bank;
  accountName: string;
  accountType: AccountType;
  balanceCents: number;
  maskedNumber?: string;
}

function generateMaskedNumber(): string {
  const groups = [
    Math.floor(1000 + Math.random() * 9000),
    Math.floor(1000 + Math.random() * 9000),
    Math.floor(1000 + Math.random() * 9000),
    Math.floor(1000 + Math.random() * 9000),
  ];
  return groups.map((g) => g.toString()).join(" ");
}

export function BankCard({
  bank,
  accountName,
  accountType,
  balanceCents,
  maskedNumber,
}: BankCardProps) {
  const displayNumber = useMemo(() => maskedNumber ?? generateMaskedNumber(), [maskedNumber]);
  const textShadow = { textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 } as const, textShadowRadius: 3 };

  return (
    <LinearGradient
      colors={[bank.gradientFrom, bank.gradientTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl p-5"
    >
      <View className="flex-row justify-between items-start mb-8">
        <View className="flex-1">
          <Text className="text-white/60 text-xs uppercase tracking-wider" style={textShadow}>
            {bank.name}
          </Text>
          <Text className="text-white text-lg font-bold mt-0.5" numberOfLines={1} style={textShadow}>
            {accountName || "Account Name"}
          </Text>
        </View>
        <View className="bg-white/20 rounded-lg px-2.5 py-1">
          <Text className="text-white text-xs font-medium" style={textShadow}>
            {ACCOUNT_TYPE_LABELS[accountType].split(" ")[0]}
          </Text>
        </View>
      </View>
      <View className="mb-6">
        <Text className="text-white/60 text-xs tracking-widest font-mono" style={textShadow}>
          {displayNumber}
        </Text>
      </View>
      <Text
        className="text-white text-2xl font-bold tracking-tight"
        style={[textShadow, { fontVariant: ["tabular-nums"] as const }]}
      >
        {formatZAR(balanceCents)}
      </Text>
    </LinearGradient>
  );
}
