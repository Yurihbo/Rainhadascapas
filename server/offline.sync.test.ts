import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function anonymousContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("offline.sync", () => {
  it("rejects unauthenticated synchronization attempts", async () => {
    const caller = appRouter.createCaller(anonymousContext());
    await expect(caller.offline.sync({ operations: [] })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects unauthenticated canonical state reads", async () => {
    const caller = appRouter.createCaller(anonymousContext());
    await expect(caller.operational.state()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
