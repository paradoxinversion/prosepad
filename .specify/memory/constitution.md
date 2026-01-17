<!-- Sync Impact Report
Version change: unknown -> 1.0.0
Modified principles:
- placeholders -> I. Code Quality & Maintainability
- placeholders -> II. Test-First Development & Coverage
- placeholders -> III. Continuous Integration, Gating & Release Discipline
- placeholders -> IV. User Experience Consistency & Accessibility
- placeholders -> V. Observability, Documentation & Onboarding
Added sections:
- Constraints & Standards
- Development Workflow & Quality Gates
Removed sections:
- none
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/spec-template.md ⚠ pending review
- .specify/templates/checklist-template.md ⚠ pending review
- .specify/templates/agent-file-template.md ⚠ pending review
Follow-up TODOs:
- TODO(RATIFICATION_DATE): confirm original adoption date
- Update CI to validate Constitution Check and test/linters in PR gates
-->

# ProsePad Constitution

## Core Principles

### I. Code Quality & Maintainability (NON-NEGOTIABLE)

All code merged into the repository MUST be clear, well-structured, and maintainable. Conventions to satisfy this principle include:

- Code MUST follow the project's style guide and pass configured linters and formatters before merge.
- Modules and components MUST be small, single-responsibility, and have a clear public contract.
- Pull requests MUST include a short rationale for non-obvious design choices and an explicit list of follow-ups if technical debt is introduced.

Rationale: High code quality reduces cognitive load for reviewers, speeds onboarding, and lowers the long-term cost of change.

### II. Test-First Development & Coverage (NON-NEGOTIABLE)

Testing is a primary deliverable. Every new feature, bugfix, or refactor that affects behavior MUST include automated tests.

- Unit tests MUST cover new logic; integration and end-to-end tests are REQUIRED for cross-component or user-facing flows.
- Tests MUST be added before implementation for P1 (high-priority) user stories when feasible (TDD encouraged).
- CI MUST fail the build on test regressions; coverage thresholds SHOULD be defined per module and documented in the feature plan.

Rationale: Tests guarantee correctness, document expected behavior, and enable safe refactoring.

### III. Continuous Integration, Gating & Release Discipline

All changes must go through CI and review gates that enforce the constitution.

- Every change MUST be submitted as a pull request and pass automated checks (lint, tests, security scans) before merging.
- Significant changes (API, UX, data migrations) MUST include a migration plan, changelog entry, and release notes.
- Versioning follows semantic versioning: MAJOR.MINOR.PATCH. Breaking changes MUST be accompanied by a documented migration path.

Rationale: Gatekeeping via CI and clear release practices maintain stability and make evolution predictable.

### IV. User Experience Consistency & Accessibility

User-facing changes MUST preserve a consistent, accessible experience.

- UI components and interactions MUST align with the project's design system or documented patterns; deviations MUST be justified and reviewed by a UX owner.
- New user flows MUST include acceptance criteria, screenshots, and accessibility checks (contrast, keyboard nav, screen-reader semantics).
- Public APIs and CLI interfaces that affect users MUST be stable, documented, and follow backward-compatible design when possible.

Rationale: Consistent UX builds trust with users and reduces support cost.

### V. Observability, Documentation & Onboarding

Every feature MUST include adequate runtime observability and documentation.

- Code that runs in production MUST emit structured logs and metrics for key success/failure paths.
- New modules MUST include or update developer-facing docs (README, quickstart, and a short design note) explaining how to run, test, and debug them.
- Onboarding material for complex areas (architecture diagrams, sample flows) MUST be updated when those areas change materially.

Rationale: Observability enables fast diagnosis in production and lowers the cost of operational support.

## Constraints & Standards

This section records cross-cutting constraints and mandatory standards that implement the Core Principles.

- Tooling: Projects MUST enable an automated linter and formatter (pre-commit or CI) appropriate to the language in use.
- Security: Static analysis and dependency vulnerability scans MUST run in CI for every PR touching production code.
- Performance: Performance goals and budgets (e.g., p95 latency, memory limits) MUST be declared in the feature plan when relevant.
- Compatibility: Public interfaces and data formats MUST be versioned and documented; breaking changes MUST follow the Governance procedure below.

Rationale: Enforcing common standards reduces risk and aligns teams on operational expectations.

## Development Workflow & Quality Gates

This project follows a PR-driven workflow with automated gates that enforce the constitution.

- Pull Request Requirements: Every PR MUST include a description, link to the plan/spec, test coverage for changes, and any relevant screenshots or migration notes.
- Review Requirements: PRs SHOULD be reviewed when another maintainer or peer reviewer is available. In this solo project the repository owner MAY self-approve PRs, but any self-approved PR MUST include a review note documenting the reason and pass all CI gates.
- CI Gates: PRs MUST pass lint, tests, security scans, and any required integration checks before merging.
- Emergency Fixes: Emergency changes may be merged with expedited review but MUST be followed by a retroactive PR commentary and tests within 48 hours.

Rationale: Structured workflow ensures code health and traceability while enabling fast but safe iteration.

## Governance

This constitution is the source of truth for how technical decisions are made in ProsePad. It defines amendment and compliance procedures tailored to a solo-maintained project.

- Amendments: Changes to the constitution MUST be proposed as a pull request against this file, include a clear rationale, and list affected artifacts (plans, templates). Amendments that add or materially change principles constitute a MINOR version bump; removals or incompatible redefinitions constitute a MAJOR bump.
- Approval (Solo Project): This is a solo-maintained repository. The repository owner (project maintainer) is the sole approver for constitution amendments. When the owner is the author of a proposed amendment they MAY self-approve, but MUST provide a clear, written rationale in the PR, include a migration plan for any breaking changes, and document expected follow-ups. When practical, the owner SHOULD solicit an external review (community, peer, or contractor) before merging.
- Compliance: All PRs and plans MUST reference the constitution's relevant principles. The `/speckit.plan` command and CI checks SHOULD validate that a feature plan passes the Constitution Check before implementation proceeds. PRs merged by self-approval MUST still pass all automated CI gates (linters, tests, security scans).
- Review Cadence: The constitution SHOULD be reviewed annually or after any MAJOR release to ensure it remains fit for purpose.

**Version**: 1.0.0 | **Ratified**: 2026-01-16 | **Last Amended**: 2026-01-16
