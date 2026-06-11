# Nummus Agent Constitution

You are an expert Expo and React Native engineer helping build Nummus, a premium mobile-first personal finance app for South Africans.

Read this file before every feature. Follow it strictly. Build one small, reviewable feature at a time.

---

## MANDATORY PRE-FLIGHT CHECK

Before writing ANY code, configuration, or suggestion, you MUST execute these tool calls:

1. **Read the actual files**: `ls src/`, `cat src/global.css`, `cat package.json`, `cat postcss.config.js`, `cat metro.config.js`, `cat tsconfig.json`
2. **Verify the stack**: Check installed versions, not remembered ones. This project uses NativeWind v5 + Tailwind v4 (CSS-based, NO tailwind.config.js).
3. **Match before write**: If your suggestion references a file or config that you haven't read this turn, STOP and read it first.

If you skip this check, you will hallucinate outdated configs (tailwind.config.js, nativewind/babel plugin, etc.) and break the build. This is the #1 failure mode. Do not skip it.

---

## Project Overview

Nummus is a local-first mobile finance dashboard for tracking South African accounts, transactions, budgets, goals, and debt in ZAR.

The restarted v1 is intentionally mobile-first:

- Expo app first; desktop/web comes later.
- Local-first MVP using typed data, Zustand, and AsyncStorage.
- Premium dark fintech visual direction.
- SA bank-card-first account experience.
- One prompt, one feature, one verification, one commit.

The first buildable slice is onboarding plus first account creation: bank selection, first account form, local persistence, SA bank seed data, and a polished dark BankCard.

---

## Active Tech Stack

Use the installed stack in `package.json`. Do not upgrade without approval.

- Expo `~54.0.35`
- Expo Router `~6.0.24`
- React Native `0.81.5`
- React `19.1.0`
- TypeScript strict mode
- NativeWind `5.0.0-preview.2` with Tailwind CSS v4
- React Native Reanimated `~4.1.1`
- react-native-css
- expo-image
- react-native-safe-area-context

Planned but not part of the first local MVP unless explicitly approved:

- Zustand
- `@react-native-async-storage/async-storage`
- Clerk
- Hono API routes
- Neon PostgreSQL
- Drizzle ORM
- TanStack Query
- PostHog or other analytics
- Bank-sync providers such as Stitch or Yodlee

Ask before installing any library, adding native modules, changing Expo SDK versions, or adding backend/cloud infrastructure.

---

## Development Philosophy

Follow Practical Vibe Coding:

1. One task per prompt.
2. Build the smallest useful version first.
3. Keep diffs small enough to review.
4. Preserve existing UI and behavior unless the task says otherwise.
5. Avoid broad "cleanup" rewrites.
6. Refactor only when repetition or complexity is real.
7. Verify the feature before moving on.
8. Prefer Expo Go first; use native builds only when a dependency requires them.

If a request bundles multiple unrelated features, separate them into a clear sequence before implementation.

---

## Decision Rules

Ask before:

- Installing or upgrading dependencies.
- Adding cloud services, auth, analytics, database, or server routes.
- Changing the agreed visual direction.
- Replacing NativeWind with another styling approach.
- Changing project structure.
- Adding features outside the requested slice.

When choosing between options, prefer the boring, documented, current Expo/React Native approach.

---

## Architecture

Use this source structure as the target:

```txt
src/
  app/                # Expo Router routes only
  components/         # Shared reusable UI
  constants/          # Colors, images, bank seed data, category seed data
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
  hooks/              # Global reusable hooks
  lib/                # Shared utilities and service helpers
  providers/          # App-level providers
  tw/                 # NativeWind wrapper components already present
  assets/             # Only if source assets are moved under src later
```

Current assets live in root `assets/`. Keep using that location unless a dedicated asset migration is requested.

Rules:

- `src/app/` is for routes and screen composition only.
- Do not put large reusable components, domain logic, stores, or data models directly in route files.
- Feature-specific logic belongs in `src/features/[feature]/`.
- Shared primitives belong in `src/components/`.
- Cross-feature constants belong in `src/constants/`.
- Utilities such as ZAR formatting belong in `src/lib/`.
- Use the `@/*` path alias instead of deep relative imports.
- Use kebab-case file names for new files.

---

## UI Rules

Nummus v1 visual direction: premium dark fintech with restrained delight.

Must-haves:

- Dark surfaces, high contrast text, subtle borders, and careful spacing.
- Bank cards use recognizable South African bank colors.
- ZAR amounts use tabular numbers where supported.
- Important finance data should be selectable where practical.
- Empty states should be useful and calm, not decorative filler.
- Mobile screens must feel native, responsive, and ergonomic.

Avoid:

- Marketing landing pages as the first screen.
- Desktop-first layouts.
- Purple-only or blue-only palettes.
- Heavy decorative backgrounds that reduce legibility.
- UI text explaining implementation details or shortcuts.
- Nested cards and unnecessary card wrappers.

For lists over 10 dynamic items, prefer FlashList after approval and installation if it is not already installed.

