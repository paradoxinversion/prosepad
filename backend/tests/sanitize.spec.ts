import { sanitizeHtml } from '../src/lib/sanitize';

describe('sanitizeHtml', () => {
  test('removes script tags', () => {
    const input = '<p>hello</p><script>alert(1)</script>';
    const out = sanitizeHtml(input);
    expect(out).toContain('<p>hello</p>');
    expect(out).not.toContain('script');
    expect(out).not.toContain('alert(1)');
  });

  test('removes on* attributes', () => {
    const input = '<img src="x" onerror="alert(1)" />';
    const out = sanitizeHtml(input);
    expect(out).not.toContain('onerror');
  });

  test('strips javascript: href', () => {
    const input = '<a href="javascript:alert(1)">link</a>';
    const out = sanitizeHtml(input);
    expect(out).toContain('href="#"');
  });
});
