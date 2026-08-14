import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  profilePhoto: text("profilePhoto"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const userActivities = mysqlTable("userActivities", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 80 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserActivity = typeof userActivities.$inferSelect;
export type InsertUserActivity = typeof userActivities.$inferInsert;

export const offlineOperations = mysqlTable("offlineOperations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  operationId: varchar("operationId", { length: 64 }).notNull().unique(),
  operationType: varchar("operationType", { length: 80 }).notNull(),
  payload: text("payload").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OfflineOperation = typeof offlineOperations.$inferSelect;
export type InsertOfflineOperation = typeof offlineOperations.$inferInsert;

export const sellers = mysqlTable("sellers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  clientId: varchar("clientId", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  initials: varchar("initials", { length: 8 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  total: varchar("total", { length: 40 }).notNull(),
  status: varchar("status", { length: 40 }).notNull(),
  updatedLabel: varchar("updatedLabel", { length: 80 }).notNull(),
  tone: varchar("tone", { length: 40 }).notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Seller = typeof sellers.$inferSelect;
export type InsertSeller = typeof sellers.$inferInsert;

export const sellerItems = mysqlTable("sellerItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  sellerClientId: varchar("sellerClientId", { length: 160 }).notNull(),
  clientId: varchar("clientId", { length: 200 }).notNull().unique(),
  item: varchar("item", { length: 200 }).notNull(),
  quantity: int("quantity").notNull(),
  unit: varchar("unit", { length: 40 }).notNull(),
  total: varchar("total", { length: 40 }).notNull(),
  dateLabel: varchar("dateLabel", { length: 80 }).notNull(),
  note: text("note").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SellerItem = typeof sellerItems.$inferSelect;
export type InsertSellerItem = typeof sellerItems.$inferInsert;