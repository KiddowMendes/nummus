import React from "react";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { NummusLogo } from "@/constants/images";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-background px-6">
      <View className="flex-1 items-center justify-center" style={{ paddingTop: "20%" }}>
        <NummusLogo width={80} height={80} />
        <Text className="text-4xl font-bold text-text-primary tracking-tight mt-6">
          Nummus
        </Text>
        <Text className="text-text-secondary text-base text-center mt-3 leading-6 px-4">
          Track your money. Own your future.
        </Text>
        <Text className="text-text-muted text-sm text-center mt-4">
          South African finance, simplified.
        </Text>
      </View>
      <View className="pb-12 gap-3">
        <Pressable
          className="bg-primary py-4 rounded-xl items-center active:opacity-80"
          style={{ height: 48 }}
          onPress={() => router.push("/bank-selection")}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </Pressable>
        <Pressable
          className="py-3 items-center"
          style={{ height: 44 }}
          onPress={() => router.push("/login")}
        >
          <Text className="text-text-muted text-sm">Already have an account? Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}