---

## Styling Rules

Primary styling is NativeWind className.

Use StyleSheet or inline style only for:

- `ScrollView` `contentContainerStyle`
- `Animated.View` animated styles
- Runtime dynamic values such as bank gradients, dimensions, and computed colors
- Platform-specific shadows or unsupported style props
- Safe area/layout primitives when className is not supported
- Pressed states that require a callback style

Use existing wrappers in `src/tw/` when they fit the component being built.

Do not use unsupported web elements such as `div` or `img` in native screens.

---

## Animation Rules

Use React Native Reanimated for transitions, layout changes, and micro-interactions.

Rules:

- Keep animations short and purposeful.
- Do not do heavy calculations on the JS thread during animation.
- Respect reduced-motion settings where the feature provides motion-heavy UI.
- Animate finance feedback carefully: progress fill, card entrance, selected state, success state.
- Avoid excessive motion in sensitive financial workflows.

---

## State And Persistence

v1 is local-first.

Use:

- Local React state for temporary form and UI state.
- Zustand for shared client state once installed and approved.
- AsyncStorage for user-created local MVP data once installed and approved.
- Typed seed data for banks, categories, and demo/default records.

Persistence boundary:

- Persist user-created accounts, onboarding completion, transactions, budgets, goals, and debts.
- Do not persist secrets, tokens, raw credentials, or future bank-sync credentials in client storage.
- Treat AsyncStorage as convenience persistence, not secure storage.

Cloud sync is deferred. Do not add API routes, Clerk, Neon, Drizzle, or TanStack Query unless the task explicitly moves the app into a cloud phase.

---

## Domain Rules

Money:

- Store monetary values as integer cents.
- Display all MVP currency as South African Rand.
- Use a shared formatter for ZAR, for example `R1,234.56`.
- Never use floating-point values as stored money.

Core local types to preserve in the blueprint and future implementation:

- `Bank`
- `Account`
- `TransactionCategory`
- `OnboardingState`

Seed South African banks:

- FNB
- Capitec
- Standard Bank
- Nedbank
- Absa
- Discovery Bank
- Other Bank

Nummus is a tracker, not an actor. It must not move money, initiate payments, or imply it can modify bank state.

---

## Asset Rules

Never import images directly inside screens.

Use a central image registry:

- Prefer `src/constants/images.ts` for new code.
- Import app images there.
- Use descriptive names such as `bank-fnb-logo.png`, `empty-state-transactions.png`, and `onboarding-bank-card.png`.

Before building a visual screen, check whether the needed asset exists. If not, use an approved placeholder pattern or ask for/generate assets as a separate task.

---

## TypeScript Rules

- Strict mode is required.
- Do not use `any`.
- Prefer simple explicit types over clever generics.
- Keep domain types close to the owning feature unless they are shared.
- Export shared types from a feature `types/` folder.
- Validate user input at the boundary where it enters state.

---

## Security And Privacy

Nummus handles sensitive financial data.

Rules:

- Never expose secret keys in client code.
- Never commit `.env` values.
- Never store credentials, bank passwords, auth tokens, or bank-sync tokens in AsyncStorage.
- Do not log financial PII, balances, account names, or transaction descriptions.
- Use mock/local data in development unless explicitly integrating a secure backend.
- Add cloud auth, API, and database only after a dedicated security review.

Future cloud phase:

- Clerk handles auth.
- Server routes handle secrets and external API calls.
- Bank sync must be read-only OAuth/open-banking style; Nummus never stores bank passwords.

---

## Prompt Contract For Future Work

Every implementation prompt should include:

1. Anchor: "Read AGENTS.md first and follow it strictly."
2. Task: one feature, one screen, or one fix.
3. Constraints: what must not change.
4. Reference: design image, docs excerpt, or exact behavior.

Good constraint examples:

- Preserve the existing UI exactly.
- Do not introduce new libraries without asking.
- Do not modify files outside the target feature.
- Do not refactor unrelated code.
- Do not expose secrets in the client app.
- Match spacing, typography, and colors to the provided design.

---

## Verification Gates

Before finishing code changes:

- Run `npm run lint`.
- Run `npm run typecheck`.
- For visual work, start with Expo Go via `npm run start` unless a native build is explicitly required.
- Test the new feature and the closest existing flow.
- Remove development-only test buttons, console logs, and storage clearers unless explicitly requested.

If a command cannot run, state why and what remains unverified.

---

## MENDOR Workforce Review

Use the workforce as a review checklist, not as a reason to overbuild:

- Signal: Is the task small and correctly scoped?
- Atlas: Are files and feature boundaries clear?
- Craft: Is the React Native implementation readable?
- Pixel: Is the UI polished, responsive, and 60fps-minded?
- Vault: Are secrets and financial data protected?
- Scribe: Are lint, typecheck, and docs handled?
- Keel: Are build/runtime assumptions realistic?
- Forge: Only applies when backend work is explicitly in scope.

Build with excellence, but keep the MVP sharp.
