CREATE TABLE IF NOT EXISTS "budgets" (
	"name" varchar(100) NOT NULL,
	"color" varchar(7) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "paymentMethods" (
	"name" varchar(100) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"amountInAgorot" integer NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(50) NOT NULL,
	"date" timestamp NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"budgetId" uuid,
	"paymentMethodId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_budgetId_budgets_id_fk" FOREIGN KEY ("budgetId") REFERENCES "public"."budgets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_paymentMethodId_paymentMethods_id_fk" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."paymentMethods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
