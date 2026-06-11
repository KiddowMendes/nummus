# Nummus Roadmap

This roadmap follows the mobile-first restart described in [docs/nummus-mobile-blueprint-v2.md](docs/nummus-mobile-blueprint-v2.md).

Development uses the Practical Vibe Coding loop: one feature, one prompt, one verification, one commit.

---

## Phase 0: Documentation And Foundation

Objective: remove conflicting instructions and make the repo ready for focused mobile feature work.

Deliverables:

- Rewrite `AGENTS.md` as the strict agent constitution.
- Add the mobile-first v2 blueprint.
- Align README and roadmap with local-first v1.
- Add a `typecheck` script.
- Confirm lint and typecheck pass.

Success criteria:

- Future agents are not instructed to build Next.js, Vercel, shadcn/ui, or database-first flows for v1.
- The first implementation slice is clearly onboarding plus first account.

---

## Phase 1: First Account Loop

Objective: prove the core mobile value in the smallest useful flow.

Deliverables:

- Welcome screen.
- Bank selection using South African bank seed data.
- First account creation form.
- Live premium dark BankCard preview.
- Account state and local persistence after approved dependency install.
- First dashboard shell showing the created account.

Success criteria:

- A user can create one ZAR account locally.
- Money is entered as rand and stored as cents.
- Bank colors match the selected bank.
- No auth, API, database, or bank sync is introduced.

---

## Phase 2: Manual Tracking

Objective: make Nummus useful as a daily local tracker.

Deliverables:

- Transaction categories.
- Manual transaction creation.
- Transaction list grouped by date.
- Recent transactions on home.
- Account balance behavior defined and implemented.
- Empty states for no transactions.

Success criteria:

- Users can add and review transactions without cloud services.
- Lists remain smooth on realistic mobile data sizes.
- ZAR formatting is consistent everywhere.

---

## Phase 3: Planning Tools

Objective: add the planning features that make Nummus more than an account list.

Deliverables:

- Budgets.
- Goals.
- Debt tracker.
- Progress visuals.
- Gentle milestone celebrations.

Success criteria:

- Budget, goal, and debt calculations are cents-safe.
- Progress UI is responsive and readable on mobile.
- Reanimated is used for meaningful transitions.

---

## Phase 4: Engagement And Local Insights

Objective: add motivation without overbuilding.

Deliverables:

- Lightweight XP.
- Streaks based on meaningful finance actions.
- Small achievement set.
- Rule-based local insights.

Success criteria:

- Engagement features support financial behavior rather than distracting from it.
- No external AI service or secret-bearing integration is required.

---

## Phase 5: Cloud Readiness

Objective: add cloud capabilities only after local flows prove useful.

Possible deliverables:

- Clerk auth.
- API routes.
- Neon/Postgres persistence.
- TanStack Query for server state.
- Read-only bank sync proof of concept.
- Exports and compliance workflows.

Success criteria:

- Cloud work has a dedicated security review.
- No bank credentials are stored by Nummus.
- Server state is added only where it creates real user value.
