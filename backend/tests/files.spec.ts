import { saveDocument, readDocument, moveDocument } from "../src/lib/files";
import fs from "fs/promises";
import path from "path";

describe("files lib", () => {
    const id = "test-doc";
    const sample = { id, title: "Test", content: "<p>hello</p>" };
    const DATA_ROOT = path.resolve(process.cwd(), "data", "docs");

    afterAll(async () => {
        // cleanup test files
        try {
            await fs.rm(path.join(DATA_ROOT, `${id}.json`));
        } catch (e) {}
        try {
            await fs.rm(path.join(DATA_ROOT, "moved", `${id}.json`));
        } catch (e) {}
    });

    test("save & read document", async () => {
        await saveDocument(id, sample);
        const doc = await readDocument(id);
        expect(doc).not.toBeNull();
        expect(doc.id).toBe(id);
    });

    test("move document", async () => {
        await saveDocument(id, sample);
        await moveDocument(id, "moved");
        const moved = await readDocument(path.join("moved", `${id}`));
        // readDocument expects id only, so reading moved file by id should return null; ensure file exists at dest
        // verify destination file exists
        const dest = path.join(DATA_ROOT, "moved", `${id}.json`);
        const stat = await fs.stat(dest);
        expect(stat.isFile()).toBe(true);
    });
});
