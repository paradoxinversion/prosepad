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

````markdown
PR Summary

This PR contains the focused work for the `feat/prosepad-models` branch: adding `Document` model types and associated unit tests for both backend and frontend, plus small type-safety improvements to tests and file IO wiring to use the model.

What this PR contains

- Backend
  - `backend/src/lib/models/document.ts`: `Document` model type with create/serialize/deserialize helpers.
  - `backend/src/lib/files.ts` (typed): uses the `Document` model for read/write operations.
  - `backend/tests/models.document.spec.ts`: unit tests for backend model helpers.

- Frontend
  - `frontend/src/models/document.ts`: `Document` TypeScript interfaces and serialization helpers mirroring backend shape.
  - `frontend/src/models/document.test.ts`: unit tests validating frontend model helpers.

- Tests & Type Hygiene
  - Removed `as any` casts from model tests and tightened types where appropriate.
  - Added ephemeral test utilities if required by model tests (no production behavior change).

Commits included (high-level)

- `feat(models): add Document models` — add backend and frontend `Document` types and helpers
- `test(models): add unit tests` — model unit tests for backend and frontend
- `chore(types): remove 'as any' casts in tests` — tighten tests to avoid explicit `any`
- `chore(files): wire files.ts to use Document type` — small typing change to backend file IO

How to run model tests locally

```bash
npm --prefix backend test -- backend/tests/models.document.spec.ts
npm --prefix frontend test -- frontend/src/models/document.test.ts
```

Notes

- This PR is intentionally scoped to model types and tests only. It does not change editor UI, export logic, CI config, or other feature scaffolding introduced earlier.

Suggested PR title

feat(models): add Document models and unit tests

Suggested reviewers

- Backend: @backend-owner
- Frontend: @frontend-owner
````

Remaining work (suggested follow-ups / separate PRs)
