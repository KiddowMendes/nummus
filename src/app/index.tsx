import React from "react";
import { View, Text } from "@/tw";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <View className="p-6 bg-white rounded-2xl shadow-lg">
        <Text className="text-2xl font-bold text-slate-900">Nummus App</Text>
        <Text className="text-slate-500 mt-2">NativeWind v5 + Tailwind v4</Text>
      </View>
    </View>
  );
} 