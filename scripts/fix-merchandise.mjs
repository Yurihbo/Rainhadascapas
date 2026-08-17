import fs from 'node:fs';

const path = 'client/src/pages/Home.tsx';
let source = fs.readFileSync(path, 'utf8');
const oldPrint = 'const printStore = () => { document.body.classList.add("printing-catalog"); const cleanup = () => { document.body.classList.remove("printing-catalog"); window.removeEventListener("afterprint", cleanup); }; window.addEventListener("afterprint", cleanup); window.print(); window.setTimeout(cleanup, 1500); };';
const newPrint = `const printStore = () => {
    if (!store) { toast.error("Selecione uma loja"); return; }
    const escapeHtml = (value: string) => value.replace(/[&<>'\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\\\"": "&quot;" }[character] ?? character));
    const categories = store.categories.length ? store.categories.map((category) => {
      const subcategories = category.subcategories.length ? category.subcategories.map((subcategory) => {
        const items = subcategory.items.length ? subcategory.items.map((item) => "<li>" + escapeHtml(item.name) + "</li>").join("") : "<li class=\\\"muted\\\">Nenhum item</li>";
        return "<section class=\\\"subcategory\\\"><h3>" + escapeHtml(subcategory.name) + "</h3><ul>" + items + "</ul></section>";
      }).join("") : "<p class=\\\"muted\\\">Nenhuma subcategoria cadastrada.</p>";
      return "<article class=\\\"category\\\"><h2>" + escapeHtml(category.name) + "</h2>" + subcategories + "</article>";
    }).join("") : "<p class=\\\"empty\\\">Nenhuma categoria cadastrada nesta loja.</p>";
    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
    if (!printWindow) { toast.error("Permita a abertura de janelas para imprimir a lista"); return; }
    const html = "<!doctype html><html lang=\\\"pt-BR\\\"><head><meta charset=\\\"utf-8\\\"><title>Lista de mercadorias - " + escapeHtml(store.name) + "</title><style>" +
      "@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;color:#151515;font:12px Arial,sans-serif}header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #b28b28;padding-bottom:10px;margin-bottom:16px}h1{margin:0;font-size:22px}header p{margin:4px 0 0;color:#666}header time{color:#666;font-size:11px}.category{border-bottom:1px solid #ddd;padding:0 0 8px;margin-bottom:9px;break-inside:avoid}.category>h2{margin:0 0 6px;color:#765b16;font-size:15px}.subcategory{display:inline-block;width:48%;vertical-align:top;padding:0 12px 7px 0;break-inside:avoid}.subcategory h3{margin:0 0 3px;font-size:11px}ul{margin:0;padding-left:15px}li{padding:2px 0;border-bottom:1px dotted #ddd}.muted,.empty{color:#777;font-style:italic}footer{margin-top:16px;color:#777;font-size:10px;text-align:right}</style></head><body><header><div><h1>Rainha das Capas</h1><p>" + escapeHtml(store.name) + " - Lista de mercadorias</p></div><time>Emitido em " + new Date().toLocaleString("pt-BR") + "</time></header><main>" + categories + "</main><footer>Lista objetiva para conferência e impressão</footer><script>window.addEventListener('load',function(){setTimeout(function(){window.print()},150)});window.addEventListener('afterprint',function(){setTimeout(function(){window.close()},300)});</script></body></html>";
    printWindow.document.write(html);
    printWindow.document.close();
  };`;
if (!source.includes(oldPrint)) throw new Error('printStore source not found');
source = source.replace(oldPrint, newPrint);
const oldHead = '<span className="catalog-count">{store?.categories.reduce((sum, category) => sum + category.subcategories.reduce((inner, sub) => inner + sub.items.length, 0), 0) ?? 0} itens cadastrados</span></div>{store?.categories.length ? <div className="catalog-tree">';
const newHead = '<span className="catalog-count">{store?.categories.reduce((sum, category) => sum + category.subcategories.reduce((inner, sub) => inner + sub.items.length, 0), 0) ?? 0} itens cadastrados</span><button className="gold-button small-button no-print" onClick={addCategory}><Plus size={14} /> Nova categoria</button></div>{store?.categories.length ? <div className="catalog-tree">';
if (!source.includes(oldHead)) throw new Error('catalog head source not found');
source = source.replace(oldHead, newHead);
fs.writeFileSync(path, source);
console.log('Mercadorias corrigido.');
