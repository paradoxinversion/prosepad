const BASE = "http://localhost:3000";

export async function createDoc(payload: { title: string; content: string }) {
    const res = await fetch(`${BASE}/docs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
}

export async function openDoc(id: string) {
    const res = await fetch(`${BASE}/docs/${id}`);
    return res.json();
}

export async function saveDoc(
    id: string,
    payload: { title: string; content: string },
) {
    const res = await fetch(`${BASE}/docs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
}
