import fs from 'fs/promises';
import path from 'path';

import { sanitizeHtml } from './sanitize';
import { Document } from './models/document';

const DATA_ROOT = path.resolve(process.cwd(), 'data', 'docs');

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
}

export async function saveDocument(id: string, doc: Document) {
  await ensureDir(DATA_ROOT);
  // sanitize content before saving
  const safeDoc: Document = { ...doc, content: sanitizeHtml(doc.content) };
  const file = path.join(DATA_ROOT, `${id}.json`);
  await fs.writeFile(file, JSON.stringify(safeDoc, null, 2), 'utf8');
  return file;
}

export async function readDocument(id: string) {
  const file = path.join(DATA_ROOT, `${id}.json`);
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as Document;
  } catch {
    return null;
  }
}

export async function listDocuments() {
  await ensureDir(DATA_ROOT);
  const files = await fs.readdir(DATA_ROOT);
  return files.filter((f) => f.endsWith('.json'));
}

export async function moveDocument(id: string, destPath: string) {
  await ensureDir(path.join(DATA_ROOT, destPath));
  const src = path.join(DATA_ROOT, `${id}.json`);
  const dest = path.join(DATA_ROOT, destPath, `${id}.json`);
  await fs.rename(src, dest);
  return dest;
}
