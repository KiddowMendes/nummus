import React from "react";
import { View, Text } from "@/tw";
import { useLocalSearchParams } from "expo-router";

export default function CreateAccountScreen() {
  const { bankId } = useLocalSearchParams<{ bankId: string }>();

  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Text className="text-text-primary text-lg font-semibold">
        Create Account
      </Text>
      <Text className="text-text-muted text-sm mt-2">
        Selected bank: {bankId}
      </Text>
    </View>
  );
}
