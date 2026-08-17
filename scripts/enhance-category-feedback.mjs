import fs from 'node:fs';
const path = 'client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
source = source.replace('toast.success(popup.kind === "category" ? "Categoria criada" : "Subcategoria criada");', 'toast.success(popup.kind === "category" ? "Categoria criada com sucesso" : "Subcategoria criada com sucesso", { description: `${name} foi adicionada à ${store.name}.` });');
source = source.replace('const rename = (kind: string, current: string, save: (name: string) => void) => { const name = window.prompt(`Editar ${kind}`, current)?.trim(); if (name && name !== current) save(name); };', 'const rename = (kind: string, current: string, save: (name: string) => void) => { const name = window.prompt(`Editar ${kind}`, current)?.trim(); if (name && name !== current) { save(name); toast.success(`${kind[0].toUpperCase()}${kind.slice(1)} atualizado com sucesso`, { description: `O nome foi alterado para ${name}.` }); } };');
source = source.replace('toast.success(`${label} removido`);', 'toast.success(`${label} removido com sucesso`, { description: "A alteração foi sincronizada na loja selecionada." });');
fs.writeFileSync(path, source);
console.log('Category feedback enhanced.');
