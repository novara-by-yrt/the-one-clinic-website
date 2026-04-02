#!/usr/bin/env node
/**
 * log-progress.mjs
 *
 * Appends a timestamped entry to docs/progress.md.
 * Never overwrites existing content — only appends below the LOG marker.
 *
 * Usage:
 *   node scripts/log-progress.mjs "Added booking page with Calendly integration"
 *   npm run log "Added booking page with Calendly integration"
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROGRESS_FILE = resolve(__dirname, '../docs/progress.md');
const MARKER = '<!-- PROGRESS LOG — append new entries below this line, newest first -->';

const message = process.argv.slice(2).join(' ').trim();

if (!message) {
  console.error('Usage: node scripts/log-progress.mjs "<message>"');
  process.exit(1);
}

const content = readFileSync(PROGRESS_FILE, 'utf8');

if (!content.includes(MARKER)) {
  console.error(`Marker not found in ${PROGRESS_FILE}. Cannot append safely.`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const entry = `\n### ${date}\n- ${message}\n`;

const updated = content.replace(MARKER, `${MARKER}${entry}`);

writeFileSync(PROGRESS_FILE, updated, 'utf8');
console.log(`Logged: ${date} — ${message}`);
