# Tasks: ProsePad — Create ProsePad Editor

**Input**: Design documents from `/specs/001-create-prosepad-editor/` (plan.md, spec.md, research.md, data-model.md, contracts/)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Create repository structure: `backend/`, `frontend/`, `tests/`, `docs/`, `backend/src/`, `frontend/src/` (create directory placeholders)
- [ ] T002 [P] Initialize frontend project (React + TypeScript + Vite): `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.json`
- [ ] T003 [P] Initialize backend project (Node LTS + Express/Fastify + TypeScript): `backend/package.json`, `backend/tsconfig.json`
- [ ] T004 [P] Add root development scripts and workspace commands: `package.json` (root) — scripts: `dev`, `build`, `serve-local`, `test`, `lint`
- [ ] T005 [P] Configure linting/formatting and pre-commit hooks: add `.eslintrc`, `.prettierrc`, `husky/`, and `lint-staged` entries (root and `frontend`/`backend` as needed)
- [ ] T006 [P] Add CI workflow skeleton (update `.github/workflows/ci.yml`) to include frontend/backend lint and test jobs (placeholders for full jobs)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T007 Create backend server entry `backend/src/index.ts` with a minimal HTTP server binding to `localhost` and health endpoint
- [ ] T008 Implement backend file IO module `backend/src/lib/files.ts` (read/write/move/list under `./data/docs/`)
- [ ] T009 Implement backend export library stub `backend/src/lib/export.ts` (DOCX/plain export interface)
- [ ] T010 Add backend API routing for docs `backend/src/api/docs.ts` (endpoints: `POST /docs`, `GET /docs/:id`, `PUT /docs/:id`, `POST /docs/:id/move`)
- [ ] T011 Add backend tests scaffold `backend/tests/` and sample unit test `backend/tests/document.spec.ts`
- [ ] T012 Add `backend/README.md` with start instructions, security notes (localhost binding), and troubleshooting
- [ ] T013 Add ephemeral test-directory utility for tests `tests/utils/ephemeralDir.ts`
- [ ] T014 Wire backend start script and sample data directory `./data/docs/.gitkeep`
- [ ] T015 Update `.specify` or plan docs to reference backend as canonical runtime (`specs/001-create-prosepad-editor/plan.md`) — ensure links are present

---

## Phase 3: User Story 1 - Create & Edit Document (Priority: P1) 🎯

Goal: Create, edit, save, and re-open rich-text documents with formatting preserved.

Independent Test: Programmatic create → format → save → open round-trip preserves formatting.

### Tests for User Story 1 (REQUIRED)

- [ ] T016 [P] [US1] Add contract tests for document API: `tests/contract/test_docs_contract.spec.ts` (validate request/response shapes per `specs/001-create-prosepad-editor/contracts/ui-events.md`)
- [ ] T017 [P] [US1] Add integration test for create/edit/save/open: `tests/integration/test_create_edit_save.spec.ts` (uses ephemeralDir and backend)

### Implementation for User Story 1

- [ ] T018 [US1] Implement `backend/src/lib/models/document.ts` (Document model: id, title, path, content, version, timestamps)
- [ ] T019 [US1] Implement `frontend/src/models/document.ts` (TypeScript model interfaces and serialization helpers)
- [ ] T020 [US1] Implement backend handlers in `backend/src/api/docs.ts` (create, read, update) — depends on T008, T009
- [ ] T021 [US1] Implement frontend API client `frontend/src/services/api.ts` with methods: `createDoc`, `openDoc`, `saveDoc`, `moveDoc`
- [ ] T022 [US1] Implement core Editor component `frontend/src/components/Editor.tsx` (basic UI + format toolbar) and hook up to API client
- [ ] T023 [US1] Implement auto-save and explicit Save in `frontend/src/services/autoSave.ts` (configurable interval)
- [ ] T024 [US1] Add unit tests for frontend document model and editor behaviors: `frontend/tests/unit/document.spec.ts`, `frontend/tests/unit/editor.spec.ts`
- [ ] T025 [US1] Add logging and error handling for doc operations (`backend/src/lib/logging.ts` and usages)

Checkpoint: US1 should be independently testable and pass core integration tests

---

## Phase 4: User Story 2 - Folder Organization & Move (Priority: P1)

Goal: Create folders and move documents between folders; reflect on-disk changes and editor path updates.

### Tests for User Story 2 (REQUIRED)

