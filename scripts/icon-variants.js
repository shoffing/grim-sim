#!/usr/bin/env node

/**
 * This script generates tinted variants of all character icon files in assets/images/icons:
 * - {character}__tint_red.webp
 * - {character}__tint_blue.webp
 *
 * The script is idempotent, and can be run without worry.
 *
 * Must have ImageMagick installed locally.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const iconsDir = path.join(process.cwd(), 'assets', 'images', 'icons');
const TYPES = ['demon', 'minion', 'townsfolk', 'outsider', 'traveller'];
const characters = TYPES.flatMap(type => {
  const typeDir = path.join(iconsDir, type)
  return fs.readdirSync(typeDir).map(char => path.join(typeDir, char));
});

(async () => {
  for (const character of characters) {
    if (!character.includes('__variant')) {
      console.log(character, '...');
      const baseName = path.basename(character, '.webp');
      const gray = path.join(path.dirname(character), `${baseName}__variant_gray.webp`);
      const red = path.join(path.dirname(character), `${baseName}__variant_red.webp`);
      const blue = path.join(path.dirname(character), `${baseName}__variant_blue.webp`);
      await exec(`convert ${character} -colorspace LinearGray ${gray}`);
      await exec(`convert ${gray} -fill '#F00' -tint 130 ${red}`);
      await exec(`convert ${gray} -fill '#00F' -tint 130 ${blue}`);
      await exec(`rm ${gray}`);
    }
  }
})();
