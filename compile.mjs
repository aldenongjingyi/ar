import { OfflineCompiler } from '/opt/homebrew/lib/node_modules/mind-ar/src/image-target/offline-compiler.js';
import { loadImage } from '/opt/homebrew/lib/node_modules/mind-ar/node_modules/canvas/index.js';
import { writeFileSync } from 'fs';

const QR1_PATH = '/Users/alden/Documents/Work - Map72/AR HTML/qr-target.png';
const QR2_PATH = '/Users/alden/Documents/Work - Map72/AR HTML/qr-voucher.png';
const OUT_PATH = '/Users/alden/Documents/Work - Map72/AR HTML/targets.mind';

console.log('Loading QR images...');
const [img1, img2] = await Promise.all([loadImage(QR1_PATH), loadImage(QR2_PATH)]);
console.log(`Images loaded: ${img1.width}x${img1.height}, ${img2.width}x${img2.height}`);

const compiler = new OfflineCompiler();

console.log('Compiling image targets (takes ~60s)...');
await compiler.compileImageTargets([img1, img2], (progress) => {
  process.stdout.write(`\rProgress: ${progress.toFixed(1)}%   `);
});

console.log('\nExporting .mind file...');
const buffer = compiler.exportData();
writeFileSync(OUT_PATH, Buffer.from(buffer));

console.log(`Done! targets.mind saved (${buffer.byteLength} bytes)`);
