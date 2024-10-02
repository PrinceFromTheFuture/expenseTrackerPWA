ALTER TABLE "paymentMethods" ALTER COLUMN "accountId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "userId" DROP NOT NULL;