import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "user" | "admin"): TrpcContext {
  return {
    user: {
      id: 7,
      openId: "test-user",
      name: "Teste",
      email: "teste@example.com",
      loginMethod: "google",
      role,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("users permissions", () => {
  it("blocks user accounts from listing users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.users.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("blocks user accounts from changing roles", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.users.setRole({ id: 7, role: "admin" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
