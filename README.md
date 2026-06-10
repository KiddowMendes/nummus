# Nummus 🪙

**Financial management, elevated.**

Nummus is a high-performance, visually stunning personal finance application built for the South African market. Originally conceived as a web-based dashboard, this Expo-powered evolution brings "financial dashboard excellence" directly to mobile, combining robust tracking with native-level polish, gamification, and AI-powered insights.

---

## 🚀 The Vision
To transform financial management from a chore into a delightful, rewarding experience. Nummus isn't just an expense tracker; it’s a financial coach that helps South Africans master their net worth, crush their debts, and achieve their goals through a modern, bento-inspired interface.

## ✨ Core Pillars

### 1. The Financial Hub (Accounts & Transactions)
- **SA Bank Presets:** Deep integration with South African banking aesthetics (FNB, Standard Bank, Capitec, etc.).
- **Multi-Currency:** Native ZAR support with real-time conversion for international assets.
- **Smart Categorization:** AI-assisted transaction tagging and merchant recognition.
- **Receipt Management:** Seamless attachment of invoices and receipts using native camera capabilities.

### 2. Strategic Planning (Budgets & Goals)
- **Interactive Budgets:** Category-specific limits with smart rollovers and real-time alerts.
- **Goal Milestones:** Visual progress rings and celebrations for savings milestones.
- **Debt Snowball/Avalanche:** Dedicated debt tracking for loans, credit cards, and mortgages with payment projection.

### 3. Gamification & Growth
- **Financial RPG:** Earn points, maintain daily streaks, and unlock achievements for healthy financial habits.
- **Community Challenges:** Opt-in challenges to stay motivated alongside other users.
- **AI Insights:** Personalized tips and anomaly detection to optimize spending patterns.

### 4. Native-First UI/UX
- **Bento Dashboard:** A customizable, widget-based home screen.
- **Fluid Motion:** Powered by React Native Reanimated for 60fps micro-interactions and transitions.
- **Dark/Light Mode:** Seamless theme switching with system-level integration.
- **Offline Reliability:** Full support for tracking transactions while on the move, even without a connection.

---

## 🛠 Tech Stack (The Reconstruction)

- **Framework:** [Expo](https://expo.dev/) (SDK 56+) with [Expo Router](https://docs.expo.dev/router/introduction/)
- **UI/Styling:** Native primitives + [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [FlashList](https://shopify.github.io/flash-list/)
- **Backend:** Hono API (Edge Runtime)
- **Database:** PostgreSQL (Neon.tech) with Drizzle ORM
- **State Management:** TanStack Query (Server State) & Zustand (Client State)
- **Language:** TypeScript (Strict Mode)

---

## 📁 Project Structure (Target)

```text
src/
├── app/                # Expo Router file-based navigation
├── components/         # Atomic UI components (Buttons, Cards, Modals)
├── features/           # Domain-driven modules (accounts, goals, etc.)
│   ├── api/            # TanStack Query hooks
│   ├── components/     # Feature-specific UI
│   └── store/          # Feature-specific Zustand stores
├── hooks/              # Shared custom hooks (useTheme, useAuth)
├── lib/                # Shared utilities (currency, date formatting)
├── providers/          # Context providers (Theme, QueryClient)
└── assets/             # Branding, icons, and fonts
```

---

## 🇿🇦 Tailored for South Africa
- **ZAR First:** Primary currency formatting and local bank branding.
- **Low-Data Friendly:** Optimized API payloads and offline-first capabilities.
- **SARS Ready:** Future-planned export features for tax-compliant expense reporting.

---

*Nummus is currently in active reconstruction. This README serves as the architectural blueprint for the mobile evolution.*
