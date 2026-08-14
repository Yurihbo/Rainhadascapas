import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertOfflineOperation, InsertSeller, InsertSellerItem, InsertUser, InsertUserActivity, OfflineOperation, Seller, SellerItem, UserActivity, offlineOperations, sellerItems, sellers, userActivities, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserRole(id: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ role }).where(eq(users.id, id));
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function updateUserActive(id: number, active: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ active }).where(eq(users.id, id));
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function updateUserProfile(id: number, profile: { name?: string; profilePhoto?: string | null }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set(profile).where(eq(users.id, id));
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function logUserActivity(activity: InsertUserActivity): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(userActivities).values(activity);
}

export async function listUserActivities(userId: number, limit = 50): Promise<UserActivity[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userActivities).where(eq(userActivities.userId, userId)).orderBy(desc(userActivities.createdAt)).limit(limit);
}

export async function insertOfflineOperations(operations: InsertOfflineOperation[]): Promise<{ inserted: OfflineOperation[]; acknowledgedIds: string[] }> {
  const db = await getDb();
  if (!db || operations.length === 0) return { inserted: [], acknowledgedIds: [] };
  const userId = operations[0]!.userId;
  const ids = operations.map((operation) => operation.operationId);
  const existing = await db.select({ operationId: offlineOperations.operationId }).from(offlineOperations).where(and(eq(offlineOperations.userId, userId), inArray(offlineOperations.operationId, ids)));
  const existingIds = new Set(existing.map((item) => item.operationId));
  const fresh = operations.filter((operation) => !existingIds.has(operation.operationId));
  if (fresh.length > 0) await db.insert(offlineOperations).values(fresh);
  const inserted = fresh.length > 0 ? await db.select().from(offlineOperations).where(inArray(offlineOperations.operationId, fresh.map((operation) => operation.operationId))) : [];
  return { inserted, acknowledgedIds: ids };
}

export async function applyOfflineOperation(userId: number, operationType: string, payload: Record<string, unknown>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const sellerPayload = payload as Partial<InsertSeller> & { sellerName?: string; item?: Partial<InsertSellerItem> };
  if (operationType === "seller.create") {
    const clientId = String(payload.clientId ?? `seller-${String(payload.name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    const values: InsertSeller = { userId, clientId, name: String(payload.name ?? ""), initials: String(payload.initials ?? ""), phone: String(payload.phone ?? ""), total: String(payload.total ?? "R$ 0,00"), status: String(payload.status ?? "Pendente"), updatedLabel: String(payload.updatedLabel ?? payload.updated ?? "Agora"), tone: String(payload.tone ?? "danger"), avatar: payload.avatar ? String(payload.avatar) : null };
    await db.insert(sellers).values(values).onDuplicateKeyUpdate({ set: { ...values, userId } });
  } else if (operationType === "seller.delete") {
    const clientId = String(payload.clientId ?? `seller-${String(payload.sellerName ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    await db.delete(sellerItems).where(and(eq(sellerItems.userId, userId), eq(sellerItems.sellerClientId, clientId)));
    await db.delete(sellers).where(and(eq(sellers.userId, userId), eq(sellers.clientId, clientId)));
  } else if (operationType === "item.create") {
    const item = (payload.item ?? {}) as Partial<InsertSellerItem> & { date?: string };
    const sellerClientId = String(payload.sellerClientId ?? `seller-${String(payload.sellerName ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    const values: InsertSellerItem = { userId, sellerClientId, clientId: String(item.clientId ?? `item-${sellerClientId}-${String(item.item ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(item.dateLabel ?? item.date ?? "")}`), item: String(item.item ?? ""), quantity: Number(item.quantity ?? 0), unit: String(item.unit ?? ""), total: String(item.total ?? "R$ 0,00"), dateLabel: String(item.dateLabel ?? item.date ?? ""), note: String(item.note ?? "") };
    await db.insert(sellerItems).values(values).onDuplicateKeyUpdate({ set: { ...values, userId } });
  } else if (operationType === "item.delete") {
    const item = (payload.item ?? {}) as Partial<InsertSellerItem> & { date?: string };
    const sellerClientId = String(payload.sellerClientId ?? `seller-${String(payload.sellerName ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    const clientId = String(item.clientId ?? `item-${sellerClientId}-${String(item.item ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(item.dateLabel ?? item.date ?? "")}`);
    await db.delete(sellerItems).where(and(eq(sellerItems.userId, userId), eq(sellerItems.clientId, clientId)));
  } else if (operationType === "payment.update") {
    const clientId = String(payload.clientId ?? `seller-${String(payload.sellerName ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
    await db.update(sellers).set({ status: String(payload.status ?? "Pendente"), tone: String(payload.tone ?? "danger"), updatedLabel: String(payload.updatedLabel ?? payload.updated ?? "Agora") }).where(and(eq(sellers.userId, userId), eq(sellers.clientId, clientId)));
  }
}

export async function getOperationalState(userId: number): Promise<{ sellers: Seller[]; items: SellerItem[] }> {
  const db = await getDb();
  if (!db) return { sellers: [], items: [] };
  const sellerRows = await db.select().from(sellers).where(eq(sellers.userId, userId)).orderBy(desc(sellers.createdAt));
  const itemRows = sellerRows.length === 0 ? [] : await db.select().from(sellerItems).where(and(eq(sellerItems.userId, userId), inArray(sellerItems.sellerClientId, sellerRows.map((seller) => seller.clientId))));
  return { sellers: sellerRows, items: itemRows };
}

export async function deleteUserById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(users).where(eq(users.id, id));
}

