import fs from 'node:fs';
const source = fs.readFileSync('client/src/pages/Home.tsx', 'utf8');
const start = source.indexOf('function MercadoriasModule');
const end = source.indexOf('\nfunction ', start + 10);
const block = source.slice(start, end === -1 ? source.length : end);
fs.writeFileSync('/tmp/merchandise-module.txt', block);
console.log(`extracted ${block.length} chars`);
for (const token of ['const addCategory', 'function addCategory', 'window.print', 'print(', 'savePopup', 'updateStore']) {
  console.log(`${token}: ${block.indexOf(token)}`);
}
