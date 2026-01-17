export function sanitizeHtml(html: string): string {
  if (!html) return html;
  // Remove script, iframe, object tags and their contents
  let out = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
  out = out.replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '');
  // Remove event handler attributes like onclick, onerror, onload
  out = out.replace(/\s+on\w+=\"[\s\S]*?\"/gi, '');
  out = out.replace(/\s+on\w+='[\s\S]*?'/gi, '');
  // Remove javascript: in href/src attributes
  out = out.replace(/(href|src)=\"\s*javascript:[\s\S]*?\"/gi, '$1="#"');
  out = out.replace(/(href|src)=\'\s*javascript:[\s\S]*?\'/gi, "$1='#'");
  return out;
}
