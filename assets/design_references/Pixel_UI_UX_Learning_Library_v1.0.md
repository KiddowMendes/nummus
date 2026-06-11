# PIXEL UI/UX LEARNING LIBRARY
## Curated Resources, Playbooks & Design Principles for the Nummus Design Agent

**Version 1.0 | June 2026 | For Agent: Pixel (UI/UX Design)**

---

## TABLE OF CONTENTS

- [1. How Pixel Should Use This Library](#1-how-pixel-should-use-this-library)
- [2. Fintech UX Design Fundamentals](#2-fintech-ux-design-fundamentals)
- [3. Dark Mode Design System Mastery](#3-dark-mode-design-system-mastery)
- [4. Accessibility & WCAG Compliance](#4-accessibility--wcag-compliance)
- [5. shadcn/ui Component Architecture](#5-shadcnui-component-architecture)
- [6. South African Market Design Considerations](#6-south-african-market-design-considerations)
- [7. Gamification UX Patterns](#7-gamification-ux-patterns)
- [8. Banking & Financial App Design Patterns](#8-banking--financial-app-design-patterns)
- [9. Design Token & Color System Engineering](#9-design-token--color-system-engineering)
- [10. Animation & Motion Design for Finance](#10-animation--motion-design-for-finance)
- [11. Typography & Information Hierarchy](#11-typography--information-hierarchy)
- [12. Form Design & Input Patterns](#12-form-design--input-patterns)
- [13. Empty States, Error States & Microcopy](#13-empty-states-error-states--microcopy)
- [14. Report & Data Visualization Design](#14-report--data-visualization-design)
- [15. Mobile-First & Responsive Patterns](#15-mobile-first--responsive-patterns)
- [16. Design Quality Checklist for Nummus](#16-design-quality-checklist-for-nummus)
- [Appendix A: External Resource Links](#appendix-a-external-resource-links)
- [Appendix B: Contrast Ratio Reference Table](#appendix-b-contrast-ratio-reference-table)
- [Appendix C: Nummus-Specific Design Decisions Log](#appendix-c-nummus-specific-design-decisions-log)

---

## 1. How Pixel Should Use This Library

This document is Pixel's primary knowledge fortress. It contains the distilled principles, patterns, and best practices that govern every design decision for Nummus. Unlike general design resources, this library is purpose-built for a South African fintech app with dark-mode-first philosophy.

### Learning Protocol

1. Read each section fully before making design decisions
2. Cross-reference every color choice against Appendix B (Contrast Ratios)
3. Document every design decision in Appendix C with rationale
4. When in doubt, default to accessibility over aesthetics
5. Test every component against the 3-second rule: Can a user understand their financial state in 3 seconds?
6. Always design for stress: users check finance apps while commuting, shopping, or under financial pressure

---

## 2. Fintech UX Design Fundamentals

### 2.1 The Four Pillars of Fintech UX

**TRUST**: Users are not just checking balances — they are taking a leap of faith. Every pixel must signal safety, transparency, and control.

**CLARITY**: Financial data is inherently complex. The UI must reduce cognitive load through progressive disclosure, clear hierarchy, and plain language.

**EMPOWERMENT**: Users should feel in control of their money, not overwhelmed by it. The app is a tool, not an authority.

**CONTINUITY**: Every interaction should feel connected. A transaction logged on mobile should reflect instantly on desktop. Context must persist.

### 2.2 Legibility at a Glance (The Bloomberg Principle)

The benchmark for data-dense financial UI is Bloomberg Terminal. Not the look — the principle: every pixel is accountable. Information is structured with precision. Hierarchy is earned by importance, not decoration.

- **Wrong instinct**: Aggressive simplification — hiding numbers behind 'friendly' visuals. Prioritizing approachability over legibility.
- **Right goal**: Legibility at a glance — numbers readable instantly. Information clearly organized and contextually grouped.

### 2.3 Friction as a Feature

In most digital products, friction is the enemy. In fintech, some friction is a trust mechanism. A wire transfer confirmation with a one-second delay and a clear summary isn't bad UX — it's a signal that the system is being appropriately careful with consequential actions.

- **CORRECT friction**: High-stakes actions (transfers, account changes, large purchases, debt payoff confirmations)
- **WRONG friction**: Routine tasks (checking balance, logging a transaction, viewing budget status)
- The best fintech apps know exactly where to slow the user down, and where to get out of the way

### 2.4 Color Carries Weight in Finance

Color does not behave the same way in fintech as in other products. A red notification badge in a social app is noise. A red number in a portfolio dashboard is a signal, and often a stressful one.

- Green and red are not branding tools — they are signals, used sparingly, where meaning matters
- The strongest fintech palettes are deliberate: neutral foundations, high-contrast data, accent colors used with precision
- Restraint is not the same as lifeless — control should never feel dull
- Supporting both light and dark modes is no longer a differentiator — it is expected

---

## 3. Dark Mode Design System Mastery

### 3.1 The Anti-Pure-Black Rule

Pure black (#000000) is the most common dark mode mistake. It creates harsh contrast, eye strain, and the 'halo effect' where bright text appears to glow. Nummus uses #0B0E17 as the base — a deep navy-black that reduces glare while maintaining darkness.

| Background Type | Hex Value | Usage in Nummus |
|-----------------|-----------|-----------------|
| App Canvas (Base) | #0B0E17 | Page background, empty space |
| Card Surface | #111827 | Card backgrounds, elevated surfaces |
| Raised Surface | #1E293B | Modals, dropdowns, popovers |
| Input Background | #1E293B | Form fields, search bars |
| Hover/Accent | #334155 | Selected rows, hover states, borders |

### 3.2 Elevation Through Lightness (Not Shadows)

Traditional drop shadows don't work in dark mode — they become invisible on dark backgrounds. Instead, elevation is communicated through progressively lighter surface colors. The closer a surface is to the user, the lighter it becomes (more light hits it).

**Nummus Elevation Scale:**
- Level 0 (Base): #0B0E17 — App canvas, furthest from user
- Level 1 (Card): #111827 — Standard cards, panels
- Level 2 (Raised): #1E293B — Modals, dropdowns, menus
- Level 3 (Input): #1E293B + border — Form fields, active elements
- Level 4 (Hover): #334155 — Selected states, hover overlays

### 3.3 Text Color Strategy

Avoid pure white (#FFFFFF) for body text — it creates too much contrast and causes eye fatigue. Use opacity-based white or soft greys.

| Text Level | Opacity | Hex Equivalent | Usage |
|------------|---------|----------------|-------|
| Primary / Headings | 100% | #F8FAFC | Page titles, card headers, amounts |
| Secondary / Body | 87% | #E2E8F0 | Descriptions, labels, body text |
| Muted / Captions | 60% | #94A3B8 | Timestamps, metadata, placeholders |
| Disabled | 38% | #64748B | Inactive buttons, unavailable options |

### 3.4 Desaturated Accents for Dark Mode

Bright, fully saturated colors vibrate and bleed on dark backgrounds. This is called 'visual vibration' — an unpleasant effect where high-contrast colors seem to shimmer. Always desaturate accent colors for dark mode.

| Semantic Color | Light Mode (Saturated) | Dark Mode (Desaturated) |
|----------------|------------------------|-------------------------|
| Success / Emerald | #10B981 | #34D399 (lighter, less saturated) |
| Warning / Amber | #F59E0B | #FBBF24 (lighter, warmer) |
| Danger / Rose | #F43F5E | #FB7185 (lighter, softer) |
| Info / Indigo | #4F46E5 | #818CF8 (lighter, less saturated) |
| Gold / Achievement | #F59E0B | #FCD34D (brighter for dark bg) |

---

## 4. Accessibility & WCAG Compliance

### 4.1 The POUR Principles

WCAG 2.1 is built on four principles. Every Nummus screen must satisfy all four:

**PERCEIVABLE**: All content must be presentable in ways users can perceive. Text alternatives for images, captions for videos, sufficient color contrast, adaptable layouts.

**OPERABLE**: All functionality must be operable via keyboard, touch, or assistive tech. No time limits that trap users. Navigation is consistent and predictable.

**UNDERSTANDABLE**: Content and UI operation must be clear. Plain language, consistent navigation, input assistance, error prevention.

**ROBUST**: Content must work with current and future assistive technologies. Semantic HTML, ARIA labels, proper heading structure.

### 4.2 Contrast Ratio Requirements (WCAG AA)

These are non-negotiable minimums. Pixel must verify every text color against its background:

| Element Type | Minimum Ratio | Nummus Target | Test Tool |
|--------------|---------------|---------------|-----------|
| Normal text (<18px) | 4.5:1 | 7:1 (AAA where possible) | WebAIM Contrast Checker |
| Large text (>=18px bold / 24px) | 3:1 | 4.5:1 | Stark Plugin (Figma) |
| UI Components / Graphics | 3:1 | 4.5:1 | Chrome DevTools Accessibility Panel |
| Focus Indicators | 3:1 | 4.5:1 | Keyboard-only navigation test |
| Bank Card Text on Gradient | 4.5:1 | 5:1+ with text-shadow | Manual check per gradient |

### 4.3 Nummus-Specific Accessibility Challenges

**Bank Card Gradients**: 7 different bank gradients (FNB orange, Capitec blue, etc.). White text must be readable on ALL gradients. Solution: Add text-shadow (0 1px 3px rgba(0,0,0,0.5)) and test each gradient individually.

**Amber Warning on Dark**: Warning color #F59E0B on #111827 card bg = 4.6:1 (barely passes). Solution: Use #FBBF24 for dark mode warnings to improve to 5.8:1.

**Rose Danger on Dark**: Danger #F43F5E on #111827 = 5.2:1 (passes). But on #0B0E17 = 5.8:1. Ensure danger text is always on elevated surfaces.

**Muted Text Visibility**: #94A3B8 on #0B0E17 = 5.4:1 (passes). But on #111827 = 4.7:1 (barely passes). Use #A1A1AA for muted text on cards.

**Outdoor/Sunlight Use**: SA users check finances outdoors. Dark mode + sunlight = visibility disaster. Solution: Ensure minimum brightness contrast and test on AMOLED vs LCD screens.

**Color Blindness**: 8% of SA males have some form of color blindness. Never rely on color alone. Always pair with icons, text labels, or patterns.

**Low Vision / Cataracts**: Use bold, clear fonts. Avoid thin strokes. Ensure 44x44pt minimum touch targets. Support dynamic text scaling without layout breakage.

### 4.4 Screen Reader Compatibility

Nummus must work with VoiceOver (iOS) and TalkBack (Android). Key requirements:

- All interactive elements must have accessible labels (aria-label or visible text)
- Heading hierarchy must be logical (H1 -> H2 -> H3, never skip levels)
- Form fields must have associated labels (not just placeholder text)
- Bank cards must announce: 'FNB Cheque Account, balance 1,250 rand 50 cents'
- Transaction rows must announce: 'Expense, 45 rand, Spar, Food and Dining, today'
- Progress bars must announce: 'Budget 70 percent spent, warning status'
- Goal arcs must announce: 'Emergency Fund, 45 percent complete, 2,500 of 5,000 rand'

---

## 5. shadcn/ui Component Architecture

### 5.1 Component Hierarchy

| Layer | Examples | Source |
|-------|----------|--------|
| Layer 1: Primitives (shadcn/ui) | Button, Input, Select, Dialog, Card, Table, Tabs, Badge, Progress, Calendar | shadcn/ui registry |
| Layer 2: Shared Components | BankCard, ProgressTracker, AccountTypeBadge, BankLogo, DateRangePicker, XpBar, StreakBadge, TipCard, AchievementCard | Custom-built |
| Layer 3: Feature Components | BudgetCard, BudgetForm, GoalCard, DebtCard, RecurringItemCard, BillTimeline, ReportCard, ReportPreview | Feature-scoped |
| Layer 4: Page Components | OnboardingFlow, Dashboard, AccountsPage, TransactionsPage, etc. | Route-scoped |
| Layer 5: Layout Components | AppShell, Sidebar, MobileNav, TopBar, PageHeader | App-level |

### 5.2 shadcn/ui Customization Rules for Nummus

- NEVER modify shadcn/ui source files directly — always override via Tailwind classes or CSS variables
- Use CSS custom properties (variables) for all colors so dark mode switches automatically
- Radius scale: rounded-xl (12px) for cards, rounded-lg (8px) for buttons/inputs, rounded-full for badges/pills
- Shadows: Use subtle borders instead of shadows in dark mode (shadow-sm in light, border glow in dark)
- Focus rings: Always visible, 2px, primary color (#4F46E5), offset 2px
- Disabled states: 38% opacity + cursor-not-allowed, never just greyed out
- Loading states: Skeleton screens matching content layout, 1.5s shimmer animation

### 5.3 Critical shadcn/ui Components for Nummus

| Component | Nummus Customization | Used In |
|-----------|---------------------|---------|
| Button | Brand indigo default (#4F46E5), rounded-xl, full-width CTA variant | Everywhere |
| Input | Dark bg (#1E293B), subtle border, focus ring indigo, tabular-nums for amounts | Forms, onboarding |
| Select | Dark dropdown, consistent with card styling, search enabled | Bank selection, category picker |
| Dialog | Dark overlay, slide-up on mobile, centered on desktop | Modals, confirmations |
| Card | #111827 background, subtle border, hover lift animation | Dashboard, lists |
| Table | Three-line style, dark header row, zebra striping optional | Transactions, reports |
| Tabs | Pill-style segmented control, max 3 items, no nested tabs | Money page, Plan page |
| Badge | Color-coded per status (emerald/amber/rose), rounded-full | Debt type, budget status |
| Progress | Gradient fill (indigo-violet), animated fill on load | Budgets, goals, debts |
| Calendar | Dark month grid, SAST timezone, disabled past dates for goals | Date pickers |

---

## 6. South African Market Design Considerations

### 6.1 Device & Connectivity Reality

**Android Dominance (75%)**: Design for Android first. Test on mid-range devices (Samsung A-series, Xiaomi Redmi). iOS is secondary.

**Low-End Performance**: 41 million smartphone users, but many use entry-level devices. App load must be <3s on Moto G Pure equivalent. Code splitting and lazy loading are mandatory.

**Data Costs**: Mobile data is expensive. Minimize image assets. Use SVG icons, CSS gradients, and system fonts. Avoid heavy animations that consume CPU/battery.

**Intermittent Connectivity**: Users may lose connection while commuting. Design for offline state: queue actions, show sync status, prevent duplicate transactions.

**Screen Sizes**: Popular devices: 6.1" - 6.7" screens, 720p - 1080p resolution. Design for thumb reach (bottom 2/3 of screen for primary actions).

### 6.2 Cultural & Financial Context

**Stokvels & Informal Finance**: R50 billion annual circulation. While not in MVP, the design system should accommodate rotating savings clubs in v1.2 without breaking the UI.

**NSFAS Student Loans**: Many users have student debt. The debt tracker must handle 'Student Loan' as a first-class debt type with blue badge.

**Store Accounts**: Edgars, Truworths, etc. are common credit facilities. Users need to track these alongside bank debts.

**Cash Economy**: Many transactions are cash-based. Manual entry must be fast and frictionless — voice input or quick-add templates.

**SARS Tax Season**: July-November is high-stress period. Tax export must be prominently featured and clearly labeled as 'SARS-ready'.

**Language Diversity**: 11 official languages. MVP is English, but UI must support RTL and text expansion for future localization (Afrikaans, isiZulu, isiXhosa).

### 6.3 Bank Brand Recognition

South Africans have strong brand loyalty to their banks. The bank card visual system is not decorative — it is a trust signal. Each card must be instantly recognizable.

| Bank | Primary Color | Gradient | Recognition Cue |
|------|---------------|----------|-----------------|
| FNB | #E85D04 | #E85D04 -> #F48C06 | Orange = innovation, youth |
| Capitec | #003087 | #003087 -> #0057B7 | Blue = simplicity, accessibility |
| Standard Bank | #0033A0 | #0033A0 -> #0066CC | Navy = tradition, stability |
| Nedbank | #007A4D | #007A4D -> #00B16A | Green = sustainability |
| Absa | #DC143C | #DC143C -> #FF4560 | Red = boldness, African identity |
| Discovery | #8B5CF6 | #8B5CF6 -> #6D28D9 | Purple = wellness, tech |
| Other | #4B5563 | #4B5563 -> #9CA3AF | Neutral grey = professional fallback |

---

## 7. Gamification UX Patterns

### 7.1 The Motivation-Action-Feedback Loop

Every gamification element must follow this loop:

1. **MOTIVATION**: User wants to achieve something (pay off debt, save for a goal, stay under budget)
2. **ACTION**: User takes a qualifying action (logs transaction, pays bill, adds contribution)
3. **FEEDBACK**: System responds immediately with progress update, XP gain, or milestone celebration
4. **REINFORCEMENT**: Positive feeling encourages repeat behavior, building habit

### 7.2 XP & Level Design Principles

- Progressive difficulty: Early levels should be achievable quickly (Level 2 at 500 XP) to hook users. Later levels require sustained effort (Level 10 at 25,000 XP).
- Visible progress: XP bar must always be visible (sticky top bar). Users should never wonder 'how close am I?'
- Meaningful titles: 'Penny Watcher' -> 'Budget Beginner' -> 'Debt Slayer' -> 'Nummus Legend'. Titles should reflect financial maturity.
- No punishment: Never deduct XP. Financial setbacks are stressful enough — the app should not add shame.
- Surprise and delight: Occasional bonus XP for streak milestones (3, 7, 14, 30 days) creates unpredictability that sustains engagement.

### 7.3 Achievement Design

| Rarity | Visual Treatment | Unlock Frequency | Example |
|--------|-----------------|------------------|---------|
| Common | Full color, subtle border | Within first week | First Steps, Budget Boss |
| Rare | Full color + shimmer border | Within first month | Goal Getter, Streak Starter |
| Epic | Gold border + animated glow | Within first 3 months | Debt Destroyer |
| Legendary | Unique animation + profile badge | Long-term dedication | Reserved for future |

### 7.4 Streak Mechanics UX

Streaks are powerful but dangerous. A broken streak can demotivate. Design must soften the blow:

- Flame icon (amber) with day count — instantly recognizable
- Milestone toasts at 3, 7, 14, 30 days with bonus XP (surprise and delight)
- If streak breaks: 'Your 5-day streak ended. Start a new one today!' (not 'You failed')
- Streak freeze option: One 'missed day' forgiveness per month (premium feature)
- Qualifying actions must be meaningful: logging transaction, paying bill, adding goal contribution. Opening app does NOT count.

---

## 8. Banking & Financial App Design Patterns

### 8.1 Transaction History Design

The transaction list is the most-used surface in any finance app. It is also the most commonly under-designed. Nummus must treat the transaction list as a queryable record, not a static log.

- Group by date (Today, Yesterday, This Week, Earlier) with sticky headers
- Each row: Category icon (left) + Description + Account badge (center) + Amount (right, color-coded)
- Amount formatting: Green for income, red for expense, tabular-nums for aligned digits
- Search: Full-text across description, payee, and category name
- Filter chips: Account, Category, Date range — horizontally scrollable
- Expandable detail: Tap row to show merchant address, payment method, reference number, edit/delete actions
- Pending transactions: Visually distinct (amber dot, italic text) from cleared transactions
- Empty state: Illustration + 'No transactions logged' + CTA to add first transaction

### 8.2 Payment & Transfer Flow Patterns

Nummus is a tracker, not an actor — it does not initiate real payments. But it must simulate the UX of payment flows for debt payments and goal contributions (which create transaction records).

- Pre-fill known details from history (recipient, amount patterns)
- Show post-action balance BEFORE confirmation ('After this payment, your balance will be R1,250.50')
- Clear confirmation screen with all material details (amount, account, date, category)
- Cancellation option up to point of irreversibility
- Explicit edge case handling: insufficient funds, daily limits, processing windows
- Success animation: Brief confetti or checkmark, then auto-return to relevant screen

### 8.3 Notification & Alert Design

Push notifications in banking apps are high-signal. Users expect them to be accurate, timely, and actionable. Nummus notifications must respect this trust.

- Budget warnings: 'Food & Dining budget at 85% — R127.50 remaining this month' (not just 'Budget warning')
- Bill reminders: 'Electricity bill (R450) due in 3 days' with 'Mark as Paid' action button
- Goal milestones: 'Emergency Fund hit 50%! You're halfway there.' with confetti preview
- Debt urgency: 'Credit card payment due tomorrow. Current balance: R3,200'
- Streak reminders: 'Log a transaction to keep your 7-day streak alive!' (gentle, not pushy)
- AI tips: 'You spent 30% more on transport this month. Tap to see why.'
- Granular controls: Users can toggle each notification type individually, not just on/off

### 8.4 Account Summary & Net Worth

The dashboard must answer 'How am I doing?' in 3 seconds. The account summary is the anchor.

- Total net worth: Large type, tabular-nums, prominent position
- Individual accounts: Horizontal scroll of BankCards (compact variant), tap for detail
- Color coding: Positive balance = white, negative (credit card debt) = rose, zero = muted
- Quick actions: Swipe card for 'Log Transaction', 'View History', 'Edit Account'
- Security: Masked numbers (****1234) by default, tap to reveal with biometric/auth check

---

## 9. Design Token & Color System Engineering

### 9.1 Token Architecture

| Token Type | Description | Example |
|------------|-------------|---------|
| Primitive Tokens | Raw values | #0B0E17, #4F46E5, 16px, 400 |
| Semantic Tokens | Meaning-based | --color-background, --color-primary, --font-size-body |
| Component Tokens | Component-specific | --button-bg-primary, --card-border-radius |
| Theme Tokens | Theme overrides | --dark-color-background, --light-color-background |

### 9.2 Nummus Semantic Token Registry

| Token Name | Dark Value | Light Value | Usage |
|------------|-----------|-------------|-------|
| --color-background | #0B0E17 | #FFFFFF | App canvas, page bg |
| --color-surface | #111827 | #F8FAFC | Card backgrounds |
| --color-surface-raised | #1E293B | #E2E8F0 | Modals, dropdowns, inputs |
| --color-primary | #4F46E5 | #4F46E5 | Buttons, links, active states |
| --color-primary-foreground | #FFFFFF | #FFFFFF | Text on primary buttons |
| --color-secondary | #7C3AED | #7C3AED | Accents, highlights, badges |
| --color-text-primary | #F8FAFC | #0F172A | Headings, primary text |
| --color-text-secondary | #E2E8F0 | #334155 | Body text, descriptions |
| --color-text-muted | #94A3B8 | #64748B | Captions, metadata, placeholders |
| --color-border | #334155 | #E2E8F0 | Card borders, input borders, dividers |
| --color-success | #34D399 | #10B981 | Under budget, paid, positive |
| --color-warning | #FBBF24 | #F59E0B | Approaching limit, upcoming due |
| --color-danger | #FB7185 | #F43F5E | Overspent, overdue, errors |
| --color-info | #818CF8 | #4F46E5 | Tips, insights, informational |
| --color-gold | #FCD34D | #F59E0B | Achievements, completed goals |

### 9.3 Bank Gradient Token System

Bank gradients are not just colors — they are identity tokens. Each bank has a gradient pair that must be consistent across all components (cards, selectors, transaction badges).

```typescript
// banks.ts — Single source of truth for all bank visual data
export const BANKS = {
  fnb: {
    id: 'fnb',
    name: 'First National Bank',
    shortName: 'FNB',
    gradientFrom: '#E85D04',
    gradientTo: '#F48C06',
    sortOrder: 1,
    logoUrl: '/banks/fnb.svg'
  },
  capitec: {
    id: 'capitec',
    name: 'Capitec Bank',
    shortName: 'Capitec',
    gradientFrom: '#003087',
    gradientTo: '#0057B7',
    sortOrder: 2,
    logoUrl: '/banks/capitec.svg'
  },
  // ... etc for all 7 banks
} as const;

// Usage in BankCard component
const gradient = `linear-gradient(135deg, ${bank.gradientFrom}, ${bank.gradientTo})`;
```

---

## 10. Animation & Motion Design for Finance

### 10.1 Animation Principles for Nummus

**Purposeful**: Every animation answers a user question: 'Did my action work?' 'What's happening?' 'What changed?'

**Subtle**: Finance apps are not games. Animations should be felt, not noticed. 200-400ms duration max for micro-interactions.

**Respectful**: Respect prefers-reduced-motion. All animations become instant opacity changes when this setting is enabled.

**Performance-conscious**: Use transform and opacity only (GPU-accelerated). Avoid animating layout properties (width, height, margin).

**Contextual**: Celebrate milestones (goal complete, debt paid off) with more expressive animation. Routine actions get minimal feedback.

### 10.2 Nummus Animation Specification

| Animation | Trigger | Duration | Easing | CSS Property |
|-----------|---------|----------|--------|--------------|
| Card hover lift | Mouse enter | 200ms | ease-out | transform: translateY(-4px) |
| Progress bar fill | Data load / update | 800ms | ease-out | width transition |
| XP bar fill | XP gain event | 800ms | cubic-bezier(0.4, 0, 0.2, 1) | width transition |
| Streak pulse | Streak increment | 600ms | ease-in-out | transform: scale(1.1) |
| Confetti burst | Milestone / completion | 2s | ease-out | canvas-based particles |
| Scale-bounce | Achievement unlock | 500ms | cubic-bezier(0.34, 1.56, 0.64, 1) | transform: scale |
| Tip card rotate | Auto-rotate (10s) | 400ms | ease-in-out | opacity + transform |
| Page transition | Navigation | 200ms | fade + translateY | opacity, transform |
| Skeleton shimmer | Loading state | 1.5s loop | linear | background-position |
| Toast slide-in | Notification | 300ms | cubic-bezier(0.16, 1, 0.3, 1) | transform: translateX |
| Bank logo shimmer | Onboarding welcome | 2s loop | linear | background-position gradient |
| Button press | Tap / click | 100ms | ease-out | transform: scale(0.97) |

### 10.3 Celebration Animation Guidelines

Milestone celebrations (goal complete, debt paid off, level up) are the only place for expressive animation. They must feel earned, not gratuitous.

- Goal 25%/50%/75%: Confetti burst (2s) + scale-bounce on milestone dot
- Goal 100%: Trophy animation (scale from 0 to 1 with bounce) + gold border transition + confetti
- Debt paid off: Checkmark draw animation (SVG stroke-dasharray) + 'Debt-free!' toast + progress bar fills to 100%
- Level up: XP bar overflows with glow effect, level badge flips (3D rotation), new title fades in
- Achievement unlock: Card flips from grayscale to full color, shimmer border activates for 3s
- Streak milestone: Flame icon pulses 3x, day count scales up with bounce, bonus XP floats upward

---

## 11. Typography & Information Hierarchy

### 11.1 Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 30px (text-3xl) | 700 (bold) | 1.25 | Onboarding headlines, empty state titles |
| H1 | 24px (text-2xl) | 700 (bold) | 1.25 | Page titles: Dashboard, Accounts |
| H2 | 20px (text-xl) | 600 (semibold) | 1.3 | Section headers, card titles |
| H3 | 18px (text-lg) | 600 (semibold) | 1.3 | Sub-sections, form group labels |
| Body | 16px (text-base) | 400 (normal) | 1.5 | Primary body text, descriptions |
| Small | 14px (text-sm) | 400 (normal) | 1.5 | Captions, metadata, secondary text |
| Xs | 12px (text-xs) | 400 (normal) | 1.5 | Badges, timestamps, fine print |
| Tabular | 16px (text-base) | 400 (normal) | 1.5 | ALL monetary amounts for aligned digits |

### 11.2 Font Family Strategy

System font stack ensures fast loading and native feel across platforms:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```

Platform-specific:
- iOS: SF Pro (system default, excellent tabular nums)
- Android: Roboto (system default, good readability at small sizes)
- Web: Inter (loaded via Google Fonts, optimized for screen readability)

### 11.3 Information Hierarchy Rules

- Amounts are always the most prominent element on financial cards — largest size, tabular-nums, high contrast
- Account names are secondary — H2 size, semibold, primary text color
- Metadata (date, category, account type) is tertiary — Small size, muted color
- Actions (edit, delete, pay) are least prominent — icon-only or small text, visible on hover/tap
- Use whitespace, not lines, to separate sections — lines create visual clutter in dark mode
- Limit to 3 font sizes per screen — more creates cognitive overload

---

## 12. Form Design & Input Patterns

### 12.1 Form Design Principles

**One Primary Action Per Screen**: Each form screen should have ONE clear goal. Onboarding Screen 3 = Create First Account. Nothing else.

**Inline Validation**: Validate on blur, not on submit. Show error immediately: 'Amount must be greater than 0' — not after the user clicks Continue.

**Smart Defaults**: Pre-fill where possible. Currency = ZAR (locked). Date = today. Account type = CHEQUE (most common).

**Progressive Disclosure**: Show advanced options only when needed. Interest rate field appears only if user selects 'Credit Card' or 'Loan'.

**Input Masks**: Amount fields: auto-format as user types (R 1,250.50). Phone: +27 format. Date: DD/MM/YYYY.

**Keyboard Optimization**: Show numeric keyboard for amount fields. Show email keyboard for email fields. Next/Previous buttons in form navigation.

**Undo & Recovery**: Allow users to edit or delete entries without penalty. A 'delete transaction' button should be visible but not prominent.

### 12.2 Amount Input Pattern (Critical)

Amount input is the most frequent interaction in Nummus. It must be flawless:

- Format: User types '1250.50' -> display 'R 1,250.50' in real-time
- Validation: Must be > 0. Max reasonable: R 999,999.99 (prevents typo disasters)
- Cents handling: Store as INTEGER (125050). Display divides by 100. Input multiplies by 100.
- Currency symbol: Always ZAR (R). Locked — no currency selector in MVP.
- Negative amounts: Only for transactions (expense = negative). Forms should not allow negative input — use type selector (Income/Expense).
- Quick amounts: Show common values as chips (R 50, R 100, R 200, R 500, R 1000) for fast entry

### 12.3 Onboarding Form Sequence

The 8-screen onboarding flow uses a specific form pattern per screen:

| Screen | Form Pattern |
|--------|-------------|
| Screen 1: Welcome | No form. Value proposition + CTA only. |
| Screen 2: Pick Bank | Radio grid (2-col mobile / 3-col desktop). Bank cards with logo + name. Selected state = border-glow. |
| Screen 3: Create Account | Live preview form. Fields: Account Name (text), Type (select), Balance (amount). BankCard preview updates in real-time below. |
| Screen 4: Add More? | Horizontal scroll of existing accounts + 'Add Another' button. No required fields. |
| Screen 5: Set Budget | Form: Name (text), Category (select with icons), Amount (amount), Period (radio: Monthly/Weekly). |
| Screen 6: Track Debt | Form: Name (text), Type (select), Original Amount (amount), Current Balance (amount), Interest Rate (percentage), Monthly Payment (amount), Due Date (date). |
| Screen 7: Set Goal | Form: Name (text), Target Amount (amount), Target Date (date, future only), Link Account (optional select). |
| Screen 8: All Done | No form. Celebration + XP summary + CTA to Dashboard. |

---

## 13. Empty States, Error States & Microcopy

### 13.1 Empty State Design

Empty states are not failures — they are onboarding opportunities. Every empty state must have: an illustration, a reassuring message, and a clear CTA.

| Context | Illustration | Message | CTA |
|---------|-------------|---------|-----|
| No accounts | Empty wallet illustration | No accounts yet | Add your first account |
| No transactions | Receipt outline illustration | No transactions logged | Log your first transaction |
| No budgets | Target with dashed circle | No budgets set up | Create your first budget |
| No goals | Flag on mountain illustration | No savings goals yet | Set a goal |
| No debts | Checkmark over document | No debts tracked | Add a debt |
| No recurring | Calendar with plus | No recurring items | Add a recurring item |
| No tips (AI) | Magnifying glass + coins | Log transactions and set a budget to get personalized insights | Go to Dashboard |

### 13.2 Error State Design

In fintech, errors are anxiety triggers. A failed payment or declined transaction creates real stress. The design must absorb that stress, not amplify it.

| Error Type | Visual Treatment | Message Pattern | Recovery |
|------------|-----------------|-----------------|----------|
| Form validation | Red border + error text below field | '[Field] is required' / 'Must be greater than 0' | Inline correction, field auto-focus |
| API failure | Toast notification (top-center) | 'Something went wrong. Please try again.' | Retry button on toast, auto-retry with backoff |
| Network offline | Banner (top of screen, amber) | 'You're offline. Changes will sync when connected.' | Auto-dismiss on reconnect, queue actions |
| Empty required data | Modal blocking | 'You need at least one account to continue.' | Redirect to account creation flow |
| Rate limit | Toast (rose) | 'Too many requests. Please wait a moment.' | Auto-retry with exponential backoff |
| Insufficient funds | Modal with warning icon | 'This payment would exceed your available balance.' | Show balance, suggest lower amount |

### 13.3 Microcopy Guidelines

Microcopy is the small text that guides users: button labels, helper text, error messages, empty states. In fintech, microcopy can be the difference between trust and abandonment.

- Use plain English, not financial jargon. 'Money you owe' not 'Liabilities'. 'Money coming in' not 'Income stream'.
- Be specific, not vague. 'R 1,250.50 spent on Food this month' not 'You've spent some money on food'.
- Use active voice. 'We saved your budget' not 'Your budget has been saved'.
- Avoid blame. 'Let's try a different amount' not 'You entered an invalid amount'.
- Confirm consequences. 'This will delete all 45 transactions in this account. This cannot be undone.'
- Use 'you' and 'your'. 'Your balance' not 'The balance'. Personal ownership builds trust.
- Keep it short. Mobile screens have limited space. Aim for <50 characters per line.
- Test with real users. South African English has nuances. 'Top up' vs 'Add money' vs 'Deposit' — test which resonates.

---

## 14. Report & Data Visualization Design

### 14.1 Chart Design Principles

- Start at zero: Bar charts and area charts must start at y=0. Truncated axes distort proportions and mislead users about their finances.
- Limit categories: Donut charts should have max 6-7 segments. More becomes unreadable. Group smaller items as 'Other'.
- Use consistent colors: Same category = same color across all reports. Food & Dining is always the same green, everywhere.
- Label directly: Avoid legends where possible. Label data points directly on the chart. Reduces eye movement.
- Mobile-first charts: Charts must be readable on 6-inch screens. Rotate labels 45 degrees if needed. Use tooltips for precise values.
- Empty states: No data = empty chart with illustration + 'No data for this period' message, not a broken chart.

### 14.2 Report Type Specifications

| Report Type | Chart Type | Color Strategy | Key Design Notes |
|-------------|-----------|----------------|------------------|
| Monthly Summary | Grouped bar chart | Income = emerald, Expenses = rose, Net = indigo | Side-by-side bars per month. Net line overlay. |
| Category Breakdown | Donut chart | Category colors from system palette | Center shows total spend. Segments labeled with % and amount. |
| Net Worth | Area chart | Assets = emerald, Liabilities = rose, Net = indigo | Stacked area with gradient fill. Time on x-axis. |
| Tax Export (SARS) | Data table | Tax Relevant = emerald highlight, Non-relevant = default | 8 columns, sortable, CSV export button prominent. |
| Income/Expense Trend | Multi-month bar chart | Income = emerald, Expenses = rose | Grouped bars per month. Trend line for net. |
| Debt Progress | Declining area chart | Balance = rose, Paid = emerald | Show projected payoff date as dashed line extension. |

### 14.3 SARS CSV Export Design

The SARS export is a unique differentiator. The UI must make it feel official and trustworthy:

- Prominent placement: 'SARS Tax Export' button in Reports page, highlighted during tax season (July-November)
- Preview modal: Show first 10 rows before download. Skeleton loader for minimum 2 seconds (builds trust through perceived effort).
- Legal disclaimer: Visible but not scary. 'This export is provided as a convenience. Verify all categorisations with a registered tax practitioner.'
- Filename: nummus_tax_export_YYYY[_Q#].csv — clear and professional
- Tax Relevant column: Green 'YES' badge for Education/Health, grey 'NO' for others — instant visual scan
- Download confirmation: Toast notification with file name and row count

---

## 15. Mobile-First & Responsive Patterns

### 15.1 Breakpoint Strategy

| Breakpoint | Width | Primary Layout | Key Changes |
|------------|-------|---------------|-------------|
| Mobile | < 640px | Single column, bottom nav | Stacked cards, full-width buttons, hamburger menu |
| Tablet | 640px - 1024px | 2-column grid, collapsible sidebar | Side-by-side cards, persistent nav icons |
| Desktop | > 1024px | 240px sidebar + main canvas | Full sidebar, max-width content (768px), hover states |

### 15.2 Touch Target Standards

| Element | Minimum Size | Padding |
|---------|-------------|---------|
| Buttons (primary) | 48px x 48px | 12px horizontal, 8px vertical |
| Icon buttons | 44px x 44px | 8px all sides |
| List items | 56px height min | 16px horizontal padding |
| Form inputs | 48px height min | 12px horizontal padding |
| Checkbox / Radio | 24px x 24px | 12px margin |
| Bottom nav items | 56px x 56px | Even distribution |
| FAB (Floating Action) | 56px x 56px | 16px from edges |

### 15.3 Thumb Zone Optimization

On a 6.5" phone, the natural thumb zone covers the bottom 2/3 of the screen. Primary actions must live in this zone. Destructive or secondary actions can live in the top 1/3.

- Primary CTA: Bottom of screen, full-width, thumb-reachable
- FAB: Bottom-right corner (natural thumb rest position)
- Navigation: Bottom tab bar, not top (iOS habit, but Android users expect bottom nav)
- Back button: Top-left (standard) OR swipe gesture (modern)
- Delete/Edit: Top-right or in overflow menu (avoid accidental taps)
- Amount input: Center-screen with numeric keyboard from bottom

---

## 16. Design Quality Checklist for Nummus

Before any design is handed off from Pixel to another agent, it must pass this checklist. No exceptions. This is the quality gate.

### 16.1 Visual Design Checklist

- [ ] All colors pass WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Bank card gradients tested for white text readability (with text-shadow)
- [ ] No pure black (#000000) or pure white (#FFFFFF) used anywhere
- [ ] All surfaces follow elevation scale (Level 0-4)
- [ ] Consistent border radius: 12px cards, 8px buttons, full badges
- [ ] Consistent spacing: 4px base unit, no arbitrary values
- [ ] Typography scale used correctly (no custom sizes outside defined scale)
- [ ] Tabular numbers used for ALL monetary amounts
- [ ] Icons from Lucide React only (no custom icons without approval)
- [ ] Images optimized (WebP format, lazy loading, brightness filter for dark mode)

### 16.2 Interaction Design Checklist

- [ ] All interactive elements have visible focus states (2px primary color ring)
- [ ] Hover states defined for desktop (lift on cards, brighten on buttons)
- [ ] Active/pressed states defined (scale 0.97 on buttons)
- [ ] Loading states for all async actions (skeleton screens, not spinners)
- [ ] Error states for all form fields (inline validation, not just on submit)
- [ ] Success states for all creation actions (toast, brief animation)
- [ ] Empty states for all list views (illustration + message + CTA)
- [ ] Swipe gestures defined where appropriate (transaction list, cards)
- [ ] Pull-to-refresh on all data lists
- [ ] Infinite scroll or pagination for transaction history (>50 items)

### 16.3 Accessibility Checklist

- [ ] All images have alt text (decorative images have empty alt)
- [ ] All form fields have associated labels
- [ ] Heading hierarchy is logical (H1 -> H2 -> H3, no skips)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical and visible
- [ ] Color is not the sole means of conveying information (icons + text)
- [ ] Screen reader labels tested for bank cards, transactions, budgets
- [ ] Dynamic text scaling tested (up to 200% without layout breakage)
- [ ] prefers-reduced-motion respected (all animations become instant)
- [ ] Touch targets meet 44x44px minimum

### 16.4 Performance Checklist

- [ ] No layout shift on load (CLS < 0.1)
- [ ] First Contentful Paint < 1.5s on 3G
- [ ] Largest Contentful Paint < 2.5s on 3G
- [ ] Animation frame rate stable at 60fps
- [ ] No memory leaks from animations (clean up on unmount)
- [ ] Images lazy-loaded below the fold
- [ ] Fonts preloaded (Inter for web, system fonts for mobile)
- [ ] Critical CSS inlined for above-the-fold content

---

## APPENDIX A: EXTERNAL RESOURCE LINKS

Pixel should bookmark and reference these resources regularly:

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/ — Official W3C reference — the accessibility bible
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/ — Test any color combination for WCAG compliance
- **Stark Plugin (Figma)**: https://www.getstark.co/ — Accessibility plugin for Figma — contrast, color blindness, touch targets
- **shadcn/ui Documentation**: https://ui.shadcn.com/docs — Official docs for all primitive components
- **Tailwind CSS Docs**: https://tailwindcss.com/docs — Utility class reference
- **Lucide React Icons**: https://lucide.dev/icons/ — Icon library — search by name, copy React component
- **Material Design Dark Theme**: https://m3.material.io/styles/color/the-color-system/color-roles — Google's dark mode guidelines
- **Nielsen Norman Group: Dark Mode**: https://www.nngroup.com/articles/dark-mode-users-issues/ — Research on dark mode usability issues
- **Smashing Magazine: Inclusive Dark Mode**: https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/ — Deep dive on accessible dark themes
- **Fintech UX Best Practices (Eleken)**: https://www.eleken.co/blog-posts/fintech-ux-best-practices — Trust, clarity, empowerment, continuity framework
- **Banking App Design Guide (Gapsy)**: https://gapsystudio.com/blog/banking-app-design/ — Production-ready banking UX patterns
- **Mobile Banking UX (Purrweb)**: https://www.purrweb.com/blog/banking-app-design/ — Error states, accessibility, transaction history patterns
- **shadcn Fintech Template**: https://allshadcn.com/templates/shadcn-fintech/ — Reference finance dashboard built with shadcn/ui
- **shadcncraft Theme Tool**: https://shadcncraft.com/theme — shadcn/ui theming across Figma and code

---

## APPENDIX B: CONTRAST RATIO REFERENCE TABLE

Pre-calculated contrast ratios for common Nummus color combinations. All ratios must be >= 4.5:1 for normal text.

| Foreground Color | Background Color | Contrast Ratio | WCAG AA Pass? |
|-----------------|------------------|----------------|---------------|
| #F8FAFC (primary text) | #0B0E17 (app bg) | 18.2:1 | PASS |
| #F8FAFC (primary text) | #111827 (card) | 15.8:1 | PASS |
| #F8FAFC (primary text) | #1E293B (raised) | 11.4:1 | PASS |
| #E2E8F0 (secondary) | #0B0E17 (app bg) | 13.6:1 | PASS |
| #E2E8F0 (secondary) | #111827 (card) | 11.8:1 | PASS |
| #94A3B8 (muted) | #0B0E17 (app bg) | 5.4:1 | PASS |
| #94A3B8 (muted) | #111827 (card) | 4.7:1 | PASS (barely) |
| #94A3B8 (muted) | #1E293B (raised) | 3.4:1 | FAIL — use #A1A1AA |
| #64748B (disabled) | #0B0E17 (app bg) | 3.2:1 | FAIL — not for text |
| #4F46E5 (primary) | #0B0E17 (app bg) | 3.8:1 | FAIL — not for text, use for bg only |
| #FFFFFF (white) | #E85D04 (FNB gradient) | 4.2:1 | FAIL — add text-shadow |
| #FFFFFF (white) | #003087 (Capitec gradient) | 8.6:1 | PASS |
| #FFFFFF (white) | #DC143C (Absa gradient) | 4.8:1 | PASS |
| #10B981 (success) | #0B0E17 (app bg) | 5.1:1 | PASS |
| #F59E0B (warning) | #111827 (card) | 4.6:1 | PASS (barely) |
| #F43F5E (danger) | #0B0E17 (app bg) | 5.8:1 | PASS |
| #F43F5E (danger) | #111827 (card) | 5.2:1 | PASS |

**Note**: Ratios calculated using WCAG 2.1 relative luminance formula. Always verify with WebAIM Contrast Checker before finalizing designs.

---

## APPENDIX C: NUMMUS-SPECIFIC DESIGN DECISIONS LOG

This appendix is a living document. Every significant design decision must be logged here with rationale, alternatives considered, and the date of the decision. This prevents circular debates and provides auditability.

### Decision Log Template

```
DECISION ID: DEC-001
DATE: 2026-05-23
AGENT: Pixel
DOMAIN: Color System
DECISION: Use #0B0E17 as app background instead of pure black #000000
RATIONALE: Pure black creates eye strain and halo effect on OLED screens. #0B0E17 is a deep navy-black that reduces glare while maintaining darkness. Also provides better contrast with #111827 card surfaces.
ALTERNATIVES CONSIDERED:
  - #000000 (pure black): Rejected — too harsh, causes eye fatigue
  - #121212 (Material dark): Rejected — too grey, loses premium feel
  - #0F172A (slate-900): Rejected — too blue, conflicts with bank card colors
STATUS: APPROVED
REVIEW DATE: 2026-07-23
```

### Pre-Logged Decisions from Tech Spec v1.3.0

The following decisions are inherited from the Nummus Technical Documentation and are considered approved:

- **DEC-001** (2026-04-15): Dark mode as default theme — Light mode available as toggle but not default. Every screen designed for dark first.
- **DEC-002** (2026-04-15): ZAR locked as sole currency — No currency selector in MVP. All amounts stored as INTEGER cents.
- **DEC-003** (2026-04-15): Bank card visual system — Accounts rendered as gradient cards using official bank brand colors. 135 degree linear gradient.
- **DEC-004** (2026-04-15): 7 MVP achievements — First Steps, Budget Boss, Goal Getter, Debt Destroyer, Streak Starter, Insight Reader, Exporter.
- **DEC-005** (2026-04-15): 10-level XP system — Level 1 (0 XP) to Level 10 (25,000 XP). Titles reflect financial maturity progression.
- **DEC-006** (2026-04-15): No LLM for AI Insights — Rule-based engine with 10 hard-coded rules. No LLM dependency for latency, cost, and privacy.
- **DEC-007** (2026-04-15): Manual transaction entry (MVP) — No bank sync in MVP. Stitch/Yodlee planned for v1.1.
- **DEC-008** (2026-04-15): SARS CSV export — 8-column format with Tax Relevant flag. Education and Health = YES. Legal disclaimer required.
- **DEC-009** (2026-04-15): shadcn/ui + Tailwind CSS — Base primitive layer from shadcn/ui. Custom components built on top. No other UI library.
- **DEC-010** (2026-04-15): Lucide React icons — All icons from Lucide. No custom icons without explicit approval.
- **DEC-011** (2026-04-15): Tabular numbers for amounts — font-variant-numeric: tabular-nums for all monetary values. Ensures aligned digits.
- **DEC-012** (2026-04-15): Cents storage (INTEGER) — All monetary values stored as integer cents. Display divides by 100. Input multiplies by 100.

### Open Decisions (Pending Pixel Input)

The following decisions require Pixel's design expertise before implementation:

- **DEC-013**: Post-Level 10 retention — What happens after users reach Level 10 (Nummus Legend)? Options: prestige reset, expanded tiers, seasonal achievements, or graduation moment?
- **DEC-014**: Stokvel UI accommodation — Should the goals/contribution architecture be generalized now to support rotating savings clubs in v1.2? Or keep strictly personal goals?
- **DEC-015**: WhatsApp quick-log bridge — Should we design a WhatsApp/Telegram quick-log interface for low-friction transaction entry before Stitch integration?
- **DEC-016**: Debt payoff projection accuracy — Current spec uses 'simple division, no interest calc.' Should we add amortization in v1.1 to avoid misleading users with high-interest debts?
- **DEC-017**: AI Insights naming — Market as 'AI Insights' (matches investor expectations) or 'Smart Coach' (avoids LLM scrutiny)? Brand vs. accuracy trade-off.
- **DEC-018**: Gamification ceiling — At documented XP rates, power users hit Level 10 in 6-8 months. Is this too fast? Should we adjust XP values or add post-max-level content?
- **DEC-019**: Outdoor readability — Dark mode + SA sunlight = visibility issues. Should we add an 'outdoor mode' with higher contrast, or rely on screen brightness auto-adjust?
- **DEC-020**: Notification granularity — Should users control each notification type individually, or use preset groups (All, Important, None)?
- **DEC-021**: Transaction grouping logic — Group by date (Today/Yesterday/This Week/Earlier) or by merchant? Or offer both with toggle?
- **DEC-022**: Budget overspend animation — Is shake too aggressive for users already stressed about overspending?

---

## HOW TO UPDATE THIS LIBRARY

This document is Pixel's living knowledge base. As Nummus evolves, so must this library. Follow this protocol for updates:

1. **Log Every Decision**: Use Appendix C template. Every color change, component addition, or pattern modification must be documented with rationale.
2. **Version Control**: Save major versions as separate files: pixel-library-v1.0.md, v1.1.md, etc. Git track the files.
3. **Cross-Reference**: When updating a section, check all related sections. A color change in Section 3 affects Appendix B and all component specs in Section 5.
4. **Human Review**: All updates to Sections 1-10 require human approval. Appendix updates (new resources, contrast ratios) can be agent-autonomous.
5. **Sync with Other Agents**: When Pixel updates design.md, notify Arch (component interfaces), Vault (accessibility compliance), and Spark (gamification visuals).
6. **Test Against Checklist**: Before marking any design 'complete', run through Section 16 checklist. No exceptions.
7. **Archive Rejected Ideas**: Don't delete rejected alternatives — move them to 'Archive' subsection in Appendix C. Future agents may revisit them.

---

**End of Pixel UI/UX Learning Library. This document should be reviewed monthly and updated whenever new design patterns, accessibility standards, or Nummus requirements emerge.**

*Pixel UI/UX Learning Library v1.0 | Nummus Project | CONFIDENTIAL*
