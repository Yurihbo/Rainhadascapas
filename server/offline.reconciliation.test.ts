import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const state = vi.hoisted(() => ({ sellers: [] as Array<Record<string, unknown>>, items: [] as Array<Record<string, unknown>> }));

vi.mock("./db", () => ({
  applyOfflineOperation: vi.fn(async (_userId: number, operationType: string, payload: Record<string, unknown>) => {
    if (operationType === "seller.create") state.sellers.push(payload);
    if (operationType === "item.create") state.items.push({ ...(payload.item as Record<string, unknown>), sellerClientId: payload.sellerClientId });
    if (operationType === "payment.update") {
      const seller = state.sellers.find((row) => row.clientId === payload.clientId);
      if (seller) seller.status = payload.status;
    }
  }),
  insertOfflineOperations: vi.fn(async (operations: Array<{ operationId: string; operationType: string; payload: string }>) => ({ inserted: operations.map((operation) => operation), acknowledgedIds: operations.map((operation) => operation.operationId) })),
  getOperationalState: vi.fn(async () => ({ sellers: state.sellers, items: state.items })),
  deleteUserById: vi.fn(),
  listUserActivities: vi.fn(async () => []),
  listUsers: vi.fn(async () => []),
  logUserActivity: vi.fn(),
  updateUserActive: vi.fn(),
  updateUserProfile: vi.fn(),
  updateUserRole: vi.fn(),
}));

import { appRouter } from "./routers";

function authenticatedContext(): TrpcContext {
  return {
    user: { id: 77, openId: "integration-user", name: "Integração", role: "user", active: true } as TrpcContext["user"],
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("offline reconciliation", () => {
  it("applies a seller, item and payment update and returns the reconciled state", async () => {
    const caller = appRouter.createCaller(authenticatedContext());
    const result = await caller.offline.sync({ operations: [
      { id: "seller-op", operationType: "seller.create", payload: { clientId: "seller-1", name: "Offline Seller", status: "Pendente" }, action: "Revendedor criado", description: "Criado offline", createdAt: Date.now() },
      { id: "item-op", operationType: "item.create", payload: { sellerClientId: "seller-1", item: { clientId: "item-1", item: "Capa", quantity: 2, unit: "R$ 10,00", total: "R$ 20,00", date: "14 ago", note: "" } }, action: "Item adicionado", description: "Item criado offline", createdAt: Date.now() },
      { id: "payment-op", operationType: "payment.update", payload: { clientId: "seller-1", status: "Pago" }, action: "Pagamento atualizado", description: "Pagamento sincronizado", createdAt: Date.now() },
    ] });

    expect(result.acceptedIds).toEqual(["seller-op", "item-op", "payment-op"]);
    expect(result.state.sellers[0]?.status).toBe("Pago");
    expect(result.state.items[0]?.item).toBe("Capa");
  });
});
