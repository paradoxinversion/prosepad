# Research: ProsePad — Phase 0

Decision: Use React + TypeScript with Node (latest stable) for tooling; frontend-only app (static site) that runs in the browser.

Rationale: The user specified React and TypeScript; Node is used only for dev tooling (build, dev server). A frontend-only approach minimizes backend surface and fits the constraint of local-only installation.

Alternatives considered:

- Electron: provides native filesystem access but increases distribution complexity and binary size. Rejected because user prefers frontend-only if possible.
- Backend local server: would simplify filesystem access but violates frontend-only preference.

Decision: Persist documents using the browser File System Access API (primary) with fallbacks:

- Primary: File System Access API (user grants directory access) — best UX on Chromium-based browsers.
- Fallback: Download/upload flow (user explicitly saves/loads files) and in-browser IndexedDB for transient drafts.

Rationale: Browser-only file I/O is limited; the File System Access API provides good UX and local-disk persistence without a server. For non-supported browsers, user-driven import/export and IndexedDB keep the app usable.

Alternatives considered:

- Require a local Node backend to perform file I/O: good compatibility but contradicts "no backend" constraint.
- Electron: full disk access with native feel; rejected for complexity and distribution size.

Decision: DOCX export implemented via a client-side library (e.g., `docx` or `Pizzip` + `docxtemplater`) running in-browser.

Rationale: Libraries exist that can generate DOCX in the browser; this keeps export local.

Risks & Mitigations:

- Risk: File System Access API browser support is inconsistent (better in Chromium). Mitigation: Provide clear UX that requests directory access and fall back to manual export/import; document limitations in `README` and `quickstart.md`.
- Risk: DOCX fidelity limitations. Mitigation: Define acceptance tests that measure round-trip fidelity for common formatting and document known limitations in the spec and sample tests.

Resolved Clarifications:

- Language/Version: Node (latest stable) for dev tooling; runtime is browser (no Node runtime required for app).
- Framework: React + TypeScript.
- Packaging: Static site built with Vite and served via `vite preview` or `serve` for local use.
- Storage: File System Access API primary; IndexedDB + download/upload fallback.
- Testing: Jest + React Testing Library for unit; Cypress for e2e; axe-core for accessibility checks.
- Linters/Formatters: ESLint + Prettier + Husky + lint-staged.
- CI: GitHub Actions: lint, test, security-scan, constitution-check (existing workflow template).
