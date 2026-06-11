import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "@/tw";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SEED_BANKS, type Bank } from "@/constants/banks";

function BankCard({
  bank,
  isSelected,
  onSelect,
}: {
  bank: Bank;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      onPress={onSelect}
      className={`w-[48%] mb-3 overflow-hidden rounded-xl ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      {isSelected ? (
        <LinearGradient
          colors={[bank.gradientFrom, bank.gradientTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-4 py-6 items-center"
        >
          <Text className="text-white text-base font-semibold text-center">
            {bank.shortName}
          </Text>
          <Text className="text-white/70 text-xs mt-1 text-center">
            {bank.name}
          </Text>
          <View className="w-6 h-6 rounded-full bg-white/30 items-center justify-center mt-3">
            <Text className="text-white font-bold text-xs">✓</Text>
          </View>
        </LinearGradient>
      ) : (
        <BlurView
          intensity={12}
          className="px-4 py-6 items-center border"
          style={{ borderColor: `${bank.gradientFrom}40` }}
        >
          <View
            className="w-8 h-8 rounded-full mb-2"
            style={{ backgroundColor: bank.gradientFrom }}
          />
          <Text className="text-text-primary text-base font-semibold text-center">
            {bank.shortName}
          </Text>
          <Text className="text-text-muted text-xs mt-0.5 text-center">
            {bank.name}
          </Text>
        </BlurView>
      )}
    </Pressable>
  );
}

export default function BankSelectionScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedBank = selectedId
    ? SEED_BANKS.find((b) => b.id === selectedId)
    : null;

  return (
    <View className="flex-1 bg-background">
      <View className="pt-16 px-6 pb-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-primary text-lg">← Back</Text>
        </Pressable>
      </View>
      <ScrollView className="flex-1 px-6" contentContainerClassName="pb-6">
        <Text className="text-text-primary text-2xl font-bold mb-1">
          Select your bank
        </Text>
        <Text className="text-text-muted text-sm mb-6">
          Choose the bank for your first account
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {SEED_BANKS.map((bank) => (
            <BankCard
              key={bank.id}
              bank={bank}
              isSelected={selectedId === bank.id}
              onSelect={() => setSelectedId(bank.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View className="px-6 pb-12 pt-4">
        <Pressable
          className={`py-4 rounded-xl items-center ${
            selectedBank ? "bg-primary" : "bg-surface"
          }`}
          disabled={!selectedBank}
          onPress={() =>
            router.push({
              pathname: "/create-account",
              params: { bankId: selectedId },
            })
          }
        >
          <Text
            className={`text-lg font-semibold ${
              selectedBank ? "text-white" : "text-text-muted"
            }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
