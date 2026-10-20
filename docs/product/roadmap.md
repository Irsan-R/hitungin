# Hitungin Roadmap (provisional)

> Status: planning proposal. Dates are targets, not commitments. Sprint length: 14 days. Login and cloud persistence are **not required to use basic calculators**. All feature scope and dates require backlog refinement.

## Baseline: calculator-first delivery

| Sprint | Target dates | Goal | Exit criteria |
| --- | --- | --- | --- |
| 0 | 2026-10-19 — 2026-11-01 | Discovery, PRD, regulatory research, architecture decision | Vision, assumptions, research and backlog reviewed |
| 1 | 2026-11-02 — 2026-11-15 | Scaffolding, CI, UI foundation | Responsive shell and baseline quality checks |
| 2 | 2026-11-16 — 2026-11-29 | Salary calculator | Validated fixtures, breakdown and regulatory references |
| 3 | 2026-11-30 — 2026-12-13 | Loan and savings calculators | Core flows and test fixtures pass |
| 4 (proposed) | 2026-12-14 — 2026-12-27 | Investment calculator, connected calculator UX, guest workspace | Users can switch calculators, review relevant source values and keep context within a session |
| 5 (proposed) | 2026-12-28 — 2027-01-10 | QA, accessibility, security baseline, beta preparation | Release criteria and guest privacy checks met |

## Expansion: User Identity & Persistent Workspace (EPIC-08 proposal)

These are **planning slots**, not committed releases. Do not displace calculator correctness or beta QA to meet them.

| Sprint | Target dates | Planned outcomes | Dependencies |
| --- | --- | --- | --- |
| 6 (proposed) | 2027-01-11 — 2027-01-24 | Account/privacy design, data model, auth-provider evaluation, threat model | Approved storage scope and security architecture |
| 7 (proposed) | 2027-01-25 — 2027-02-07 | Optional sign-up/sign-in/sign-out, session lifecycle, account settings | Provider selection, secure backend/API and secrets |
| 8 (proposed) | 2027-02-08 — 2027-02-21 | Save/list/open/rename/delete named workspaces and calculation snapshots | Authorization per user, ownership tests, versioned schema |
| 9 (proposed) | 2027-02-22 — 2027-03-07 | Cross-device retrieval, opt-in guest-to-account import, history, retention/export/delete controls | Migration and conflict-resolution policy |

## Experience principles

1. Guest-first: calculator usage requires no account; no forced login on calculator entry.
2. Shared calculation context: values carry semantic identifiers, units, period, source, rule version and timestamps. A gross salary is not interchangeable with net salary.
3. Explicit reuse: suggest compatible values but require confirmation before filling another calculator.
4. Stale results: if upstream inputs or calculation rules change, downstream snapshots are marked stale; never silently recompute or overwrite saved decisions.
5. Guest data is device/browser-scoped, clearly described and clearable; sessionStorage is temporary, not durable or cross-device.
6. Cloud save requires authentication, clear consent and account-scoped access. No financial inputs in analytics or URLs.
7. A saved workspace stores inputs, assumptions, outputs, rule/calculator versions and dependency edges, not only final figures.
8. Accessibility, mobile navigation, WebView and graceful offline/network-error states are acceptance criteria.

## Non-goals for initial identity release

Social feed, payment/premium, bank integration, automatic account creation, sharing private calculations publicly, automatic transfer of arbitrary fields, and automatic server synchronization of guest inputs.

## Delivery gates and risks

- Reassess the timeline after estimation and sprint capacity review.
- Decide authentication approach, server-side authorization, encryption, backups, retention and account deletion before implementation.
- Design conflict resolution for edits on multiple devices; avoid last-write-wins without user feedback.
- Provide a secure backend/API for authenticated persistence; a static export alone is insufficient.
- Test tenant/user isolation, session expiration, CSRF where applicable, rate limits, data deletion, schema migrations and stale dependency handling.
- Premium features remain outside MVP.
