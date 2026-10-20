# ADR-0001: Static-first architecture for Hitungin

- **Status:** Proposed
- **Date:** 2026-10-19
- **Issue:** [#8](https://github.com/Irsan-R/hitungin/issues/8)
- **Decision owners:** Hitungin maintainers

## Context

Hitungin is an Indonesia-focused financial calculator. The initial release needs explainable, deterministic computations (salary, tax, BPJS, THR, loans, savings and investments), mobile-friendly UI, and low-cost deployment. The repository currently uses Next.js 15 static export and Cloudflare Workers Static Assets. The first production deployment has been reported live.

The calculation rules may vary by effective date and regulatory changes. Monetary rounding and precision require explicit policies; JavaScript binary floating-point must not be treated as an authoritative currency calculation model.

## Decision

1. **Static-first web application.** Keep Next.js App Router + TypeScript with `output: "export"` and `trailingSlash: true`. Cloudflare Workers Static Assets serves the generated `out/` directory. Do not depend on SSR, API routes, server actions or runtime Node APIs while this deployment mode is used.
2. **Pure calculation domain.** Implement each calculator as framework-independent TypeScript modules with typed inputs, outputs, validation, assumptions and reference fixtures. React components are adapters for user input and presentation, not sources of financial formulas.
3. **Money and precision.** Prefer integer minor units (IDR rupiah where appropriate) or a vetted decimal implementation for fractional intermediate values. Do not accumulate currency values in binary floating point. Define rounding stage, mode, precision, and conversion boundaries **per calculator**, documented and tested in issue #10. Never assume a universal rounding rule across PPh 21, BPJS, loan interest and investment projections.
4. **Versioned Indonesian rules.** Separate statutory rates, thresholds and effective dates from formulas. Every regulated calculator must identify its applicable period, assumptions, official references and last-reviewed date. Never silently apply today's rules to past periods.
5. **Privacy by default.** Compute locally in the browser for MVP. No accounts, database, or server-side storage of salary, tax status or other entered financial data. Avoid sending user inputs to analytics or logs. No secrets in `NEXT_PUBLIC_*` variables.
6. **Quality and delivery.** Pull requests target `main`; GitHub Actions runs install, lint, typecheck, tests and static build. Cloudflare Git integration deploys `main` and may create previews. Keep calculation fixtures and edge-case tests mandatory for new financial logic.
7. **UI approach.** Mobile-first, accessible components and Indonesian locale-aware input/output formatting. Separate display formatting from internal numeric representation.

## Logical boundaries

```text
app/ (routes, pages, layouts)
  -> features/<calculator>/ (form state, view components, mapping)
  -> lib/calculations/<calculator>/ (pure functions, types, validation)
  -> lib/rules/ (versioned Indonesian regulatory tables)
  -> lib/format/ (IDR and locale formatting, no business logic)
tests/ (reference fixtures, boundaries, regression tests)
```

These are **target boundaries**, not a claim that all folders already exist. Introduce them incrementally as features are built.

## Alternatives considered

| Option | Benefit | Why not now |
| --- | --- | --- |
| Next.js SSR with API routes | Server-side logic, auth and dynamic features | Incompatible with current static export; adds operational complexity for client-side calculators |
| Separate Go backend | Familiar stack, future integrations | Unnecessary network dependency and maintenance for deterministic public calculations |
| Fully client-side SPA without Next.js | Simple hosting | Current Next.js static export already works; migration provides little immediate value |
| Floating-point arithmetic everywhere | Easy implementation | Risks financial rounding errors and inconsistent results |

## Consequences and trade-offs

- **Positive:** low hosting complexity, fast static delivery, clear separation of financial rules, private browser-side calculations, straightforward CI.
- **Limitations:** no private server-side secrets, persistent user data, dynamic server features or authenticated accounts without revisiting architecture.
- **Risk:** regulatory formulas can become stale; mitigate with versioned rules, official citations, regression fixtures and a review checklist.
- **Risk:** integer-only arithmetic may not express all intermediate calculations; use a tested decimal approach where needed and specify conversion/rounding.
- **Trigger to revisit:** saved user scenarios, user accounts, regulated data integrations, third-party secret APIs, or backend-only computations.

## Follow-up implementation

- [ ] #9 — Review repository structure against proposed boundaries; mark completed scaffolding only after verifying acceptance criteria.
- [ ] #10 — Select decimal library/representation, document per-domain rounding policies, define engine interfaces and fixtures.
- [ ] #11 — Verify CI covers calculation tests and static export as functionality expands.
- [ ] #12 — Establish accessible responsive design and navigation.
- [ ] #13 — Document privacy/security/observability baseline.
- [ ] #5 — Source official PPh 21, BPJS and THR references before implementing regulated calculations.

## Acceptance checklist for issue #8

- [x] Current and target architecture documented.
- [x] Alternatives and trade-offs recorded.
- [x] Cloudflare static-export constraints stated.
- [x] Precision, privacy and versioned rules requirements identified.
- [ ] Maintainer review and acceptance; change ADR status from Proposed to Accepted.
