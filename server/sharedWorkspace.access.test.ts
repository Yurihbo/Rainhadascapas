import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ADMIN_EMAIL, ALLOWED_EMAILS, isAllowedSession } from "../client/src/lib/sharedWorkspace";

describe("workspace access policy", () => {
  it("keeps the private allowlist and administrator aligned", () => {
    expect(ALLOWED_EMAILS).toEqual([
      "yuridesousasilva@gmail.com",
      "amanda.mds171@gmail.com",
      "rainhadascapas35@gmail.com",
      "orlando_soscelular@gmail.com",
      "yurihbo2@gmail.com",
    ]);
    expect(ADMIN_EMAIL).toBe("yuridesousasilva@gmail.com");
    expect(ALLOWED_EMAILS).toContain(ADMIN_EMAIL);
  });

  it("blocks anonymous and non-allowlisted sessions", () => {
    expect(isAllowedSession({ email: "yuridesousasilva@gmail.com", isAnonymous: false })).toBe(true);
    expect(isAllowedSession({ email: "someone@example.com", isAnonymous: false })).toBe(false);
    expect(isAllowedSession({ email: null, isAnonymous: true })).toBe(false);
    expect(isAllowedSession(null)).toBe(false);
  });

  it("keeps the Firestore rule explicit about Anonymous Auth", () => {
    const rules = readFileSync(resolve(process.cwd(), "firestore.rules"), "utf8");
    expect(rules).toContain("request.auth.token.firebase.sign_in_provider != 'anonymous'");
  });
});
