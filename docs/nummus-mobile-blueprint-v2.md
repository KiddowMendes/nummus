# Nummus Mobile Blueprint v2

Version: 2.0.0 mobile restart
Status: Active product and technical blueprint
Source history: derived from `Nummus_Technical_Documentation_v1.3.0.md`, now reframed for Expo mobile-first delivery.

---

## 1. Summary

Nummus is a premium, mobile-first personal finance app for South Africans. The v1 restart focuses on making the core tracking loop feel excellent on a phone before adding desktop, cloud sync, or advanced automation.

The v1 product promise:

- Create a local finance profile quickly.
- Pick a South African bank and see a beautiful matching account card.
- Track money in ZAR with cents-safe calculations.
- Build toward budgets, goals, and debt visibility one small feature at a time.
- Keep user data local until there is a clear reason to add cloud sync.

This document is the active blueprint. The old v1.3.0 technical documentation remains historical input, not implementation authority.

---

## 2. Product Direction

### Audience

Primary users are South Africans aged 18-35 who want a polished way to understand accounts, spending, savings goals, and debt without connecting bank credentials in the first version.

### Visual Direction

Premium dark fintech:

- Dark-mode-first surfaces.
- High-trust visual language.
- Beautiful bank-card-first account experience.
- Restrained gamification that supports motivation without turning finance into noise.
- Native mobile ergonomics over dashboard density.

### Product Principles

- ZAR first: South African Rand is the only v1 currency.
- Tracker, not actor: Nummus does not move money or change bank state.
- Local-first: v1 data lives on the device.
- Manual first: users create accounts and transactions themselves.
- Small increments: every feature must be buildable, testable, and reviewable on its own.

---

## 3. Active Stack

Use the versions installed in `package.json`.

| Layer | v1 Choice | Notes |
| --- | --- | --- |
| Framework | Expo | Mobile-first with Expo Go as the default test path |
| Navigation | Expo Router | File-based native routing |
| UI | React Native | No web-only elements in native screens |
| Language | TypeScript | Strict mode |
| Styling | NativeWind v5 preview + Tailwind v4 | Primary styling path |
| Animation | React Native Reanimated | Required for meaningful transitions and micro-interactions |
| Images | expo-image | Centralized asset registry |
| Local state | Zustand | Add when the first shared state feature needs it |
| Local persistence | AsyncStorage | Add when the first persistent local feature needs it |

Deferred until a later cloud phase:

- Clerk authentication
- Hono API routes
- Neon PostgreSQL
- Drizzle ORM
- TanStack Query
- PostHog or other analytics
- Bank sync via Stitch/Yodlee
- SARS/PDF export generation

---

## 4. App Architecture

Target structure:

```txt
src/
  app/                # Expo Router routes/screens only
  components/         # Shared reusable UI
  constants/          # Colors, images, banks, categories
  features/           # Domain modules
    accounts/
      components/
      hooks/
      store/
      types/
    onboarding/
      components/
      hooks/
      store/
      types/
  hooks/              # Shared hooks
  lib/                # Formatting, dates, ids, validation helpers
  providers/          # App-level providers
  tw/                 # NativeWind wrapper components already in the repo
```

Rules:

- Routes compose feature components; they do not own business logic.
- Feature code stays inside the feature domain until it is reused.
- Shared finance utilities live in `src/lib/`.
- Shared seed data lives in `src/constants/`.
- Image imports go through `src/constants/images.ts`.

---

## 5. V1 Domain Model

Store money as integer cents. Display money through a shared ZAR formatter.

### `Bank`

```ts
export type Bank = {
  id: string;
  name: string;
  shortName: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  sortOrder: number;
};
```

Seed banks:

| ID | Name | Short Name | Gradient From | Gradient To |
| --- | --- | --- | --- | --- |
| fnb | First National Bank | FNB | #E85D04 | #F48C06 |
| capitec | Capitec Bank | Capitec | #003087 | #0057B7 |
| standard-bank | Standard Bank | Standard Bank | #0033A0 | #0066CC |
| nedbank | Nedbank | Nedbank | #007A4D | #00B16A |
| absa | Absa Bank | Absa | #DC143C | #FF4560 |
| discovery | Discovery Bank | Discovery | #5B21B6 | #7C3AED |
| other | Other Bank | Other | #475569 | #94A3B8 |

### `Account`

```ts
export type AccountType =
  | "cheque"
  | "savings"
  | "credit-card"
  | "investment"
  | "loan"
  | "other";

export type Account = {
  id: string;
  bankId: Bank["id"];
  name: string;
  type: AccountType;
  balanceCents: number;
  currency: "ZAR";
  maskedNumber: string;
  createdAt: string;
  updatedAt: string;
};
```

### `TransactionCategory`

```ts
export type TransactionCategory = {
  id: string;
  name: string;
  iconName: string;
  color: string;
  isSystem: boolean;
  isTaxRelevant: boolean;
};
```

