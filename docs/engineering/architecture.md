# Architecture — proposed, not yet approved

Recommendation: mobile-first web application with a pure, independently testable calculation domain. Prefer static/client-side calculations for MVP where feasible; assess server requirements for versioned rules and future accounts. Avoid committing to Go backend until justified by requirements.

## Decisions pending
Frontend framework, deployment, calculation language/runtime, reference data update mechanism, precision/rounding strategy, test framework, telemetry and security baseline.

## Principles
Separation of UI and formula engine, immutable/versioned assumptions, reproducible fixtures, no secrets in repo, CI checks, minimal data collection.
