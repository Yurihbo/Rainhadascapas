import fs from 'node:fs';
const source = fs.readFileSync('client/src/pages/Home.tsx', 'utf8');
const start = source.indexOf('const printStore');
const end = source.indexOf('const updateStore', start);
console.log(source.slice(start, end > start ? end : start + 5000));
