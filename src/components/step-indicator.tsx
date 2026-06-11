import React from "react";
import { View, Text } from "@/tw";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center gap-3 pt-4 pb-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <View key={step} className="flex-row items-center gap-3">
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${
                isActive ? "bg-primary" : isCompleted ? "bg-primary/40" : "bg-surface-raised"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isActive ? "text-white" : isCompleted ? "text-white/60" : "text-text-muted"
                }`}
              >
                {isCompleted ? "✓" : step}
              </Text>
            </View>
            {step < totalSteps && (
              <View
                className={`w-8 h-0.5 rounded-full ${
                  isCompleted ? "bg-primary/40" : "bg-surface-raised"
                }`}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
