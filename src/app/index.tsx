import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootIndex() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace("/(onboarding)/breath");
    }
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0B0E17",
      }}
    >
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
}
