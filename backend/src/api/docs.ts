import { Router } from "express";
import { randomUUID } from "crypto";
import * as files from "../lib/files";
import * as exporter from "../lib/export";

const router = Router();

router.post("/", async (req, res) => {
    const { title = "Untitled", content = "" } = req.body;
    const id = (global as any).PROSEPAD_ID || randomUUID();
    try {
        const doc = { id, title, content, version: 1 };
        await files.saveDocument(id, doc);
        res.status(201).json(doc);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const doc = await files.readDocument(req.params.id);
        if (!doc) return res.status(404).json({ error: "not found" });
        res.json(doc);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        const doc = await files.readDocument(id);
        if (!doc) return res.status(404).json({ error: "not found" });
        const updated = {
            ...doc,
            title: title ?? doc.title,
            content: content ?? doc.content,
            version: (doc.version || 1) + 1,
        };
        await files.saveDocument(id, updated);
        res.json(updated);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/:id/move", async (req, res) => {
    try {
        const id = req.params.id;
        const { destPath } = req.body;
        await files.moveDocument(id, destPath);
        res.json({ id, newPath: destPath });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/:id/export", async (req, res) => {
    try {
        const id = req.params.id;
        const { format = "plain" } = req.body;
        const result = await exporter.exportDocument(id, format);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${result.filename}"`,
        );
        res.setHeader("Content-Type", "application/octet-stream");
        res.send(result.buffer);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
