import { pgTable, integer, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
export const transactionsTable = pgTable("transactions", {
    amountInAgorot: integer("amountInAgorot").notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", {
        length: 50,
    }),
    date: timestamp("date", { withTimezone: true }).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
    budgetId: uuid("budgetId").references(() => budgetsTable.id),
    paymentMethodId: uuid("paymentMethodId").references(() => paymentMethodsTable.id),
});
export const budgetsTable = pgTable("budgets", {
    name: varchar("name", { length: 50 }).notNull(),
    color: varchar("color", { length: 7 }).notNull(),
    iconName: varchar("iconName", { length: 100 }).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
});
export const paymentMethodsTable = pgTable("paymentMethods", {
    name: varchar("name", { length: 50 }).notNull(),
    iconName: varchar("iconName", {
        length: 20,
    }).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
});
export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 25 }).notNull(),
    email: varchar("email", { length: 50 }).notNull(),
    balanceInAgorot: integer("balanceInAgorot").notNull(),
});
