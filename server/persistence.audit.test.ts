import { readFileSync } from "node:fs";
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

  it("serializes Firestore writes and reports the authenticated writer", () => {
    const workspace = readFileSync(resolve(process.cwd(), "client/src/lib/sharedWorkspace.ts"), "utf8");
    expect(workspace).toContain("writeQueueRef");
    expect(workspace).toContain("setDoc(ref, payload");
    expect(workspace).toContain("updatedBy");
  });
});
