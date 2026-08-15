import { describe, expect, it } from "vitest";
import { ADMIN_EMAIL, ALLOWED_EMAILS } from "../client/src/lib/sharedWorkspace";

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
});
