import { OfflineCompiler } from '/opt/homebrew/lib/node_modules/mind-ar/src/image-target/offline-compiler.js';
import { loadImage } from '/opt/homebrew/lib/node_modules/mind-ar/node_modules/canvas/index.js';
import { writeFileSync } from 'fs';

const QR_PATH = '/Users/alden/Documents/Work - Map72/AR HTML/qr-target.png';
const OUT_PATH = '/Users/alden/Documents/Work - Map72/AR HTML/targets.mind';

console.log('Loading QR image...');
const img = await loadImage(QR_PATH);
console.log(`Image loaded: ${img.width}x${img.height}`);

const compiler = new OfflineCompiler();

console.log('Compiling image target (this takes ~30s)...');
await compiler.compileImageTargets([img], (progress) => {
  process.stdout.write(`\rProgress: ${progress.toFixed(1)}%   `);
});

console.log('\nExporting .mind file...');
const buffer = compiler.exportData();
writeFileSync(OUT_PATH, Buffer.from(buffer));

console.log(`Done! targets.mind saved (${buffer.byteLength} bytes)`);