Initial categories:

- Food and Dining
- Transport
- Entertainment
- Shopping
- Utilities
- Rent and Housing
- Health
- Education
- Savings
- Debt Repayment
- Other

### `OnboardingState`

```ts
export type OnboardingStep =
  | "welcome"
  | "bank-selection"
  | "account-creation"
  | "complete";

export type OnboardingState = {
  currentStep: OnboardingStep;
  selectedBankId?: Bank["id"];
  isComplete: boolean;
  completedAt?: string;
};
```

The old 8-step onboarding flow is deferred. v1 starts with the smallest valuable onboarding loop: welcome, pick bank, create first account, complete.

---

## 6. First Build Slice

Build onboarding plus first account before any dashboard expansion.

### Scope

- Welcome route.
- Bank selection screen using SA bank seed data.
- First account form.
- Live BankCard preview.
- Local persistence for onboarding state and created account.
- Completion route that leads to the first app home/dashboard shell.

### Acceptance Criteria

- A user can select a bank and create one account.
- The account balance is entered as rand and stored as cents.
- The card preview updates as the user types.
- Bank colors match the selected bank.
- Refreshing or restarting the app preserves the completed onboarding and account once persistence is installed.
- No Clerk, backend, database, or API route is introduced in this slice.

### Out Of Scope

- Transactions.
- Budgets.
- Goals.
- Debts.
- Reports.
- Cloud auth.
- Bank sync.
- AI insights.
- Multi-device sync.

---

## 7. Feature Roadmap

### Phase 0: Documentation And Foundation

- Rewrite `AGENTS.md`.
- Add this mobile blueprint.
- Align `README.md` and `ROADMAP.md`.
- Add a `typecheck` script.
- Confirm lint and typecheck pass.

### Phase 1: First Account Loop

- Onboarding mini-flow.
- SA bank seed constants.
- BankCard component.
- Account store and local persistence.
- First dashboard shell showing the created account.

### Phase 2: Manual Tracking

- Transaction categories.
- Manual transaction create/list.
- Account balance adjustment model.
- Recent transactions on home.
- Empty states for no transactions.

### Phase 3: Planning

- Budgets.
- Goals.
- Debt tracker.
- Progress visuals and gentle milestone feedback.

### Phase 4: Engagement

- Lightweight XP.
- Streaks based on meaningful actions.
- Achievements for first account, first transaction, first budget, first goal, and debt progress.
- Rule-based insights from local data only.

### Phase 5: Cloud Readiness

- Decide whether users need auth and sync.
- Add Clerk only when account identity is needed.
- Add API routes and database only after local flows prove useful.
- Introduce TanStack Query only with real server state.

---

## 8. UI System

### Colors

Base direction:

| Token | Hex | Use |
| --- | --- | --- |
| background | #0B0E17 | App canvas |
| surface | #111827 | Cards and grouped content |
| surfaceRaised | #1E293B | Modals and elevated panels |
| textPrimary | #F8FAFC | Headings and primary values |
| textMuted | #94A3B8 | Captions and secondary text |
| border | #334155 | Dividers and card outlines |
| primary | #4F46E5 | Main actions |
| success | #10B981 | Positive/on-track states |
| warning | #F59E0B | Caution states |
| danger | #F43F5E | Errors, overdue, overspent |

Use bank gradients for BankCard surfaces instead of forcing them into the global color palette.

### Typography

- Use system fonts.
- Use tabular numbers for money where supported.
- Keep finance values large enough to scan quickly.
- Avoid oversized display text inside compact cards.

### Motion

- Use Reanimated for selected states, card entry, progress fill, and completion feedback.
- Keep animation duration short and native-feeling.
- Avoid disruptive motion around sensitive data entry.

---

## 9. Security And Privacy

v1 data is local and sensitive.

- Do not log balances, account names, or transaction descriptions.
- Do not store secrets in client state.
- Do not add bank credential collection.
- Do not imply Nummus has read access to a user's bank.
- Treat AsyncStorage as non-secure persistence.

Future bank sync must be read-only and use provider-approved OAuth/open-banking flows. Nummus must never store bank passwords.

---

## 10. Verification

For documentation changes:

- `AGENTS.md` includes the Practical Vibe Coding sections: role, overview, tech stack, development philosophy, architecture, UI rules, styling rules, state rules, TypeScript rules, asset rules, secret rules, decision rules, verification, final reminder.
- This blueprint does not instruct v1 implementation to use Next.js, shadcn/ui, Vercel, or a database-first flow.
- `README.md` and `ROADMAP.md` match the local-first mobile restart.

For implementation changes:

- Run `npm run lint`.
- Run `npm run typecheck`.
- Prefer Expo Go with `npm run start`.
- Verify the new feature and nearby existing flow.

