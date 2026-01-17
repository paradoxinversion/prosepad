# Contracts: UI Events & Internal API (Frontend-only)

This document defines the event/command contracts used between UI components and core application services. No network API is required (frontend-only).

Events (action -> payload -> result)

- `createDocument` {
  payload: { title: string }
  result: { id: string, path: null }
  }

- `openDocument` {
  payload: { id?: string, path?: string }
  result: { document: Document }
  }

- `saveDocument` {
  payload: { id: string, content: string, path?: string }
  result: { id: string, path: string }
  }

- `moveDocument` {
  payload: { id: string, destPath: string }
  result: { id: string, newPath: string }
  }

- `exportDocument` {
  payload: { id: string, format: "plain" | "docx" | "html" }
  result: { blob: Blob, filename: string }
  }

- `requestDirectoryAccess` {
  payload: { }
  result: { granted: boolean, rootHandle?: FileSystemDirectoryHandle }
  }

Error model

- All commands return structured errors: { code: string, message: string, recoverable: boolean }

Testing contract

- Tests must assert both the command result shape and the side-effects (e.g., file created on disk when `saveDocument` is called with directory access).
