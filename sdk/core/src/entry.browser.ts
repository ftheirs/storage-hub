// Browser entry with automatic wasm initialization
import initWasm from '../wasm/pkg/storagehub_wasm.js';

await initWasm({ path: new URL('../wasm/pkg/storagehub_wasm_bg.wasm', import.meta.url).href });

export * from './index.js';

