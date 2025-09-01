let initialized = false;

export async function initWasm(): Promise<void> {
  if (initialized) return;

  // Defer import to avoid bundlers resolving wrong target at build time
  const wasmInit = (await import('../wasm/pkg/storagehub_wasm.js')).default as (
    opts: { path?: string; module?: ArrayBufferView | ArrayBuffer }
  ) => Promise<unknown>;

  const wasmUrl = new URL('../wasm/pkg/storagehub_wasm_bg.wasm', import.meta.url);
  if (typeof window === 'undefined') {
    const fsMod = 'node:fs/promises';
    const { readFile } = await import(fsMod);
    const buf = await readFile(wasmUrl);
    await wasmInit({ module: buf });
  } else {
    await wasmInit({ path: wasmUrl.href });
  }

  initialized = true;
}


