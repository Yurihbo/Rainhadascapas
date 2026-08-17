import { readFileSync } from "node:fs";
import { stripUndefined } from "../client/src/lib/sharedWorkspace";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("shared persistence safeguards", () => {
  it("does not cache document, script, or stylesheet responses in the service worker", () => {
    const serviceWorker = readFileSync(resolve(process.cwd(), "client/public/sw.js"), "utf8");
    expect(serviceWorker).toContain('request.mode === "navigate"');
    expect(serviceWorker).toContain('["document", "script", "style"].includes(request.destination)');
    expect(serviceWorker).toContain('cache: "no-store"');
    expect(serviceWorker).toContain('const STATIC_DESTINATIONS = new Set(["image", "font", "audio", "video"])');
    expect(serviceWorker).not.toContain('cache.put(new Request(request');
  });

  it("removes undefined values from nested Firestore payloads", () => {
    expect(stripUndefined({ sellers: [{ name: "João", avatar: undefined, items: [{ note: undefined, item: "Capa" }] }] })).toEqual({ sellers: [{ name: "João", items: [{ item: "Capa" }] }] });
  });

  it("keeps seller PDF export wired to a real printable document", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("function printSellerItems(seller: Seller, onFinished?");
    expect(home).toContain("printWindow.document.write");
    expect(home).toContain("printSellerItems(seller, () => setPrinting(false), pdfLogo)");
    expect(home).toContain("compressPdfLogo");
    expect(home).toContain("IDENTIDADE DOS PDFs");
    expect(home).toContain("<th>Revendedor</th><th>Total</th>");
    expect(home).toContain("function printWeeklyReport");
    expect(home).toContain("printWeeklyReport({ title: report.title");
    expect(home).toContain("onClick={generateWeeklyPdf}");
  });

  it("keeps merchandise category creation and store printing wired", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain('onClick={addCategory}><Plus size={14} /> Nova categoria');
    expect(home).toContain('const printWindow = window.open("", "_blank", "width=920,height=720")');
    expect(home).toContain('printWindow.document.write(html)');
    expect(home).toContain('printWindow.document.open()');
    expect(home).toContain('printWindow.addEventListener("load", () => setTimeout(printReadyDocument, 250), { once: true })');
    expect(home).toContain('setTimeout(printReadyDocument, 1200)');
    expect(home).toContain('Permita janelas pop-up para imprimir a lista');
    expect(home).toContain('Lista de mercadorias');
    expect(home).toContain('Emitido em');
    expect(home).toContain('Categoria criada com sucesso');
    expect(home).toContain('Editar categoria');
    expect(home).toContain('Remover categoria');
    expect(home).toContain('removido com sucesso');
  });

  it("serializes Firestore writes and starts anonymous access automatically", () => {
    const workspace = readFileSync(resolve(process.cwd(), "client/src/lib/sharedWorkspace.ts"), "utf8");
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(workspace).toContain("writeQueueRef");
    expect(workspace).toContain("setDoc(ref, payload");
    expect(workspace).toContain("updatedBy");
    expect(workspace).toContain("indexedDBLocalPersistence");
    expect(workspace).toContain("browserLocalPersistence");
    expect(workspace).toContain("signInAnonymously(firebaseAuth)");
    expect(workspace).toContain("export function useAnonymousSession");
    expect(workspace).not.toContain("GoogleAuthProvider");
    expect(workspace).not.toContain("signInWithPopup");
    expect(workspace).not.toContain("signInWithRedirect");
    expect(home).not.toContain("Entrar com Google");
    expect(home).not.toContain("Use o Safari para entrar");
    expect(home).not.toContain("auth=browser");
  });
});
