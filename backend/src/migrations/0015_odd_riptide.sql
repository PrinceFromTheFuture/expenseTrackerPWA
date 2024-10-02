ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "accountId";