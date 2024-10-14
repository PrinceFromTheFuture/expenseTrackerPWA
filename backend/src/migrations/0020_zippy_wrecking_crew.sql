ALTER TABLE "accounts" ALTER COLUMN "isDeleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "budgets" ALTER COLUMN "isDeleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "paymentMethods" ALTER COLUMN "isDeleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "isDeleted" SET DEFAULT false;