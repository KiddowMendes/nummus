import React, { useState } from "react";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { FormInput } from "@/components/form-input";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-background px-6">
      <View className="pt-14 pb-2">
        <Pressable
          className="w-10 h-10 items-center justify-center"
          style={{ height: 44 }}
          onPress={() => router.back()}
        >
          <Text className="text-text-secondary text-xl">←</Text>
        </Pressable>
      </View>
      <View className="flex-1">
        <Text className="text-text-primary text-2xl font-bold mt-4">
          Welcome back
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          Log in to your Nummus account
        </Text>

        <View className="mt-8 gap-5">
          <FormInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          <Pressable onPress={() => router.push("/forgot-password")} className="self-end">
            <Text className="text-primary text-sm">Forgot password?</Text>
          </Pressable>
        </View>
      </View>
      <View className="pb-12 gap-3">
        <Pressable
          className="bg-primary rounded-xl items-center active:opacity-80"
          style={{ height: 48 }}
        >
          <Text className="text-white text-lg font-semibold">Log In</Text>
        </Pressable>
        <View className="flex-row justify-center items-center gap-1" style={{ height: 44 }}>
          <Text className="text-text-muted text-sm">No account yet?</Text>
          <Pressable onPress={() => router.push("/sign-up")}>
            <Text className="text-primary text-sm font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
