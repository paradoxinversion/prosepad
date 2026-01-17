# Feature Specification: ProsePad — Local Rich Text Editor

**Feature Branch**: `001-create-prosepad-editor`  
**Created**: 2026-01-16  
**Status**: Draft  
**Input**: User description: "Build a web application, ProsePad, that allows users to create and edit text documents in the browser. Documents will be placed in folders and moved at the user's discretion. Users will be able to utilize generally expected formatting (ie, bold, underline, italics, bullets, headings, selected fonts, etc). Users will be able to add links to specified text. Users will be able to export their documents to basic text and rich text files. This application will not be deployed or hosted on the internet. It will be installed and run using the terminal. There is no login, because each instance of the application will support only one user. Files will be stored directly on the user's system as a subdirectory of the repository."

**Constitution Check**: This spec documents required tests, UX/accessibility considerations, observability, and migration plans when applicable. It explains how the feature satisfies the constitution's principles (Code Quality, Test-First, CI gates, UX consistency, Observability).

## User Scenarios & Testing (mandatory)

### User Story 1 - Create & Edit Document (Priority: P1)

As the single local user, I can create, open, edit, and save rich-text documents so I can author content with formatting and persist it to the repository-backed storage.

Why this priority: Core app functionality — without it the application has no value.

Independent Test:

- Create a new document, apply formatting (bold, italic, heading, bullet lists), save it, close the editor, re-open the document — all formatting is preserved.

Acceptance Scenarios:

1. Given the app is running, When the user creates a new document and types text with bold/italic/heading/bullets, Then the document displays formatted text in the editor and save persists the formatted content to disk.
2. Given a previously saved document, When the user opens it, Then the editor renders the document with the same formatting and order of content.

---

### User Story 2 - Folder Organization & Move (Priority: P1)

As the user, I can create folders and move documents between folders so I can organize content on disk.

Independent Test:

- Create folders, create documents in folder A, move document to folder B, and verify file move on disk and that the editor reflects the new path.

Acceptance Scenarios:

1. Given folder A and folder B exist, When the user moves doc1 from A to B via the UI, Then doc1 no longer exists in A on disk and is present in B and opening it in the editor uses the new path.

---

### User Story 3 - Links, Export & Interchange (Priority: P2)

As the user, I can add links inside documents and export documents to plain text and a rich-text format so I can share content in other tools.

Independent Test:

- Add a hyperlink in a document; export to plaintext and rich format; validate that link text is present in plaintext and preserved (where supported) in rich export.

Acceptance Scenarios:

1. Given a document with a link, When the user exports to plain text, Then the exported file contains the link text and optionally the URL on a separate line.
2. Given a document with formatting and links, When the user exports to the selected rich format, Then the exported file preserves formatting and links according to that format's capabilities.

---

### Edge Cases

- Large documents (100k+ characters): Editor should remain responsive; tests should include load/save performance measurements.
- Filename collisions when moving files: UI should prompt for overwrite or rename.
- Unsupported formatting in export target: Document export must degrade gracefully and document what is preserved.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The system MUST allow creating a new document and saving it to disk under `./data/docs/` (or configured subdirectory) with a stable file name.
- **FR-002**: The system MUST render and allow editing of basic rich-text features: bold, italic, underline, headings, ordered/unordered lists, blockquote, code span, and hyperlinks.
- **FR-003**: The system MUST allow creating, renaming, and deleting folders under the chosen data directory; moving documents between folders MUST update the on-disk file location.
- **FR-004**: The system MUST export documents to plain text (.txt) with reasonable formatting loss semantics and to DOCX (.docx) as the canonical rich-text export format. The spec should document known fidelity limitations for DOCX export and include sample export tests.
- **FR-005**: The UI MUST provide an Undo/Redo stack for text edits.
- **FR-006**: The editor MUST auto-save drafts periodically and offer explicit Save; auto-save frequency is configurable.
- **FR-007**: The application MUST run locally and be launchable from the terminal. Packaging/launch mode: local static server + browser (served via `npm` / a static server). No other packaging assumptions are required.
- **FR-008**: The system MUST not require login — single-user local storage only.
- **FR-009**: The system MUST include keyboard accessibility for core editing actions and support basic screen-reader semantics for document content and folder navigation.

### Non-Functional Requirements

- **NFR-001**: Save and load operations for documents up to 1MB SHOULD complete within 1 second on a typical laptop.
- **NFR-002**: Editor must maintain responsiveness during typing with latency < 50ms for local UI updates.
- **NFR-003**: Tests for core flows (create/save/open/move/export) MUST be included and pass in CI.

## Key Entities

- **Document**: id, title, path, content (rich-text model, e.g., HTML/Markdown+extensions or ProseMirror JSON), last_modified, size
- **Folder**: id, path, name, children
- **ExportFormat**: name (plain, rtf, html, docx), capabilities (supports links, supports styles)

## Success Criteria (mandatory)

- **SC-001**: Users can create, save, and re-open documents with formatting preserved in 95% of common formatting cases (bold, italic, lists, headings) as measured by automated round-trip tests.
- **SC-002**: Moving a document updates the on-disk path and the editor opens the moved file without manual import in 100% of tested moves.
- **SC-003**: Export to plain text and selected rich format completes successfully for 99% of sample documents in the test suite.
- **SC-004**: Primary user flows (create → edit → save → open) have end-to-end tests passing on CI and latency goals met for 90% of runs.

## Assumptions

- Single-user, local-only deployment — no authentication, no multi-user concerns.
- Default storage directory: `./data/docs/` inside the repository; configurable via settings file.
- Implementation will rely on a client-side rich-text engine (e.g., ProseMirror/TipTap/Slate) or a simple contenteditable model depending on packaging choice.

## Tests (brief)

- Unit tests for document model (save/load, serialization round-trip).
- Integration tests for UI flows (create, format, save, open, move, export) using a headless browser (static server + browser).
- Accessibility checks for keyboard nav and basic ARIA roles.

## Migration & Compatibility

- If the internal rich-text model changes, include a migration utility to convert stored documents and a backward-compatibility mode for older files.

## Notes & Next Steps

Preferred rich export format: DOCX — document DOCX export fidelity expectations and include sample export tests. Packaging is fixed to static server + browser and uses `npm` as the launcher.
