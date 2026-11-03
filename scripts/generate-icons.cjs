// The SVG is the source of truth for every application icon.
const fs = require('node:fs');
const path = require('node:path');
const { Resvg } = require('@resvg/resvg-js');

const assets = path.join(__dirname, '..', 'assets');
const svg = fs.readFileSync(path.join(assets, 'levelup.svg'));
const sizes = [16, 20, 24, 32, 40, 48, 64, 128, 256];
const images = sizes.map(size => new Resvg(svg, {
  fitTo: { mode: 'width', value: size },
}).render().asPng());

// Windows ICO directory with a PNG for each display scale.
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + i * 16;
  header[entry] = size === 256 ? 0 : size;
  header[entry + 1] = size === 256 ? 0 : size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
fs.writeFileSync(path.join(assets, 'levelup.ico'), Buffer.concat([header, ...images]));
fs.writeFileSync(path.join(assets, 'levelup.png'), new Resvg(svg, {
  fitTo: { mode: 'width', value: 512 },
}).render().asPng());
console.log('Generated assets/levelup.ico (9 sizes) and assets/levelup.png (512px).');
