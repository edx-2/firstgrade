#!/usr/bin/env node
/* ============================================================
   extract-phrases.mjs – Schritt 1 der Audio-Pipeline.
   Sammelt ALLE Sätze, die die App sprechen kann (aus js/data.js
   über die gemeinsame Logik in js/speakables.js), und schreibt
   sie mit Hash + Kategorie nach tools/phrases.json.

   Aufruf:  node tools/extract-phrases.mjs
   ============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Speakables = require('../js/speakables.js');

// data.js ist ein Browser-Skript -> in einer VM ausführen
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  readFileSync(new URL('../js/data.js', import.meta.url), 'utf8') +
  '\nthis.MODULES = MODULES;',
  ctx
);

const phrases = Speakables.collect(ctx.MODULES);

// Kollisionen wären fatal (falscher Clip für einen Text) -> prüfen
const seen = new Map();
for (const p of phrases) {
  if (seen.has(p.hash) && seen.get(p.hash) !== p.text) {
    console.error(`HASH-KOLLISION: ${p.hash}\n  "${seen.get(p.hash)}"\n  "${p.text}"`);
    process.exit(1);
  }
  seen.set(p.hash, p.text);
}

const byCat = {};
phrases.forEach(p => byCat[p.cat] = (byCat[p.cat] || 0) + 1);

writeFileSync(
  new URL('./phrases.json', import.meta.url),
  JSON.stringify({ generated: new Date().toISOString(), count: phrases.length, phrases }, null, 2)
);
console.log(`OK: ${phrases.length} Sätze -> tools/phrases.json`);
console.log('   ', Object.entries(byCat).map(([k, v]) => `${k}: ${v}`).join(', '));
