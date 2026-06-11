// app/index.tsx
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// Simple local state for now — replace with Zustand store when ready
const useAppState = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with AsyncStorage / SQLite check
    // For now, always show onboarding on first load
    const checkOnboarding = async () => {
      // Simulate async check
      await new Promise((r) => setTimeout(r, 300));
      setHasCompletedOnboarding(false); // Change to true to skip onboarding
      setIsLoading(false);
    };
    checkOnboarding();
  }, []);

  return { hasCompletedOnboarding, isLoading };
};

export default function RootIndex() {
  const { hasCompletedOnboarding, isLoading } = useAppState();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0B0E17" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  // After onboarding, go to auth or main app
  return <Redirect href="/(auth)/login" />;
}