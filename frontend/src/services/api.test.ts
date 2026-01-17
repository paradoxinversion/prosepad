import { createDoc, openDoc, saveDoc, moveDoc, exportDoc } from './api';

describe('API client', () => {
  const OLD_FETCH = global.fetch;

  afterEach(() => {
    global.fetch = OLD_FETCH;
    jest.restoreAllMocks();
  });

  test('createDoc calls POST /docs and returns json', async () => {
    const mockJson = { id: '1', title: 'T', content: '' };
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: async () => mockJson } as unknown as Response);

    const res = await createDoc({ title: 'T', content: '' });
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/docs');
    expect(res).toEqual(mockJson);
  });

  test('openDoc calls GET /docs/:id and returns json', async () => {
    const mockJson = { id: '2', title: 'X' };
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: async () => mockJson } as unknown as Response);

    const res = await openDoc('2');
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/docs/2');
    expect(res).toEqual(mockJson);
  });

  test('saveDoc calls PUT /docs/:id and returns json', async () => {
    const mockJson = { id: '3', title: 'Saved' };
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: async () => mockJson } as unknown as Response);

    const res = await saveDoc('3', { title: 'Saved', content: '<p>ok</p>' });
    const call = (global.fetch as jest.Mock).mock.calls[0];
    expect(call[0]).toContain('/docs/3');
    expect(call[1].method).toBe('PUT');
    expect(res).toEqual(mockJson);
  });

  test('moveDoc posts destPath and returns json', async () => {
    const mockJson = { id: '4', newPath: 'moved' };
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: async () => mockJson } as unknown as Response);

    const res = await moveDoc('4', 'moved');
    const call = (global.fetch as jest.Mock).mock.calls[0];
    expect(call[0]).toContain('/docs/4/move');
    expect(call[1].method).toBe('POST');
    expect(JSON.parse(call[1].body)).toEqual({ destPath: 'moved' });
    expect(res).toEqual(mockJson);
  });

  test('exportDoc returns blob and filename', async () => {
    const blob = new Blob(['hello'], { type: 'text/plain' });
    const mockRes = {
      ok: true,
      blob: async () => blob,
      headers: new Headers({ 'content-disposition': 'attachment; filename="doc.txt"' }),
    } as unknown as Response;
    global.fetch = jest.fn().mockResolvedValue(mockRes);

    const res = await exportDoc('5', 'plain');
    expect(res.filename).toBe('doc.txt');
    // blob should be a Blob
    expect(res.blob instanceof Blob).toBe(true);
  });
});
