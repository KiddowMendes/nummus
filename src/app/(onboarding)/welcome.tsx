import React from "react";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { NummusLogo } from "@/constants/images";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-background px-6">
      <View className="flex-1 items-center justify-center">
        <NummusLogo width={96} height={96} />
        <Text className="text-4xl font-bold text-text-primary tracking-tight mt-6">
          Nummus
        </Text>
        <Text className="text-text-muted text-sm mt-1 tracking-widest uppercase">
          Manage
        </Text>
      </View>
      <View className="pb-12 gap-4">
        <Pressable
          className="bg-primary py-4 rounded-xl items-center active:opacity-80"
          onPress={() => router.push("/bank-selection")}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </Pressable>
        <Pressable
          className="py-3 items-center"
          onPress={() => router.push("/login")}
        >
          <Text className="text-text-muted text-sm">Already have an account? Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}