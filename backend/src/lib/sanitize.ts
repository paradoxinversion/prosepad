import sanitize from 'sanitize-html';

export function sanitizeHtml(html: string): string {
  if (!html) return html;
  // Conservative sanitizer: allow basic formatting and links, disallow scripts, iframes, styles, and javascript: URIs.
  return sanitize(html, {
    allowedTags: [
      'a',
      'b',
      'i',
      'em',
      'strong',
      'u',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'blockquote',
      'pre',
      'code',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName: string, attribs: Record<string, string>) => {
        // Remove dangerous hrefs
        const href = attribs.href || '';
        if (/^\s*javascript:/i.test(href)) {
          return { tagName: 'a', attribs: { href: '#' } };
        }
        return { tagName: 'a', attribs };
      },
    },
  });
}
