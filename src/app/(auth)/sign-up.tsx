import React, { useState } from "react";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { FormInput } from "@/components/form-input";

export default function SignUpScreen() {
  const [name, setName] = useState("");
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
          Create account
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          Start your financial journey
        </Text>

        <View className="mt-8 gap-5">
          <FormInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            autoCapitalize="words"
          />
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
            placeholder="Create a strong password"
            secureTextEntry
          />
        </View>
      </View>
      <View className="pb-12 gap-3">
        <Pressable
          className="bg-primary rounded-xl items-center active:opacity-80"
          style={{ height: 48 }}
        >
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        </Pressable>
        <View className="flex-row justify-center items-center gap-1" style={{ height: 44 }}>
          <Text className="text-text-muted text-sm">Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-primary text-sm font-semibold">Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
