# Quickstart: ProsePad (development)

Prerequisites

- Node.js (latest stable) and npm or pnpm
- A Chromium-based browser for best File System Access API support (Chrome, Edge)

Install

```bash
npm install
```

Run dev server

```bash
npm run dev
# open http://localhost:5173 in your browser
```

Build

```bash
npm run build
npm run preview # or `npx serve dist` to serve built files locally
```

Notes

- The app uses the browser File System Access API to persist files when available. If your browser does not support it, use the import/export buttons and consider enabling IndexedDB drafts.
- Tests: `npm test` runs unit tests; `npm run cy:open` runs e2e in Cypress.
