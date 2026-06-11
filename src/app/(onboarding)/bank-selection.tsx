import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "@/tw";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { SEED_BANKS, type Bank } from "@/constants/banks";
import { StepIndicator } from "@/components/step-indicator";

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
      <BlurView
        intensity={18}
        className={`px-4 py-6 items-center border ${
          isSelected ? "border-primary/50" : ""
        }`}
        style={!isSelected ? { borderColor: `${bank.gradientFrom}30` } : undefined}
      >
        <View
          className="w-10 h-10 rounded-full mb-2.5 items-center justify-center"
          style={{ backgroundColor: bank.gradientFrom }}
        >
          {isSelected && (
            <View className="w-5 h-5 rounded-full bg-white/90 items-center justify-center">
              <Text className="text-xs font-bold" style={{ color: bank.gradientFrom }}>
                ✓
              </Text>
            </View>
          )}
        </View>
        <Text
          className={`text-base font-semibold text-center ${
            isSelected ? "text-white" : "text-text-primary"
          }`}
        >
          {bank.shortName}
        </Text>
        <Text className="text-text-muted text-xs mt-0.5 text-center">
          {bank.name}
        </Text>
      </BlurView>
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
      <View className="pt-14 px-6">
        <Pressable
          className="w-10 h-10 items-center justify-center"
          style={{ height: 44 }}
          onPress={() => router.back()}
        >
          <Text className="text-text-secondary text-xl">←</Text>
        </Pressable>
      </View>
      <StepIndicator currentStep={1} totalSteps={3} />
      <ScrollView className="flex-1 px-6" contentContainerClassName="pb-4">
        <Text className="text-text-primary text-2xl font-bold mb-1">
          Pick your bank
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
          className={`rounded-xl items-center justify-center ${
            selectedBank ? "bg-primary" : "bg-surface-raised"
          }`}
          style={{ height: 48, opacity: selectedBank ? 1 : 0.38 }}
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
