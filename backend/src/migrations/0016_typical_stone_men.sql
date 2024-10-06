DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('other', 'creditCard', 'debitCard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "paymentMethods" ADD COLUMN "resetDate" integer;--> statement-breakpoint
ALTER TABLE "paymentMethods" ADD COLUMN "type" "type";--> statement-breakpoint
ALTER TABLE "paymentMethods" ADD COLUMN "creditLimit" integer;