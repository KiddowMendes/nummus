import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text, Pressable } from "@/tw";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DemoTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0A0A0F",
            borderTopColor: "rgba(212, 175, 55, 0.08)",
            borderTopWidth: 1,
            height: 64 + insets.bottom,
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#D4AF37",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.35)",
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
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>🏛️</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>📜</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>📊</Text>
            ),
          }}
        />
      </Tabs>

      {/* Floating "Start My Vault" pill */}
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
        <Text style={styles.demoBadgeText}>DEMO MODE</Text>
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
    backgroundColor: "#D4AF37",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  pillText: {
    color: "#0A0A0F",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  demoBadge: {
    position: "absolute",
    top: 52,
    right: 16,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderColor: "rgba(212, 175, 55, 0.3)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  demoBadgeText: {
    color: "#D4AF37",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
});
