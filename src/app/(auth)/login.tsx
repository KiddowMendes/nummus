import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "@/tw";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-background px-6">
      <View className="pt-16 pb-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-primary text-lg">← Back</Text>
        </Pressable>
      </View>
      <View className="flex-1">
        <Text className="text-text-primary text-3xl font-bold mt-4">Welcome back</Text>
        <Text className="text-text-muted text-sm mt-1">Log in to your Nummus account</Text>

        <View className="mt-10 gap-5">
          <View>
            <Text className="text-text-muted text-sm mb-2">Email</Text>
            <TextInput
              className="bg-surface text-text-primary rounded-xl px-4 py-3.5 text-base border border-border"
              placeholder="you@email.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="text-text-muted text-sm mb-2">Password</Text>
            <TextInput
              className="bg-surface text-text-primary rounded-xl px-4 py-3.5 text-base border border-border"
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Pressable onPress={() => router.push("/forgot-password")} className="self-end">
            <Text className="text-primary text-sm">Forgot password?</Text>
          </Pressable>
        </View>
      </View>
      <View className="pb-12 gap-3">
        <Pressable className="bg-primary py-4 rounded-xl items-center active:opacity-80">
          <Text className="text-white text-lg font-semibold">Log In</Text>
        </Pressable>
        <View className="flex-row justify-center items-center gap-1">
          <Text className="text-text-muted text-sm">No account yet?</Text>
          <Pressable onPress={() => router.push("/sign-up")}>
            <Text className="text-primary text-sm font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
