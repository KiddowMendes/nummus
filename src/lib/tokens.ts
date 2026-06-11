import { useCSSVariable } from "@/tw";

export const colors = {
  background: "#0B0E17",
  surface: "#111827",
  surfaceRaised: "#1E293B",
  textPrimary: "#F8FAFC",
  textMuted: "#94A3B8",
  border: "#334155",
  primary: "#1657E8",
  accent: "#00AEEF",
  navy: "#0F1729",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#F43F5E",
  financePositive: "#10B981",
  financeNegative: "#F43F5E",
  financeNeutral: "#F59E0B",
} as const;

export const spacing = {
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

export const radius = {
  none: 0,
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
} as const;

export const shadows = {
  sm: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  default: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  md: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6 },
  lg: { shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15 },
  xl: { shadowColor: "#000", shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.1, shadowRadius: 25 },
} as const;

export const animationDuration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export type ColorName = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
export type ShadowKey = keyof typeof shadows;

export function useToken(variable: string): string {
  return useCSSVariable(`--${variable}`);
}

export function useColorToken(name: ColorName): string {
  return useCSSVariable(`--color-${name}`);
}

export function useSpacingToken(key: SpacingKey): number {
  return spacing[key] ?? 0;
}
