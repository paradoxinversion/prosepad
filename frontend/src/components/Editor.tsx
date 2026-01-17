import React, { useState, useRef, useEffect } from "react";

export default function Editor() {
    const [title, setTitle] = useState("Untitled");
    const [content, setContent] = useState("");
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
                style={{ border: "1px solid #ccc", minHeight: 240, padding: 8 }}
                contentEditable
                ref={ref}
                onInput={(e) =>
                    setContent((e.target as HTMLDivElement).innerHTML)
                }
            >
                <p>Start writing here...</p>
            </div>
            <div style={{ marginTop: 8 }}>
                <button onClick={() => alert("Save not implemented yet")}>
                    Save
                </button>
                <button
                    style={{ marginLeft: 8 }}
                    onClick={() => alert("Export not implemented yet")}
                >
                    Export
                </button>
            </div>
        </div>
    );
}
