import { createDocument, serialize, deserialize } from './document';

describe('frontend Document model helpers', () => {
  it('creates a document with defaults and size estimation', () => {
    const doc = createDocument({ id: 'f1', title: 'Front', content: 'abc' } as any);
    expect(doc.id).toBe('f1');
    expect(doc.title).toBe('Front');
    expect(doc.version).toBe(1);
    expect(typeof doc.size).toBe('number');
  });

  it('serialize/deserialize preserves fields', () => {
    const doc = createDocument({ id: 'f2', title: 'S', content: 'payload' } as any);
    const raw = serialize(doc);
    const parsed = deserialize(raw);
    expect(parsed.id).toBe(doc.id);
    expect(parsed.content).toBe(doc.content);
  });
});
