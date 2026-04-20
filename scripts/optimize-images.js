const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/solea');
const QUALITY = 80;
const EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG'];

async function optimizeImages() {
  const files = fs.readdirSync(INPUT_DIR);
  const targets = files.filter(f => EXTENSIONS.includes(path.extname(f)));

  console.log(`Found ${targets.length} images to optimize\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of targets) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(INPUT_DIR, `${baseName}.webp`);

    const statBefore = fs.statSync(inputPath);
    const sizeBefore = (statBefore.size / 1024 / 1024).toFixed(2);

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const statAfter = fs.statSync(outputPath);
    const sizeAfter = (statAfter.size / 1024 / 1024).toFixed(2);
    const saved = (((statBefore.size - statAfter.size) / statBefore.size) * 100).toFixed(0);

    totalBefore += statBefore.size;
    totalAfter += statAfter.size;

    console.log(`✓ ${file}`);
    console.log(`  ${sizeBefore}MB → ${sizeAfter}MB  (${saved}% smaller)\n`);
  }

  const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const totalAfterMB = (totalAfter / 1024 / 1024).toFixed(1);
  const totalSaved = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);

  console.log('─────────────────────────────────');
  console.log(`TOTAL: ${totalBeforeMB}MB → ${totalAfterMB}MB  (${totalSaved}% reduction)`);
  console.log('─────────────────────────────────');
  console.log('\nOriginal files kept — delete them manually once you update image references.');
}

optimizeImages().catch(console.error);
