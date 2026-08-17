import fs from 'node:fs';

function resolveFile(path, resolver) {
  const source = fs.readFileSync(path, 'utf8');
  if (!source.includes('<<<<<<< HEAD')) throw new Error(`No conflict in ${path}`);
  fs.writeFileSync(path, resolver(source));
}

resolveFile('client/src/pages/Home.tsx', (source) => source.replace(/<<<<<<< HEAD[\s\S]*?=======[\s\S]*?>>>>>>> github\/main/, (block) => block.split('=======\n')[1].replace(/^>>>>>>> github\/main\n?/, '')));

resolveFile('server/persistence.audit.test.ts', (source) => source.replace(/<<<<<<< HEAD[\s\S]*?=======[\s\S]*?>>>>>>> github\/main/, `  it("keeps merchandise category creation and store printing wired", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain('onClick={addCategory}><Plus size={14} /> Nova categoria');
    expect(home).toContain('const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=700")');
    expect(home).toContain('printWindow.document.write(html)');
    expect(home).toContain('Lista de mercadorias');
    expect(home).toContain('Emitido em');
  });
  it("serializes Firestore writes and keeps the standalone iOS screen stable", () => {
    const workspace = readFileSync(resolve(process.cwd(), "client/src/lib/sharedWorkspace.ts"), "utf8");
    expect(workspace).toContain("writeQueueRef");
    expect(workspace).toContain("setDoc(ref, payload");
    expect(workspace).toContain("updatedBy");
    expect(workspace).toContain("indexedDBLocalPersistence");
    expect(workspace).toContain("browserLocalPersistence");
    expect(workspace).toContain("signInWithRedirect(firebaseAuth, provider)");
    expect(workspace).toContain("if (isIos())");
    expect(workspace).toContain("signInWithPopup(firebaseAuth, provider)");
    expect(workspace).toContain("auth/popup-blocked");
    expect(workspace).toContain("getRedirectResult(firebaseAuth)");
    expect(workspace).toContain("else if (redirectResolved) acceptUser(null)");
    expect(workspace).toContain("display-mode: standalone");
    expect(home).toContain("const iosStandalone");
    expect(home).toContain("Use o Safari para entrar");
    expect(home).toContain("Não toque em um botão de login nesta tela");
    expect(home).toContain("https://yurihbo.github.io/Rainhadascapas/");
    expect(home).not.toContain("auth=browser");
    expect(home).not.toContain("Copiar link para o Safari");
  });`));

resolveFile('todo.md', (source) => source.replace(/<<<<<<< HEAD[\s\S]*?=======[\s\S]*?>>>>>>> github\/main/, (block) => {
  const parts = block.split('=======\n');
  const ours = parts[0].replace('<<<<<<< HEAD\n', '').trim();
  const theirs = parts[1].replace(/^>>>>>>> github\/main\n?/, '').trim();
  return ours + '\n' + theirs;
}));

console.log('Merge conflicts resolved.');
