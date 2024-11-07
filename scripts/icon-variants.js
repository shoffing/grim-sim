#!/usr/bin/env node

/**
 * This script generates tinted variants of all character icon files in assets/images/icons:
 * - {character}__tint_red.webp
 * - {character}__tint_blue.webp
 *
 * This script is idempotent.
 *
 * Must have ImageMagick installed locally.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const iconsDir = path.join(process.cwd(), 'assets', 'images', 'icons');
const TYPES = [
  {id: 'demon', tint: 'blue'},
  {id: 'minion', tint: 'blue'},
  {id: 'outsider', tint: 'red'},
  {id: 'townsfolk', tint: 'red'},
  {id: 'traveller', tint: 'both'},
  {id: 'fabled', tint: 'none'},
];

const characters = TYPES.flatMap(type => {
  const typeDir = path.join(iconsDir, type.id);
  return fs.readdirSync(typeDir).map(char => path.join(typeDir, char)).map(f => [type, f]);
});

(async () => {
  await Promise.all(characters.map(([type, character]) => {
    return (async () => {
      if (!character.includes('__')) {
        console.log(character, '...');
        const extName = path.extname(character);
        const baseName = path.basename(character, extName);
        const trim = path.join(path.dirname(character), `${baseName}__trim${extName}`);
        const gray = path.join(path.dirname(character), `${baseName}__trim__gray${extName}`);
        const red = path.join(path.dirname(character), `${baseName}__trim__variant_red${extName}`);
        const blue = path.join(path.dirname(character), `${baseName}__trim__variant_blue${extName}`);
        await exec(`convert ${character} -trim ${trim}`);
        await exec(`convert ${trim} -colorspace Gray ${gray}`);
        if (type.tint === 'red') {
          await exec(`convert ${gray} -fill '#CC0000' -tint 100 -level 25%,100%  ${red}`);
        }
        if (type.tint === 'blue') {
          await exec(`convert ${gray} -fill '#0072FF' -tint 100 -level 0%,70% -modulate 100,80,100 ${blue}`);
        }
        if (type.tint === 'both') {
          await exec(`convert ${gray} -fill '#CC0000' -tint 100 -level 25%,100%  ${red}`);
          await exec(`convert ${gray} -fill '#0072FF' -tint 100 -level 0%,70% -modulate 100,80,100 ${blue}`);
        }
        await exec(`rm ${gray}`);
      }
    })();
  }));
})();
