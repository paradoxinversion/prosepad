import React from "react";
import Editor from "./components/Editor";

export default function App() {
    return (
        <div style={{ padding: 20, fontFamily: "sans-serif" }}>
            <h1>ProsePad (Dev)</h1>
            <Editor />
        </div>
    );
}
