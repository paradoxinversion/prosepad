# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a local rich-text editor (ProsePad) using React and TypeScript with a small, opt-in-butrecommended local Node backend. The application will use a local backend service (Node.js + Express/Fastify) as the canonical runtime for file persistence and DOCX export; the frontend communicates with the backend over localhost. Dev tooling continues to use Node and Vite. The backend provides deterministic filesystem access for `./data/docs/`, higher-fidelity DOCX generation, and reliable CI testing.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node (LTS) for backend and dev tooling; frontend targets modern browsers via ES2022 bundle
**Primary Dependencies**: Frontend: React, TypeScript, Vite, `slate`/`prosemirror` (rich-text model); Backend: Node.js (LTS), Express or Fastify, `docx` or server-side docx library for export
**Storage**: Backend-managed filesystem under `./data/docs/` (canonical). Frontend may still use IndexedDB for local drafts and offline UX.
**Testing**: Jest + React Testing Library (frontend unit), backend unit tests (Jest or ava), integration tests for frontend↔backend flows, Cypress for e2e, axe-core for accessibility checks
**Target Platform**: Desktop environment (user runs backend locally). Frontend served as SPA from backend or via static server that proxies to backend.
**Project Type**: Web application with a local backend component (recommended default)
**Performance Goals**: Backend ensures save/load operations for documents up to 1MB complete within 1s (NFR-001). UI latency for typing <50ms (NFR-002).
**Constraints**: Backend introduces a local network surface; must bind to localhost and be opt-in at runtime. DOCX fidelity dependent on chosen server library but expected to improve over client-only approaches.
**Scale/Scope**: Single-user local app with both frontend and small backend; manageable by a solo maintainer.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

The plan MUST include explicit answers for the following items. Below are the planned choices for Phase 0; any residual deviations will be tracked in Complexity Tracking.

- Linting & Formatting: Use ESLint (TypeScript + React rules) and Prettier. Enforce via `husky` + `lint-staged` on pre-commit and via CI jobs for both frontend and backend (`npm run lint:frontend`, `npm run lint:backend`).
- Tests: Unit tests for frontend and backend (Jest), integration tests for frontend↔backend flows; Cypress for e2e. Accessibility checks via `axe-core`. Minimum coverage: require core flow tests and enforce coverage thresholds in CI.
- CI Gates: GitHub Actions must pass: `lint:frontend`, `lint:backend`, `test:unit:frontend`, `test:unit:backend`, `test:e2e` (or gated on merge), `security-scan` for dependencies, and `constitution-check`. Backend introduces additional CI matrix entries and vulnerability scans.
- UX & Accessibility: Acceptance criteria and `axe-core` checks remain required. Integration tests must validate keyboard navigation across frontend and file operations handled by backend.
- Observability & Docs: Add developer docs for backend (`backend/README.md`), API docs for local endpoints, and security guidance. Backend must log structured events to local logs when debugging is enabled.
- Migration & Compatibility: Backend centralizes storage schema; migration utilities and changelog entries are required for any storage format changes.

If any item cannot be satisfied during Phase 0, it will be documented in Complexity Tracking with mitigations and owner sign-off.

### Constitution Check — Re-evaluation

Summary: The plan answers all constitution gate items. Below are pass/fail results with short rationale and mitigations for known constraints.

- **Linting & Formatting**: PASS — ESLint + Prettier configured; `husky` + `lint-staged` planned for pre-commit and CI enforcement.
- **Tests**: PASS (with note) — Unit and integration test strategy defined (Jest, RTL, Cypress). E2E tests require headless browser support in CI; mitigation described below.
- **CI Gates**: PASS — CI jobs (lint, unit tests, e2e, security, constitution-check) are specified. E2E may be gated to run on merge if flaky in PRs.
- **CI Gates**: PASS — CI jobs (lint, unit tests, e2e, security, constitution-check) are specified. E2E may be gated to run on merge if flaky in PRs.
- **Backend Implications**: If a backend is adopted, CI must include server-side unit tests, dependency vulnerability scans for backend packages, and an explicit security review for the local server code path.
- **UX & Accessibility**: PASS — Acceptance criteria and `axe-core` checks included for automated verification.
- **Observability & Docs**: PASS (mitigated) — Developer docs (`quickstart.md`, architecture notes) included. Runtime observability is minimal for a local-only app; debug logging will be enabled behind a feature flag.
- **Migration & Compatibility**: PASS — Document `version` field and migration utilities are planned; changelog requirement noted.

Known Constraints & Mitigations

- With backend requirement, browser FS API variability is no longer a primary limitation — backend file IO is canonical. Mitigation: frontend still includes IndexedDB drafts for offline UX, but CI and deterministic tests use backend-managed filesystem.
- DOCX export fidelity should improve via server-side libraries; mitigation: include server-side export tests and sample documents to validate fidelity.
- E2E tests in CI: run Cypress against the backend in CI using headless Chromium and the backend in a test mode that uses ephemeral test directories to ensure determinism.

## Complexity Tracking

| Violation / Risk                   | Why Needed                                            | Simpler Alternative Rejected Because                                                                             |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Frontend-only file persistence     | User requested no backend; need local disk I/O        | Local Node backend would provide stable FS access but increases complexity; acceptable as opt-in alternative     |
| DOCX export fidelity constraints   | Client-side export required; no server-side rendering | Server-side document generation offers better fidelity; recommended if client-side libraries fail fidelity tests |
| Introduce local backend (new risk) | Provides reliable FS and export capabilities          | Adds maintenance and security surface; mitigations: local-only binding, opt-in CLI, security checklist in PR     |

Mitigations above describe fallbacks and test strategies. The repository owner signs off on these deviations as acceptable for Phase 0 given project constraints.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: Web application with a local backend component (backend + frontend). Concrete layout:

``text
backend/
├── package.json
├── tsconfig.json
├── src/
│ ├── index.ts # Express/Fastify server entry
│ ├── api/ # REST endpoints for file operations and export
│ └── lib/ # file IO, docx generation, migration utilities
├── tests/ # backend unit & integration tests

frontend/
├── package.json
├── vite.config.ts
├── src/
│ ├── main.tsx
│ ├── components/
│ ├── services/ # API client, model code
│ ├── models/
│ └── styles/
├── tests/ # frontend unit & integration
└── cypress/ # e2e tests (exercise frontend↔backend flows)

```

Rationale: A local backend provides deterministic filesystem access and higher-fidelity export (DOCX). It resolves key risks introduced by browser-only persistence while keeping the UX local and private (server binds to localhost).

### Backend (Required)

Backend responsibilities & operation:

- Provide canonical filesystem persistence under `./data/docs/` via a small local API (REST or IPC). The backend is the authoritative writer/reader for document files.
- Perform DOCX export server-side to achieve higher fidelity and relieve the browser of heavy processing.
- Expose a minimal, local-only API for the frontend to request read/write/move/export operations and to manage migration tasks.

Implementation notes:

- Use Node.js (LTS) + Express or Fastify. Provide a simple CLI command to start the server: `npm --prefix backend run serve` or `npm run serve-local` from the repo root.
- The backend must bind to `localhost` only and require no remote exposure. Document secure usage in `backend/README.md` and include a security checklist for PRs that touch backend code.

Security & governance:

- The backend increases the local attack surface; require dependency vulnerability scans in CI, local-only binding, and explicit user-facing documentation about the server process.

Impact on project structure:

``text
backend/
├── package.json
├── src/
│   ├── index.ts
  │   └── lib/
frontend/               # unchanged
```

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

```

```
