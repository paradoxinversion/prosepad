export type SaveFn = (content: string) => Promise<void>;

export function startAutoSave(getContent: () => string, saveFn: SaveFn, intervalMs = 5000) {
  let stopped = false;
  let lastSaved = getContent();
  let timer: ReturnType<typeof setInterval> | null = setInterval(async () => {
    if (stopped) return;
    try {
      const content = getContent();
      if (content !== lastSaved) {
        await saveFn(content);
        lastSaved = content;
      }
    } catch (err) {
      // surface error to console; do not stop the loop
      // eslint-disable-next-line no-console
      console.error('autoSave error', err);
    }
  }, intervalMs);

  return {
    stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      stopped = true;
    },
    async immediateSave() {
      const content = getContent();
      if (content !== lastSaved) {
        await saveFn(content);
        lastSaved = content;
      }
    },
  };
}

export default startAutoSave;
