PR Summary

This PR implements the ProsePad feature scaffolding, core backend/frontend integration, tests, CI gates, and security hardening required to develop a local rich-text editor with DOCX export as canonical output. It includes the feature specification artifacts under `specs/001-create-prosepad-editor/` and a working local backend (Express + TypeScript) used by the frontend during development and in CI.

What this PR contains

- Spec & planning
  - `specs/001-create-prosepad-editor/` : feature spec, plan, tasks, research, data model, contracts, and checklists.

- Frontend (Vite + React + TypeScript)
  - `frontend/` scaffolded with `vite`, React, and TypeScript.
  - `frontend/src/components/Editor.tsx` : basic editor UI and tests.
  - `frontend/src/services/api.ts` : API client (create/open/save/move/export).
  - Client-side sanitization via `dompurify`.
  - Jest unit tests and Cypress e2e config for headless runs.

- Backend (Node + Express + TypeScript)
  - `backend/` scaffolded as a local-only server binding to `127.0.0.1:3000`.
  - `backend/src/lib/files.ts` : read/write/list/move document JSON files under `./data/docs/`.
  - `backend/src/lib/export.ts` : basic export stub (plain + DOCX placeholder) and tests.
  - `backend/src/api/docs.ts` : REST endpoints for create/read/update/move/export.
  - Server-side sanitization via `sanitize-html` with tests.

- Tests & CI
  - Unit tests for frontend and backend (Jest) — passing locally.
  - Cypress e2e spec to exercise frontend↔backend flow (headless).
  - GitHub Actions workflow `.github/workflows/ci.yml` with jobs for install/lint, test, build, security-scan, constitution-check, and e2e.
  - Quick-scan CI guard to detect explicit `any` usages (now excludes `node_modules`).

- Tooling & housekeeping
  - ESLint + Prettier configured per-package. Converted per-package ESLint configs to CJS to set absolute `tsconfigRootDir`.
  - Added `.eslintignore`, `.prettierignore`, `.dockerignore`, `.npmignore`.
  - Husky + lint-staged prepared at workspace root.

Commits included (high-level)

- Add ProsePad spec, plan, tasks, and checklists
- Scaffold frontend and backend projects
- Add editor component and API client
- Implement backend file IO and export stubs
- Add unit and e2e tests
- Add sanitization (DOMPurify client, sanitize-html server) and tests
- Harden CI: lint, tests, e2e, security scan, and constitution check
- Fix TypeScript/ESLint integrations and remove explicit `any` usages
- Add ignore files: `.prettierignore`, `.dockerignore`, `.npmignore`, `.eslintignore`

How to run locally

1. Install dependencies:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

2. Run backend and frontend in dev:

```bash
npm run dev:backend
npm run dev:frontend
# open http://localhost:5173
```

3. Run tests:

```bash
npm --prefix backend test
npm --prefix frontend test
npm --prefix frontend run cy:run  # requires Cypress
```

Security notes

- Backend binds to `127.0.0.1` only and is intended to run locally.
- Server sanitizes HTML with `sanitize-html`. Client sanitizes with `dompurify` for defense-in-depth.
- CI includes `npm audit` steps and a quick `any` usage scan.

Completed checklist (selected)

- Phase 1 setup: repository structure, scripts, linting, CI skeleton
- Phase 2 foundational: backend server, file IO, export stub, API routes, tests, ephemeral test dir, data dir
- Phase 3 (partial): API handlers, frontend API client, Editor component
- CI finalized to run lint/test and e2e pipeline

Remaining work (suggested follow-ups / separate PRs)

- Implement document model types and frontend serialization (`backend/src/lib/models`, `frontend/src/models`)
- Add autosave and more unit tests for editor behaviors
- Implement folder endpoints/UI and comprehensive move contract tests
- Implement a real DOCX generator in `backend/src/lib/export.ts` and export fidelity tests
- Accessibility (axe-core) checks and manual review
- Finalize documentation: `backend/README.md` expansion, `architecture.md`, security checklist

Suggested PR title

Add ProsePad: frontend/backend scaffolds, editor, tests, CI, and sanitization (DOCX export stub)

Suggested reviewers

- Frontend: @frontend-owner
- Backend: @backend-owner
- Security/QA: @security-team

