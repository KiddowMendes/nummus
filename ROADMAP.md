# Nummus Roadmap: Atlas Plan

This roadmap outlines the phased development of the Nummus mobile application, following MENDOR Corp’s standards for high-performance financial software.

All development follows a **trunk-based development** workflow:
- Development branch: `dev`
- All features are developed in short-lived feature branches and merged into `dev` via Pull Requests.
- CI/CD pipeline runs linting, type-checking, and unit tests on every push.

---

## Phase 1: Foundation (The Shell)
**Objective:** Establish the robust architectural skeleton and design system.

- **Key Components:**
    - Expo Router setup with protected routes.
    - Atomic Design system (components/ui/): Buttons, Inputs, Cards, Typography (consistent with Bento UI).
    - Navigation scaffold (Bottom Tabs, Stack).
    - Theme Provider (Dark/Light mode support).
- **Success Criteria:**
    - Clean app startup under 1s.
    - Navigation transitions feel native (Reanimated).
    - Component library documentation (Storybook/Visual verification).

## Phase 2: Core Financial Data (The Hub)
**Objective:** Implement secure user authentication and essential financial data handling.

- **Key Components:**
    - Clerk Auth integration (Auth flows).
    - Accounts CRUD (ZAR focus).
    - Transaction feed (FlashList).
    - Smart categorization logic.
- **Success Criteria:**
    - Auth latency < 500ms.
    - Transaction list scroll performance at steady 60fps.
    - Secure data handling (encryption-at-rest basics).

## Phase 3: Financial Planning (Strategic Growth)
**Objective:** Empower users with budgeting and debt-tracking capabilities.

- **Key Components:**
    - Budget Management module.
    - Debt Tracking (Snowball/Avalanche UI).
    - Goal Milestones & Progress UI.
- **Success Criteria:**
    - Real-time budget alerts triggered within 2s of transaction.
    - Debt projection calculations are accurate to the cent.
    - Goal progress visualization is fluid and responsive.

## Phase 4: Gamification & AI (The "Coach")
**Objective:** Drive retention and engagement through behavioral insights and rewards.

- **Key Components:**
    - Streak tracking system.
    - Achievement system (Badges, leveling).
    - AI Insight Engine (Backend integration).
- **Success Criteria:**
    - Gamification feedback loops are instantaneous.
    - AI insights are delivered contextually and accurately.
    - High user engagement metrics (daily active use).

## Phase 5: Polish & Performance (The Final Mile)
**Objective:** Optimize for maximum performance, accessibility, and trust.

- **Key Components:**
    - Offline-first optimization (Persistent storage).
- **Success Criteria:**
    - 60fps across all main screens.
    - 99.9% uptime and crash-free sessions.
    - Accessibility (A11y) compliance (WCAG 2.1).
    - Trust indicators (Security badges, transparency screens).
