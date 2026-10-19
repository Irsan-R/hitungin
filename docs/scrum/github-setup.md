# GitHub setup checklist

Repository: Irsan-R/hitungin. Created docs and issues via connector on 2026-10-19.

## Labels to create manually (GitHub Settings > Labels)
- type:epic, type:feature, type:bug, type:task, type:research
- priority:p0, priority:p1, priority:p2
- area:frontend, area:backend, area:calculation, area:devops
- status:blocked

The connected GitHub tool supports issue creation and labeling with existing labels but does not expose creating label definitions. After creation, bulk-apply labels to existing issues based on their EPIC and task titles. Templates currently use built-in labels (enhancement, bug, documentation) to avoid referencing undefined labels.

## GitHub Projects (manual)
1. Open https://github.com/users/Irsan-R/projects and select New project > Board.
2. Name it 'Hitungin — Product Development'.
3. Add repository issues and configure Status: Backlog, Ready, In Progress, In Review, Testing, Done. Track blocked with label or separate field.
4. Add Priority (single select), Sprint (iteration, 2 weeks), Story Points (number), Epic (text or parent issue), Type (single select), Target Release.
5. Configure views: Board, Backlog, Current Sprint, Roadmap.

## Milestones (manual)
Open https://github.com/Irsan-R/hitungin/milestones and create:
- Sprint 0 — Discovery: 2026-11-01
- Sprint 1 — Foundation: 2026-11-15
- Sprint 2 — Salary: 2026-11-29
- Sprint 3 — Loan & Savings: 2026-12-13

Assign issues after capacity refinement. GitHub milestones are repository-level while Project iterations are project-level; avoid conflicting dates.

## Issue hierarchy
Epic issues: [EPIC-01] through [EPIC-07]. Task titles use the same prefix. Link tasks as GitHub sub-issues where available, or edit epic checklist to reference actual issue numbers. Avoid creating duplicate issues.

## Next review
Confirm target personas, source regulations, formula rounding, stack, sprint capacity, and actual priorities before coding.
