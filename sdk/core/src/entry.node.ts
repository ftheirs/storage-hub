// Node entry with automatic wasm initialization
import initWasm from '../wasm/pkg/storagehub_wasm.js';

const fsMod = 'node:fs/promises';
const { readFile } = await import(fsMod);
const url = new URL('../wasm/pkg/storagehub_wasm_bg.wasm', import.meta.url);
const bytes = await readFile(url);
await initWasm({ module: bytes });

export * from './index.js';

