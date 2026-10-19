# AGENTS.md — Hitungin

These instructions apply to all coding agents (including Codex) working in this repository.

## Product context
Hitungin is an Indonesian financial calculator. MVP scope: salary (gross/net, PPh 21, BPJS, THR), loan, savings and investment simulation. Current phase: Sprint 0 Discovery (2026-10-19 to 2026-11-01). Product requirements and architecture are **drafts**.

## Read before implementing
1. [PRD](docs/product/PRD.md)
2. [Calculator specifications](docs/product/calculator-specifications.md)
3. [Architecture proposal](docs/engineering/architecture.md) and [ADR-0001](docs/engineering/adr/0001-architecture-options.md)
4. [Definition of Done](docs/scrum/definition-of-done.md)
5. [Sprint planning](docs/scrum/sprint-planning.md)

## GitHub workflow
- Repository: `Irsan-R/hitungin`.
- Before coding, identify the relevant GitHub issue; do not start untracked feature work.
- Use `gh issue list --repo Irsan-R/hitungin` to discover work. `gh issue view <number> --repo Irsan-R/hitungin` for full context.
- Check milestone with `gh api repos/Irsan-R/hitungin/milestones`; a missing milestone is **not** proof that a sprint is canceled.
- Never assume `gh` authentication is the same as Git author identity; verify permissions before write operations.
- Branch from `main` using `feat/<issue>-slug`, `fix/<issue>-slug`, or `docs/<issue>-slug`.
- Make focused commits and link the issue in the PR. Do not push directly to `main` for feature implementation unless the maintainer explicitly requests it.
- Do not close issues or merge PRs without explicit user approval.

## Engineering principles
- Keep calculation logic pure, deterministic, independently testable and separate from presentation.
- Define and test currency precision, rounding, dates, rates, and boundary conditions explicitly.
- For PPh 21, BPJS, THR and other regulated calculations, **do not invent tax brackets, percentages or eligibility rules**. Capture authoritative Indonesian source URL, effective date, checked date, and assumptions before implementing.
- Investment projections are illustrations, not guaranteed returns or financial advice.
- Never commit secrets or log sensitive user inputs. Prefer privacy-preserving local computation when feasible.
- Include unit tests and regression fixtures for calculation changes; update docs and examples when behavior changes.
- Follow existing stack only after an ADR is accepted. Do not scaffold a framework based solely on personal preference.

## How to report work
Summarize the issue, implementation, files changed, tests run/results, regulatory references if relevant, risks, and remaining decisions. Clearly distinguish verified facts from assumptions.

## Sprint 0 priorities
- Validate personas and user journeys.
- Research competing calculators and authoritative Indonesian regulations.
- Review and baseline PRD and calculation specifications.
- Decide architecture with an ADR and refine estimates before implementation.
