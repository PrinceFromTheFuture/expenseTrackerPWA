CREATE TABLE IF NOT EXISTS "acounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"userId" uuid NOT NULL,
	"balanceInAgorot" integer NOT NULL,
	"iconURL" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "paymentMethods" ADD COLUMN "accountId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "accountId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "acounts" ADD CONSTRAINT "acounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_accountId_acounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."acounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_acounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."acounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
