import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "@/tw";
import { router } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <View className="flex-1 bg-background px-6">
      <View className="pt-16 pb-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-primary text-lg">← Back</Text>
        </Pressable>
      </View>
      <View className="flex-1">
        {sent ? (
          <>
            <Text className="text-text-primary text-3xl font-bold mt-4">
              Check your email
            </Text>
            <Text className="text-text-muted text-sm mt-1 leading-5">
              A password reset link has been sent to{"\n"}
              <Text className="text-text-primary">{email}</Text>
            </Text>
            <Pressable
              className="mt-10"
              onPress={() => router.push("/login")}
            >
              <Text className="text-primary text-sm font-semibold text-center">
                Back to Log In
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text className="text-text-primary text-3xl font-bold mt-4">
              Reset password
            </Text>
            <Text className="text-text-muted text-sm mt-1">
              Enter your email to receive a reset link
            </Text>

            <View className="mt-10">
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

            <View className="pb-12 gap-3 mt-auto">
              <Pressable
                className="bg-primary py-4 rounded-xl items-center active:opacity-80"
                onPress={() => setSent(true)}
              >
                <Text className="text-white text-lg font-semibold">
                  Send Reset Link
                </Text>
              </Pressable>
              <Pressable onPress={() => router.push("/login")} className="items-center">
                <Text className="text-primary text-sm">Back to Log In</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
