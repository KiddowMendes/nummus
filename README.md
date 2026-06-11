# Nummus

Financial management, mobile first.

Nummus is a premium Expo personal finance app for the South African market. The restart is focused on a local-first mobile MVP before desktop, cloud sync, bank sync, or advanced reporting.

The active product blueprint is [docs/nummus-mobile-blueprint-v2.md](docs/nummus-mobile-blueprint-v2.md). The agent playbook is [AGENTS.md](AGENTS.md).

---

## Current Direction

Nummus v1 is built around one excellent first loop:

- Pick a South African bank.
- Create a first local account.
- See a polished dark BankCard with matching bank colors.
- Store money safely as integer cents.
- Format all MVP currency as South African Rand.

The old full-platform vision still matters, but it is no longer the first implementation target.

---

## V1 Principles

- Expo mobile app first; desktop comes later.
- Local-first data using client state and device persistence.
- Premium dark fintech interface.
- ZAR-only MVP.
- Manual tracking before automation.
- One feature per prompt, one verification pass, one commit.

Deferred until later phases:

- Clerk authentication
- Hono API routes
- Neon/PostgreSQL
- Drizzle ORM
- TanStack Query
- Bank sync
- SARS/PDF exports
- Advanced AI insights

---

## Tech Stack

Use the installed versions in `package.json`.

- Expo
- Expo Router
- React Native
- TypeScript strict mode
- NativeWind v5 preview with Tailwind CSS v4
- React Native Reanimated
- expo-image

Planned additions for the first account loop, with approval before install:

- Zustand
- `@react-native-async-storage/async-storage`

---

## Project Structure

Target structure:

```txt
src/
  app/                # Expo Router routes/screens only
  components/         # Shared reusable UI
  constants/          # Colors, images, banks, categories
  features/           # Domain modules
  hooks/              # Shared hooks
  lib/                # Formatting, dates, ids, validation helpers
  providers/          # App-level providers
  tw/                 # NativeWind wrapper components
```

Root `assets/` remains the current asset home unless an asset migration is requested.

---

## Development Commands

```bash
npm run start
npm run lint
npm run typecheck
```

Use Expo Go first for development verification. Native builds are only needed when a dependency or platform feature requires them.

---

## Documentation Order

When instructions conflict, use this order:

1. `AGENTS.md`
2. `docs/nummus-mobile-blueprint-v2.md`
3. Current repo code and installed package versions
4. Historical external documentation

