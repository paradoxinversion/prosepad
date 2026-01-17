const BASE =
  (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_API_BASE) ||
  'http://localhost:3000';

export async function createDoc(payload: { title: string; content: string }) {
  const res = await fetch(`${BASE}/docs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function openDoc(id: string) {
  const res = await fetch(`${BASE}/docs/${id}`);
  return res.json();
}

export async function saveDoc(id: string, payload: { title: string; content: string }) {
  const res = await fetch(`${BASE}/docs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function moveDoc(id: string, destPath: string) {
  const res = await fetch(`${BASE}/docs/${id}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destPath }),
  });
  return res.json();
}

export async function exportDoc(id: string, format: 'plain' | 'docx' | 'html' = 'plain') {
  const res = await fetch(`${BASE}/docs/${id}/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ format }),
  });
  if (!res.ok) throw new Error(`Export failed: ${res.status}`);
  const blob = await res.blob();
  const filename =
    res.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') ||
    `${id}.${format}`;
  return { blob, filename };
}
