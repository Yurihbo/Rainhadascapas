import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { isAllowedSession, reconcileWorkspaceData } from "../client/src/lib/sharedWorkspace";

describe("workspace access policy", () => {
  it("accepts anonymous Firebase sessions without an email allowlist", () => {
    expect(isAllowedSession({ email: null, isAnonymous: true })).toBe(true);
    expect(isAllowedSession({ email: "someone@example.com", isAnonymous: false })).toBe(false);
    expect(isAllowedSession(null)).toBe(false);
  });

  it("keeps the Firestore rule explicit about Anonymous Auth", () => {
    const rules = readFileSync(resolve(process.cwd(), "firestore.rules"), "utf8");
    expect(rules).toContain("request.auth.token.firebase.sign_in_provider == 'anonymous'");
    expect(rules).not.toContain("yuridesousasilva@gmail.com");
  });

  it("reconciles a remote snapshot without falling back to local seed data", () => {
    const current = { sellers: [{ name: "Local", initials: "L", phone: "", total: "R$ 0,00", status: "Pendente", updated: "", tone: "danger" }], catalog: [{ id: "local", name: "Local", categories: [] }] };
    const remote = { sellers: [{ name: "Remoto", initials: "R", phone: "", total: "R$ 10,00", status: "Pago", updated: "Agora", tone: "success" }] };
    const result = reconcileWorkspaceData(remote, current);
    expect(result.sellers?.[0]?.name).toBe("Remoto");
    expect(result.catalog).toEqual(current.catalog);
  });
});
