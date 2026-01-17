import { createDocument, deserialize, serialize } from '../src/lib/models/document';

describe('backend Document model helpers', () => {
  it('creates a document with defaults and computes size/version', () => {
    const doc = createDocument({ id: 'abc123', title: 'My Doc', content: 'Hello world' });
    expect(doc.id).toBe('abc123');
    expect(doc.title).toBe('My Doc');
    expect(doc.content).toBe('Hello world');
    expect(typeof doc.created_at).toBe('string');
    expect(typeof doc.updated_at).toBe('string');
    expect(doc.version).toBe(1);
    expect(typeof doc.size).toBe('number');
    expect(doc.size).toBeGreaterThan(0);
  });

  it('serializes and deserializes without data loss', () => {
    const doc = createDocument({ id: 'x', title: 't', content: 'c' });
    const raw = serialize(doc);
    const parsed = deserialize(raw);
    expect(parsed.id).toBe(doc.id);
    expect(parsed.title).toBe(doc.title);
    expect(parsed.content).toBe(doc.content);
    expect(parsed.version).toBe(doc.version);
  });
});
