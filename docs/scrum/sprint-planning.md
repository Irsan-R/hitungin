# Scrum workflow

Sprint length: 14 days. Sprint 0 starts 2026-10-19 (ends 2026-11-01).

Cadence: sprint planning, asynchronous daily update, backlog refinement, sprint review/demo and retrospective.

Workflow: Backlog -> Ready -> In Progress -> In Review -> Testing -> Done; Blocked tracked separately.

Issue format: context, outcome, acceptance criteria, dependencies, priority, estimate (TBD during refinement), definition of done.

Capacity: estimate based on actual available hours, not arbitrary story points. Carryover discussed at retrospective.

Sprint 0 deliverables: validated vision/PRD, personas, competitive research, authoritative calculation references, architecture decision and refined backlog.

## Proposed expansion: EPIC-08 — User Identity & Persistent Workspace

The following issues are **proposed backlog entries**. They are documented here for refinement and are not yet created as GitHub Issues or assigned to a GitHub Project sprint.

| Backlog ID | Planned sprint | Task | Priority | Acceptance criteria |
| --- | --- | --- | --- | --- |
| AUTH-01 | 6 | Evaluate auth provider, backend/API and security threat model | P1 | Decision record, cost/security trade-offs and secrets strategy |
| DATA-01 | 6 | Design users/workspaces/calculations/dependencies schema | P1 | Typed values, versioned rules, ownership and migrations specified |
| UX-01 | 6 | Design guest/login/save/restore/consent/error flows | P1 | Mobile and desktop flows reviewed; no forced login |
| AUTH-02 | 7 | Optional sign-up/sign-in/sign-out and session management | P1 | Secure sessions, validation, abuse limits, logout/expiry tested |
| AUTH-03 | 7 | Account recovery and privacy settings | P1 | Recovery and data policy documented and tested |
| SAVE-01 | 8 | Save, list, open and rename named workspaces | P1 | User-scoped access, versioned snapshots and restore tested |
| SAVE-02 | 8 | Delete workspace and protect ownership boundaries | P1 | Authorization checks and deletion tests pass |
| SAVE-03 | 8 | Restore source values and stale dependency states | P1 | No silent incompatible mapping or stale reuse |
| SYNC-01 | 9 | Cross-device retrieval and conflict resolution | P1 | Concurrent edits and network failures handled |
| SYNC-02 | 9 | Consent-based guest-to-account import | P1 | Preview/import/skip and duplicate handling tested |
| PRIV-01 | 9 | Data export, retention and account deletion controls | P1 | End-to-end deletion/export and retention verified |

## Definition of ready for AUTH/SAVE tasks
- Privacy and security requirements reviewed.
- Authentication provider and backend/storage design approved.
- Data semantics and versioning contract documented.
- Acceptance tests and dependencies agreed.
- Estimated against actual sprint capacity.

## Dependency order
Calculator engine + semantic shared context -> secure persistence model -> auth/session -> saved workspaces -> cross-device sync/import.

No implementation starts solely because a planning sprint is listed. All dates and sprint allocations remain tentative.