- [ ] T026 [P] [US2] Add contract test for move endpoint: `tests/contract/test_move_contract.spec.ts`
- [ ] T027 [P] [US2] Add integration test for move flow: `tests/integration/test_move_flow.spec.ts`

### Implementation for User Story 2

- [ ] T028 [US2] Implement backend folder endpoints `backend/src/api/folders.ts` (create, rename, delete, list)
- [ ] T029 [US2] Implement frontend folder UI `frontend/src/components/FolderList.tsx` and connect to API
- [ ] T030 [US2] Implement backend atomic move operation in `backend/src/lib/files.ts` and unit tests
- [ ] T031 [US2] Add accessibility keyboard nav tests for folder list `frontend/tests/integration/folder_keyboard.spec.ts`

Checkpoint: US2 move operations should be fully testable and pass integration tests

---

## Phase 5: User Story 3 - Links, Export & Interchange (Priority: P2)

Goal: Insert links, export to plain text and DOCX, verify fidelity.

### Tests for User Story 3 (REQUIRED)

- [ ] T032 [P] [US3] Add contract test for export endpoint: `tests/contract/test_export_contract.spec.ts`
- [ ] T033 [P] [US3] Add integration test for export fidelity: `tests/integration/test_export_fidelity.spec.ts` (sample docs)

### Implementation for User Story 3

- [ ] T034 [US3] Implement backend export endpoint `backend/src/api/export.ts` (accept doc id + format)
- [ ] T035 [US3] Implement server-side DOCX generator `backend/src/lib/export.ts` and sample fixtures `backend/tests/fixtures/sample_docs/`
- [ ] T036 [US3] Implement frontend Export UI `frontend/src/components/ExportButton.tsx` and wiring to API
- [ ] T037 [US3] Add round-trip fidelity tests asserting critical formatting preserved `backend/tests/integration/export_fidelity.spec.ts`

Checkpoint: US3 export flows testable and pass fidelity checks for common formatting

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T038 [P] Documentation: add `backend/README.md`, update `specs/001-create-prosepad-editor/quickstart.md`, add `specs/001-create-prosepad-editor/architecture.md`
- [ ] T039 [P] CI: finalize `.github/workflows/ci.yml` to run lint/test for frontend/backend and run e2e in merge pipeline
- [ ] T040 [P] Add security checklist `docs/security.md` and enable dependency scanning (Dependabot/Snyk) configuration
- [ ] T041 [P] Accessibility manual review and remediation tasks (`a11y-report/` artifacts)
- [ ] T042 Code cleanup, formatting, and performance tuning (profile 1MB docs)
- [ ] T043 Release notes and changelog prep when storage/API changes occur (`CHANGELOG.md`)

---

## Dependencies & Execution Order

- Setup (Phase 1) tasks are parallelizable and should be completed first.
- Foundational (Phase 2) tasks block user stories (do not start user stories until Phase 2 complete).
- User stories are ordered by priority (US1, US2, US3) but can be implemented in parallel after foundational tasks.

---

## Mapping to source documents (where to find details)

- Implementation expectations and backend requirement: [specs/001-create-prosepad-editor/plan.md](specs/001-create-prosepad-editor/plan.md)
- User stories, acceptance criteria, and priority: [specs/001-create-prosepad-editor/spec.md](specs/001-create-prosepad-editor/spec.md)
- Research decisions and fallbacks (FS API vs backend): [specs/001-create-prosepad-editor/research.md](specs/001-create-prosepad-editor/research.md)
- Entities and migration notes: [specs/001-create-prosepad-editor/data-model.md](specs/001-create-prosepad-editor/data-model.md)
- API contracts and payloads (sketch): [specs/001-create-prosepad-editor/contracts/ui-events.md](specs/001-create-prosepad-editor/contracts/ui-events.md)
- Quickstart and dev commands: [specs/001-create-prosepad-editor/quickstart.md](specs/001-create-prosepad-editor/quickstart.md)

---

## Implementation Strategy

- MVP: Complete Phase 1 + Phase 2, then deliver US1 (P1) as MVP. Validate US1 with integration/e2e tests and demonstrate local backend persistence.
- Iterate US2 and US3 next, adding tests and CI coverage.
- Keep tasks small and commit after each task. Prefer TDD: write failing tests before code changes.

---

If you'd like, I can now commit this `tasks.md` to the branch and/or scaffold the `backend/` starter for T007–T009. Which should I do next?
