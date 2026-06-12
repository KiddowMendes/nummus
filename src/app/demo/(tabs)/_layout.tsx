import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";

function VaultIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <Path d="M12 6v6l4 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HistoryIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6h16M4 12h16M4 18h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

function InsightsIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M4 20h16M6 16V8m4 8v-4m4 4v-6m4 6v-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function DemoTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0A0A0F",
            borderTopColor: "rgba(22, 87, 232, 0.1)",
            borderTopWidth: 1,
            height: 64 + insets.bottom,
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#1657E8",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Vault",
            tabBarIcon: ({ color }) => <VaultIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color }) => <InsightsIcon color={color} />,
          }}
        />
      </Tabs>

      {/* Floating CTA pill */}
      <View
        style={[
          styles.floatingPill,
          { bottom: 80 + insets.bottom },
        ]}
      >
        <Pressable
          style={styles.pillButton}
          onPress={() => router.push("/(onboarding)/name")}
        >
          <Text style={styles.pillText}>✨ Start My Vault</Text>
        </Pressable>
      </View>

      {/* Demo badge */}
      <View style={styles.demoBadge}>
        <Text style={styles.demoBadgeText}>DEMO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingPill: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  pillButton: {
    backgroundColor: "#1657E8",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#1657E8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  pillText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  demoBadge: {
    position: "absolute",
    top: 52,
    right: 16,
    backgroundColor: "rgba(22, 87, 232, 0.15)",
    borderColor: "rgba(22, 87, 232, 0.3)",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  demoBadgeText: {
    color: "#1657E8",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
});
