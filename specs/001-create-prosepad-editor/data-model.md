# Data Model: ProsePad

Entities

- Document
    - id: string (UUID)
    - title: string (validated, non-empty)
    - path: string | null (file path when persisted via FS API)
    - content: string (rich-text representation; canonical model: HTML or a lightweight Delta)
    - created_at: ISO-8601 timestamp
    - updated_at: ISO-8601 timestamp
    - size: integer (bytes)
    - version: integer (for migrations)

- Folder
    - id: string (UUID)
    - path: string
    - name: string
    - children: array of Document metadata (ids, titles, paths)

- ExportFormat
    - name: enum ("plain", "html", "docx")
    - supportsLinks: boolean
    - supportsStyles: boolean

Validation rules

- `title` must be <= 255 chars, and not contain path separators when persisted.
- `path` must be validated against granted directory root to avoid path traversal.
- `content` must be serializable to the chosen storage format; round-trip tests must exist.

State transitions

- Draft -> Saved: created_at set, path assigned when persisted
- Saved -> Moved: path changes, updated_at bumped
- Saved -> Deleted: archive or remove file; tests must assert filesystem state

Migration notes

- Store `version` on Document; include migration utility to upgrade content schemas (e.g., HTML -> new Delta shape).
