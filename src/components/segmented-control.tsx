import React from "react";
import { View, Text, Pressable } from "@/tw";

interface SegmentedOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  selectedValue,
  onSelect,
}: SegmentedControlProps<T>) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <Pressable
            key={option.value}
            className={`flex-1 py-3 rounded-xl items-center ${
              isSelected ? "bg-primary" : "bg-surface-raised border border-border"
            }`}
            onPress={() => onSelect(option.value)}
          >
            <Text
              className={`text-sm ${
                isSelected ? "text-white font-semibold" : "text-text-muted"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
