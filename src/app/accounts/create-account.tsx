import React, { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView } from "@/tw";
import { router, useLocalSearchParams } from "expo-router";
import { SEED_BANKS_MAP } from "@/constants/banks";
import { BankCard } from "@/features/accounts/components/bank-card";
import { StepIndicator } from "@/components/step-indicator";
import { FormInput } from "@/components/form-input";
import type { AccountType } from "@/features/accounts/types";

const ACCOUNT_TYPE_OPTIONS: { label: string; value: AccountType }[] = [
  { label: "Cheque", value: "cheque" },
  { label: "Savings", value: "savings" },
  { label: "Credit", value: "credit-card" },
  { label: "Investment", value: "investment" },
  { label: "Loan", value: "loan" },
  { label: "Other", value: "other" },
];

export default function CreateAccountScreen() {
  const { bankId } = useLocalSearchParams<{ bankId: string }>();
  const bank = bankId ? SEED_BANKS_MAP[bankId] : null;

  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("cheque");
  const [balanceStr, setBalanceStr] = useState("");

  const balanceCents = Math.round(parseFloat(balanceStr.replace(/,/g, "")) * 100) || 0;

  const handleBalanceChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    setBalanceStr(cleaned);
  }, []);

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
      <View className="pt-14 px-6">
        <Pressable
          className="w-10 h-10 items-center justify-center"
          style={{ height: 44 }}
          onPress={() => router.back()}
        >
          <Text className="text-text-secondary text-xl">←</Text>
        </Pressable>
      </View>
      <StepIndicator currentStep={2} totalSteps={3} />
      <ScrollView className="flex-1 px-6" contentContainerClassName="pb-6">
        <Text className="text-text-primary text-2xl font-bold mb-1">
          Name your account
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
          <FormInput
            label="Account Name"
            value={name}
            onChangeText={setName}
            placeholder="My Spending Account"
            autoCapitalize="sentences"
          />

          <View className="gap-1.5">
            <Text className="text-text-muted text-sm">Account Type</Text>
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -4 }}>
              {ACCOUNT_TYPE_OPTIONS.map((option) => {
                const isSelected = option.value === type;
                return (
                  <View key={option.value} style={{ width: "33.33%", paddingHorizontal: 4, marginBottom: 8 }}>
                    <Pressable
                      className={`rounded-xl items-center justify-center ${
                        isSelected ? "bg-primary" : "bg-surface-raised border border-border"
                      }`}
                      style={{ height: 44 }}
                      onPress={() => setType(option.value)}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected ? "text-white font-semibold" : "text-text-muted"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>

          <FormInput
            label="Opening Balance (ZAR)"
            value={balanceStr}
            onChangeText={handleBalanceChange}
            placeholder="0.00"
            keyboardType="decimal-pad"
          />
        </View>
      </ScrollView>
      <View className="px-6 pb-12 pt-4">
        <Pressable
          className="bg-primary py-4 rounded-xl items-center active:opacity-80"
          style={{ height: 48 }}
          onPress={() =>
            router.push({
              pathname: "/",
              params: { created: "true" },
            })
          }
        >
          <Text className="text-white text-lg font-semibold">Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
