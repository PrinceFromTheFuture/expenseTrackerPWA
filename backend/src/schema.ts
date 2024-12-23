import { pgTable, integer, uuid, varchar, timestamp, text, pgEnum, boolean, json } from "drizzle-orm/pg-core";
export const transactionsTable = pgTable("transactions", {
  amountInAgorot: integer("amountInAgorot").notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", {
    length: 50,
  }),
  date: timestamp("date", {
    withTimezone: true,
  }).notNull(),
  paymentMethodId: uuid("paymentMethodId").references(() => paymentMethodsTable.id),
  budgetId: uuid("budgetId").references(() => budgetsTable.id),
  userId: uuid("userId")
    .references(() => userTable.id)
    .notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
});

export const budgetsTable = pgTable("budgets", {
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  iconURL: varchar("iconURL", {
    length: 100,
  }).notNull(),
  userId: uuid("userId")
    .references(() => userTable.id)
    .notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
});

export const paymentMethodType = pgEnum("type", ["other", "creditCard", "debitCard"]);
export const paymentMethodsTable = pgTable("paymentMethods", {
  name: varchar("name", { length: 50 }).notNull(),
  iconURL: text("iconURL").notNull(),
  resetDate: integer("resetDate"),
  type: paymentMethodType("type"),
  color: text("color"),
  creditLimit: integer("creditLimit"),
  userId: uuid("userId")
    .references(() => userTable.id)
    .notNull(),
  accountId: uuid("accountId").references(() => accountsTable.id),
  id: uuid("id").primaryKey().defaultRandom(),
  isDeleted: boolean("isDeleted").default(false),
});

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  balanceInAgorot: integer("balanceInAgorot").notNull(),
  accountsBalanceSumSelector: json("accountsBalanceSumSelector"),
  hashedPassword: text("hashedPassword").notNull(),
  accountsDaysBackChange:integer('getAccountsDaysBackChange').default(7)
});

export const accountsTable = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  userId: uuid("userId")
    .references(() => userTable.id)
    .notNull(),
  balanceInAgorot: integer("balanceInAgorot").notNull(),
  iconURL: text("iconURL").notNull(),
  isDeleted: boolean("isDeleted").default(false),
});

export type InsertPaymentMethods = typeof paymentMethodsTable.$inferInsert;
export type InsertBudgets = typeof budgetsTable.$inferInsert;
export type InsertTransaction = typeof transactionsTable.$inferInsert;



