import { readDocument } from "./files";

function stripTags(html: string) {
    return html.replace(/<[^>]*>/g, "");
}

export async function exportDocument(id: string, format: string) {
    const doc = await readDocument(id);
    if (!doc) throw new Error("document not found");
    const title = (doc.title || "document").replace(/[^a-z0-9\-_]/gi, "_");
    if (format === "plain") {
        const text = stripTags(doc.content || "");
        return { filename: `${title}.txt`, buffer: Buffer.from(text, "utf8") };
    }
    // basic placeholder for DOCX export; replace with real library in Phase 3
    if (format === "docx") {
        const text = stripTags(doc.content || "");
        const placeholder = `DOCX_PLACEHOLDER\n\n${text}`;
        return {
            filename: `${title}.docx`,
            buffer: Buffer.from(placeholder, "utf8"),
        };
    }
    throw new Error("unsupported format");
}
