export type Document = {
  id: string;
  title: string;
  path?: string | null;
  content: string;
  created_at?: string;
  updated_at?: string;
  size?: number; // bytes
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
  const size = Buffer.byteLength(content, 'utf8');
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

export function serialize(doc: Document): string {
  return JSON.stringify(doc, null, 2);
}

export function deserialize(payload: string): Document {
  return JSON.parse(payload) as Document;
}
