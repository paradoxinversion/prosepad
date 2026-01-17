import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';

export default function Editor() {
  const [title, setTitle] = useState('Untitled');
  const [content, setContent] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // placeholder: could load initial doc here
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontSize: 18, padding: 6 }}
        />
      </div>
      <div
        style={{ border: '1px solid #ccc', minHeight: 240, padding: 8 }}
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onInput={(e) =>
          setContent(DOMPurify.sanitize((e.currentTarget as HTMLDivElement).innerHTML))
        }
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content || '<p>Start writing here...</p>'),
        }}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => alert(`Save not implemented yet — ${content.length} chars`)}>
          Save
        </button>
        <button style={{ marginLeft: 8 }} onClick={() => alert('Export not implemented yet')}>
          Export
        </button>
      </div>
    </div>
  );
}
