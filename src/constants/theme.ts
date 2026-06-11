// constants/theme.ts
// Nummus Design Tokens v1.0 — Single source of truth for all visual values

// ─── Colors ─────────────────────────────────────────────────────────

export const colors = {
  // Surface hierarchy (elevation through lightness)
  background: '#0B0E17',      // Level 0: App canvas
  surface: '#111827',          // Level 1: Cards, panels
  surfaceRaised: '#1E293B',    // Level 2: Modals, dropdowns, inputs
  hover: '#334155',            // Level 4: Selected, hover states

  // Text (opacity-based strategy)
  textPrimary: '#F8FAFC',      // 100% — Headings, amounts
  textSecondary: '#E2E8F0',    // 87% — Body, descriptions
  textMuted: '#94A3B8',        // 60% — Captions, metadata
  textDisabled: '#64748B',     // 38% — Inactive

  // Brand
  primary: '#1657E8',          // Brand indigo (from logo SVG) — Buttons, links, active
  primaryForeground: '#FFFFFF',
  secondary: '#7C3AED',        // Violet — Accents, highlights
  accent: '#00AEEF',           // Cyan — Logo accent (from your logo)

  // Semantic (dark-mode desaturated per Pixel spec)
  success: '#34D399',          // Emerald — Under budget, paid
  warning: '#FBBF24',          // Amber — Approaching limit
  danger: '#FB7185',           // Rose — Overspent, errors
  info: '#818CF8',             // Indigo-light — Tips, insights
  gold: '#FCD34D',             // Gold — Achievements, completed goals

  // Finance-specific
  financePositive: '#34D399',
  financeNegative: '#FB7185',
  financeNeutral: '#FBBF24',

  // Navy (from logo)
  navy: '#0F1729',
} as const;

// ─── Typography ─────────────────────────────────────────────────────

export const typography = {
  display: 'text-3xl font-bold leading-tight',      // 30px — Onboarding headlines
  h1: 'text-2xl font-bold leading-tight',           // 24px — Page titles
  h2: 'text-xl font-semibold leading-snug',         // 20px — Section headers
  h3: 'text-lg font-semibold leading-snug',         // 18px — Sub-sections
  body: 'text-base font-normal leading-relaxed',    // 16px — Body text
  small: 'text-sm font-normal leading-relaxed',     // 14px — Captions
  xs: 'text-xs font-normal leading-relaxed',         // 12px — Badges, fine print
  tabular: 'text-base font-normal tabular-nums',      // 16px — ALL amounts
} as const;

// ─── Spacing ────────────────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

// ─── Border Radius ─────────────────────────────────────────────────

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ─── Shadows (subtle for dark mode) ────────────────────────────────

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.3)',
  md: '0 4px 12px rgba(0,0,0,0.4)',
  lg: '0 8px 24px rgba(0,0,0,0.5)',
  glow: {
    indigo: '0 0 40px rgba(79,70,229,0.15)',
    violet: '0 0 40px rgba(124,58,237,0.15)',
    gold: '0 0 40px rgba(252,211,77,0.15)',
    emerald: '0 0 40px rgba(52,211,153,0.15)',
  },
} as const;

// ─── Animation Durations ────────────────────────────────────────────

export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  celebration: 800,
} as const;

// ─── Onboarding Screen Config ─────────────────────────────────────

export const onboardingScreens = [
  { id: 0, name: 'index', title: 'Welcome', accent: 'indigo', glow: '#4F46E5' },
  { id: 1, name: 'name', title: 'Your Name', accent: 'violet', glow: '#7C3AED' },
  { id: 2, name: 'currency', title: 'Currency', accent: 'gold', glow: '#FCD34D' },
  { id: 3, name: 'banks', title: 'Link Banks', accent: 'multi', glow: '#4F46E5' },
  { id: 4, name: 'income', title: 'Income', accent: 'emerald', glow: '#34D399' },
  { id: 5, name: 'budget', title: 'Budget', accent: 'indigo-violet', glow: '#4F46E5' },
  { id: 6, name: 'goals', title: 'Goals', accent: 'gold', glow: '#FCD34D' },
  { id: 7, name: 'complete', title: 'All Set!', accent: 'celebration', glow: '#FCD34D' },
] as const;

export type OnboardingScreen = typeof onboardingScreens[number];