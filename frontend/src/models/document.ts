export type Document = {
  id: string;
  title: string;
  path?: string | null;
  content: string;
  created_at?: string;
  updated_at?: string;
  size?: number;
  version?: number;
};

export function createDocument(params: {
  id: string;
  title?: string;
  content?: string;
  path?: string | null;
}): Document {
  const now = new Date().toISOString();
  const content = params.content ?? '';
  // In browser, estimate size using Blob
  const size =
    typeof Blob !== 'undefined' ? new Blob([content]).size : Buffer.byteLength(content, 'utf8');
  return {
    id: params.id,
    title: params.title ?? 'Untitled',
    content,
    path: params.path ?? null,
    created_at: now,
    updated_at: now,
    size,
    version: 1,
  };
}

export function serialize(doc: Document) {
  return JSON.stringify(doc);
}

export function deserialize(raw: string) {
  return JSON.parse(raw) as Document;
}
