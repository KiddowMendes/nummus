import React, { useState } from "react";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { FormInput } from "@/components/form-input";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
        {sent ? (
          <>
            <Text className="text-text-primary text-2xl font-bold mt-4">
              Check your email
            </Text>
            <Text className="text-text-secondary text-sm mt-2 leading-5">
              A password reset link has been sent to{"\n"}
              <Text className="text-text-primary font-semibold">{email}</Text>
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
            <Text className="text-text-primary text-2xl font-bold mt-4">
              Reset password
            </Text>
            <Text className="text-text-muted text-sm mt-1">
              Enter your email to receive a reset link
            </Text>

            <View className="mt-8">
              <FormInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="pb-12 gap-3 mt-auto" style={{ marginTop: "auto" }}>
              <Pressable
                className="bg-primary rounded-xl items-center active:opacity-80"
                style={{ height: 48 }}
                onPress={() => setSent(true)}
              >
                <Text className="text-white text-lg font-semibold">
                  Send Reset Link
                </Text>
              </Pressable>
              <Pressable onPress={() => router.push("/login")} className="items-center" style={{ height: 44 }}>
                <Text className="text-primary text-sm">Back to Log In</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
