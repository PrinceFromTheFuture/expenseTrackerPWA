import { pgTable, integer, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
export const transactionsTable = pgTable("transactions", {
    amountInAgorot: integer("amountInAgorot").notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", {
        length: 50,
    }).notNull(),
    date: timestamp("date").notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
    budgetId: uuid("budgetId").references(() => budgetsTable.id),
    paymentMethodId: uuid("paymentMethodId").references(() => paymentMethodsTable.id),
});
export const budgetsTable = pgTable("budgets", {
    name: varchar("name", { length: 50 }).notNull(),
    color: varchar("color", { length: 7 }).notNull(),
    iconURL: varchar("iconURL", { length: 100 }).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
});
export const paymentMethodsTable = pgTable("paymentMethods", {
    name: varchar("name", { length: 50 }).notNull(),
    iconURL: varchar("iconURL", {
        length: 100,
    }).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
});
