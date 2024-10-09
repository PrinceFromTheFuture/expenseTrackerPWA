ALTER TABLE "accounts" ADD COLUMN "isDeleted" boolean;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "isDeleted" boolean;--> statement-breakpoint
ALTER TABLE "paymentMethods" ADD COLUMN "isDeleted" boolean;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "isDeleted" boolean;