ALTER TABLE "transactions" ALTER COLUMN "accountId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "userId" SET NOT NULL;