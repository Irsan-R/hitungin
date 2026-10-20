# Hitungin — Product Requirements Document

Version: 0.2 (draft) | Updated: 2026-10-20 | Owner: Product

## Problem statement
Pengguna Indonesia membutuhkan kalkulator finansial dan kebutuhan sehari-hari yang mudah ditemukan, akurat, transparan, dan saling terhubung. Pengguna tidak seharusnya mengulang input atau kembali jauh ke homepage ketika melanjutkan perhitungan lain.

## Product goals
- Kalkulator gaji, cicilan, tabungan, investasi dan alat hitung sehari-hari dengan rincian, asumsi, metode, dan sumber aturan.
- Navigasi cepat lintas kalkulator melalui pencarian global, recent calculators dan saran perhitungan lanjutan.
- Shared calculation context dengan mapping data yang benar, persetujuan transfer, dan deteksi stale.
- Guest-first: penggunaan kalkulator dasar tanpa login.
- Setelah MVP/beta, akun opsional untuk menyimpan workspace dan mengaksesnya lintas perangkat.

## MVP scope
Calculator engine, input validation, responsive navigation, source references, guest workspace/session context, breakdown, QA and accessibility. **Authentication and cloud persistence are explicitly deferred to the post-MVP expansion roadmap**, not removed from product vision.

## Post-MVP scope: User Identity & Persistent Workspace
- Optional registration, sign-in, sign-out and session/account controls.
- Named workspaces and saved calculations: save, list, open, rename, delete.
- Cross-device access and optional guest-to-account import with explicit user consent.
- User-owned history and controls for retention, export and account/data deletion.
- Security and privacy baseline: authenticated authorization, data minimization, isolation and audit of sensitive mutations.

## Functional requirements
FR-01 Users can enter, edit and reset inputs with IDR formatting and validation.
FR-02 Results show breakdown, units, rounding, assumptions, calculation method and rule references.
FR-03 Salary calculator supports gross/net, PPh 21, BPJS and THR according to verified effective regulations.
FR-04 Loan calculator supports flat and effective/annuity methods and amortization.
FR-05 Savings and investment support goals, recurring deposits, periods and scenario comparisons.
FR-06 Global calculator switcher and recent-calculator navigation work on desktop and mobile.
FR-07 Shared context stores typed, versioned values; cross-calculator prefill requires user confirmation and compatible semantics.
FR-08 Changes to upstream inputs/rules flag dependent results stale rather than silently reusing old values.
FR-09 Guest users can clear local session context.
FR-10 (post-MVP) Users can optionally authenticate and securely manage their account/session.
FR-11 (post-MVP) Authenticated users can save, list, open, rename and delete only their own workspaces.
FR-12 (post-MVP) Saved calculations retain input, output, assumptions, calculator/rule versions, timestamps and dependency links.
FR-13 (post-MVP) Cross-device access and guest import handle conflicts and explicit consent.
FR-14 (post-MVP) Users can request deletion/export and understand data retention policies.

## Non-functional requirements
- Mobile-first, keyboard navigable, clear focus and form labels, adequate contrast, WebView-friendly navigation.
- Pure deterministic calculation functions with automated fixtures and documented rounding.
- No sensitive financial inputs in analytics, URL parameters or logs.
- No guest financial data uploaded without opt-in; cloud access always requires ownership checks.
- Document data retention, backups, encryption, authentication threats, abuse/rate limits and account deletion before launch.
- Clearly distinguish UI mock results from production-ready calculation outputs.

## Acceptance criteria
- Every released calculator produces verified, reproducible results and appropriate breakdown.
- Zero/negative/large inputs, dates, rounding and regulatory effective dates are tested.
- Global navigation does not require returning to homepage; input context is not silently lost.
- A value cannot be transferred to an incompatible field merely because both are numeric.
- Guest mode works without login; cloud persistence is not presented as available until delivered.
- Post-MVP: users cannot read or mutate other users' saved calculations; save/delete/reload and cross-device scenarios are tested.
- Accessibility and mobile QA complete before release.

## Metrics (hypotheses)
Completion rate, repeat usage, calculator-to-calculator transition rate, validation errors, fixture correctness, optional account conversion and saved-workspace return rate. Targets require baseline.

## Risks and open decisions
Regulatory changes, data semantics, rule versions, guest storage duration, auth provider, backend and DB, retention/privacy compliance, cross-device conflicts, costs and delivery capacity. Resolve in discovery/refinement.
