# ProsePad Backend

This backend is a minimal local HTTP service that provides canonical storage and export for ProsePad.

Run (development):

```bash
cd backend
npm install
npm run dev
```

The server binds to `127.0.0.1:3000` by default. It exposes endpoints under `/docs` for create/read/update/move/export.

Security:

- The backend is intended to run locally and should bind to `localhost` only.
- Do not expose the backend to the public network.

Data storage:

- Documents are stored under `./data/docs/` (JSON files named `{id}.json`).

Notes:

- The DOCX export is a placeholder until a server-side library is integrated; the endpoint returns a placeholder buffer for now.
