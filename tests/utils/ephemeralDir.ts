import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export async function createEphemeralDir(prefix = 'prosepad-') {
  const tmp = os.tmpdir();
  const dir = await fs.mkdtemp(path.join(tmp, prefix));
  return {
    path: dir,
    async cleanup() {
      try {
        await fs.rm(dir, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
    },
  };
}
