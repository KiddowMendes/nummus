import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "@/tw";
import { router, useLocalSearchParams } from "expo-router";
import { SEED_BANKS_MAP } from "@/constants/banks";
import { BankCard } from "@/features/accounts/components/bank-card";
import type { AccountType } from "@/features/accounts/types";
import { ACCOUNT_TYPE_LABELS } from "@/features/accounts/types";

const ACCOUNT_TYPES: AccountType[] = [
  "cheque",
  "savings",
  "credit-card",
  "investment",
  "loan",
  "other",
];

export default function CreateAccountScreen() {
  const { bankId } = useLocalSearchParams<{ bankId: string }>();
  const bank = bankId ? SEED_BANKS_MAP[bankId] : null;

  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("cheque");
  const [balanceStr, setBalanceStr] = useState("");

  const balanceCents = Math.round(parseFloat(balanceStr.replace(/,/g, "")) * 100) || 0;

  if (!bank) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6">
        <Text className="text-text-primary text-lg">Bank not found</Text>
        <Pressable className="mt-4" onPress={() => router.back()}>
          <Text className="text-primary">Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 px-6 pb-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-primary text-lg">← Back</Text>
        </Pressable>
      </View>
      <ScrollView className="flex-1 px-6" contentContainerClassName="pb-8">
        <Text className="text-text-primary text-2xl font-bold mb-1">
          Create Account
        </Text>
        <Text className="text-text-muted text-sm mb-6">
          Set up your {bank.shortName} account
        </Text>

        <BankCard
          bank={bank}
          accountName={name}
          accountType={type}
          balanceCents={balanceCents}
        />

        <View className="mt-8 gap-5">
          <View>
            <Text className="text-text-muted text-sm mb-2">Account Name</Text>
            <TextInput
              className="bg-surface text-text-primary rounded-xl px-4 py-3.5 text-base border border-border"
              placeholder="e.g. My Spending Account"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="text-text-muted text-sm mb-2">Account Type</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2"
            >
              {ACCOUNT_TYPES.map((t) => (
                <Pressable
                  key={t}
                  className={`rounded-xl px-4 py-3 ${
                    type === t ? "bg-primary" : "bg-surface border border-border"
                  }`}
                  onPress={() => setType(t)}
                >
                  <Text
                    className={`text-sm ${
                      type === t ? "text-white font-semibold" : "text-text-muted"
                    }`}
                  >
                    {ACCOUNT_TYPE_LABELS[t]}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View>
            <Text className="text-text-muted text-sm mb-2">Opening Balance (ZAR)</Text>
            <TextInput
              className="bg-surface text-text-primary rounded-xl px-4 py-3.5 text-base border border-border"
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              keyboardType="decimal-pad"
              value={balanceStr}
              onChangeText={setBalanceStr}
            />
          </View>
        </View>
      </ScrollView>
      <View className="px-6 pb-12 pt-4">
        <Pressable
          className="bg-primary py-4 rounded-xl items-center active:opacity-80"
          onPress={() =>
            router.push({
              pathname: "/",
              params: {
                created: "true",
                bankId: bank.id,
                accountName: name || "My Account",
              },
            })
          }
        >
          <Text className="text-white text-lg font-semibold">Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
