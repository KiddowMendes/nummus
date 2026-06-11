import React from "react";
import { View, Text, TextInput } from "@/tw";
import type { KeyboardTypeOptions } from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  autoFocus?: boolean;
}

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  error,
  autoFocus,
}: FormInputProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-text-muted text-sm">{label}</Text>
      <TextInput
        className={`bg-surface-raised text-text-primary rounded-xl px-4 text-base border ${
          error ? "border-danger" : "border-border"
        }`}
        style={{ height: 48 }}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />
      {error && (
        <Text className="text-danger text-xs mt-0.5">{error}</Text>
      )}
    </View>
  );
}
