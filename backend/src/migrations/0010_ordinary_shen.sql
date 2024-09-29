ALTER TABLE "budgets" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "paymentMethods" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "userId" SET NOT NULL;