# ProsePad Frontend

Development

```bash
cd frontend
npm install
npm run dev
```

Build

```bash
npm run build
npm run preview
```

Notes

- The frontend expects a local backend at `http://localhost:3000` for document API operations. The backend is the canonical persistence layer per the implementation plan.
- Editor scaffold is a minimal contentEditable placeholder. Implement real rich-text model (Slate/ProseMirror) in Phase 3.
